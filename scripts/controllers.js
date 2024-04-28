const jwt = require("jsonwebtoken");
const users = require("../data/agentes");
const path = require("path");
const fs = require("fs");

agentes = users.results;

const authLogin = (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const user = agentes.find(
    (user) => user.email === email && user.password === password
  );
  if (user) {
    const token = jwt.sign({ email: email }, process.env.JTW, {
      expiresIn: "2m",
    });
    const datauser = {
      email: user.email,
      password: user.password,
    };
    console.log(token);
    res.json({ token, datauser });
  } else {
    res.sendStatus(401);
  }
};

const restringed = (req, res) => {
    if (!req.headers.authorization) {
        res.sendStatus(401);
        return;
    }
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.JTW);
  res.sendFile(path.join(__dirname + "/../views/dash.html"));
};



const changepass = (req, res) => {
    const { password, old_p } = req.body;
    const user = agentes.find((user) => user.password === old_p);
    if (user) {
        user.password = password;
        //sobre escribir el archivo
        const data = JSON.stringify({ results: agentes },null,2);
        fs.writeFileSync("./data/agentes.json", data, "utf8");
        res.json({ message: "Contraseña cambiada con éxito" });
    } else {
        res.sendStatus(401);
    }
    }


const changemail = (req, res) => {
    // authorize token
    // if (!req.headers.authorization) {
        
    //     return res.status(401).json({ message: "No token provided" });
    // }
    // const token = req.headers.authorization.split(" ")[1];
    // console.log(token)
    
    // jwt.verify(token, process.env.JTW), (err, data) => {
    //     res.send( err ? { message: "Unauthorized" } : data);
    // }
   
    const { email, old_e } = req.body;
    const user = agentes.find((user) => user.email === old_e);
    console.log(user, email);
    if (user) {
        user.email = email;
        //sobre escribir el archivo
        const data = JSON.stringify({ results: agentes },null,2);
        fs.writeFileSync("./data/agentes.json", data, "utf8");
        return res.json({ message: "E-mail cambiado con éxito" });
    } else {
        res.status(401).json({ message: "Unauthorized", data: user});
    }
    }


const logout = (req, res) => {
    res.sendFile(path.join(__dirname + "/../views/index.html"));
    }



module.exports = { authLogin, restringed, changepass, changemail, logout};
