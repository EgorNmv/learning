import React from "react";
import { Card, Form, Input, Select, Button } from "antd";
import { CenteredText } from "../../../../hoc/CenteredText/CenteredText";
import { Store } from "antd/lib/form/interface";
import { graphql, useMutation, useLazyLoadQuery } from "react-relay/hooks";
import { useParams, useHistory } from "react-router-dom";
import { OrganizersEditQuery } from "./__generated__/OrganizersEditQuery.graphql";
import { OrganizersEditMutation } from "./__generated__/OrganizersEditMutation.graphql";
import { AlertContext } from "../../../../hoc/Alert/AlertContext";

const query = graphql`
  query OrganizersEditQuery($organizerId: Float!) {
    organizer(id: $organizerId) {
      organizerId: id
      name
      address
      site
      type
    }
  }
`;

const mutation = graphql`
  mutation OrganizersEditMutation(
    $organizerId: Float!
    $data: InputOrganizer!
  ) {
    updateOrganizerById(id: $organizerId, data: $data) {
      organizerId: id
      name
      address
      site
      type
    }
  }
`;

const OrganizersEdit: React.FC = () => {
  const history = useHistory();
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const { organizer } = useLazyLoadQuery<OrganizersEditQuery>(query, {
    organizerId: id,
  });
  const [commit, isInFlight] = useMutation<OrganizersEditMutation>(mutation);
  const [form] = Form.useForm();
  const { showAlert } = React.useContext(AlertContext);

  const onFinish = ({ name, address, type, site }: Store) => {
    commit({
      variables: { organizerId: id, data: { name, address, type, site } },
      onCompleted(response) {
        showAlert("Организатор успешно обновлен");
        history.goBack();
      },
      onError: () => {
        showAlert("При обновлении орагнизатора произошла ошибка", "error");
      },
    });
  };

  React.useEffect(
    () =>
      form.setFieldsValue({
        name: organizer?.name,
        address: organizer?.address,
        type: organizer?.type,
        site: organizer?.site,
      }),
    [organizer]
  );

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
                <Input autoFocus />
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
              <Button
                htmlType="button"
                style={{ marginRight: "1rem" }}
                onClick={() => history.goBack()}
              >
                Отмена
              </Button>
              <Button type="primary" htmlType="submit">
                Обновить
              </Button>
            </Form.Item>
          </CenteredText>
        </Form>
      </Card>
    </section>
  );
};

export default OrganizersEdit;
