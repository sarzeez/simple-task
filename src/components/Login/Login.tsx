import React, { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import "./login.css";

import request from "../../services/api";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values: { username: string; password: string }) => {
    setLoading(true);
    request.auth
      .signin({
        username: values.username,
        password: values.password,
        subdomain: "toko",
      })
      .then((res) => {
        request.auth.saveToken(res.data.token);
        navigate("/");
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err.response)
        setError(err?.response?.data?.error);
        form.resetFields();
        setLoading(false);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    form.resetFields();
    console.log(errorInfo);
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <Form
          name="basic"
          layout="vertical"
          form={form}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input style={{ width: "400px" }} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password style={{ width: "400px" }} />
            </Form.Item>
            {error && (
              <Alert
                style={{ marginBottom: "20px" }}
                message={error}
                type="error"
              />
            )}
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
