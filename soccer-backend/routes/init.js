// routes/init.js
import express from 'express';
import { createDatabaseAndTables } from '../scripts/initDb.js';

const router = express.Router();

router.get('/init', async (req, res) => {
	try {
		await createDatabaseAndTables();
		res.status(200).json({ message: 'Base de datos creada con éxito' }); // Status OK
	} catch (error) {
		res.status(500).json({ error: 'Error al crear la base de datos', details: error.message });
	}
});

export default router;

