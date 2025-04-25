import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  Pid: { type: Number, unique: true, required: true },
  title: { type: String, required: true }
});

const Post = mongoose.model('Post', postSchema);

export default Post