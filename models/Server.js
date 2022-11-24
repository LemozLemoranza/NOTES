const express = require("express");
const methodOverride = require("method-override");
const exphbs = require("express-handlebars");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

const { dbConnection } = require("../database/connect-db");


class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      index: "/",
      users: "/users/",
      notes: "/notes/",
    };

    this.settings();
    this.routes();
    this.connectDB()


  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("PUERTO EN", process.env.PORT);
    });
  }

  settings(){
        this.app.use(cors())

        this.app.set('views', path.join(__dirname, '../views'))

        this.app.engine('.hbs', exphbs.engine({
            defaultLayout: 'main',
            layoutDir: path.join(this.app.get('views'), 'layouts'),
            partialsDir: path.join(this.app.get('views'), 'partials'),
            extname: 'hbs'
        }))

        this.app.set('view engine', '.hbs')
    
        this.app.use(express.urlencoded({extended: false}));

        this.app.use(methodOverride('_method'))

        this.app.use(express.static(path.join(__dirname, '../public')))

        this.app.use(cookieParser());
  }

  routes(){
        this.app.use(this.paths.index, require('../routes/index'))
        this.app.use(this.paths.users, require('../routes/users'))
        this.app.use(this.paths.notes, require('../routes/notes'))


  }
  
  async connectDB(){
    await dbConnection()
  }
}

module.exports = Server;
