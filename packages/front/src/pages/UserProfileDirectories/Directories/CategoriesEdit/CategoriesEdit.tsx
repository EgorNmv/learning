import React, { useState } from "react";
import { Card, Form, Input, Button, Upload } from "antd";
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
import { Breadcrumbs } from "../../../../components/Breadcrumbs";
import "./categories-edit.css";
import PhotoSvg from "../../../../static/img/photograph.svg";
import { UploadChangeParam, UploadFile } from "antd/es/upload/interface";
import { useOktaAuth } from "@okta/okta-react";
import { LoadingOutlined } from "@ant-design/icons";

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
  const [fileResponse, setFileResponse] = useState<string | null>(null);
  const { showAlert } = React.useContext(AlertContext);
  const { authState } = useOktaAuth();
  const [isFileLoading, setIsFileLoading] = React.useState<boolean>(false);

  const onFinish = ({ name, photo }: Store) => {
    if (name.trim().length >= 3) {
      commit({
        variables: {
          categoryId: id,
          description: name.trim(),
          label: fileResponse || category?.label,
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

  React.useEffect(
    () =>
      form.setFieldsValue({
        name: category?.description,
      }),
    [category]
  );

  return (
    <section className="categories-edit-page">
      <Breadcrumbs />
      <h2>Редактирование категории</h2>
      <Card className="categories-edit-page__card">
        <Form
          layout={"vertical"}
          form={form}
          name="training-edit"
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
                  {fileResponse || category?.label ? (
                    <img
                      className="categories-form__upload-img"
                      src={
                        fileResponse
                          ? `${process.env.REACT_APP_SERVER_HOST_WITH_PORT}/category/${fileResponse}`
                          : `${process.env.REACT_APP_SERVER_HOST_WITH_PORT}/category/${category?.label}`
                      }
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
                    style={{ marginRight: "1rem" }}
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
