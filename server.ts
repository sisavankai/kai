//import express, { Express, Request, Response } from 'express'
import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv'
import connection from "./utils/db"
import bodyParser from 'body-parser';
import authRoutes from "./routes/authRoutes"
import productRoutes from "./routes/productRoutes"

// initialize dotenv
dotenv.config()

//  create express instance
const app:Express = express()

//parse incoming json requests
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// create URL Routing
app.get("/", (req: Request, res:Response)=> {
    res.send("hello, this is TypesScript nodejs project")
});

// use Routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)

// Test Connect Database MySQL
app.get("/testdb", (req: Request, res:Response)=> {
   connection.connect((erorr: Error | unknown) => {
    if(erorr){
        res.send(`Error connecting to database:${erorr}`)
    } else {
        res.send(`Database is connected successfully`)
   }
})
});

// start server on port 3000
const port:string | number = process.env.PORT || 3000
app.listen(port, () => {
     console.log(`server is running on http://localhost:${port}`)
})

