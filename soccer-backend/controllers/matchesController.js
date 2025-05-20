import { pool } from '../config/db.js';


export async function getMatches(req, res) {
    const [rows] = await pool.query('SELECT * FROM matches');
    res.json(rows);
}

export async function addMatch(req, res) {
    const { home_team_id, away_team_id, match_date, location, home_goals, away_goals, status } = req.body;
    const [result] = await pool.query(
        `INSERT INTO matches (home_team_id, away_team_id, match_date, location, home_goals, away_goals, status)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [home_team_id, away_team_id, match_date, location, home_goals || 0, away_goals || 0, status || "Completado"]
    );
    res.status(201).json({ id: result.insertId });
}

export async function updateMatch(req, res) {
    const { id } = req.params;
    const { home_team_id, away_team_id, match_date, location, home_goals, away_goals, status } = req.body;

    const [result] = await pool.query(
        `UPDATE matches 
             SET home_team_id=?, away_team_id=?, match_date=?, location=?, home_goals=?, away_goals=?, status=?
             WHERE id=?`,
        [home_team_id, away_team_id, match_date, location, home_goals, away_goals, status, id]
    );
    res.json({ message: 'Partido actualizado' });
}

export async function deleteMatch(req, res) {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM matches WHERE id=?', [id]);
    res.json({ message: 'Partido eliminado' });

}

