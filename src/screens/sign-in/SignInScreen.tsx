import { useEffect } from "react";
import { Form, Input, Button, Layout, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import {
  getLocalStorageWithExpiry,
  setLocalStorageWithExpiry,
} from "../../core/utils/utils";
import { SIGN_IN_EMAIL_LOCAL_STORAGE_KEY } from "../../auth/core/AuthServices";
import "./styles/index.scss";

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
    <Layout className="sign-in-layout">
      <Row className="full-height">
        <Col className="full-width">
          <Row className="full-width">
            <Col className="center-content">
              <h1>{process.env.REACT_APP_COMPANY_NAME}</h1>
              <p>Software Development Services</p>
            </Col>
          </Row>
          <Row className="full-height">
            <Col className="sign-in-col">
              <h2 className="sign-in-title">Sign In</h2>
              <p className="sign-in-light">Please enter your email address.</p>

              <Form
                name="normal_login"
                className="login-form"
                onFinish={onFinish}
                form={form}
              >
                <Form.Item
                  initialValue={email}
                  name="email"
                  className="input-container"
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
                <Form.Item className="mb-0">
                  <Button
                    type="default"
                    htmlType="submit"
                    className="next-button login-form-button"
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
