import mongoose from "mongoose";
const Schema = mongoose.Schema;

const messageSchema = new Schema({});

const Message = mongoose.model("message", userSchema);
export default Message;