import express from "express";
import morgan from "morgan";
import Routes from "./manage.routes.mjs";
import { methods as Response } from "./helpers/response.handler.mjs";
import cors from "cors";
const app = express();

app.use(cors());

//Middlewares
app.use(express.json({ limit: "2mb" }));
app.use(morgan("dev"));

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    let message = "JSON malformado. Por favor, verifica la estructura de tus datos."
    Response.errorHandler(req,res,{statusCode: 400,message});
    return;
  }
  next();
});

app.use(Routes);

app.use("/", (req, res) => {
    let message = "Recurso no encontrado"
    Response.errorHandler(req,res,{statusCode: 404,message})
    return
});


export default app;