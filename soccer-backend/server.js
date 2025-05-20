import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import initRoutes from './routes/init.js';
import teamRoutes from './routes/teams.js';
import playerRoutes from './routes/players.js';
import matchesRoutes from './routes/matches.js';
import statsRoutes from './routes/stats.js';


dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
	origin: 'http://localhost:5173',
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	credentials: true
}));

app.use('/api/teams', teamRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/matches', matchesRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api', initRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
