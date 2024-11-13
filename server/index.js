import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import connectToDatabase from "./db/db.js";
import bodyParser from "body-parser";
import AuthRouter from "./routes/auth.routes.js";

const app = express();

dotenv.config();

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'UPDATE'],
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
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

app.use("/api/auth", AuthRouter);

connectToDatabase();

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server listening to PORT ${PORT}`);
});