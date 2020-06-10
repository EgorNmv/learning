import React from "react";
import { Card, Form, Input, Button } from "antd";
import { CenteredText } from "../../../../hoc/CenteredText/CenteredText";
import { Store } from "antd/lib/form/interface";
import { graphql, useMutation, useLazyLoadQuery } from "react-relay/hooks";
import { useParams } from "react-router-dom";
import { TrainingFormatsEditQuery } from "./__generated__/TrainingFormatsEditQuery.graphql";
import { TrainingFormatsEditMutation } from "./__generated__/TrainingFormatsEditMutation.graphql";

const query = graphql`
  query TrainingFormatsEditQuery($trainingFormatId: Float!) {
    format(id: $trainingFormatId) {
      trainingFormatId: id
      description
    }
  }
`;

const mutation = graphql`
  mutation TrainingFormatsEditMutation(
    $trainingFormatId: Float!
    $description: String!
  ) {
    updateFormatById(id: $trainingFormatId, description: $description) {
      trainingFormatId: id
      description
    }
  }
`;

const TrainingFormatsEdit: React.FC = () => {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const { format } = useLazyLoadQuery<TrainingFormatsEditQuery>(query, {
    trainingFormatId: id,
  });
  const [commit, isInFlight] = useMutation<TrainingFormatsEditMutation>(
    mutation
  );
  const [form] = Form.useForm();
  const onFinish = ({ name }: Store) => {
    commit({
      variables: { trainingFormatId: id, description: name },
      onCompleted(response) {
        console.log(response);
      },
    });
  };

  React.useEffect(
    () =>
      form.setFieldsValue({
        name: format?.description,
      }),
    [format]
  );

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
              <Button htmlType="button" style={{ marginRight: "1rem" }}>
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

export default TrainingFormatsEdit;
