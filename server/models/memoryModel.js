import mongoose from 'mongoose';

const memorySchema = mongoose.Schema({
    title: String,
    description: String,
    // user: String,
    tags: [String],
    imageFile: String,
    likeCount: {
        type: Number,
        default: 0,
    },
    date: {
        type: Date,
        default: new Date(),
    },
})

var MemoryModel = mongoose.model('memoryModel', memorySchema);

export default MemoryModel;