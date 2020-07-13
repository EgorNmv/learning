import React, { useState } from "react";
import { Form, Input, Select, Button } from "antd";
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
  console.log(organizers);
  const [isLoadingFile, sendFile] = useFileUpload<{ filename: string }>();
  const [response, setResponse] = useState<{ filename: string }>();

  const onFinishHandler = ({
    name,
    category,
    startDate,
    targetAudience,
    organizer,
    endDate,
    trainingFormat,
    // tags,
    description,
    countOfSeats,
    site,
  }: Store) => {
    const data: InputTraining = {
      audienceId: targetAudience,
      end: endDate,
      description,
      formatId: trainingFormat,
      label: response?.filename,
      name,
      organizerId: organizer,
      site,
      start: startDate,
      categoryId: category,
      numberOfParticipants: Number(countOfSeats),
    };

    onFinish && onFinish(data);
  };

  const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    let file: File;

    if (event.target.files) {
      file = event.target.files[0];
      setResponse(await sendFile(file, "training"));
    }
  };

  React.useEffect(() => {
    form.setFieldsValue({
      ...formValues,
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
          <Form.Item name="name" label="Название:" rules={[{ required: true }]}>
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
                name="startDate"
                label="Дата начала:"
                rules={[{ required: true }]}
              >
                <Input />
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
            </div>
            <div style={{ flex: 1 }}>
              <Form.Item name="countOfSeats" label="Количество мест:">
                <Input />
              </Form.Item>
              <Form.Item
                name="endDate"
                label="Дата оконачния:"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
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
              <Form.Item name="site" label="Ссылка на сайт:">
                <Input defaultValue="" />
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
              filename={formValues?.label || null}
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
        <Form.Item>
          <Button
            htmlType="button"
            style={{ marginRight: "1rem" }}
            onClick={() => history.goBack()}
          >
            Отмена
          </Button>
          <Button type="primary" htmlType="submit" disabled={isLoadingFile}>
            {isEditing ? "Обновить" : "Создать"}
          </Button>
        </Form.Item>
      </CenteredText>
    </Form>
  );
};
