const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const multer = require("multer");

const app = express();

app.use(cors());
app.use(express.json());

const con = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12820108",
  password: "BU3RnKZeKb",
  database: "sql12820108"
});


// STORE FILE IN MEMORY
const storage = multer.memoryStorage();
const upload = multer({ storage });


// SAVE STUDENT
app.post("/ss", upload.single("file"), (req, res) => {

  let sql = "insert into student values(?, ?, ?, ?, ?)";
  let data = [
    req.body.rno,
    req.body.name,
    req.body.marks,
    req.file.buffer,
    req.file.mimetype
  ];

  con.query(sql, data, (error, result) => {

    if (error)
      res.send(error);
    else
      res.send(result);

  });

});


// GET STUDENTS
app.get("/gs", (req, res) => {

  let sql = "select rno,name,marks,file,mime from student";

  con.query(sql, (error, result) => {

    if (error)
      res.send(error);
    else {

      let alldata = result.map((row) => {

        return {
          rno: row.rno,
          name: row.name,
          marks: row.marks,
          file: row.file.toString("base64"),
          mime: row.mime
        };

      });

      res.send(alldata);
    }

  });

});


// DELETE STUDENT
app.delete("/ds", (req, res) => {

  let sql = "delete from student where rno = ?";
  let data = [req.body.rno];

  con.query(sql, data, (error, result) => {

    if (error)
      res.send(error);
    else
      res.send(result);

  });

});


// SERVER
app.listen(9000, () => {
  console.log("Ready to serve @ 9000");
});
