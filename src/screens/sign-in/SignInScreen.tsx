import { useEffect } from "react";
import { Form, Input, Button, Layout, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";

import {
  getLocalStorageWithExpiry,
  setLocalStorageWithExpiry,
} from "../../core/utils/utils";
import { SIGN_IN_EMAIL_LOCAL_STORAGE_KEY } from "../../auth/core/AuthServices";

const SignInScreen = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const email: string =
    getLocalStorageWithExpiry(SIGN_IN_EMAIL_LOCAL_STORAGE_KEY) || "";
  const onFinish = async (request: { email: string }) => {
    setLocalStorageWithExpiry(SIGN_IN_EMAIL_LOCAL_STORAGE_KEY, request.email);
    navigate("/enter-password");
  };

  useEffect(() => {
    form.setFieldsValue({
      email,
    });
  }, [email, form]);

  return (
    <Layout
      style={{
        height: "96vh",
        backgroundColor: "transparent",
        padding: 50,
        flexDirection: "column",
        overflow: "hidden",
        width: "100%",
      }}
    >
      <Row style={{ height: "100%" }}>
        <Col style={{ height: "100%", width: "100%" }}>
          <Row style={{ width: "100%" }}>
            <Col
              style={{
                lineHeight: "0.2rem",
                margin: "auto",
                marginLeft: "0",
                color: "#3a3c3d",
              }}
            >
              <h1>{process.env.REACT_APP_COMPANY_NAME}</h1>
              <p>Software Development Services</p>
            </Col>
          </Row>
          <Row style={{ height: "100%" }}>
            <Col style={{ width: "70%", position: "absolute", bottom: 0 }}>
              <h2
                style={{
                  color: "#3a3c3d",
                  lineHeight: "35px",
                  margin: 0,
                }}
              >
                Sign In
              </h2>
              <p
                style={{
                  color: "#A7AFBE",
                  padding: 0,
                  lineHeight: "20px",
                  margin: 0,
                }}
                className="light"
              >
                Please enter your email address.
              </p>

              <Form
                name="normal_login"
                className="login-form"
                onFinish={onFinish}
                form={form}
              >
                <Form.Item
                  initialValue={email}
                  name="email"
                  style={{ width: "250px" }}
                  rules={[
                    {
                      type: "email",
                      required: true,
                      message: "Please enter a valid email.",
                    },
                  ]}
                >
                  <Input
                    placeholder="name@example.com"
                    className="login-form-input"
                  />
                </Form.Item>
                <Form.Item style={{ marginBottom: 0 }}>
                  <Button
                    type="default"
                    htmlType="submit"
                    className="login-form-button"
                    style={{ borderRadius: "20px", padding: "0 30px" }}
                  >
                    Next
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
      <Col style={{ width: "50%" }} />
    </Layout>
  );
};

export default SignInScreen;
