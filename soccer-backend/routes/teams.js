import { Router } from 'express';
import {
	getTeams, addTeam, updateTeam, deleteTeam
} from '../controllers/teamController.js';

const router = Router();

router.get('/', getTeams);
router.post('/', addTeam);
router.put('/:id', updateTeam);
router.delete('/:id', deleteTeam);

export default router;

