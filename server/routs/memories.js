import express from 'express';
import {getMemories , createMemory , getMemory , deleteMemory , updateMemory } from '../controllers/memoryController.js'
 
const router = express.Router();

 router.get('/', getMemories );
 router.post('/', createMemory );
 router.get('/:id', getMemory);
 router.put('/:id', updateMemory);
 router.delete('/:id', deleteMemory);
//  router.patch('/:id/likeMemory', likeMemory);

 export default router