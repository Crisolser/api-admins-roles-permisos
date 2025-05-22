import app from "./app.mjs";
import dotenv from "dotenv";
import syncDB from "./database/sync.mjs";

dotenv.config();

const Puerto = process.env.PORT;

const main = () => {
  app.listen(Puerto);
  console.log(`Servidor escuchando en el puerto ${Puerto}`);
};
syncDB()
main();