import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Nav,
  Navbar,
  Alert,
  Spinner,
} from "react-bootstrap";
import { Canvas } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";

// 3D sphere background
function ThreeBackground() {
  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
      }}
    >
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} />
      <Sphere args={[1.2, 64, 64]} scale={2.2} position={[-2, 0, 0]}>
        <MeshDistortMaterial color="#a78bfa" distort={0.4} speed={2} />
      </Sphere>
      <Sphere args={[1.1, 64, 64]} scale={1.7} position={[2, 1, 1]}>
        <MeshDistortMaterial color="#38bdf8" distort={0.3} speed={2.5} />
      </Sphere>
      <Sphere args={[0.7, 64, 64]} scale={1.2} position={[0, -2, -1]}>
        <MeshDistortMaterial color="#6366f1" distort={0.5} speed={1.7} />
      </Sphere>
    </Canvas>
  );
}

export default function LoginPage({ apiUrl, onLogin, showNotification }) {
  // Modes: login, register, verify-otp, forgot-send, forgot-reset
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    gender: "male",
    birthdate: "",
    weight: "",
    height: "",
    otp: "",
    newPassword: "",
  });

  const showNotificationMsg = (msg, variant = "info") => {
    setNotification({ msg, variant });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      showNotificationMsg("Please enter email and password", "danger");
      return;
    }
    if (!isValidEmail(formData.email)) {
      showNotificationMsg("Invalid email format", "danger");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${apiUrl}/login`, {
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("token", res.data.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.token}`;
      onLogin(res.data.user, res.data.token);
      showNotificationMsg("Login successful!", "success");
    } catch (err) {
      showNotificationMsg(
        err.response?.data?.message || "Login failed",
        "danger"
      );
    } finally {
      setLoading(false);
    }
  };

  // Register handler
  const handleRegister = async (e) => {
    e.preventDefault();
    const {
      name,
      email,
      password,
      confirmPassword,
      phone,
      gender,
      birthdate,
      weight,
      height,
    } = formData;
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !phone ||
      !birthdate ||
      !weight ||
      !height
    ) {
      showNotificationMsg("Please fill all fields", "danger");
      return;
    }
    if (!isValidEmail(email)) {
      showNotificationMsg("Invalid email format", "danger");
      return;
    }
    if (password !== confirmPassword) {
      showNotificationMsg("Passwords do not match", "danger");
      return;
    }
    if (password.length < 6) {
      showNotificationMsg("Password must be at least 6 characters", "danger");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${apiUrl}/register`, {
        name,
        email,
        password,
        phone,
        gender,
        birthdate,
        weight: Number(weight),
        height: Number(height),
      });
      showNotificationMsg("Registered! Please verify your email.", "success");
      setMode("verify-otp"); // <<-- Show OTP verification instead of login
    } catch (err) {
      showNotificationMsg(
        err.response?.data?.message || "Registration failed",
        "danger"
      );
    } finally {
      setLoading(false);
    }
  };

  // OTP verification handler
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.otp) {
      showNotificationMsg("Please enter your email and OTP", "danger");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${apiUrl}/verify-otp`, {
        email: formData.email,
        otp: formData.otp,
      });
      showNotificationMsg("Email verified! You can now login.", "success");
      setMode("login");
    } catch (err) {
      showNotificationMsg(
        err.response?.data?.message || "OTP verification failed",
        "danger"
      );
    } finally {
      setLoading(false);
    }
  };

  // Forgot password: send OTP
  const handleForgotSend = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      showNotificationMsg("Please enter your email", "danger");
      return;
    }
    if (!isValidEmail(formData.email)) {
      showNotificationMsg("Invalid email format", "danger");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${apiUrl}/forgot-password`, { email: formData.email });
      showNotificationMsg("OTP sent to your email", "success");
      setMode("forgot-reset");
    } catch (err) {
      showNotificationMsg(
        err.response?.data?.message || "Failed to send OTP",
        "danger"
      );
    } finally {
      setLoading(false);
    }
  };

  // Forgot password: reset with OTP + new password
  const handleForgotReset = async (e) => {
    e.preventDefault();
    if (!formData.otp) {
      showNotificationMsg("Please enter the OTP", "danger");
      return;
    }
    if (!formData.newPassword || formData.newPassword.length < 6) {
      showNotificationMsg("Password must be at least 6 characters", "danger");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${apiUrl}/reset-password`, {
        email: formData.email,
        otp: formData.otp,
        newPassword: formData.newPassword,
      });
      showNotificationMsg(
        "Password reset successful! Please login.",
        "success"
      );
      setMode("login");
    } catch (err) {
      showNotificationMsg(
        err.response?.data?.message || "Password reset failed",
        "danger"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="animated-bg"></div>
      <ThreeBackground />

      <Navbar expand="lg" className="glass-header shadow-none fade-in">
        <Container>
          <Navbar.Brand
            href="#"
            className="fw-bold text-white"
            style={{ fontSize: "2rem" }}
          >
            <span
              style={{
                background: "linear-gradient(90deg,#a78bfa,#38bdf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Wellness Tracker
            </span>
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Button
              variant="light"
              className="fw-bold px-4 py-2"
              style={{
                borderRadius: "1.5rem",
                boxShadow: "0 2px 12px 0 rgba(56,189,248,0.18)",
                background: "linear-gradient(90deg,#a78bfa,#38bdf8)",
                color: "#fff",
                border: "none",
              }}
              onClick={() => setMode("register")}
            >
              Get Started
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <Container fluid className="d-flex flex-column min-vh-100 pt-5">
        <Row className="flex-grow-1 align-items-center justify-content-center">
          <Col
            md={6}
            className="text-white text-center d-flex flex-column justify-content-center align-items-center fade-in"
            style={{ minHeight: "400px", backgroundColor: "rgba(0, 0, 0, 0)" }}
          >
            <h1
              className="display-3 fw-bold mb-3"
              style={{
                background: "linear-gradient(135deg, #6a11cb, #2575fc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Welcome to Wellness Tracker
            </h1>

            <p className="lead fw-medium text-white/90">
              Track your study and exercise routines, earn points, and stay
              motivated.
              <br />
              Your wellness journey starts here.
            </p>
            <Button
              variant="light"
              size="lg"
              className="mt-4 fw-bold px-5 py-3"
              style={{
                borderRadius: "1.5rem",
                background: "linear-gradient(90deg,#a78bfa,#38bdf8)",
                color: "#fff",
                border: "none",
                boxShadow: "0 2px 12px 0 rgba(56,189,248,0.18)",
                fontSize: "1.3rem",
              }}
              onClick={() => setMode("register")}
            >
              Get Started
            </Button>
          </Col>

          <Col
            md={6}
            className="d-flex justify-content-center align-items-center"
          >
            <div className="glass-card fade-in w-100" style={{ maxWidth: 430 }}>
              {notification && (
                <Alert
                  variant={notification.variant}
                  onClose={() => setNotification(null)}
                  dismissible
                >
                  {notification.msg}
                </Alert>
              )}

              {mode === "login" && (
                <Form onSubmit={handleLogin}>
                  <h3 className="mb-4 text-center fw-bold">Login</h3>
                  <Form.Group className="mb-3" controlId="loginEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="loginPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-between mb-3">
                    <Button variant="primary" type="submit" disabled={loading}>
                      {loading ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        "Login"
                      )}
                    </Button>
                    <Button
                      variant="link"
                      onClick={() => setMode("forgot-send")}
                      disabled={loading}
                    >
                      Forgot Password?
                    </Button>
                  </div>
                  <div className="text-center">
                    <span>Don't have an account? </span>
                    <Button
                      variant="link"
                      onClick={() => setMode("register")}
                      disabled={loading}
                    >
                      Register
                    </Button>
                  </div>
                </Form>
              )}

              {mode === "register" && (
                <Form onSubmit={handleRegister}>
                  <h3 className="mb-4 text-center fw-bold">Register</h3>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="registerName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Full Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          disabled={loading}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="registerEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={loading}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="registerPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          disabled={loading}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group
                        className="mb-3"
                        controlId="registerConfirmPassword"
                      >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Confirm Password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          disabled={loading}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="registerPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                          type="tel"
                          placeholder="Phone Number"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          disabled={loading}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="registerGender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          disabled={loading}
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group
                        className="mb-3"
                        controlId="registerBirthdate"
                      >
                        <Form.Label>Birthdate</Form.Label>
                        <Form.Control
                          type="date"
                          name="birthdate"
                          value={formData.birthdate}
                          onChange={handleChange}
                          disabled={loading}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3" controlId="registerWeight">
                        <Form.Label>Weight (kg)</Form.Label>
                        <Form.Control
                          type="number"
                          name="weight"
                          value={formData.weight}
                          onChange={handleChange}
                          disabled={loading}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3" controlId="registerHeight">
                        <Form.Label>Height (cm)</Form.Label>
                        <Form.Control
                          type="number"
                          name="height"
                          value={formData.height}
                          onChange={handleChange}
                          disabled={loading}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 fw-bold"
                    disabled={loading}
                  >
                    {loading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "Register"
                    )}
                  </Button>
                  <div className="text-center mt-3">
                    <span>Already have an account? </span>
                    <Button
                      variant="link"
                      onClick={() => setMode("login")}
                      disabled={loading}
                    >
                      Login
                    </Button>
                  </div>
                </Form>
              )}

              {/* OTP Verification UI */}
              {mode === "verify-otp" && (
                <Form onSubmit={handleVerifyOTP}>
                  <h3 className="mb-4 text-center fw-bold">
                    Verify Your Email
                  </h3>
                  <Alert variant="info">
                    Please enter the OTP sent to your email{" "}
                    <b>{formData.email}</b>.
                  </Alert>
                  <Form.Group className="mb-3" controlId="verifyOtpEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      readOnly
                      disabled
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="verifyOtpInput">
                    <Form.Label>OTP</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter OTP"
                      name="otp"
                      value={formData.otp}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "Verify"
                    )}
                  </Button>
                </Form>
              )}

              {/* Forgot Password: Send OTP */}
              {mode === "forgot-send" && (
                <Form onSubmit={handleForgotSend}>
                  <h3 className="mb-4 text-center fw-bold">Forgot Password</h3>
                  <Form.Group className="mb-3" controlId="forgotEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 fw-bold"
                    disabled={loading}
                  >
                    {loading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "Send OTP"
                    )}
                  </Button>
                  <div className="text-center mt-3">
                    <Button
                      variant="link"
                      onClick={() => setMode("login")}
                      disabled={loading}
                    >
                      Back to Login
                    </Button>
                  </div>
                </Form>
              )}

              {/* Forgot Password: Reset */}
              {mode === "forgot-reset" && (
                <Form onSubmit={handleForgotReset}>
                  <h3 className="mb-4 text-center fw-bold">Reset Password</h3>
                  <Form.Group className="mb-3" controlId="resetOtp">
                    <Form.Label>OTP</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter OTP"
                      name="otp"
                      value={formData.otp}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="resetNewPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="New Password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 fw-bold"
                    disabled={loading}
                  >
                    {loading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "Reset Password"
                    )}
                  </Button>
                  <div className="text-center mt-3">
                    <Button
                      variant="link"
                      onClick={() => setMode("login")}
                      disabled={loading}
                    >
                      Back to Login
                    </Button>
                  </div>
                </Form>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
