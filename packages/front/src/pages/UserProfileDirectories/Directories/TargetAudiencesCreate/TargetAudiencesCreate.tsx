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
    commit({
      variables: { description: name },
      onCompleted(response) {
        showAlert("Целевая аудитория успешно создана");
      },
      onError: () => {
        showAlert("При создании целевой аудитории произошла ошибка", "error");
      },
    });
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
          <Form.Item name="name" label="Название:" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <CenteredText>
            <Form.Item>
              <Button
                htmlType="button"
                onClick={() => history.goBack()}
                style={{ marginRight: "1rem" }}
              >
                Отмена
              </Button>
              <Button type="primary" htmlType="submit" disabled={isInFlight}>
                Создать
              </Button>
            </Form.Item>
          </CenteredText>
        </Form>
      </Card>
    </section>
  );
};

export default TargetAudiencesCreate;
