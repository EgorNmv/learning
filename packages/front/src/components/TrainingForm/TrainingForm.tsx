import React from "react";
import { Form, Input, Select, Upload, Button } from "antd";
import { PictureFilled } from "@ant-design/icons";
import { CenteredText } from "../../hoc/CenteredText/CenteredText";
import { Store } from "antd/lib/form/interface";
import { graphql } from "react-relay";
import { useLazyLoadQuery } from "react-relay/hooks";
import { TrainingFormQuery } from "./__generated__/TrainingFormQuery.graphql";
import { InputTraining } from "../../pages/TrainingCreate/__generated__/TrainingCreateMutation.graphql";
import { TrainingFormValues } from "../../utils/types";

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
  formValues?: TrainingFormValues;
  onFinish?: (data: InputTraining) => void;
};

export const TrainingForm: React.FC<TrainingFormProps> = ({
  formValues,
  onFinish,
}) => {
  const [form] = Form.useForm();
  const { formats, organizers, targetAudiences, categories } = useLazyLoadQuery<
    TrainingFormQuery
  >(query, {});

  const onFinishHandler = ({
    name,
    category,
    startDate,
    targetAudience,
    organizer,
    endDate,
    trainingFormat,
    tags,
    description,
    countOfSeats,
    site,
  }: Store) => {
    const data: InputTraining = {
      audienceId: targetAudience,
      end: endDate,
      description,
      formatId: trainingFormat,
      label: "",
      name,
      organizerId: organizer,
      site: site || "",
      start: startDate,
    };

    onFinish && onFinish(data);
  };

  const onReset = () => {
    form.resetFields();
  };

  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onFill = () => {
    form.setFieldsValue({
      note: "Hello world!",
      gender: "male",
    });
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
          <Form.Item
            name="photo"
            label="Загрузите фотографию:"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <div
              style={{
                width: 300,
                height: 300,
                background: "grey",
                marginBottom: "2.8rem",
              }}
            />
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button>
                <PictureFilled /> Выбрать файл
              </Button>
            </Upload>
          </Form.Item>
        </div>
      </div>
      <Form.Item name="tags" label="Теги:">
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Описание:"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <CenteredText>
        <Form.Item>
          <Button
            htmlType="button"
            onClick={onReset}
            style={{ marginRight: "1rem" }}
          >
            Отмена
          </Button>
          <Button type="primary" htmlType="submit">
            Создать
          </Button>
        </Form.Item>
      </CenteredText>
    </Form>
  );
};
