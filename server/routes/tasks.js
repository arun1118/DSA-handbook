import express from 'express';
const router=express.Router()

import { getAllProblems,addProblem,getSingleProblem, updateProblem, deleteProblem } from '../controller/control.js';

router.route('/').get(getAllProblems);
router.route('/').post(addProblem);
router.route('/:problemId').get(getSingleProblem);
router.route('/:problemId').patch(updateProblem);
router.route('/:problemId').delete(deleteProblem);

export default router;