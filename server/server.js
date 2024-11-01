import express from "express";
import cors from "cors";
import "dotenv/config";



// APP CONFIG 
const app = express();
const port = process.env.PORT || 4000; 

//MIDDLEWARES
app.use(express.json());
