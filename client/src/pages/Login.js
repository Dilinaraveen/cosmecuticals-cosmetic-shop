import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../services/appApi";
import "../styles/Login.css";
import LoginImg from "../assets/LoginImg.png";
import backgroundImage from "../assets/background.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isError, isLoading, error }] = useLoginMutation();
  function handleLogin(e) {
    e.preventDefault();
    login({ email, password });
  }
  return (
    <div style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        height: '100vh'
      }}>
    <Container>
      <Row>
        <Col md={6} className="login-form-container">
          <Form style={{ width: "100%" }} onSubmit={handleLogin}>
            <h1 className="header">Login</h1>
            <h5 className="tagline">Welcome Back</h5>
            {isError && <Alert variant="danger">{error.data}</Alert>}
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
                <Button className="filled-button" type="submit" disabled={isLoading}>
                  Login
                </Button>
              </div>
            </Form.Group>

            <p className="pt-3 text-center">
              Don't have an account? <Link style={{textDecoration:'none', color:'black', fontWeight:500}} to="/signup">Create account</Link>{" "}
            </p>
          </Form>
        </Col>
        <Col md={6} >
            <div className="img-container">
                 <img src={LoginImg}/>
            </div>
           
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default Login;
