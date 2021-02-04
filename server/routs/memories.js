import express from 'express';
import {getMemories , createMemory , getMemory , deleteMemory , updateMemory } from '../controllers/memoryController.js'
import auth from '../middleware/auth.js'
const router = express.Router();

 router.get('/', getMemories );
 router.post('/',auth, createMemory );
 router.get('/:id',auth, getMemory);
 router.put('/:id',auth, updateMemory);
 router.delete('/:id',auth, deleteMemory);
//  router.patch('/:id/likeMemory',auth, likeMemory);

 export default router