import connect_database from "./db/index.js";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

// connect_database()
// .then(() => {
//     app.listen(process.env.PORT || 8000, () => {
//         console.log(`Server running at port: ${process.env.PORT}`);
//     })
// })
// .catch((error) => {
//     console.log(`MongoDB connection failed: ${error}`);
// })

connect_database()
  .then(() => {
    console.log(`MongoDB connected successfully`);
  })
  .catch((error) => {
    console.error(`MongoDB connection failed: ${error}`);
  });
