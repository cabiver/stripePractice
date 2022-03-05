const express = require("express")
const exphbs = require('express-handlebars')
const path =require('path')

const app = express()


app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layouutsDir: path.join(app.get('views'), 'layouts'),
    parcialDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}))
app.set('view engine', '.hbs')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(require('./routes/index'))


app.use(express.static(path.join(__dirname, 'public')))

app.listen(3000, ()=>{
    console.log("puerto corriendo")
})