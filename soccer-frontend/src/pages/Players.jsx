import { useState, useEffect } from 'react';
import { Container, Form, Button, Table } from 'react-bootstrap';
import { playersApi } from '../api/api';

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [form, setForm] = useState({
    name: '',
    team_id: '',
    nationality: '',
    position: '',
    number: '',
    age: '',
    goals: '',
    assists: '',
    yellow_cards: '',
    red_cards: '',
  });
  const [editingPlayer, setEditingPlayer] = useState(null);

  useEffect(() => {
    playersApi.getPlayers().then(data => {
      setPlayers(data);
    });
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPlayer) {
        await playersApi.updatePlayer(editingPlayer.id, form);
        setEditingPlayer(null);
      } else {
        await playersApi.addPlayer(form);
      }
      setForm({ name: '', team_id: '', nationality: '', position: '', number: '', age: '', goals: '', assists: '', yellow_cards: '', red_cards: '' });
      const data = await playersApi.getPlayers();
      setPlayers(data);
    } catch (error) {
      alert(error.message);
    }
  };
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro que quieres eliminar este jugador?')) {
      try {
        await playersApi.deletePlayer(id);
        const data = await playersApi.getPlayers();
        setPlayers(data);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleEdit = player => {
    setEditingPlayer(player);
    setForm({
      name: player.name,
      team_id: player.team_id,
      nationality: player.nationality,
      position: player.position,
      number: player.number,
      age: player.age,
      goals: player.goals,
      assists: player.assists,
      yellow_cards: player.yellow_cards,
      red_cards: player.red_cards,
    });
  };

  return (
    <Container>
      <h2 className="my-4">{editingPlayer ? 'Editar Jugador' : 'Agregar Jugador'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            minLength={2}
            placeholder="Ej: Lionel Messi"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>ID del Equipo</Form.Label>
          <Form.Control
            type="number"
            name="team_id"
            value={form.team_id}
            onChange={handleChange}
            required
            min={1}
            placeholder="Ej: 1"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Nacionalidad</Form.Label>
          <Form.Control
            name="nationality"
            value={form.nationality}
            onChange={handleChange}
            required
            minLength={2}
            placeholder="Ej: Argentina"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Posición</Form.Label>
          <Form.Control
            name="position"
            value={form.position}
            onChange={handleChange}
            required
            minLength={2}
            placeholder="Ej: Delantero"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Numero</Form.Label>
          <Form.Control
            name="number"
            value={form.number}
            onChange={handleChange}
            required
            minLength={1}
            placeholder="Ej: 11"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Edad</Form.Label>
          <Form.Control
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            required
            min={15}
            max={50}
            placeholder="Ej: 34"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Goles</Form.Label>
          <Form.Control
            type="number"
            name="goals"
            value={form.goals}
            onChange={handleChange}
            required
            min={0}
            max={5000}
            placeholder="Ej: 602"
          />
        </Form.Group>


        <Form.Group className="mb-3">
          <Form.Label>Asistencias</Form.Label>
          <Form.Control
            type="number"
            name="assists"
            value={form.assists}
            onChange={handleChange}
            required
            min={0}
            max={5000}
            placeholder="Ej: 427"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Tarjetas Amarillas</Form.Label>
          <Form.Control
            type="number"
            name="yellow_cards"
            value={form.yellow_cards}
            onChange={handleChange}
            required
            min={0}
            max={5000}
            placeholder="Ej: 17"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Tarjetas Rojas</Form.Label>
          <Form.Control
            type="number"
            name="red_cards"
            value={form.red_cards}
            onChange={handleChange}
            required
            min={0}
            max={5000}
            placeholder="Ej: 7"
          />
        </Form.Group>

        {editingPlayer && (
          <Button
            className="me-2"
            variant="secondary"
            type="button"
            onClick={() => {
              setEditingPlayer(null);
              setForm({
                name: '',
                team_id: '',
                nationality: '',
                position: '',
                number: '',
                age: '',
                goals: '',
                assists: '',
                yellow_cards: '',
                red_cards: '',
              });
            }}
          >
            Cancelar Edición
          </Button>
        )}

        <Button variant="primary" type="submit">
          {editingPlayer ? 'Actualizar' : 'Agregar'}
        </Button>
      </Form>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>ID Equipo</th>
            <th>Nacionalidad</th>
            <th>Posición</th>
            <th>Numero</th>
            <th>Edad</th>
            <th>Goles</th>
            <th>Asistencias</th>
            <th>Tarjetas Amarillas</th>
            <th>Tarjetas Rojas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, idx) => (
            <tr key={idx}>
              <td>{player.name}</td>
              <td>{player.team_id}</td>
              <td>{player.nationality}</td>
              <td>{player.position}</td>
              <td>{player.number}</td>
              <td>{player.age}</td>
              <td>{player.goals}</td>
              <td>{player.assists}</td>
              <td>{player.yellow_cards}</td>
              <td>{player.red_cards}</td>
              <td>
                <div className="d-flex gap-2">
                  <Button variant="warning" size="sm" onClick={() => handleEdit(player)}>
                    Editar
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(player.id)}>
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

export default Players;

