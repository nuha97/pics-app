import MemoryModel from '../models/memoryModel.js';
  
import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

export const getMemories = async (req,res)=>{
    
    try {
        const memoryData = await MemoryModel.find()
        res.status(200).json(memoryData);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const createMemory = async (req,res)=>{
  const memory = req.body;
  const newMemory = new MemoryModel(memory)
 // console.log(memory);
  try {
    await newMemory.save();
    res.status(201).json(newMemory);
      
  } catch (error) {
    res.status(409).json({ message : error.message })
  }
}

export const getMemory = async (req, res) => { 
  const { id } = req.params;

  try { 
      const memory = await MemoryModel.findById(id);
      
      res.status(200).json(memory);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}

export const updateMemory = async (req, res) => {
  const { id } = req.params;
  const { title, description, imageFile, tags } = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  const updatedMemory = {  title, description, imageFile,tags,_id: id };
    await MemoryModel.findByIdAndUpdate(id, updatedMemory, { new: true });

  res.json(updatedMemory);
}

export const deleteMemory = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${_id}`);

  await MemoryModel.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
}

// export const likePost = async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  
//   const post = await PostMessage.findById(id);

//   const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
  
//   res.json(updatedPost);
// }

export default router;

