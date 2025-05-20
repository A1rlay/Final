import { useState, useEffect } from 'react';
import { Container, Form, Button, Table } from 'react-bootstrap';
import { teamsApi } from '../api/api';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [form, setForm] = useState({
    name: '',
    city: '',
    founded_year: '',
    stadium: '',
    coach: '',
    logo: ''
  });

  const [editingTeam, setEditingTeam] = useState(null);

  useEffect(() => {
    teamsApi.getTeams().then(data => {
      setTeams(data);
    });
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTeam) {
        await teamsApi.updateTeam(editingTeam.id, form);
        setEditingTeam(null);
      } else {
        await teamsApi.addTeam(form);
      }
      setForm({ name: '', city: '', founded_year: '', stadium: '', coach: '', logo: '' });
      const data = await teamsApi.getTeams();
      setTeams(data);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro que quieres eliminar este equipo?')) {
      try {
        await teamsApi.deleteTeam(id);
        const data = await teamsApi.getTeams();
        setTeams(data);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleEdit = (team) => {
    setEditingTeam(team);
    setForm({
      name: team.name,
      city: team.city,
      founded_year: team.founded_year,
      stadium: team.stadium,
      coach: team.coach,
      logo: team.logo,
    });
  };

  return (
    <Container>
      <h2 className="my-4">Equipos</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            minLength={2}
            placeholder="Ej: Real Madrid"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Ciudad</Form.Label>
          <Form.Control
            name="city"
            value={form.city}
            onChange={handleChange}
            required
            minLength={2}
            placeholder="Ej: Madrid"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Año de Fundación</Form.Label>
          <Form.Control
            name="founded_year"
            value={form.founded_year}
            onChange={handleChange}
            required
            type="number"
            min="1800"
            max={new Date().getFullYear()}
            placeholder="Ej: 1902"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Estadio</Form.Label>
          <Form.Control
            name="stadium"
            value={form.stadium}
            onChange={handleChange}
            required
            minLength={3}
            placeholder="Ej: Santiago Bernabéu"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Entrenador</Form.Label>
          <Form.Control
            name="coach"
            value={form.coach}
            onChange={handleChange}
            required
            minLength={3}
            placeholder="Ej: Carlo Ancelotti"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Logo (URL)</Form.Label>
          <Form.Control
            name="logo"
            value={form.logo}
            onChange={handleChange}
            required
            type="url"
            pattern="https?://.+"
            placeholder="Ej: https://example.com/logo.png"
          />
        </Form.Group>
        {editingTeam && (
          <Button className="mt-3 me-2" type="button" variant="secondary" onClick={() => {
            setEditingTeam(null);
            setForm({ name: '', city: '', founded_year: '', stadium: '', coach: '', logo: '' });
          }}>
            Cancelar Edición
          </Button>
        )}
        <Button className="mt-3" variant="primary" type="submit">Agregar Equipo</Button>
      </Form>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Ciudad</th>
            <th>Año</th>
            <th>Estadio</th>
            <th>Entrenador</th>
            <th>Logo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((t, idx) => (
            <tr key={idx}>
              <td>{t.name}</td>
              <td>{t.city}</td>
              <td>{t.founded_year}</td>
              <td>{t.stadium}</td>
              <td>{t.coach}</td>
              <td><img src={t.logo} alt={t.name} height="30" /></td>
              <td>
                <div className="d-flex gap-2">
                  <Button variant="warning" size="sm" onClick={() => handleEdit(t)}>Editar</Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(t.id)}>Eliminar</Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Teams;

