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
  const [response, setResponse] = React.useState<any>();
  const [countOfTry, setCountOfTry] = React.useState<number>(0);

  const handleSubmit = ({ login, password }: Store) => {
    setLoading(true);
    const oktaAuth = new OktaAuth({
      issuer: process.env.REACT_APP_ISSUER,
    });
    oktaAuth
      .signIn({ username: login, password })
      .then((res: any) => {
        setResponse(res);
        const sessionToken = res.sessionToken;
        setCountOfTry((prev) => prev + 1);
        authService.redirect({ sessionToken });
      })
      .catch((err: Error) => {
        setResponse(err);
        setCountOfTry((prev) => prev + 1);
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
            {response && response.message && (
              <div className="auth-error-box">
                <p>
                  {response.message}
                  <br />
                  {countOfTry > 4
                    ? "Пожалуйста, обратитесть к администратору"
                    : "Попробуйте снова"}
                </p>
              </div>
            )}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                disabled={loading || countOfTry > 4}
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
