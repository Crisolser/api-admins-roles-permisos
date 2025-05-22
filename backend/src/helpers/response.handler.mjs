import dotenv from "dotenv";
dotenv.config();

const successHandler = async (req,res,{message,additionalData,statusCode=200}) => {
  const response = {
      message,
      ...additionalData,
    };

  res.status(statusCode).json(response);
  return;
};

const errorHandler = (req,res,{message = "Error interno",statusCode = 500,}) => {
  const response = {
    message
  };

  res.status(statusCode).json(response);
  return;
};

export const methods = {
  successHandler,
  errorHandler,
};