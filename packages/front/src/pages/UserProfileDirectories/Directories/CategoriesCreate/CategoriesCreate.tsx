import React, { useState } from "react";
import { Card, Form, Input, Upload, Button, Spin } from "antd";
import { CenteredText } from "../../../../hoc/CenteredText/CenteredText";
import { Store } from "antd/lib/form/interface";
import { graphql, useMutation } from "react-relay/hooks";
import { CategoriesCreateMutation } from "./__generated__/CategoriesCreateMutation.graphql";
import { useFileUpload } from "../../../../utils/utils";
import { UploadedPicture } from "../../../../components/UploadedPicture/UploadedPicture";
import { useHistory } from "react-router-dom";
import { AlertContext } from "../../../../hoc/Alert/AlertContext";

const mutation = graphql`
  mutation CategoriesCreateMutation($description: String!, $label: String) {
    createCategory(description: $description, label: $label) {
      categoryId: id
      description
      label
    }
  }
`;

const CategoriesCreate: React.FC = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [commit, isInFlight] = useMutation<CategoriesCreateMutation>(mutation);
  const [isLoadingFile, sendFile] = useFileUpload<{ filename: string }>();
  const [fileResponse, setFileResponse] = useState<{ filename: string } | null>(
    null
  );
  const { showAlert } = React.useContext(AlertContext);

  const onFinish = ({ name }: Store) => {
    if (name.trim().length >= 3) {
      commit({
        variables: { description: name.trim(), label: fileResponse?.filename },
        onCompleted: (response) => {
          showAlert(
            `Категория ${response.createCategory.description} успешно добавлена`
          );
          form.resetFields();
          setFileResponse(null);
        },
        onError: () => {
          showAlert("При добавлении категории произошла ошибка", "error");
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
                    pattern: new RegExp("^[a-zA-Zа-яА-Яё0-9!?_.,-=\\s]+$"), //should be ^[a-zA-Zа-яА-Яё/\s]+$
                    message: "Неверный формат категории",
                  },
                  {
                    min: 3,
                    message:
                      "Название категории должно должно состоять минимум из трёх символов",
                  },
                  { max: 255, message: "Слишком длинное название" },
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
                {fileResponse?.filename ? (
                  <UploadedPicture
                    style={{
                      width: "100%",
                      height: "100%",
                      maxHeight: "20rem",
                      maxWidth: "20rem",
                    }}
                    filename={fileResponse.filename}
                    imgType="category"
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

export default CategoriesCreate;
