import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  Uid: { type: Number, unique: true, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  joined: { type: Date, default: Date.now },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: false },
  comment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: false }
});

const User = mongoose.model('User', userSchema);
export default User