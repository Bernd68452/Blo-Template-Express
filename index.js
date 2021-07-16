const express = require("express")
const fs = require("fs")
const app = express()
const PORT = process.env.PORT || 3000


app.use(express.static(`public`))
app.use(express.static(`img`))
app.set("view engine","ejs")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

let jsonData = []

console.log(fs.existsSync('./fullArticles.json'))
if (!fs.existsSync('./fullArticles.json')) {
    fs.writeFile('./fullArticles.json', "[]", 'utf8', (err) => {
        if (err) throw err
        console.log("Datei erstellt")
    })
} else {
    fs.readFile('./fullArticles.json', 'utf8', (err, data) => {
        if (err) throw err
        jsonData = JSON.parse(data)
        console.log(jsonData)
    })
}

app.get("/", (req,res)=>{
    res.render("index",{ title: "Home", gallery, mainGallery })
})

app.get("/add", (req,res)=>{
    res.render("add",{ title: "ADD NEW ARTICLE", gallery, mainGallery })
})
app.get("/thanxPage", (req,res)=>{
    res.render("thanxPage",{ title:"Thank you" })
})
app.get("/article/:id", (req,res)=>{
    let id = req.params.id
    console.log(id)
    res.render("article",{ title:"Read an Article",someData: gallery,ident: id, gallery, mainGallery })
})




app.post('/add', (req, res) => {
    console.log(req.body)
 
    jsonData.push({
        id: idLength,
        title: req.body.title,
        url: req.body.url,
        author: req.body.author,
        author_bild: req.body.authorPicture,
        body: req.body.article
    })
   

    fs.writeFile('./fullArticles.json', JSON.stringify(jsonData), 'utf8', (err) => {
        if (err) throw err
    })
    res.redirect('/thanxPage')
})

const gallery = require("./fullArticles.json")
const mainGallery = require("./articles.json")
let idLength=gallery.length+1




app.listen(PORT, ()=>console.log(`http://localhost:${PORT}`))