// src/pages/Home.jsx
import { useState } from "react";
import axios from "axios";
import { Button, Container, Alert, Row, Col, Card, Image } from "react-bootstrap";
import {
  DatabaseFillGear,
  BarChartFill,
  PeopleFill,
  TrophyFill,
} from "react-bootstrap-icons";

const Home = () => {
  const [message, setMessage] = useState("");

  const handleInitDb = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/init");
      setMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        setMessage(`Error del servidor: ${error.response.data.error || error.message}`);
      } else if (error.request) {
        setMessage("No se recibió respuesta del servidor");
      } else {
        setMessage(`Error: ${error.message}`);
      }
    }
  };

  return (
    <Container className="my-5">
      {/* Hero Section */}
      <Row className="justify-content-center mb-5">
        <Col md={10}>
          <Card className="text-center shadow-lg border-0">
            <Card.Body>
              <DatabaseFillGear size={60} className="mb-3 text-primary" />
              <Card.Title className="fw-bold display-6">
                Bienvenido a la App de Soccer ⚽
              </Card.Title>
              <Card.Text className="mt-3 fs-5 text-muted">
                Esta aplicación te permite gestionar jugadores, equipos, partidos y
                consultar estadísticas avanzadas para analizar el rendimiento de tus equipos.
              </Card.Text>
              <Button variant="success" size="lg" onClick={handleInitDb}>
                Crear Base de Datos
              </Button>
              {message && (
                <Alert variant="info" className="mt-3">
                  {message}
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Features Section */}
      <Row className="text-center mb-5">
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <PeopleFill size={40} className="text-primary mb-3" />
              <Card.Title className="fw-bold">Gestión de Jugadores</Card.Title>
              <Card.Text>
                Registra y actualiza información de jugadores incluyendo nombre,
                posición, goles, asistencias y tarjetas.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <TrophyFill size={40} className="text-warning mb-3" />
              <Card.Title className="fw-bold">Competencias y Partidos</Card.Title>
              <Card.Text>
                Lleva el control de cada partido: resultados, equipos, fecha,
                estadísticas de desempeño y más.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <BarChartFill size={40} className="text-success mb-3" />
              <Card.Title className="fw-bold">Análisis de Datos</Card.Title>
              <Card.Text>
                Visualiza las estadísticas clave de tus equipos y jugadores con
                gráficas, rankings y métricas de rendimiento.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Imagen decorativa */}
      <Row className="justify-content-center">
        <Col md={10}>
          <Image
            src="https://images.unsplash.com/photo-1606279345604-f5f468c33d4b"
            alt="Soccer field"
            fluid
            rounded
            className="shadow"
            style={{ opacity: 0.95, maxHeight: "400px", objectFit: "cover", width: "100%" }}
          />
          <p className="text-center text-muted mt-3 fst-italic">
            "El fútbol no es solo un juego, es una herramienta de análisis y estrategia."
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;

