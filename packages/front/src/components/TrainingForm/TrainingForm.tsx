import React from "react";
import {
  Form,
  Input,
  Select,
  Button,
  InputNumber,
  DatePicker,
  Checkbox,
  Upload,
} from "antd";
import "moment/locale/ru";
import moment from "moment";
import "./training-form.css";
import { graphql } from "react-relay";
import { useHistory } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { Store } from "antd/lib/form/interface";
import { LoadingOutlined } from "@ant-design/icons";
import { useLazyLoadQuery } from "react-relay/hooks";
import PhotoSvg from "../../static/img/photograph.svg";
import { AlertContext } from "../../hoc/Alert/AlertContext";
import { CenteredText } from "../../hoc/CenteredText/CenteredText";
import { UploadChangeParam, UploadFile } from "antd/es/upload/interface";
import { TrainingFormQuery } from "./__generated__/TrainingFormQuery.graphql";
import { InputTraining } from "../../pages/TrainingCreate/__generated__/TrainingCreateMutation.graphql";
import { InputTraining as InputTrainingForEdit } from "../../pages/TrainingEdit/__generated__/TrainingEditMutation.graphql";

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
  formValues?: InputTrainingForEdit | null;
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
  const [response, setResponse] = React.useState<string | null>(null);
  const { showAlert } = React.useContext(AlertContext);
  const [isDatePickerDisabled, setIsDatePickerDisables] = React.useState<
    boolean
  >(false);
  const [isFileLoading, setIsFileLoading] = React.useState<boolean>(false);
  const { authState } = useOktaAuth();

  const onFinishHandler = ({
    name,
    site,
    speaker,
    formatId,
    isDateSet,
    audienceId,
    description,
    categoryId,
    organizerId,
    startAndEndDates,
    numberOfParticipants,
  }: Store) => {
    if (name.trim().length >= 3) {
      const data: InputTraining = {
        formatId,
        categoryId,
        audienceId,
        organizerId,
        name: name.trim(),
        isDateSet: !isDateSet,
        site: site && site.trim() || null,
        description: description.trim(),
        speaker: speaker && speaker.trim() || null,
        label: response || formValues?.label,
        numberOfParticipants: Number(numberOfParticipants),
        end: !isDateSet ? startAndEndDates[1].format("DD.MM.YYYY") : null,
        start: !isDateSet ? startAndEndDates[0].format("DD.MM.YYYY") : null,
      };

      onFinish(data);
    } else {
      showAlert(
        `Название события "${name.trim()}" содержит менее трёх символов`,
        "error"
      );
    }
  };

  React.useEffect(() => {
    if (formValues) {
      if (!formValues.isDateSet) {
        !formValues.isDateSet && setIsDatePickerDisables(true);
      }
      form.setFieldsValue({
        ...formValues,
        isDateSet: !formValues.isDateSet,
        startAndEndDates: formValues.isDateSet
          ? [
              moment(formValues?.start, "DD.MM.YYYY"),
              moment(formValues?.end, "DD.MM.YYYY"),
            ]
          : [],
      });
    }
  }, [formValues]);

  return (
    <Form
      layout={"vertical"}
      form={form}
      name="training-create"
      onFinish={onFinishHandler}
      className="training-form"
    >
      <div className="training-form__main-part">
        <div className="training-form__main-part__text">
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
          <div className="training-form__main-part__text__flex">
            <div className="training-form__main-part__text__flex-main">
              <Form.Item
                name="categoryId"
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
                name="audienceId"
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
                <div className="training-form__startAndEndDates-and-countOfSeats__dates">
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
                  <Form.Item
                    className="training-form__startAndEndDates-and-countOfSeats__checkbox"
                    name="isDateSet"
                    valuePropName="checked"
                  >
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
                  name="numberOfParticipants"
                  className="training-form__input-number"
                  label="Количество мест:"
                  rules={[
                    {
                      type: "number",
                      message: "Количество мест должно быть числом",
                    },
                    {
                      pattern: new RegExp("^[01-9]*$"),
                      message:
                        "Количество мест должно быть целым, положительным числом",
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
              </div>
            </div>
            <div className="training-form__main-part__text">
              <Form.Item
                name="formatId"
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
                name="organizerId"
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
              <Form.Item
                name="speaker"
                label="Докладчик:"
                rules={[
                  { max: 255, message: "Слишком длинное имя докладчика" },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="training-form__main-part__photo">
          <Form.Item name="label" label="Загрузите фотографию:">
            <Upload
              className="training-form__upload"
              id="file"
              name="file"
              data={{ type: 1 }}
              listType="picture-card"
              showUploadList={false}
              onChange={(
                info: UploadChangeParam<
                  UploadFile<{ filename: string; originName: string }>
                >
              ): void => {
                if (info.file.status === "uploading") {
                  setIsFileLoading(true);
                  setResponse(null);
                  return;
                }
                if (info.file.status === "done" && info.file.response) {
                  setIsFileLoading(false);
                  setResponse(info.file.response?.filename);
                }
              }}
              action={`${process.env.REACT_APP_SERVER_HOST_WITH_PORT}/file/upload`}
              headers={{
                Accept: "application/json",
                Authorization: `Bearer ${authState.accessToken}`,
              }}
            >
              {response || formValues?.label ? (
                <img
                  className="trainin-form__upload-img"
                  src={`${
                    process.env.REACT_APP_SERVER_HOST_WITH_PORT
                  }/training/${response ? response : formValues?.label}`}
                  alt="Изображение события"
                />
              ) : (
                <div>
                  {isFileLoading ? (
                    <LoadingOutlined />
                  ) : (
                    <img
                      className="trainin-form__upload-img"
                      src={PhotoSvg}
                      alt="Изображение"
                    />
                  )}
                </div>
              )}
            </Upload>
          </Form.Item>
        </div>
      </div>
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
                className="training-form__cancel-btn"
                htmlType="button"
                style={{ marginRight: "1rem" }}
                onClick={() => history.goBack()}
              >
                Отмена
              </Button>
              <Button
                className="training-form__create-btn"
                type="primary"
                htmlType="submit"
                disabled={
                  isFileLoading ||
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
