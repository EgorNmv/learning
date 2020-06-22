import React, { useState } from "react";
import { Card, Form, Input, Upload, Button, Spin } from "antd";
import { CenteredText } from "../../../../hoc/CenteredText/CenteredText";
import { PictureFilled } from "@ant-design/icons";
import { Store } from "antd/lib/form/interface";
import { graphql, useMutation } from "react-relay/hooks";
import {
  CategoriesCreateMutation,
  CategoriesCreateMutationResponse,
} from "./__generated__/CategoriesCreateMutation.graphql";
import { useFileUpload } from "../../../../utils/utils";
import { UploadedPicture } from "../../../../components/UploadedPicture/UploadedPicture";

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
  const [commit, isInFlight] = useMutation<CategoriesCreateMutation>(mutation);
  const [isLoadingFile, sendFile] = useFileUpload<{ filename: string }>();
  const [fileResponse, setFileResponse] = useState<{ filename: string }>();

  const onFinish = ({ name }: Store) => {
    commit({
      variables: { description: name, label: fileResponse?.filename },
      onCompleted(response: CategoriesCreateMutationResponse) {
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

  const onReset = () => {
    form.resetFields();
  };

  if (isInFlight) {
    return <Spin />;
  }

  return (
    <section>
      <Card>
        <Form
          layout={"vertical"}
          form={form}
          name="training-create"
          onFinish={onFinish}
          onChange={() => console.info(form)}
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
                {fileResponse?.filename
                  ? <UploadedPicture
                    style={{
                      width: "100%",
                      height: "100%",
                      maxHeight: "20rem",
                      maxWidth: "20rem"
                    }}
                    filename={fileResponse.filename}
                    imgType="category"
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
              <Button
                htmlType="button"
                onClick={onReset}
                style={{ marginRight: "1rem" }}
              >
                Отмена
              </Button>
              <Button type="primary" htmlType="submit">
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
