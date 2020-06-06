import React from "react";
import { Form, Input, Button, Select, Upload, Card } from "antd";
import { Store } from "antd/lib/form/interface";
import { PictureFilled } from "@ant-design/icons";
import { CenteredText } from "../../hoc/CenteredText/CenteredText";

const targetAudiences: string[] = ["Джуниоры", "Мидлы", "Сеньеры"];
const organizers: string[] = ["ВШЭМ", "УРфУ", "ЦБ", "СКБ"];
const trainigFormats: string[] = [
  "Онлайн лекции",
  "Онлайн лекции+практики",
  "Онлайн практики",
  "Онлайн практики с проверкой",
];

const TrainingCreate: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: Store) => {
    console.log(values);
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

  return (
    <>
      <h1>Создание события</h1>
      <section>
        <Card>
          <Form
            layout={"vertical"}
            form={form}
            name="training-create"
            onFinish={onFinish}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ flex: 1 }}>
                <Form.Item
                  name="name"
                  label="Название:"
                  rules={[{ required: true }]}
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
                      <Input />
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
                        {targetAudiences.map((option) => (
                          <Select.Option value={option}>{option}</Select.Option>
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
                          <Select.Option value={organizer}>
                            {organizer}
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
                        {trainigFormats.map((trainingFormat) => (
                          <Select.Option value={trainingFormat}>
                            {trainingFormat}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item name="site" label="Ссылка на сайт:">
                      <Input />
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
        </Card>
      </section>
    </>
  );
};

export default TrainingCreate;
