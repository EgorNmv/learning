import React from "react";
import { Card, Form, Input, Button } from "antd";
import { CenteredText } from "../../../../hoc/CenteredText/CenteredText";
import { Store } from "antd/lib/form/interface";
import { graphql, useMutation } from "react-relay/hooks";
import { TrainingFormatsCreateMutation } from "./__generated__/TrainingFormatsCreateMutation.graphql";
import { useHistory } from "react-router-dom";
import { AlertContext } from "../../../../hoc/Alert/AlertContext";
import { Breadcrumbs } from "../../../../components/Breadcrumbs/Breadcrumbs";
import "./training-formats-create.css";

const mutation = graphql`
  mutation TrainingFormatsCreateMutation($description: String!) {
    createFormat(description: $description) {
      trainingFormatId: id
      description
    }
  }
`;

const TrainingFormatsCreate: React.FC = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [commit, isInFlight] = useMutation<TrainingFormatsCreateMutation>(
    mutation
  );
  const { showAlert } = React.useContext(AlertContext);

  const onFinish = ({ name }: Store) => {
    if (name.trim().length >= 3) {
      commit({
        variables: { description: name.trim() },
        onCompleted(response) {
          showAlert(
            `Формат обучения ${response.createFormat.description} успешно создан`
          );
          form.resetFields();
        },
        onError: () => {
          showAlert("При создании формата обучения произошла ошибка", "error");
        },
      });
    } else {
      showAlert(
        `Название формата обучения "${name.trim()}" содержит менее трёх символов`,
        "error"
      );
      form.resetFields();
    }
  };

  return (
    <section className="training-format-create-page">
      <Breadcrumbs />
      <h2>Создание формата обучения</h2>
      <Card className="training-format-create-page__card">
        <Form
          layout={"vertical"}
          form={form}
          name="training-format-create"
          onFinish={onFinish}
          className="training-format-form"
        >
          <Form.Item
            name="name"
            label="Название:"
            rules={[
              { required: true, message: "Введите название формата обучения" },
              {
                whitespace: true,
                message:
                  "Название формата обучения не может состоять только из пробелов",
              },
              {
                pattern: new RegExp("^[a-zA-Zа-яА-Яё0-9!?_.,-=\\s]+$"), //should be ^[a-zA-Zа-яА-Яё/\s]+$
                message: "Название формата обучения должно состоять из букв",
              },
              {
                min: 3,
                message:
                  "Название формата обучения должно должно состоять минимум из трёх символов",
              },
              { max: 255, message: "Слишком длинное название" },
            ]}
          >
            <Input autoFocus disabled={isInFlight} />
          </Form.Item>
          <CenteredText>
            <Form.Item shouldUpdate={true}>
              {() => (
                <>
                  <Button
                    htmlType="button"
                    onClick={() => history.goBack()}
                    className="training-format-form__cancel-btn"
                  >
                    Отмена
                  </Button>
                  <Button
                    className="training-format-form__create-btn"
                    type="primary"
                    htmlType="submit"
                    loading={isInFlight}
                    disabled={
                      !form.isFieldTouched("name") ||
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

export default TrainingFormatsCreate;
