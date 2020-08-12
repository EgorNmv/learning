import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  InputNumber,
  DatePicker,
  Checkbox,
} from "antd";
import { CenteredText } from "../../hoc/CenteredText/CenteredText";
import { Store } from "antd/lib/form/interface";
import { graphql } from "react-relay";
import { useLazyLoadQuery } from "react-relay/hooks";
import { TrainingFormQuery } from "./__generated__/TrainingFormQuery.graphql";
import { InputTraining } from "../../pages/TrainingCreate/__generated__/TrainingCreateMutation.graphql";
import { TrainingFormValues } from "../../utils/types";
import { useFileUpload } from "../../utils/utils";
import { UploadedPicture } from "../UploadedPicture/UploadedPicture";
import { useHistory } from "react-router-dom";
import moment from "moment";
import "moment/locale/ru";
import "./training-form.css";
import { AlertContext } from "../../hoc/Alert/AlertContext";

const query = graphql`
  query TrainingFormQuery {
    targetAudiences {
      targetAudienceId: id
      description
    }
    organizers {
      organizerId: id
      name
    }
    formats {
      formatId: id
      description
    }
    categories {
      categoryId: id
      description
    }
  }
`;

type TrainingFormProps = {
  formValues?: TrainingFormValues | null;
  onFinish: (data: InputTraining) => void;
  isEditing?: boolean;
};

export const TrainingForm: React.FC<TrainingFormProps> = ({
  formValues,
  onFinish,
  isEditing = false,
}) => {
  const history = useHistory();
  const [form] = Form.useForm();
  const { formats, organizers, targetAudiences, categories } = useLazyLoadQuery<
    TrainingFormQuery
  >(query, {});
  const [isLoadingFile, sendFile] = useFileUpload<{ filename: string }>();
  const [response, setResponse] = useState<{ filename: string }>();
  const { showAlert } = React.useContext(AlertContext);
  const [isDatePickerDisabled, setIsDatePickerDisables] = React.useState<
    boolean
  >(false);

  const onFinishHandler = ({
    name,
    category,
    targetAudience,
    organizer,
    trainingFormat,
    // tags,
    description,
    countOfSeats,
    site,
    startAndEndDates,
    isDateSet,
  }: Store) => {
    if (name.trim().length >= 3) {
      const data: InputTraining = {
        audienceId: targetAudience,
        end: !isDateSet ? startAndEndDates[1].format("DD.MM.YYYY") : null,
        description: description.trim(),
        formatId: trainingFormat,
        label: response?.filename,
        name: name.trim(),
        organizerId: organizer,
        site: site && site.trim(),
        start: !isDateSet ? startAndEndDates[0].format("DD.MM.YYYY") : null,
        categoryId: category,
        numberOfParticipants: Number(countOfSeats),
        isDateSet: !isDateSet,
      };

      onFinish && onFinish(data);
    } else {
      showAlert(
        `Название события "${name.trim()}" содержит менее трёх символов`,
        "error"
      );
    }
  };

  const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    let file: File;

    if (event.target.files) {
      file = event.target.files[0];
      setResponse(await sendFile(file, "training"));
    }
  };

  React.useEffect(() => {
    !formValues?.isDateSet && setIsDatePickerDisables(true);
    formValues &&
      form.setFieldsValue({
        ...formValues,
        isDateSet: !formValues.isDateSet,
        startAndEndDates: formValues.isDateSet
          ? [
              moment(formValues?.startDate, "DD.MM.YYYY"),
              moment(formValues?.endDate, "DD.MM.YYYY"),
            ]
          : [],
      });
  }, [formValues]);

  return (
    <Form
      layout={"vertical"}
      form={form}
      name="training-create"
      onFinish={onFinishHandler}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ flex: 1 }}>
          <Form.Item
            name="name"
            label="Название:"
            rules={[
              { required: true },
              {
                whitespace: true,
                message:
                  "Название события не может состоять только из пробелов",
              },
              {
                min: 3,
                message: "Слишком короткое название",
              },
              { max: 255, message: "Слишком длинное название" },
            ]}
          >
            <Input />
          </Form.Item>
          <div style={{ display: "flex" }}>
            <div style={{ flex: 1, marginRight: "1rem" }}>
              <Form.Item
                name="category"
                label="Категория:"
                rules={[{ required: true }]}
              >
                <Select>
                  {categories.map((category) => (
                    <Select.Option value={category.categoryId}>
                      {category.description}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="targetAudience"
                label="Целевая аудитория:"
                rules={[{ required: true }]}
              >
                <Select>
                  {targetAudiences.map((targetAudience) => (
                    <Select.Option value={targetAudience.targetAudienceId}>
                      {targetAudience.description}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <div className="training-form__startAndEndDates-and-countOfSeats">
                <div>
                  <Form.Item
                    name="startAndEndDates"
                    label="Даты проведения:"
                    rules={isDatePickerDisabled ? [] : [{ required: true }]}
                  >
                    <DatePicker.RangePicker
                      format={"DD.MM.YYYY"}
                      placeholder={["Дата начала", "Дата конца"]}
                      disabled={isDatePickerDisabled}
                    />
                  </Form.Item>
                  <Form.Item name="isDateSet" valuePropName="checked">
                    <Checkbox
                      onChange={() => {
                        setIsDatePickerDisables(!isDatePickerDisabled);
                        form.resetFields(["startAndEndDates"]);
                      }}
                    >
                      Дата не определена
                    </Checkbox>
                  </Form.Item>
                </div>
                <Form.Item
                  name="countOfSeats"
                  className="training-form__input-number"
                  label="Количество мест:"
                  rules={[
                    {
                      type: "number",
                      message: "Количество мест должно быть числом",
                    },
                    {
                      pattern: new RegExp("^[1-9]*$"),
                      message:
                        "Количество мест должно быть целым, положительным числом",
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <Form.Item
                name="trainingFormat"
                label="Формат обучения:"
                rules={[{ required: true }]}
              >
                <Select>
                  {formats.map((format) => (
                    <Select.Option value={format.formatId}>
                      {format.description}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="organizer"
                label="Организатор:"
                rules={[{ required: true }]}
              >
                <Select>
                  {organizers.map((organizer) => (
                    <Select.Option value={organizer.organizerId}>
                      {organizer.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="site"
                label="Ссылка на сайт:"
                rules={[
                  {
                    pattern: new RegExp(
                      "^((https?|ftp|smtp)://)?(www.)?[a-z0-9]+.[a-z]+(/[a-zA-Z0-9#]+/?)*$"
                    ),
                    message: "Недопустимый формат сайта",
                  },
                  { max: 255, message: "Слишком длинное имя сайта" },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
          </div>
        </div>
        <div style={{ padding: "0 1rem" }}>
          <Form.Item name="label" label="Загрузите фотографию:">
            <UploadedPicture
              style={{
                width: "100%",
                height: "100%",
                maxHeight: "20rem",
                maxWidth: "20rem",
              }}
              filename={response?.filename || formValues?.label || null}
              imgType="training"
            />
            <input
              disabled={isLoadingFile}
              type="file"
              id="file"
              onChange={uploadFile}
            />
          </Form.Item>
        </div>
      </div>
      {/* <Form.Item name="tags" label="Теги:">
        <Input />
      </Form.Item> */}
      <Form.Item
        name="description"
        label="Описание:"
        rules={[{ required: true }]}
      >
        <Input.TextArea rows={8} />
      </Form.Item>
      <CenteredText>
        <Form.Item shouldUpdate={true}>
          {() => (
            <>
              <Button
                htmlType="button"
                style={{ marginRight: "1rem" }}
                onClick={() => history.goBack()}
              >
                Отмена
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                disabled={
                  isLoadingFile ||
                  !form.isFieldTouched("name") ||
                  !form.isFieldTouched("description") ||
                  form.getFieldsError().filter(({ errors }) => errors.length)
                    .length > 0
                }
              >
                {isEditing ? "Обновить" : "Создать"}
              </Button>
            </>
          )}
        </Form.Item>
      </CenteredText>
    </Form>
  );
};
