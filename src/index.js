const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

const userRouter = require("./routes/userRouter");
const macroRouter = require("./routes/macroRouter");
const exerciseRouter = require("./routes/exerciseRouter");
const authRouter = require("./routes/authRouter");
const db = require("./models");

//dotenv config
const dotenv = require("dotenv");
dotenv.config();

const app = express();

//set up helmet
app.use(helmet());

//set up rate limit
const limiter = rateLimit({
    windowMS: 15 * 60 * 1000, //15 minutes
    max: 100, //only 100 request per IP every ^^^ minutes
    delayMs: 0, // delay time between request
});

app.use(limiter);
app.use(cors("*"));
app.use(express.json());

app.use("/user", userRouter);
app.use("/macros", macroRouter);
app.use("/exercise", exerciseRouter);
app.use("/auth", authRouter);

//{force:true}
db.sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => console.log("running"));
});
