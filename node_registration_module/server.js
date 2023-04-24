/* To access server: type 'npm run devStart' in the node_registration_module directory. 
Then, go to http://localhost:3000/login in web browser 
if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
} */
require('dotenv').config()
//Imports
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const path = require('path')
//const mongoose = require('mongoose')
//const MongoStore = require('connect-mongo')(session)
//const mongodb = require('mongodb')

// MongoDB Database //

//mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })//, useUnifiedTopology: true} )
/*mongoose.connect('mongodb://localhost/nodedb', { useNewUrlParser: true })//, useUnifiedTopology: true} )
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database')) */

const initializePassport = require('./passport-config')
initializePassport(passport,
 email => users.find(user => user.email === email),
 id    => users.find(user => user.id === id)
)

const users = []
//const dbconnect = mongodb.MongoClient.connect('mongodb://localhost:3000')

app.set('views', path.join(__dirname, 'views'))
app.set('view-engine', 'ejs')

app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
    /*store: new MongoStore({
        url: 'mongodb://localhost:3000/nodedb',
        ttl: 14 * 24 * 60 * 60,
        autoRemove: 'native'
    }) */
})) 

/*app.get('/end', (req, res, next) => {
    req.session.destroy(err => {
        if (err){
            console.log(err);
        } else {
            res.send('Session is ended')
        }
    });
}) */
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public'))) // 'public' points to CSS functionality in the module //
app.use(express.static(path.join(__dirname, 'js')))
app.use(express.static(path.join(__dirname, 'views')))

app.get('/',checkAuthenticated, (req, res) => {
    res.render('index.ejs', {name: req.user.name})
})

// Login //
app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

// Register //
app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      users.push({
        id: Date.now().toString(),
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      })
      res.redirect('/login')
    } catch {
      res.redirect('/register')  
    }
    console.log(users)
})

// Sign Out //
app.delete('/logout', (req, res, next) => {
    req.logout((err) => {
      if (err){
        return next(err)
      }  
      res.redirect('http://127.0.0.1:5500')
    })
})

// Authentication so only users who are logged in can access certain pages | Users who are loggel in go to homepage //
function checkAuthenticated(req, res, next){
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()){
        return res.redirect('/login')
    }
    next()
}
app.listen(3000, () => {
    console.log("App listning on port 3000")
})