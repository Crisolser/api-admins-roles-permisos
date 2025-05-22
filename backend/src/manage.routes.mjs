import { Router } from "express";
import AuthToken from "./auth.token.mjs";
import Login from "./modules/login/routes/login.routes.mjs";

const router = Router();


router.use("/test", (req,res)=>{
    return res.status(200).json({message:"todo ok"})
});
router.use("/login",Login);
router.use(AuthToken)
router.use("/admin",() => {});
router.use("/role",() => {});
router.use("/permission",() => {});

export default router;