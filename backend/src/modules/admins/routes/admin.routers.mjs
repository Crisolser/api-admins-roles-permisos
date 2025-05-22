import { Router } from "express";

const router = Router();

router.get("/me",(req,res) => {res.status(200).json({"message":"ruta get admin/me"})})
router.get("/",(req,res) => {res.status(200).json({"message":"ruta get admin/"})})
router.get("/:id",(req,res) => {res.status(200).json({"message":"ruta get admin/:id"})})
router.post("/",(req,res) => {res.status(200).json({"message":"ruta post admin/"})})
router.put("/:id",(req,res) => {res.status(200).json({"message":"ruta put admin/:id/"})})
router.get("/:id/permission",(req,res) => {res.status(200).json({"message":"ruta get admin/:id/permission"})})
router.put("/:id/permission",(req,res) => {res.status(200).json({"message":"ruta put admin/:id/permission"})})

export default router