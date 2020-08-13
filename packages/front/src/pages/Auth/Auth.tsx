import React from "react";
import { CenteredText } from "../../hoc/CenteredText/CenteredText";
import { Card, Form, Input, Button } from "antd";
import { Link, useHistory } from "react-router-dom";
import "./Auth.css";
import OktaSignIn from "@okta/okta-signin-widget";
import "@okta/okta-signin-widget/dist/css/okta-sign-in.min.css";
import { useOktaAuth } from "@okta/okta-react";
import config from "../../oktaConfig";

const Auth: React.FC = () => {
  const history = useHistory();
  const {
    authState: { isAuthenticated },
  } = useOktaAuth();

  React.useEffect(() => {
    const { pkce, issuer, clientId, redirectUri, scopes } = config;
    if (isAuthenticated) {
      history.push("/");
    } else {
      const widget = new OktaSignIn({
        /**
         * Note: when using the Sign-In Widget for an OIDC flow, it still
         * needs to be configured with the base URL for your Okta Org. Here
         * we derive it from the given issuer for convenience.
         */
        baseUrl: issuer ? issuer.split("/oauth2")[0] : "",
        clientId,
        redirectUri,
        logo: "/react.svg",
        language: "en",
        i18n: {
          en: {
            "primaryauth.title": "Вход в систему",
            "primaryauth.username.placeholder": "Ваш логин",
            "primaryauth.username.tooltip": "Логин",
            "primaryauth.password.placeholder": "Ваш пароль",
            "primaryauth.password.tooltip": "Пароль",
            "primaryauth.submit": "Войти",
            "primaryauth.newUser.tooltip": "Новый пользователь",
            "primaryauth.newUser.tooltip.close": "Закрыть",
            needhelp: "Не получатеся зайти?",
            forgotpassword: "Забыли пароль?",
            help: "Помощь",
            remember: "Запомнить меня",
          },
        },
        authParams: {
          pkce,
          issuer,
          display: "page",
          scopes,
          responseMode: "fragment",
        },
      });

      widget.renderEl(
        { el: "#sign-in-widget" },
        () => {},
        (err: Error) => {
          throw err;
        }
      );

      return () => widget.remove();
    }
  }, []);

  return (
    <div>
      <div id="sign-in-widget" />
    </div>
  );
};

export default Auth;
