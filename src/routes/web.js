import express from 'express';
import {home,auth} from '../controllers/index';
import validator from '../validation/authValidation'
import passport from 'passport';
import initPassportLocal from '../controllers/passportController/local';
import initPassportFacebook from '../controllers/passportController/facebook';
import initPassportGoogle from '../controllers/passportController/google'; 

initPassportLocal();
initPassportFacebook();
initPassportGoogle();

let router = express.Router();

let initRoutes = (app) =>{
  router.get('/login-register',auth.checkLoggedOut ,auth.loginRegister);
  router.post('/register',auth.checkLoggedOut, validator.register,auth.postRegister);
  router.get('/verify/:token',auth.checkLoggedOut, auth.verifyAccount);
  router.post('/login',auth.checkLoggedOut, passport.authenticate('local',{
    successRedirect: "/",
    failureRedirect: "/login-register",
    successFlash: true,
    failureFlash: true
  }));

  router.get('/auth/facebook',auth.checkLoggedOut, passport.authenticate("facebook",{scope : ["email"]}));
  router.get('/auth/facebook/callback',auth.checkLoggedOut, passport.authenticate("facebook",{
    successRedirect: "/",
    failureRedirect: "/login-register"
  }));

  router.get('/auth/google',auth.checkLoggedOut, passport.authenticate("google",{scope : ["email"]}));
  router.get('/auth/google/callback',auth.checkLoggedOut, passport.authenticate("google",{
    successRedirect: "/",
    failureRedirect: "/login-register"
  }));

  router.get('/',auth.checkLoggedIn ,home);
  router.get('/logout',auth.checkLoggedIn ,auth.getLogout)

  return app.use('/',router);

}

module.exports = initRoutes;