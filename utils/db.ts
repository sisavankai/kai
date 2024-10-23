import mysql, { ConnectionOptions } from 'mysql2'
import dotenv from 'dotenv'

// initialize dotenv
dotenv.config()

const dbConfig: ConnectionOptions = { 
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '3306'),
    database: process.env.DB_DATABASE
}

const Connection = mysql.createConnection(dbConfig)

Connection.connect((error: Error | unknown) => {
    if(error){
            console.log('Error connecting to databese', error)
     }else{
                        
             console.log('Database in connected successfully') }
        
})

export default Connection