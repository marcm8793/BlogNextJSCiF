import "dotenv/config";
import express from "express";
import blogPostRoutes from "./routes/blog-posts";
import cors from "cors";
import env from "./env";
import morgan from "morgan";
import errorHandler from "./middlewares/errorHandler";
import createHttpError from "http-errors";
import userRoutes from "./routes/user";
import session from "express-session";
import passport from "passport";
import sessionConfig from "./config/session";
import "./config/passport";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use(
  cors({
    origin: env.WEBSITE_URL,
    credentials: true,
  })
);

app.use(session(sessionConfig));

app.use(passport.authenticate("session"));

app.use("/uploads/featured-images", express.static("uploads/featured-images"));

app.use("/users", userRoutes);
app.use("/posts", blogPostRoutes);

app.use((req, res, next) => next(createHttpError(404, "Endpoint not found")));

app.use(errorHandler);

export default app;
