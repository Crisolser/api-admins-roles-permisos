import express from "express";
import morgan from "morgan";
import AllRoutes from "./all.routes.mjs";
import { methods as Response } from "./utils/helpers/response.handler.mjs";
import cors from "cors";
const app = express();

app.use(cors());

//Middlewares
app.use(express.json({ limit: "2mb" }));
app.use(morgan("dev"));

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    Response.errorHandler(
      res,
      {
        statusCode: 400,
        message: "JSON malformado. Por favor, verifica la estructura de tus datos.",
      },
      req
    );
    return;
  }
  next();
});

app.use("/api", AllRoutes);
//Principal routes
app.use("/", (req, res) => {
  Response.errorHandler(
    res,
    {
      statusCode: 404,
      message: "Recurso no encontrado",
    },
    req
  );
  return;
});

//Principal routes
export default app;