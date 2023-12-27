const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const env = require("dotenv");
const PORT = process.env.Port || 7001;
const { notFound, errorHandler } = require("./middlewares/errorHandler");

const connectDb = require("./config/dbconfig");
const userRoute = require("./Routes/userRoute");
// const otpRoute = require("./Routes/otpRoute");
// const adminRoute = require("./Routes/adminRoute");

const app = express();
env.config();
mongoose.set("strictQuery", true);
connectDb();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/api/users", userRoute);
// app.use("/api/otp", otpRoute);
// app.use("/api/admin", adminRoute);

app.use(notFound)
app.use(errorHandler)

const os = require("os");
const ipAddress = Object.values(os.networkInterfaces())
  .flat()
  .find(({ family, internal }) => family === "IPv4" && !internal).address;

app.listen(PORT, ipAddress, () => {
  console.log(`Server listening on http://${ipAddress}:${PORT}`);
});


// app.listen(PORT, "127.0.0.1", () => {
//   console.log(`App is running on http://127.0.0.1:${PORT}/api`);
// });
