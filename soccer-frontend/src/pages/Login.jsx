// src/pages/Login.jsx
import { useState } from "react";
import { loginUser } from "../api/api";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ username, password });
      setMessage(res.message);
      localStorage.setItem("user", JSON.stringify(res.user));
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Iniciar Sesión</h2>
      {message && <Alert>{message}</Alert>}
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit">Ingresar</Button>
      </Form>
    </Container>
  );
};

export default Login;

