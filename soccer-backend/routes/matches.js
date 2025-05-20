import { Router } from 'express';

import {
	getMatches,
	addMatch,
	updateMatch,
	deleteMatch
} from '../controllers/matchesController.js';

const router = Router();

router.get('/', getMatches);
router.post('/', addMatch);
router.put('/:id', updateMatch);
router.delete('/:id', deleteMatch);

export default router;
