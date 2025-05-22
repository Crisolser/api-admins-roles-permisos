import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { methods as Response } from "./helpers/response.handler.mjs";

dotenv.config();

const AuthToken = async (req, res, next) => {
  const Headers = req.headers;
  const Token = Headers.authorization;
  const Secret = process.env.SECRETJWT;

  if (!Token) {
    let message = "El token de autentificación es necesario"
    Response.errorHandler(req,res,{statusCode: 403,message})
    return;

  } else if (!Token.startsWith("Bearer ")) {

    let message = "El token debe ser un Bearer token"
    Response.errorHandler(req,res,{statusCode: 403,message})
    return;

  } else {

    try {
      const CorrectToken = Token.substring(7, Token.length);
      const Jwtdecoded = jwt.verify(CorrectToken, Secret);
      req.user = Jwtdecoded.admin;
      req.user_permissions = Jwtdecoded.permissions;
      next();
    } catch (Err) {
      let message = Err.message
      Response.errorHandler(req,res,{statusCode: 403,message}
      );
      return;
    }

  }
};

export default AuthToken