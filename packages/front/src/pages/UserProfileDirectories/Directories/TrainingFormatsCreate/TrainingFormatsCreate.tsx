import React from "react";
import { Card, Form, Input, Button } from "antd";
import { CenteredText } from "../../../../hoc/CenteredText/CenteredText";
import { Store } from "antd/lib/form/interface";
import { graphql, useMutation } from "react-relay/hooks";
import { TrainingFormatsCreateMutation } from "./__generated__/TrainingFormatsCreateMutation.graphql";
import { useHistory } from "react-router-dom";
import { AlertContext } from "../../../../hoc/Alert/AlertContext";

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
    commit({
      variables: { description: name },
      onCompleted(response) {
        showAlert("Формат обучения успешно создан");
      },
      onError: () => {
        showAlert("При создании формата обучения произошла ошибка", "error");
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
            <Input autoFocus />
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

export default TrainingFormatsCreate;
