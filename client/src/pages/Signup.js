import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/Login.css";
import { useSignupMutation } from "../services/appApi";
import SignupImg from "../assets/SignupImg.png";
import backgroundImage from "../assets/background.png";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [signup, { error, isLoading, isError }] = useSignupMutation();

  function handleSignup(e) {
    e.preventDefault();
    signup({ name, email, password });
  }

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      <Container>
        <Row>
          <Col md={6} className="login-form-container">
            <Form style={{ width: "100%" }} onSubmit={handleSignup}>
              <h1 className="header">SignUp</h1>
              <h5 className="tagline">
                This is the future of Education. Start for free.
              </h5>
              {isError && <Alert variant="danger">{error.data}</Alert>}
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Your name"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                  className="input"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                />
              </Form.Group>

              <Form.Group>
                <div className="button-wrapper">
                  <Button
                    className="filled-button"
                    type="submit"
                    disabled={isLoading}
                  >
                    Create account
                  </Button>
                </div>
              </Form.Group>
              <p className="pt-3 text-center">
                Don't have an account? <Link style={{textDecoration:'none', color:'black', fontWeight:500}}  to="/login">Login</Link>{" "}
              </p>
            </Form>
          </Col>
          <Col md={6}>
            <div className="img-container">
              <img src={SignupImg} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Signup;
