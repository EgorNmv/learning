import React from "react";
import { Card, Form, Input, Button } from "antd";
import { CenteredText } from "../../../../hoc/CenteredText/CenteredText";
import { Store } from "antd/lib/form/interface";
import { graphql, useMutation, useLazyLoadQuery } from "react-relay/hooks";
import { useParams } from "react-router-dom";
import {
  TargetAudiencesEditQueryResponse,
  TargetAudiencesEditQuery,
} from "./__generated__/TargetAudiencesEditQuery.graphql";
import {
  TargetAudiencesEditMutation,
  TargetAudiencesEditMutationResponse,
} from "./__generated__/TargetAudiencesEditMutation.graphql";

const query = graphql`
  query TargetAudiencesEditQuery($targetAudienceId: Float!) {
    targetAudience(id: $targetAudienceId) {
      targetAudienceId: id
      description
    }
  }
`;

const mutation = graphql`
  mutation TargetAudiencesEditMutation(
    $targetAudienceId: Float!
    $description: String!
  ) {
    updateTargetAudienceById(id: $targetAudienceId, description: $description) {
      targetAudienceId: id
      description
    }
  }
`;

const TargetAudiencesEdit: React.FC = () => {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const { targetAudience }: TargetAudiencesEditQueryResponse = useLazyLoadQuery<
    TargetAudiencesEditQuery
  >(query, { targetAudienceId: id });
  const [commit, isInFlight] = useMutation<TargetAudiencesEditMutation>(
    mutation
  );
  const [form] = Form.useForm();
  const onFinish = ({ name }: Store) => {
    commit({
      variables: { targetAudienceId: id, description: name },
      onCompleted(response: TargetAudiencesEditMutationResponse) {
        console.log(response);
      },
    });
  };

  React.useEffect(
    () =>
      form.setFieldsValue({
        name: targetAudience?.description,
      }),
    [targetAudience]
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

export default TargetAudiencesEdit;
