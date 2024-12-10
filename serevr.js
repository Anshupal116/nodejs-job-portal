//API Documantation
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "swagger-jsdoc";
//imports packges
import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
//security packges
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
//files import
import connectDB from "./config/db.js";
//route imoport
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errormiddelware from "./middelwares/errorMiddelwares.js";
import userRoutes from "./routes/usersRoutes.js";
import jobsRoutes from "./routes/jobsRoutes.js";
import { info } from "console";
import { title } from "process";
import { url } from "inspector";

//DOT ENV config
dotenv.config();

//mongoDB connect
connectDB();

//swagger API config
//swagger API options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Portal Application",
      description: "Node Express Job Application",
    },
    servers: [
      {
        //url: "http://localhost:8080",
        url: "https://nodejs-job-portal-wrrg.onrender.com",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const spec = swaggerDoc(options);

//rest object
const app = express();

//middelwear
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//route
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobsRoutes);

//homeroute root
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));

//validation middelware
app.use(errormiddelware);

//PORT
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(
    `Node Server Running In ${process.env.DEV_MODE} Mode on port no ${PORT}`
      .bgCyan.white
  );
});
