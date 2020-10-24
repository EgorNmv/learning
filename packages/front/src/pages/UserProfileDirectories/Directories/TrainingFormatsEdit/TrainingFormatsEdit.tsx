import React from "react";
import { Card, Form, Input, Button } from "antd";
import { CenteredText } from "../../../../hoc/CenteredText/CenteredText";
import { Store } from "antd/lib/form/interface";
import { graphql, useMutation, useLazyLoadQuery } from "react-relay/hooks";
import { useParams, useHistory } from "react-router-dom";
import { TrainingFormatsEditQuery } from "./__generated__/TrainingFormatsEditQuery.graphql";
import { TrainingFormatsEditMutation } from "./__generated__/TrainingFormatsEditMutation.graphql";
import { AlertContext } from "../../../../hoc/Alert/AlertContext";
import { Breadcrumbs } from "../../../../components/Breadcrumbs";
import "./training-formats-edit.css";

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
  const history = useHistory();
  const id = Number(useParams<{ id: string }>().id);
  const [form] = Form.useForm();
  const { format } = useLazyLoadQuery<TrainingFormatsEditQuery>(query, {
    trainingFormatId: id,
  });
  const [commit, isInFlight] = useMutation<TrainingFormatsEditMutation>(
    mutation
  );
  const { showAlert } = React.useContext(AlertContext);

  const onFinish = ({ name }: Store) => {
    if (name.trim().length >= 3) {
      commit({
        variables: { trainingFormatId: id, description: name.trim() },
        onCompleted(response) {
          showAlert("Формат обучния успешно обновлён");
          history.goBack();
        },
        onError: () => {
          showAlert(
            "При обновлении формата обучения произошла ошибка",
            "error"
          );
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

  React.useEffect(
    () =>
      form.setFieldsValue({
        name: format?.description,
      }),
    [format]
  );

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
                    className="training-format-form__cancel-btn"
                    onClick={() => history.goBack()}
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

export default TrainingFormatsEdit;
