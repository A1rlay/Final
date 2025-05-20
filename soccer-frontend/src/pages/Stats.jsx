// src/pages/Stats.jsx
import { useEffect, useState } from 'react';
import { getStats } from '../api/stats_api';
import { Container, Card, Spinner, Row, Col, Alert } from 'react-bootstrap';
import { TrophyFill, PeopleFill, ExclamationTriangleFill, DashCircleFill } from 'react-bootstrap-icons';

const StatCard = ({ icon: Icon, title, value }) => (
  <Card className="shadow-sm text-center h-100">
    <Card.Body>
      <Icon size={40} className="mb-3 text-primary" />
      <Card.Title className="fw-bold">{title}</Card.Title>
      <Card.Text>{value}</Card.Text>
    </Card.Body>
  </Card>
);

const Stats = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getStats()
      .then(setStats)
      .catch((err) => {
        console.error(err);
        setError('No disponible');
      });
  }, []);

  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!stats) return (
    <Container className="text-center mt-5">
      <Spinner animation="border" variant="primary" />
      <p className="mt-3">Cargando estadísticas...</p>
    </Container>
  );

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center fw-bold">📊 Estadísticas Generales</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        <Col>
          <StatCard
            icon={TrophyFill}
            title="Máximo Goleador"
            value={`${stats.topScorer?.name} (${stats.topScorer?.goals} goles)`}
          />
        </Col>
        <Col>
          <StatCard
            icon={PeopleFill}
            title="Máximo Asistente"
            value={`${stats.topAssister?.name} (${stats.topAssister?.assists} asistencias)`}
          />
        </Col>
        <Col>
          <StatCard
            icon={ExclamationTriangleFill}
            title="Más Amarillas"
            value={`${stats.mostYellowCards?.name} (${stats.mostYellowCards?.yellow_cards})`}
          />
        </Col>
        <Col>
          <StatCard
            icon={DashCircleFill}
            title="Más Rojas"
            value={`${stats.mostRedCards?.name} (${stats.mostRedCards?.red_cards})`}
          />
        </Col>
        <Col>
          <StatCard
            icon={TrophyFill}
            title="Equipo con más victorias"
            value={`${stats.topWinningTeam?.name} (${stats.topWinningTeam?.wins} victorias)`}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Stats;

