import React, { useState } from "react";
import { Card, Form, Input, Select, Upload, Button, Spin } from "antd";
import { CenteredText } from "../../../../hoc/CenteredText/CenteredText";
import { PictureFilled } from "@ant-design/icons";
import { Store } from "antd/lib/form/interface";
import { graphql, useMutation, useLazyLoadQuery } from "react-relay/hooks";
import {
  CategoriesEditQuery,
  CategoriesEditQueryResponse,
} from "./__generated__/CategoriesEditQuery.graphql";
import { useParams } from "react-router-dom";
import {
  CategoriesEditMutation,
  CategoriesEditMutationResponse,
} from "./__generated__/CategoriesEditMutation.graphql";
import { UploadedPicture } from "../../../../components/UploadedPicture/UploadedPicture";
import { useFileUpload } from "../../../../utils/utils";

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
  mutation CategoriesEditMutation($categoryId: Float!, $description: String!, $label: String) {
    updateCategoryById(id: $categoryId, description: $description, label: $label) {
      categoryId: id
      description
      label
    }
  }
`;

const CategoriesCreate: React.FC = () => {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const { category }: CategoriesEditQueryResponse = useLazyLoadQuery<
    CategoriesEditQuery
  >(query, { categoryId: id });
  const [commit, isInFlight] = useMutation<CategoriesEditMutation>(mutation);
  const [form] = Form.useForm();
  const [isLoadingFile, sendFile] = useFileUpload<{ filename: string }>();
  const [fileResponse, setFileResponse] = useState<{ filename: string }>();

  const onFinish = ({ name, photo }: Store) => {
    commit({
      variables: { categoryId: id, description: name, label: fileResponse?.filename },
      onCompleted(response: CategoriesEditMutationResponse) {
        console.log(response);
      },
    });
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
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div style={{ padding: "0 1rem" }}>
              <Form.Item
                name="photo"
                label="Загрузите фотографию:"
                valuePropName="fileList"
              >
                {category?.label
                  ? <UploadedPicture
                    style={{
                      width: "100%",
                      height: "100%",
                      maxHeight: "20rem",
                      maxWidth: "20rem"
                    }}
                    imgType="category"
                    filename={category.label}
                  />
                  : <div
                    style={{
                      width: 300,
                      height: 300,
                      background: "grey",
                      marginBottom: "2.8rem",
                    }}
                  />}
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

export default CategoriesCreate;
