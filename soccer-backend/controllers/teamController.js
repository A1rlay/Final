import { pool } from '../config/db.js';

export async function getTeams(req, res) {
	const [rows] = await pool.query('SELECT * FROM teams');
	res.json(rows);
}

export async function addTeam(req, res) {
	const { name, city, founded_year, stadium, coach, logo } = req.body;
	const [result] = await pool.query(
		`INSERT INTO teams (name, city, founded_year, stadium, coach, logo)
     VALUES (?, ?, ?, ?, ?, ?)`,
		[name, city, founded_year, stadium, coach, logo]
	);
	res.status(201).json({ id: result.insertId });
}

export async function updateTeam(req, res) {
	const { id } = req.params;
	const { name, city, founded_year, stadium, coach, logo } = req.body;
	await pool.query(
		`UPDATE teams
     SET name=?, city=?, founded_year=?, stadium=?, coach=?, logo=?
     WHERE id=?`,
		[name, city, founded_year, stadium, coach, logo, id]
	);
	res.json({ message: 'Equipo actualizado' });
}

export async function deleteTeam(req, res) {
	const { id } = req.params;
	await pool.query('DELETE FROM teams WHERE id=?', [id]);
	res.json({ message: 'Equipo eliminado' });
}

