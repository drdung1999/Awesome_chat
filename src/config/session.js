import session from 'express-session';
import connectMongo from "connect-mongo";

let mongoStore = connectMongo(session);

/** 
* this variable is where save session, in this case is mongo
*/

let sessionStore = new mongoStore({
  url: process.env.DB_CONNECTION + '://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME,
  autoReconnect : true,
  autoRemove : "native" 
});

let config = (app) =>{
  app.use(session({
    key : process.env.SESSION_KEY,
    secret : process.env.SESSION_SECRET,
    store : sessionStore,
    resave : true,
    saveUninitialized : false,
    cookie : {
      maxAge : 1000 * 60 * 60 * 24
    }
  }));
};

module.exports = {
  config: config,
  sessionStore : sessionStore
};