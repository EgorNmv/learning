import React from "react";
import { Card, Form, Input, Select, Upload, Button, Spin } from "antd";
import { CenteredText } from "../../../../hoc/CenteredText/CenteredText";
import { PictureFilled } from "@ant-design/icons";
import { Store } from "antd/lib/form/interface";
import { graphql, useMutation } from "react-relay/hooks";
import {
  CategoriesCreateMutation,
  CategoriesCreateMutationResponse,
} from "./__generated__/CategoriesCreateMutation.graphql";

const mutation = graphql`
  mutation CategoriesCreateMutation($description: String!) {
    createCategory(description: $description) {
      categoryId: id
      description
    }
  }
`;

const CategoriesCreate: React.FC = () => {
  const [form] = Form.useForm();
  const [commit, isInFlight] = useMutation<CategoriesCreateMutation>(mutation);

  const onFinish = (values: Store) => {
    console.log(values);
    commit({
      variables: { description: form.getFieldValue("name") },
      onCompleted(category: CategoriesCreateMutationResponse) {
        console.log(category);
      },
    });
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

  if (isInFlight) {
    return <Spin />;
  }

  return (
    <section>
      <Card>
        <Form
          layout={"vertical"}
          form={form}
          name="training-create"
          onFinish={onFinish}
          onChange={() => console.info(form)}
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
                Создать
              </Button>
            </Form.Item>
          </CenteredText>
        </Form>
      </Card>
    </section>
  );
};

export default CategoriesCreate;
