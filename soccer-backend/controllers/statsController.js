// controllers/statsController.js
import { pool } from '../config/db.js';

export const getStats = async (req, res) => {
	try {
		// Máximo goleador
		const [topScorerRows] = await pool.query(`
			SELECT name, goals FROM players
			WHERE goals = (SELECT MAX(goals) FROM players)
			LIMIT 1
		`);

		// Máximo asistente
		const [topAssisterRows] = await pool.query(`
			SELECT name, assists FROM players
			WHERE assists = (SELECT MAX(assists) FROM players)
			LIMIT 1
		`);

		// Más tarjetas amarillas
		const [mostYellowCardsRows] = await pool.query(`
			SELECT name, yellow_cards FROM players
			WHERE yellow_cards = (SELECT MAX(yellow_cards) FROM players)
			LIMIT 1
		`);

		// Más tarjetas rojas
		const [mostRedCardsRows] = await pool.query(`
			SELECT name, red_cards FROM players
			WHERE red_cards = (SELECT MAX(red_cards) FROM players)
			LIMIT 1
		`);

		// Equipo con más victorias
		// const [topWinningTeamRows] = await pool.query(`
		// 	SELECT teams.name, COUNT(*) AS wins
		// 	FROM matches
		// 	JOIN teams ON (
		// 		(matches.home_team_id = teams.id AND home_goals > away_goals) OR
		// 		(matches.away_team_id = teams.id AND away_goals > home_goals)
		// 	)
		// 	WHERE status = 'finished'
		// 	GROUP BY teams.id
		// 	ORDER BY wins DESC
		// 	LIMIT 1
		// `);

		res.json({
			topScorer: topScorerRows[0] || null,
			topAssister: topAssisterRows[0] || null,
			mostYellowCards: mostYellowCardsRows[0] || null,
			mostRedCards: mostRedCardsRows[0] || null,
			// topWinningTeam: topWinningTeamRows[0] || null,
		});
	} catch (err) {
		console.error('Error al obtener estadísticas:', err);
		res.status(500).json({ message: 'Error al obtener estadísticas' });
	}
};

