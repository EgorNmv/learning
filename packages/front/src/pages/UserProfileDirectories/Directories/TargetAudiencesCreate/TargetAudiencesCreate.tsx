import React from "react";
import { Card, Form, Input, Select, Upload, Button, Spin } from "antd";
import { CenteredText } from "../../../../hoc/CenteredText/CenteredText";
import { PictureFilled } from "@ant-design/icons";
import { Store } from "antd/lib/form/interface";
import { graphql, useMutation } from "react-relay/hooks";
import { useLocation } from "react-router-dom";
import {
  TargetAudiencesCreateMutation,
  TargetAudiencesCreateMutationResponse,
} from "./__generated__/TargetAudiencesCreateMutation.graphql";

const mutation = graphql`
  mutation TargetAudiencesCreateMutation($description: String!) {
    createTargetAudience(description: $description) {
      targetAudienceId: id
      description
    }
  }
`;

const TargetAudiencesCreate: React.FC = () => {
  const [form] = Form.useForm();
  const [commit, isInFlight] = useMutation<TargetAudiencesCreateMutation>(
    mutation
  );
  const onFinish = ({ name }: Store) => {
    commit({
      variables: { description: name },
      onCompleted(response: TargetAudiencesCreateMutationResponse) {
        console.log(response);
      },
    });
  };

  const onReset = () => {
    form.resetFields();
  };

  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onFill = () => {
    form.setFieldsValue({
      note: "Hello world!",
      gender: "male",
    });
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
        >
          <Form.Item name="name" label="Название:" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
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

export default TargetAudiencesCreate;
