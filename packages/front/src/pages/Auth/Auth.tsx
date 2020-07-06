import React from "react";
import { CenteredText } from "../../hoc/CenteredText/CenteredText";
import { Card, Form, Input, Button, Spin } from "antd";
import { Link, useHistory } from "react-router-dom";
import "./Auth.css";
import OktaSignIn from "@okta/okta-signin-widget";
import "@okta/okta-signin-widget/dist/css/okta-sign-in.min.css";
import { useOktaAuth } from "@okta/okta-react";
import config from "../../oktaConfig";
import { Store } from "antd/lib/form/interface";
import OktaAuth from "@okta/okta-auth-js";

const Auth: React.FC = () => {
  // const history = useHistory();
  // const {
  //   authState: { isAuthenticated },
  // } = useOktaAuth();

  // React.useEffect(() => {
  //   const { pkce, issuer, clientId, redirectUri, scopes } = config;

  //   if (isAuthenticated) {
  //     history.push("/");
  //   } else {
  //     const widget = new OktaSignIn({
  //       /**
  //        * Note: when using the Sign-In Widget for an OIDC flow, it still
  //        * needs to be configured with the base URL for your Okta Org. Here
  //        * we derive it from the given issuer for convenience.
  //        */
  //       baseUrl: issuer ? issuer.split("/oauth2")[0] : "",
  //       clientId,
  //       redirectUri,
  //       logo: "/react.svg",
  //       language: "en",
  //       i18n: {
  //         en: {
  //           "primaryauth.title": "Вход в систему",
  //           "primaryauth.username.placeholder": "Ваш логин",
  //           "primaryauth.username.tooltip": "Логин",
  //           "primaryauth.password.placeholder": "Ваш пароль",
  //           "primaryauth.password.tooltip": "Пароль",
  //           "primaryauth.submit": "Войти",
  //           "primaryauth.newUser.tooltip": "Новый пользователь",
  //           "primaryauth.newUser.tooltip.close": "Закрыть",
  //           needhelp: "Не получатеся зайти?",
  //           forgotpassword: "Забыли пароль?",
  //           help: "Помощь",
  //           remember: "Запомнить меня",
  //         },
  //       },
  //       authParams: {
  //         pkce,
  //         issuer,
  //         display: "page",
  //         scopes,
  //       },
  //     });

  //     widget.renderEl(
  //       { el: "#sign-in-widget" },
  //       () => {
  //         /**
  //          * In this flow, the success handler will not be called beacuse we redirect
  //          * to the Okta org for the authentication workflow.
  //          */
  //       },
  //       (err: Error) => {
  //         throw err;
  //       }
  //     );

  //     return () => widget.remove();
  //   }
  // }, []);

  // return (
  //   <div>
  //     <div id="sign-in-widget" />
  //   </div>
  // );

  const { authService } = useOktaAuth();
  // const [sessionToken, setSessionToken] = React.useState();
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSubmit = ({ login, password }: Store) => {
    setLoading(true);
    const oktaAuth = new OktaAuth({
      issuer:
        process.env.ISSUER || "https://dev-417692.okta.com/oauth2/default",
    });
    oktaAuth
      .signIn({ username: login, password })
      .then((res: any) => {
        const sessionToken = res.sessionToken;
        // setSessionToken(sessionToken);
        // sessionToken is a one-use token, so make sure this is only called once
        authService.redirect({ sessionToken });
      })
      .catch((err: Error) => {
        setLoading(false);
        console.log("Found an error", err);
      });
  };

  return (
    <section>
      <CenteredText className="auth-page-main-form">
        <Card>
          {loading ? <Spin /> : <h1>Авторизоваться</h1>}
          <Form
            name="auth-form"
            layout="vertical"
            onFinish={handleSubmit}
            onFinishFailed={() => console.info("onFinishFailed")}
          >
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
          {/* <span>
            Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
          </span> */}
        </Card>
      </CenteredText>
    </section>
  );
};

export default Auth;
