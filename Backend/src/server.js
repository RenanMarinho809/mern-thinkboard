import express from "express"
import router from "../routes/notesRoute.js";
import {connectDB} from "../config/db.js";
import dotenv from "dotenv";
import rateLimiter from "../ middleware  /rateLimiter.js";

dotenv.config();

console.log(process.env.MONGO_URI);

const port = process.env.PORT || 5001;

const app = express()
app.use(express.json())
app.use("/api/notes",router)
app.use(rateLimiter)

connectDB().then(() => {
    app.listen(port, () => {
        console.log("Server running on port 5001");
    });
});