import React from "react";
import { CenteredText } from "../../hoc/CenteredText/CenteredText";
import { Card, Input, Button, Form } from "antd";
import { Link } from "react-router-dom";
import "./Registration.css";

const Registration: React.FC = () => {
  return (
    <section>
      <CenteredText className="registration-page-main-form">
        <Card>
          <h1>Зарегистрироваться</h1>
          <Form
            name="register-form"
            layout="vertical"
            onFinish={() => console.info("onFinish")}
            onFinishFailed={() => console.info("onFinishFailed")}
          >
            <Form.Item
              label="Укажите полное имя:"
              name="fullname"
              rules={[{ required: true, message: "Введите полное имя" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Укажите логин:"
              name="login"
              rules={[{ required: true, message: "Введите логин" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Укажите пароль:"
              name="password"
              rules={[{ required: true, message: "Введите пароль" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Повторите пароль:"
              name="confirmpassword"
              rules={[{ required: true, message: "Введите пароль повторно" }]}
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
            Уже зарегистрированы? <Link to="/auth">Войти</Link>
          </span>
        </Card>
      </CenteredText>
    </section>
  );
};

export default Registration;
