import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import connectToDatabase from "./db/db.js";
import bodyParser from "body-parser";
import AuthRouter from "./routes/auth.routes.js";
import FriendRouter from "./routes/friend.routes.js";
import MessageRouter from "./routes/message.route.js";

const app = express();

dotenv.config();

const corsOptions = {
    origin: process.env.WEB_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

app.use("/api/auth", AuthRouter);
app.use("/api/friend", FriendRouter);
app.use("/api/messages", MessageRouter);

connectToDatabase();

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server listening to PORT ${PORT}`);
});