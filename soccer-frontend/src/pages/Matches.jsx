import { useState, useEffect } from 'react';
import { Container, Form, Button, Table } from 'react-bootstrap';
import { matchesApi } from '../api/api';

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [form, setForm] = useState({
    home_team_id: '',
    away_team_id: '',
    match_date: '',
    location: '',
    home_goals: '',
    away_goals: '',
    status: '',
  });
  const [editingMatches, setEditingMatches] = useState(null);

  useEffect(() => {
    matchesApi.getMatches().then(data => {
      setMatches(data);
    });
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMatches) {
        await matchesApi.updateMatch(editingMatches.id, form);
        setEditingMatches(null);
      } else {
        await matchesApi.addMatch(form);
      }
      setForm({ home_team_id: '', away_team_id: '', match_date: '', location: '', home_goals: '', away_goals: '', status: '' });
      const data = await matchesApi.getMatches();
      setMatches(data);
    } catch (error) {
      alert(error.message);
    }
  };
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro que quieres eliminar este partido?')) {
      try {
        await matchesApi.deleteMatch(id);
        const data = await matchesApi.getMatches();
        setMatches(data);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleEdit = match => {
    setEditingMatches(match);
    setForm({
      home_team_id: match.home_team_id,
      away_team_id: match.away_team_id,
      match_date: match.match_date,
      location: match.location,
      home_goals: match.home_goals,
      away_goals: match.away_goals,
      status: match.status,
    });
  };

  return (
    <Container>
      <h2 className="my-4">{editingMatches ? 'Editar Partido' : 'Agregar Partido'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>ID del Equipo en Casa</Form.Label>
          <Form.Control
            name="home_team_id"
            value={form.home_team_id}
            onChange={handleChange}
            required
            minLength={1}
            min={1}
            placeholder="Ej: 1"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>ID del Equipo en Visitante</Form.Label>
          <Form.Control
            type="number"
            name="away_team_id"
            value={form.away_team_id}
            onChange={handleChange}
            required
            minLength={1}
            min={1}
            placeholder="Ej: 1"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Fecha del Partido</Form.Label>
          <Form.Control
            name="match_date"
            value={form.match_date}
            onChange={handleChange}
            required
            minLength={2}
            placeholder="Ej: 2015-05-25"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Lugar del Partido</Form.Label>
          <Form.Control
            name="location"
            value={form.location}
            onChange={handleChange}
            required
            minLength={2}
            placeholder="Ej: Estadio Azteca"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Goles de Casa</Form.Label>
          <Form.Control
            type="number"
            name="home_goals"
            value={form.home_goals}
            onChange={handleChange}
            required
            minLength={1}
            placeholder="Ej: 3"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Goles de Visitante</Form.Label>
          <Form.Control
            type="number"
            name="away_goals"
            value={form.away_goals}
            onChange={handleChange}
            required
            minLength={1}
            placeholder="Ej: 5"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Estado del Partido</Form.Label>
          <Form.Control
            name="status"
            value={form.status}
            onChange={handleChange}
            required
            minLength={1}
            placeholder="Ej: Completed"
          />
        </Form.Group>

        {editingMatches && (
          <Button
            className="me-2"
            variant="secondary"
            type="button"
            onClick={() => {
              setEditingMatches(null);
              setForm({
                home_team_id: '',
                away_team_id: '',
                match_date: '',
                location: '',
                home_goals: '',
                away_goals: '',
                status: '',
              });
            }}
          >
            Cancelar Edición
          </Button>
        )}

        <Button variant="primary" type="submit">
          {editingMatches ? 'Actualizar' : 'Agregar'}
        </Button>
      </Form>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID del Equipo Casa</th>
            <th>ID del Equipo Visitante</th>
            <th>Fecha del Partido</th>
            <th>Lugar del Partido</th>
            <th>Goles de Casa</th>
            <th>Goles de Visitante</th>
            <th>Estado del partido</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match, idx) => (
            <tr key={idx}>
              <td>{match.home_team_id}</td>
              <td>{match.away_team_id}</td>
              <td>{match.match_date}</td>
              <td>{match.location}</td>
              <td>{match.home_goals}</td>
              <td>{match.away_goals}</td>
              <td>{match.status}</td>
              <td>
                <div className="d-flex gap-2">
                  <Button variant="warning" size="sm" onClick={() => handleEdit(match)}>
                    Editar
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(match.id)}>
                    Eliminar
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Matches;
