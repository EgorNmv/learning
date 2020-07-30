import React from "react";
import { Card, Form, Input, Button } from "antd";
import { CenteredText } from "../../../../hoc/CenteredText/CenteredText";
import { Store } from "antd/lib/form/interface";
import { graphql, useMutation } from "react-relay/hooks";
import { useHistory } from "react-router-dom";
import { TargetAudiencesCreateMutation } from "./__generated__/TargetAudiencesCreateMutation.graphql";
import { AlertContext } from "../../../../hoc/Alert/AlertContext";

const mutation = graphql`
  mutation TargetAudiencesCreateMutation($description: String!) {
    createTargetAudience(description: $description) {
      targetAudienceId: id
      description
    }
  }
`;

const TargetAudiencesCreate: React.FC = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [commit, isInFlight] = useMutation<TargetAudiencesCreateMutation>(
    mutation
  );
  const { showAlert } = React.useContext(AlertContext);

  const onFinish = ({ name }: Store) => {
    if (name.trim().length >= 3) {
      commit({
        variables: { description: name.trim() },
        onCompleted(response) {
          showAlert(
            `Целевая аудитория ${response.createTargetAudience.description} успешно создана`
          );
          form.resetFields();
        },
        onError: () => {
          showAlert("При создании целевой аудитории произошла ошибка", "error");
        },
      });
    } else {
      showAlert(
        `Название целевой аудитории "${name.trim()}" содержит менее трёх символов`,
        "error"
      );
      form.resetFields();
    }
  };

  return (
    <section>
      <Card>
        <Form
          layout={"vertical"}
          form={form}
          name="training-create"
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            label="Название:"
            rules={[
              { required: true, message: "Введите название целевой аудитории" },
              {
                whitespace: true,
                message:
                  "Название целевой аудитории не может состоять только из пробелов",
              },
              {
                pattern: new RegExp("^[a-zA-Zа-яА-Яё0-9!?_.,-=\\s]+$"), //should be ^[a-zA-Zа-яА-Яё/\s]+$
                message: "Название целевой аудитории должно состоять из букв",
              },
              {
                min: 3,
                message:
                  "Название целевой аудитории должно должно состоять минимум из трёх символов",
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
                    style={{ marginRight: "1rem" }}
                  >
                    Отмена
                  </Button>
                  <Button
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

export default TargetAudiencesCreate;
