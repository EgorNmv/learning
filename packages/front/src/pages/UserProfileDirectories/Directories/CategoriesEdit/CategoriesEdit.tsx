import React, { useState } from "react";
import { Card, Form, Input, Button } from "antd";
import { CenteredText } from "../../../../hoc/CenteredText/CenteredText";
import { Store } from "antd/lib/form/interface";
import { graphql, useMutation, useLazyLoadQuery } from "react-relay/hooks";
import {
  CategoriesEditQuery,
  CategoriesEditQueryResponse,
} from "./__generated__/CategoriesEditQuery.graphql";
import { useParams, useHistory } from "react-router-dom";
import { CategoriesEditMutation } from "./__generated__/CategoriesEditMutation.graphql";
import { UploadedPicture } from "../../../../components/UploadedPicture/UploadedPicture";
import { useFileUpload } from "../../../../utils/utils";
import { AlertContext } from "../../../../hoc/Alert/AlertContext";

const query = graphql`
  query CategoriesEditQuery($categoryId: Float!) {
    category(id: $categoryId) {
      categoryId: id
      description
      label
    }
  }
`;

const mutation = graphql`
  mutation CategoriesEditMutation(
    $categoryId: Float!
    $description: String!
    $label: String
  ) {
    updateCategoryById(
      id: $categoryId
      description: $description
      label: $label
    ) {
      categoryId: id
      description
      label
    }
  }
`;

const CategoriesCreate: React.FC = () => {
  const id = Number(useParams<{ id: string }>().id);
  const history = useHistory();
  const { category }: CategoriesEditQueryResponse = useLazyLoadQuery<
    CategoriesEditQuery
  >(query, { categoryId: id });
  const [commit, isInFlight] = useMutation<CategoriesEditMutation>(mutation);
  const [form] = Form.useForm();
  const [isLoadingFile, sendFile] = useFileUpload<{ filename: string }>();
  const [fileResponse, setFileResponse] = useState<{ filename: string }>();
  const { showAlert } = React.useContext(AlertContext);

  const onFinish = ({ name, photo }: Store) => {
    if (name.trim().length >= 3) {
      commit({
        variables: {
          categoryId: id,
          description: name.trim(),
          label: fileResponse?.filename,
        },
        onCompleted() {
          showAlert("Категория успешно обновлена");
          history.goBack();
        },
        onError: () => {
          showAlert("При обновлении категории произошла ошибка", "error");
        },
      });
    } else {
      showAlert(
        `Название категории "${name.trim()}" содержит менее трёх символов`,
        "error"
      );
      form.resetFields();
    }
  };

  const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    let file: File;

    if (event.target.files) {
      file = event.target.files[0];
      setFileResponse(await sendFile(file, "category"));
    }
  };

  React.useEffect(
    () =>
      form.setFieldsValue({
        name: category?.description,
      }),
    [category]
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ flex: 1 }}>
              <Form.Item
                name="name"
                label="Название:"
                rules={[
                  { required: true, message: "Введите название категории" },
                  {
                    whitespace: true,
                    message:
                      "Название категории не может состоять только из пробелов",
                  },
                  {
                    pattern: new RegExp("^[a-zA-Zа-яА-Яё\\s]+$"), //should be ^[a-zA-Zа-яА-Яё/\s]+$
                    message: "Название категории должно состоять из букв",
                  },
                  {
                    min: 3,
                    message:
                      "Название категории должно должно состоять минимум из трёх символов",
                  },
                ]}
              >
                <Input autoFocus disabled={isInFlight} />
              </Form.Item>
            </div>
            <div style={{ padding: "0 1rem" }}>
              <Form.Item
                name="photo"
                label="Загрузите фотографию:"
                valuePropName="fileList"
              >
                {category?.label ? (
                  <UploadedPicture
                    style={{
                      width: "100%",
                      height: "100%",
                      maxHeight: "20rem",
                      maxWidth: "20rem",
                    }}
                    imgType="category"
                    filename={fileResponse?.filename || category.label}
                  />
                ) : (
                  <div
                    style={{
                      width: 300,
                      height: 300,
                      background: "grey",
                      marginBottom: "2.8rem",
                    }}
                  />
                )}
                <input
                  disabled={isLoadingFile}
                  type="file"
                  id="file"
                  onChange={uploadFile}
                />
              </Form.Item>
            </div>
          </div>
          <CenteredText>
            <Form.Item shouldUpdate={true}>
              {() => (
                <>
                  <Button
                    htmlType="button"
                    style={{ marginRight: "1rem" }}
                    onClick={() => history.goBack()}
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

export default CategoriesCreate;
