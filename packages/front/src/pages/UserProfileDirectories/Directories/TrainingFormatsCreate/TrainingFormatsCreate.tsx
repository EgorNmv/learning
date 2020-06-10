import React from "react";
import { Card, Form, Input, Button, Spin } from "antd";
import { CenteredText } from "../../../../hoc/CenteredText/CenteredText";
import { Store } from "antd/lib/form/interface";
import { graphql, useMutation } from "react-relay/hooks";
import {
  TrainingFormatsCreateMutation,
  TrainingFormatsCreateMutationResponse,
} from "./__generated__/TrainingFormatsCreateMutation.graphql";

const mutation = graphql`
  mutation TrainingFormatsCreateMutation($description: String!) {
    createFormat(description: $description) {
      trainingFormatId: id
      description
    }
  }
`;

const TrainingFormatsCreate: React.FC = () => {
  const [form] = Form.useForm();
  const [commit, isInFlight] = useMutation<TrainingFormatsCreateMutation>(
    mutation
  );
  const onFinish = ({ name }: Store) => {
    commit({
      variables: { description: name },
      onCompleted(response: TrainingFormatsCreateMutationResponse) {
        console.log(response);
      },
    });
  };

  const onReset = () => {
    form.resetFields();
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
        >
          <Form.Item name="name" label="Название:" rules={[{ required: true }]}>
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
  );
};

export default TrainingFormatsCreate;
