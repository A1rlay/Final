import { pool } from '../config/db.js';

export async function getPlayers(req, res) {
	const [rows] = await pool.query('SELECT * FROM players');
	res.json(rows);
}

export async function addPlayer(req, res) {
	const { name, team_id, nationality, position, number, age, goals, assists, yellow_cards, red_cards } = req.body;
	const [result] = await pool.query(
		`INSERT INTO players (name, team_id, nationality, position, number, age, goals, assists, yellow_cards, red_cards)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
		[name, team_id, nationality, position, number, age, goals || 0, assists || 0, yellow_cards || 0, red_cards || 0]
	);
	res.status(201).json({ id: result.insertId });
}

export async function updatePlayer(req, res) {
	const { id } = req.params;
	const { name, team_id, nationality, position, number, age, goals, assists, yellow_cards, red_cards } = req.body;
	const [result] = await pool.query(
		`UPDATE players
             SET name=?, team_id=?, nationality=?, position=?, number=?, age=?, goals=?, assists=?, yellow_cards=?, red_cards=?
             WHERE id=?`,
		[name, team_id, nationality, position, number, age, goals, assists, yellow_cards, red_cards, id]
	);
	res.json({ message: 'Jugador actualizado' });
}

export async function deletePlayer(req, res) {
	const { id } = req.params;
	const [result] = await pool.query('DELETE FROM players WHERE id=?', [id]);
	res.json({ message: 'Jugador eliminado' });
}

