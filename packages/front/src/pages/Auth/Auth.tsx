import React from "react";
import { CenteredText } from "../../hoc/CenteredText/CenteredText";
import { Card, Form, Input, Button, Spin } from "antd";
import { useHistory } from "react-router-dom";
import "./Auth.css";
import "@okta/okta-signin-widget/dist/css/okta-sign-in.min.css";
import { useOktaAuth } from "@okta/okta-react";
import { Store } from "antd/lib/form/interface";
import OktaAuth from "@okta/okta-auth-js";

const Auth: React.FC = () => {
  const history = useHistory();
  const {
    authService,
    authState: { isAuthenticated },
  } = useOktaAuth();
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSubmit = ({ login, password }: Store) => {
    setLoading(true);
    const oktaAuth = new OktaAuth({
      issuer: process.env.REACT_APP_ISSUER,
    });
    oktaAuth
      .signIn({ username: login, password })
      .then((res: any) => {
        const sessionToken = res.sessionToken;
        authService.redirect({ sessionToken });
      })
      .catch((err: Error) => {
        setLoading(false);
        console.log("Found an error", err);
      });
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, []);

  return (
    <section>
      <CenteredText className="auth-page-main-form">
        <Card>
          {loading ? <Spin /> : <h1>Авторизоваться</h1>}
          <Form name="auth-form" layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Ваш логин:"
              name="login"
              rules={[{ required: true, message: "Введите ваш логин" }]}
            >
              <Input disabled={loading} />
            </Form.Item>

            <Form.Item
              label="Ваш пароль:"
              name="password"
              rules={[{ required: true, message: "Введите пароль" }]}
            >
              <Input.Password disabled={loading} />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                disabled={loading}
              >
                Войти
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </CenteredText>
    </section>
  );
};

export default Auth;
