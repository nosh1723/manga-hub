import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index.route";
import STATUS from "./utils/status";
import dbConnect from "./config/db";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

// cấu hình req
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: [
      "https://manga-hub-eight.vercel.app",
      process.env.CLIENT_URL!,
    ],
    credentials: true,
  })
);
app.use(cookieParser());

// connect db
dbConnect();

app.use("/api/v1", router);

app.use("*", (req, res) => {
  res.status(STATUS.BAD_REQUEST).json({
    message: "Đường dẫn không đúng",
    path: req.baseUrl,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`listening listening http://localhost:${process.env.PORT}`);
});
