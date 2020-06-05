import React from "react";
import { CenteredText } from "../../hoc/CenteredText/CenteredText";
import { Card, Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import "./Auth.css";

const Auth: React.FC = () => {
  return (
    <section>
      <CenteredText className="auth-page-main-form">
        <Card>
          <h1>Авторизоваться</h1>
          <Form
            name="auth-form"
            layout="vertical"
            onFinish={() => console.info("onFinish")}
            onFinishFailed={() => console.info("onFinishFailed")}
          >
            <Form.Item
              label="Ваш логин:"
              name="login"
              rules={[{ required: true, message: "Введите ваш логин" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Ваш пароль:"
              name="password"
              rules={[{ required: true, message: "Введите пароль" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Войти
              </Button>
            </Form.Item>
          </Form>
          <span>
            Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
          </span>
        </Card>
      </CenteredText>
    </section>
  );
};

export default Auth;
