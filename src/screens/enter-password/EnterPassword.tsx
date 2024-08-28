import React, { useLayoutEffect } from "react";
import { Form, Input, Button, Layout, Row, Col, Progress } from "antd";
import { Link } from "react-router-dom";
// import mozok_logo from "../../components/assets/images/mozok-logo.png";
import { ArrowLeftOutlined } from "@mui/icons-material";
import EnterPasswordPresenter from "./EnterPasswordPresenter";
import { getLocalStorageWithExpiry } from "../../core/utils/utils";
import { SIGN_IN_EMAIL_LOCAL_STORAGE_KEY } from "../../auth/core/AuthServices";
import "./styles/index.scss";

const EnterPassword = () => {
  const { busy, error, setSignInRequest } = EnterPasswordPresenter();
  const email = getLocalStorageWithExpiry(SIGN_IN_EMAIL_LOCAL_STORAGE_KEY);
  const [form] = Form.useForm();

  // const passwordField = useRef<HTMLInputElement>(null)
  const passwordField = React.createRef<HTMLInputElement>();
  useLayoutEffect(() => {
    if (passwordField && passwordField.current) {
      passwordField.current.focus();
    }
  }, [passwordField]);

  const onFinish = async (request: { email: string; password: string }) => {
    setSignInRequest(request);
  };

  return (
    <Layout className="layout">
      <Row className="full-height">
        <Col className="full-width">
          <Row className="full-width">
            <Col className="center-content">
              <h1>{process.env.REACT_APP_COMPANY_NAME}</h1>
              <p>Software Development Services</p>
            </Col>
          </Row>
          <Row className="full-height">
            <Col className="bottom-content">
              <Form
                name="normal_login"
                className="login-form"
                onFinish={onFinish}
                initialValues={{ email }}
                form={form}
              >
                <Form.Item
                  name="email"
                  style={{ userSelect: "none", width: "250px" }}
                >
                  <Input
                    readOnly
                    hidden
                    disabled
                    className="input-readonly login-form-input-readonly"
                    placeholder="name@example.com"
                    value={email ?? ""}
                  />
                </Form.Item>
                <h3 className="password-light">Please enter your password.</h3>
                {error && (
                  <Form.Item
                    name="password"
                    validateStatus="error"
                    help="Incorrect password"
                    className="input-container"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your password.",
                      },
                    ]}
                  >
                    <Input
                      className="error-input login-form-input password-light"
                      type="password"
                      placeholder="Please enter your password."
                    />
                  </Form.Item>
                )}
                {!error && (
                  <Form.Item
                    name="password"
                    className="input-container"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your password.",
                      },
                    ]}
                  >
                    <Input
                      className="error-input login-form-input"
                      type="password"
                      placeholder="Please enter your password."
                    />
                  </Form.Item>
                )}
                <Row className="mt-10">
                  <Link
                    to="/sign-in"
                    className="login-link-red"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      textAlign: "center",
                      color: "red",
                    }}
                  >
                    <ArrowLeftOutlined /> Edit email
                  </Link>
                </Row>
                {!busy && (
                  <Form.Item className="mb-0 mt-30">
                    <Button
                      type="default"
                      htmlType="submit"
                      className="signin-btn login-form-button"
                    >
                      Sign In
                    </Button>
                  </Form.Item>
                )}
                {busy && (
                  <Col className="full-width">
                    <h3 className="logging-in">Logging in</h3>
                    <Progress
                      percent={30}
                      trailColor="#e6e6e6"
                      strokeColor="#A7AFBE"
                      showInfo={false}
                      size={1}
                      className="progress"
                    />
                  </Col>
                )}
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
      <Col className="full-width" />
    </Layout>
  );
};

export default EnterPassword;
