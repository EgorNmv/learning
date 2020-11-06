import React from "react";
import { Card, Form, Input, Select, Button } from "antd";
import { CenteredText } from "../../../../hoc/CenteredText/CenteredText";
import { Store } from "antd/lib/form/interface";
import { graphql, useMutation } from "react-relay/hooks";
import { OrganizersCreateMutation } from "./__generated__/OrganizersCreateMutation.graphql";
import { useHistory } from "react-router-dom";
import { AlertContext } from "../../../../hoc/Alert/AlertContext";
import { Breadcrumbs } from "../../../../components/Breadcrumbs";
import "./organizers-create.css";

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
  const history = useHistory();
  const [form] = Form.useForm();
  const [commit, isInFlight] = useMutation<OrganizersCreateMutation>(mutation);
  const { showAlert } = React.useContext(AlertContext);

  const onFinish = ({ name, address, type, site, contactInfo }: Store) => {
    if (name.trim().length >= 3) {
      commit({
        variables: {
          data: {
            name: name.trim(),
            address: address.trim(),
            type,
            site: site ? site.trim() : null,
            contactInfo: contactInfo ? contactInfo.trim() : null,
          },
        },
        onCompleted(response) {
          showAlert(
            `Организатор ${response.createOrganizer.name} успешно добавлен`
          );
          form.resetFields();
        },
        onError: () => {
          showAlert("При добавлении организатора произошла ошибка", "error");
        },
      });
    } else {
      showAlert(
        `Название организатора "${name.trim()}" содержит менее трёх символов`,
        "error"
      );
      form.resetFields();
    }
  };

  return (
    <section className="organizers-create-page">
      <Breadcrumbs />
      <h2>Создание организатора</h2>
      <Card className="organizers-create-page__card">
        <Form
          layout={"vertical"}
          form={form}
          name="organizers-create"
          onFinish={onFinish}
          className="organizers-form"
        >
          <div>
            <div>
              <Form.Item
                name="name"
                label="Название:"
                rules={[
                  { required: true, message: "Введите название организатора" },
                  {
                    whitespace: true,
                    message:
                      "Название организатора не может состоять только из пробелов",
                  },
                  {
                    pattern: new RegExp("^[a-zA-Zа-яА-Яё0-9!?_.,-=\\s]+$"), //should be ^[a-zA-Zа-яА-Яё/\s]+$
                    message: "Название организатора должно состоять из букв",
                  },
                  {
                    min: 3,
                    message:
                      "Название организатора должно должно состоять минимум из трёх символов",
                  },
                  { max: 255, message: "Слишком длинное название" },
                ]}
              >
                <Input autoFocus disabled={isInFlight} />
              </Form.Item>
            </div>
            <div className="organizers-form__flex">
              <Form.Item
                className="organizers-form__flex-auto"
                name="address"
                label="Адрес:"
                rules={[
                  { required: true },
                  {
                    whitespace: true,
                    message: "Адрес не может состоять только из пробелов",
                  },
                  { max: 255, message: "Слишком длинный адрес" },
                ]}
              >
                <Input disabled={isInFlight} />
              </Form.Item>
              <Form.Item
                className="organizers-form__flex-auto-padding"
                name="type"
                label="Тип:"
                rules={[{ required: true }]}
                style={{ width: "100%", maxWidth: "400px" }}
              >
                <Select disabled={isInFlight}>
                  <Select.Option value={2}>Внутренний ресурс</Select.Option>
                  <Select.Option value={1}>Внешний ресурс</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                className="organizers-form__flex-auto"
                name="site"
                label="Сайт:"
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
                <Input disabled={isInFlight} />
              </Form.Item>
            </div>
            <Form.Item
              name="contactInfo"
              label="Контактная информация:"
              rules={[{ max: 255, message: "Слишком длинное значение поля" }]}
            >
              <Input />
            </Form.Item>
          </div>
          <CenteredText>
            <Form.Item shouldUpdate={true}>
              {() => (
                <>
                  <Button
                    className="organizers-form__cancel-btn"
                    htmlType="button"
                    onClick={() => history.goBack()}
                  >
                    Отмена
                  </Button>
                  <Button
                    className="organizers-form__create-btn"
                    type="primary"
                    htmlType="submit"
                    loading={isInFlight}
                    disabled={
                      !form.isFieldTouched("name") ||
                      !form.isFieldTouched("address") ||
                      !form.isFieldTouched("type") ||
                      form
                        .getFieldsError()
                        .filter(({ errors }) => errors.length).length > 0
                    }
                  >
                    Создать
                  </Button>
                </>
              )}
            </Form.Item>
          </CenteredText>
        </Form>
      </Card>
    </section>
  );
};

export default CategoriesCreate;
