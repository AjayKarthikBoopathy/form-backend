import express from "express"
import { usersRouter } from "./Routers/user.js";
import cors from "cors"

//initiating the server
const app = express();

//middleware
app.use(express.json());

app.use(cors());

//users routers
app.use("/users", usersRouter)     
      

//starting the server
app.listen(9090, ()=>console.log("server running in localhost:9090")) 
