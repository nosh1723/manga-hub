import mongoose from "mongoose";

const dbConnect = () => {
  mongoose
    .connect(`${process.env.DB_URL!}/manga-hub`)
    .then(() => {
      console.log("Connect succeeded");
    })
    .catch(() => {
      console.log("Failed to connect");
    });
};

export default dbConnect;