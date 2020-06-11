import React from "react";
import { Card, Form, Input, Select, Button, Spin } from "antd";
import { CenteredText } from "../../../../hoc/CenteredText/CenteredText";
import { Store } from "antd/lib/form/interface";
import { graphql, useMutation } from "react-relay/hooks";
import { OrganizersCreateMutation } from "./__generated__/OrganizersCreateMutation.graphql";

const mutation = graphql`
  mutation OrganizersCreateMutation($data: InputOrganizer!) {
    createOrganizer(data: $data) {
      organizerId: id
      name
      address
      site
      type
    }
  }
`;

const CategoriesCreate: React.FC = () => {
  const [form] = Form.useForm();
  const [commit, isInFlight] = useMutation<OrganizersCreateMutation>(mutation);
  const onFinish = ({ name, address, type, site }: Store) => {
    commit({
      variables: { data: { name, address, type, site } },
      onCompleted(response) {
        console.log(response);
      },
    });
  };

  return (
    <section>
      <Card loading={isInFlight}>
        <Form
          layout={"vertical"}
          form={form}
          name="training-create"
          onFinish={onFinish}
          onChange={() => console.info(form)}
        >
          <div>
            <div>
              <Form.Item
                name="name"
                label="Название:"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Form.Item
                style={{ flex: "auto" }}
                name="address"
                label="Адрес:"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                style={{ flex: "auto", padding: "0 1rem" }}
                name="type"
                label="Тип:"
                rules={[{ required: true }]}
              >
                <Select>
                  <Select.Option value={2}>Внутренний ресурс</Select.Option>
                  <Select.Option value={1}>Внешний ресурс</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item style={{ flex: "auto" }} name="site" label="Сайт:">
                <Input defaultValue="" />
              </Form.Item>
            </div>
          </div>
          <CenteredText>
            <Form.Item>
              <Button htmlType="button" style={{ marginRight: "1rem" }}>
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
