import React, { useLayoutEffect } from "react";
import { Form, Input, Button, Layout, Row, Col, Progress } from "antd";
import { Link } from "react-router-dom";
// import mozok_logo from "../../components/assets/images/mozok-logo.png";
import { ArrowLeftOutlined } from "@mui/icons-material";
import EnterPasswordPresenter from "./EnterPasswordPresenter";
import { getLocalStorageWithExpiry } from "../../core/utils/utils";

const EnterPassword = () => {
  const { busy, error, setSignInRequest } = EnterPasswordPresenter();
  const email = getLocalStorageWithExpiry("signin-email");
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
    <>
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
              {/* <img
                src={mozok_logo}
                style={{ width: "75px", marginRight: "1rem" }}
                alt="Pixaera"
              /> */}
              <Col
                style={{
                  lineHeight: "0.2rem",
                  margin: "auto",
                  marginLeft: "0",
                  color: "aliceblue",
                }}
              >
                <h1>{process.env.REACT_APP_COMPANY_NAME}</h1>
                <p>Software Development Services</p>
              </Col>
            </Row>
            <Row style={{ height: "100%" }}>
              <Col style={{ width: "70%", position: "absolute", bottom: 0 }}>
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
                    <>
                      <Input
                        readOnly
                        hidden
                        disabled
                        style={{ cursor: "default", color: "aliceblue" }}
                        placeholder="name@example.com"
                        className="login-form-input-readonly"
                        value={email ?? ""}
                      />
                    </>
                  </Form.Item>
                  <h3
                    style={{
                      color: "#A7AFBE",
                      padding: 0,
                      fontSize: 14,
                      lineHeight: "10px",
                      margin: 0,
                    }}
                    className="light"
                  >
                    Please enter your password.
                  </h3>
                  {error && (
                    <Form.Item
                      name="password"
                      validateStatus="error"
                      help="Incorrect password"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your password.",
                        },
                      ]}
                    >
                      <Input
                        style={{ marginTop: 10, width: "250px" }}
                        type="password"
                        placeholder="Please enter your password."
                        className="login-form-input light"
                      />
                    </Form.Item>
                  )}
                  {!error && (
                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your password.",
                        },
                      ]}
                    >
                      <Input
                        style={{ marginTop: 10, width: "250px" }}
                        type="password"
                        placeholder="Please enter your password."
                        className="login-form-input"
                      />
                    </Form.Item>
                  )}
                  <Row style={{ marginTop: 30 }}>
                    <Link to="/reset-password" className="login-link-black">
                      Forgot your password?
                    </Link>
                  </Row>
                  <Row style={{ marginTop: 10 }}>
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
                    <Form.Item style={{ marginBottom: 0, marginTop: 30 }}>
                      <Button
                        type="default"
                        htmlType="submit"
                        className="login-form-button"
                        style={{ borderRadius: "20px", padding: "0 30px" }}
                      >
                        Sign In
                      </Button>
                    </Form.Item>
                  )}
                  {busy && (
                    <Col style={{ bottom: 50, width: "100%" }}>
                      <h3
                        style={{
                          color: "#A7AFBE",
                          fontWeight: "lighter",
                          padding: 0,
                          margin: 0,
                          fontSize: "14px",
                        }}
                        className="light"
                      >
                        Logging in
                      </h3>
                      <Progress
                        percent={30}
                        trailColor="#e6e6e6"
                        strokeColor="#A7AFBE"
                        showInfo={false}
                        size={1}
                        style={{ marginTop: -7, float: "left" }}
                      />
                    </Col>
                  )}
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
        <Col style={{ width: "50%" }} />
      </Layout>
    </>
  );
};

export default EnterPassword;
