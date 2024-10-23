import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import connection from "../utils/db";
import dotenv from "dotenv";
import { stat } from "fs";

//initialize dotenv 
dotenv.config();
// define interface for User
interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

// Register function
async function register(req: Request, res: Response): Promise<void> {
  // get data from request
  const { firstname, lastname, email, password }: User = req.body;

  // check if user already exists
  try {
    connection.execute(
      "Select * from users where email = ?",
      [email],
      function (error: any, results: any) {
        if (error) {
          results.Json({
            status: 500,
            message: error,
          });
          return;
        } else if (results.length > 0) {
          res.json({
            status: "error",
            message: "Email already exists",
          });
          return;
        } else {
          // hash password
          bcrypt.hash(password, 10, function (err, hash) {
            if (err) {
              res.json({
                status: "error",
                message: "Error hashing password",
              });
              return;
            } else {
              // Store user in database
              const sql =
                "INSERT INTO users (firstname, lastname, email, password, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())";
              const values = [firstname, lastname, email, hash];

              // insert user into database
              connection.execute(
                sql,
                values,
                function (error: any, results: any, fields: any) {
                  if (error) {
                    res.json({
                      status: "error",
                      message: error,
                    });
                    return;
                  } else {
                    //    Generate JWT token
                    const token = jwt.sign(
                      { email },
                      process.env.JWT_SECRET || ""
                    );
                    res.json({
                      status: "ok",
                      message: "User registered successfully",
                      token,
                      user: {
                        id: results.insertId,
                        firstname: firstname,
                        lastname: lastname,
                        email: email,
                      },
                    });
                    return;
                  }
                }
              );
            }
          });
        }
      }
    );
  } catch (error) {
    console.log("Error registering user: ", error);
    res.sendStatus(500);
  }
}

// login function
async function login(req: Request, res: Response): Promise<void> {
  // get data from body
  const { email, password }: User = req.body;

  // check if user exists
  try {
    connection.execute(
      "Select * from users where email = ?", [email],
      function (error: any, results: any) {
        if (error) {
          res.json({ status: "error", message: "error" })
          return
        } else {
          if (results.length > 0) { //ເຈີອີເມວໃນຖານຂໍ້ມູນ
            // compare password with hashed password
            bcrypt.compare(password, results[0].password, 
              function (err,result){
                if(err){
                  res.json({ status: "error", message: "error" })
                  return
                }else if(result){
                  // Generate JWT token
                  const token = jwt.sign(
                    { email },
                    process.env.JWT_SECRET || ""
                  );
                  
                  res.json({
                    status: "ok",
                    message: "User logged in successfully",
                    token,
                    user: {
                      id: results[0].id,
                      firstname: results[0].firstname,
                      lastname: results[0].lastname,
                      email: results[0].email,
                    },
                })
                }else{
                  res.json({ status: "error", message: "invaild password" })
                  return
                }
              }
            )
          }  else {
            res.json({ status: "error", message: "email not found" })
            return
          }
        }            
          })
      } catch (error) {
    console.log("Error logging in user: ", error);
    res.sendStatus(500);
  }
      
}

export  { register, login };