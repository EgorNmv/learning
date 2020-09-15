import React, { useState } from "react";
import { Card, Form, Input, Upload, Button, Spin } from "antd";
import { CenteredText } from "../../../../hoc/CenteredText/CenteredText";
import { Store } from "antd/lib/form/interface";
import { graphql, useMutation } from "react-relay/hooks";
import { CategoriesCreateMutation } from "./__generated__/CategoriesCreateMutation.graphql";
import { useHistory } from "react-router-dom";
import { AlertContext } from "../../../../hoc/Alert/AlertContext";
import { Breadcrumbs } from "../../../../components/Breadcrumbs/Breadcrumbs";
import "./categories-create.css";
import PhotoSvg from "../../../../static/img/photograph.svg";
import { UploadChangeParam, UploadFile } from "antd/es/upload/interface";
import { useOktaAuth } from "@okta/okta-react";
import { LoadingOutlined } from "@ant-design/icons";

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
  const [fileResponse, setFileResponse] = useState<string | null>(null);
  const { showAlert } = React.useContext(AlertContext);
  const [isFileLoading, setIsFileLoading] = React.useState<boolean>(false);
  const { authState } = useOktaAuth();

  const onFinish = ({ name }: Store) => {
    if (name.trim().length >= 3) {
      commit({
        variables: { description: name.trim(), label: fileResponse },
        onCompleted: (response) => {
          showAlert(
            `Категория ${response.createCategory.description} успешно добавлена`
          );
          form.resetFields();
          setFileResponse(null);
          history.goBack();
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

  return (
    <section className="categories-create-page">
      <Breadcrumbs />
      <h2>Создание категории</h2>
      <Card className="categories-create-page__card">
        <Form
          layout={"vertical"}
          form={form}
          name="categories-create"
          onFinish={onFinish}
          className="categories-form"
        >
          <div className="categories-form__main-part">
            <div className="categories-form__main-part__flex">
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
            <div className="categories-form__main-part__photo">
              <Form.Item name="photo" label="Загрузите фотографию:">
                <Upload
                  className="categories-form__upload"
                  id="file"
                  name="file"
                  data={{ type: 2 }}
                  listType="picture-card"
                  showUploadList={false}
                  onChange={(
                    info: UploadChangeParam<
                      UploadFile<{ filename: string; originName: string }>
                    >
                  ): void => {
                    if (info.file.status === "uploading") {
                      setIsFileLoading(true);
                      setFileResponse(null);
                      return;
                    }
                    if (info.file.status === "done" && info.file.response) {
                      setIsFileLoading(false);
                      setFileResponse(info.file.response?.filename);
                    }
                  }}
                  action={`${process.env.REACT_APP_SERVER_HOST_WITH_PORT}/file/upload`}
                  headers={{
                    Accept: "application/json",
                    Authorization: `Bearer ${authState.accessToken}`,
                  }}
                >
                  {fileResponse ? (
                    <img
                      className="categories-form__upload-img"
                      src={`${process.env.REACT_APP_SERVER_HOST_WITH_PORT}/category/${fileResponse}`}
                      alt="Изображение события"
                    />
                  ) : (
                    <div>
                      {isFileLoading ? (
                        <LoadingOutlined />
                      ) : (
                        <img
                          className="categories-form__upload-img"
                          src={PhotoSvg}
                          alt="Изображение"
                        />
                      )}
                    </div>
                  )}
                </Upload>
              </Form.Item>
            </div>
          </div>
          <CenteredText>
            <Form.Item shouldUpdate={true}>
              {() => (
                <>
                  <Button
                    className="categories-form__cancel-btn"
                    htmlType="button"
                    onClick={() => history.goBack()}
                  >
                    Отмена
                  </Button>
                  <Button
                    className="categories-form__create-btn"
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
