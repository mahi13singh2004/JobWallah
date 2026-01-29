import express from 'express';
import { searchJobs } from '../controllers/jobSearch.controller.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

router.post('/search', verifyToken, searchJobs);

export default router;
