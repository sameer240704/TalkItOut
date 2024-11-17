import mongoose from "mongoose";
const Schema = mongoose.Schema;

const messageSchema = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        receiver: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        type: {
            type: String,
            enum: ["text", "image", "document"],
            required: true,
        },
        content: {
            type: String,
            required: function () {
                return this.type === "text";
            },
        },
        fileUrl: {
            type: String,
            required: function () {
                return this.type !== "text";
            },
        },
        fileName: {
            type: String,
            required: function () {
                return this.type === "document";
            },
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
