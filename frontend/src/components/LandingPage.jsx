import React, { useState } from "react";
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

export default function LandingPage({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [notification, setNotification] = useState(null);

  // ...handlers and formData here (same as before)...

  return (
    <>
      <div className="animated-bg"></div>
      <ThreeBackground />
      <Navbar
        bg="transparent"
        expand="lg"
        fixed="top"
        className="shadow-none fade-in"
        style={{ zIndex: 10 }}
      >
        <Container>
          <Navbar.Brand
            href="#"
            className="fw-bold"
            style={{
              fontSize: "2rem",
              background: "linear-gradient(90deg,#a78bfa,#38bdf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            Wellness Tracker
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
            className="d-flex flex-column justify-content-center align-items-center fade-in"
            style={{
              minHeight: "400px",
              color: "#fff",
              textAlign: "center",
              textShadow: "0 2px 12px rgba(0,0,0,0.3)",
            }}
          >
            <h1
              className="display-3 fw-bold mb-3"
              style={{
                background: "linear-gradient(90deg,#a78bfa,#38bdf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              Welcome to Wellness Tracker
            </h1>
            <p
              className="lead fw-medium"
              style={{
                color: "rgba(255,255,255,0.95)",
                textShadow: "0 1px 6px rgba(0,0,0,0.5)",
                fontSize: "1.3rem",
              }}
            >
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
              {/* ...forms for login/register/forgot... */}
            </div>
          </Col>
        </Row>
      </Container>

      <footer className="bg-transparent text-center py-4 mt-auto fade-in text-white">
        <Container>
          <small>© 2025 Wellness Tracker. All rights reserved.</small>
        </Container>
      </footer>
    </>
  );
}
