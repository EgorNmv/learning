import React from "react";
import { Card, Form, Input, Button } from "antd";
import { CenteredText } from "../../../../hoc/CenteredText/CenteredText";
import { Store } from "antd/lib/form/interface";
import { graphql, useMutation, useLazyLoadQuery } from "react-relay/hooks";
import { useParams, useHistory } from "react-router-dom";
import {
  TargetAudiencesEditQueryResponse,
  TargetAudiencesEditQuery,
} from "./__generated__/TargetAudiencesEditQuery.graphql";
import { TargetAudiencesEditMutation } from "./__generated__/TargetAudiencesEditMutation.graphql";
import { AlertContext } from "../../../../hoc/Alert/AlertContext";

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
  const history = useHistory();
  const id = Number(useParams<{ id: string }>().id);
  const { targetAudience }: TargetAudiencesEditQueryResponse = useLazyLoadQuery<
    TargetAudiencesEditQuery
  >(query, { targetAudienceId: id });
  const [commit, isInFlight] = useMutation<TargetAudiencesEditMutation>(
    mutation
  );
  const [form] = Form.useForm();
  const { showAlert } = React.useContext(AlertContext);

  const onFinish = ({ name }: Store) => {
    commit({
      variables: { targetAudienceId: id, description: name },
      onCompleted(response) {
        showAlert("Целевая аудитория успешно обновлена");
        history.goBack();
      },
      onError: () => {
        showAlert("При обновлении целевой аудитории произошла ошибка", "error");
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
            <Input autoFocus />
          </Form.Item>
          <CenteredText>
            <Form.Item>
              <Button
                htmlType="button"
                style={{ marginRight: "1rem" }}
                onClick={() => history.goBack()}
              >
                Отмена
              </Button>
              <Button type="primary" htmlType="submit" disabled={isInFlight}>
                Обновить
              </Button>
            </Form.Item>
          </CenteredText>
        </Form>
      </Card>
    </section>
  );
};

export default TargetAudiencesEdit;
