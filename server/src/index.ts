import express from 'express'
import dotenv from 'dotenv'
import { createServer } from 'http'
import cors from 'cors'
import dbConnect from './config/db'
import STATUS from "./utils/status";
import router from './routes/index.route'

dotenv.config()
const app = express()
const server = createServer(app)

app.use(express.json())
app.use(
    cors({
        origin: [
            process.env.CLIENT_URL!,
            "http://localhost:5000",
        ],
        credentials: true,
    })
);

dbConnect();

app.use("/api/v1", router);

app.use("*", (req, res) => {
    res.status(STATUS.BAD_REQUEST).json({
      message: "Đường dẫn không đúng",
      path: req.baseUrl,
    });
  });

server.listen(process.env.PORT, () => {
    console.log(`listening listening http://localhost:${process.env.PORT}`);
  });