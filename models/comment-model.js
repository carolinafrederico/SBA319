import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  Cid: { type: Number, unique: true, required: true },
  body: { type: String, required: true }
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment