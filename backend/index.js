import express from "express"
import mysql from"mysql"
import cors from "cors"

const app=express()

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Ayush@123",
    database:"test"

});
//by default we cannot send any data to express server
//so we use below to send json to express server
app.use(express.json());
//this allows us to send any json file using client
 
app.use(cors())

app.get("/",(req,res)=>{//to reach backend server   / is the home page
    res.json("hello this is the backend")
})

app.get("/books",(req,res)=>{
    const q="SELECT * FROM books"
    db.query(q,(err,data)=>{         //the query q when run can give a error or data
        if(err)return res.json(err)     //basic error handling
        return res.json(data)
    })
})

app.post("/books",(req,res)=>{
    const q="INSERT INTO books(`title`,`desc`,`price`,`cover`)VALUES(?)"
    const values=[req.body.title,//this values from postman
                req.body.desc,
                req.body.price,
                req.body.cover];
    db.query(q,[values],(err,data)=>{
        if(err)return res.json(err)     //basic error handling
        return res.json("book created successfully")
    })
})

app.delete("/books/:id",(req,res)=>{
    const bookId=req.params.id; //params indicate the url passed as parameter(here /books/:id)
    const q="DELETE FROM books where id=?"
    db.query(q,[bookId],(err,data)=>{
        if(err)return res.json(err)
        return res.json("book deleted successfully")
    })
});

app.put("/books/:id",(req,res)=>{
    const bookId=req.params.id; //params indicate the url passed as parameter(here /books/:id)
    const q="UPDATE books SET `title`=?,`desc`=?,`price`=?,`cover`=? WHERE id=?"
    const values=[
                req.body.title,//this values from postman(we see values in body in post)
                req.body.desc,
                req.body.price,
                req.body.cover];
    db.query(q,[...values,bookId],(err,data)=>{
        if(err)return res.json(err)
        return res.json("book updated successfully ")
    })
});

app.listen(8800,()=>{       //8800 is the port number
    console.log("connected to backend!")
})