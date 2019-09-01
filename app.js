const axios = require("axios");
const express = require("express");
let app = express();
const hbs = require("hbs")
const path = require("path")
const url = 'http://poetrydb.org/author/keats';
const PORT = process.env.PORT || 7000;

let bigdata = []

axios.get(url).then(res => {

    getData(res.data);
}).catch(err => {
    console.log(err)
})

function getData(data) {
    data.forEach(element => {
        bigdata.push(element)
    });
}

setTimeout(() => {
    console.log(`${bigdata.length} poems loaded`)
}, 2500);


app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "hbs")

hbs.registerPartials(path.join(__dirname + "/views/partials"));

app.get("/", (req, res) => {
    // res.send("all good");

    res.render("index", {})
    
})

app.get("/", (req, res) => {
    // res.send("all good");
    res.render("index", {})
})

app.get("/poems", (req, res) => {
    res.render("poems/poems", {poem:bigdata})
})

app.get("/poems/random", (req, res) => {
    let random = Math.floor(Math.random() * bigdata.length)
    let poem = bigdata[random]
    res.render("poems/random", poem)
})

app.get("/poems/:id", (req, res) => {
    res.render("poems/random", bigdata[req.params.id])
})

app.get("/about", (req, res) => {
    
    res.render("about", {})
})

app.get("/:anything", (req, res) => {
   res.render("wrong")
})



app.listen(PORT, () => console.log(`works at http://localhost:${PORT}`));




