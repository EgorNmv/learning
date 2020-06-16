import React from "react";
import { Card, Input, Upload, Button, Form } from "antd";
import { CenteredText } from "../../hoc/CenteredText/CenteredText";
import { Store } from "antd/lib/form/interface";
import { PictureFilled } from "@ant-design/icons";

const UserProfileEditing: React.FC = () => {
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

  return (
    <section>
      <span className="user-profile-editing-title">
        <h1>Редактирование профиля</h1>
      </span>
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
                name="fullname"
                label="Полное имя:"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <div style={{ display: "flex" }}>
                <div style={{ flex: 1, marginRight: "1rem" }}>
                  <Form.Item
                    name="newpassword"
                    label="Новый пароль:"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div style={{ flex: 1 }}>
                  <Form.Item
                    name="repeadpassword"
                    label="Повторите пароль:"
                    rules={[{ required: true }]}
                  >
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
                Сохранить
              </Button>
            </Form.Item>
          </CenteredText>
        </Form>
      </Card>
    </section>
  );
};

export default UserProfileEditing;
