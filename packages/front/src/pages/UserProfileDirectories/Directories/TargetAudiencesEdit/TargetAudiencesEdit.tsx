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
import { Breadcrumbs } from "../../../../components/Breadcrumbs";
import "./target-audiences-edit.css";

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
    if (name.trim().length >= 3) {
      commit({
        variables: { targetAudienceId: id, description: name.trim() },
        onCompleted(response) {
          showAlert("Целевая аудитория успешно обновлена");
          history.goBack();
        },
        onError: () => {
          showAlert(
            "При обновлении целевой аудитории произошла ошибка",
            "error"
          );
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

  React.useEffect(
    () =>
      form.setFieldsValue({
        name: targetAudience?.description,
      }),
    [targetAudience]
  );

  return (
    <section className="target-audience-create-page">
      <Breadcrumbs />
      <h2>Редактирование целевой аудитории</h2>
      <Card className="target-audience-create-page__card">
        <Form
          layout={"vertical"}
          form={form}
          name="target-audience-create"
          onFinish={onFinish}
          className="target-audience-form"
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
                    className="target-audience-form__cancel-btn"
                  >
                    Отмена
                  </Button>
                  <Button
                    className="target-audience-form__create-btn"
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
                    Обновить
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

export default TargetAudiencesEdit;
