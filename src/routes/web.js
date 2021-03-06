import express from 'express';
import {home,auth,user,contact, notification,message,groupChat} from '../controllers/index';
import validator from '../validation/authValidation';
import userValid from '../validation/userValidation';
import contactValid from '../validation/contactValidation';
import passport from 'passport';
import initPassportLocal from '../controllers/passportController/local';
import initPassportFacebook from '../controllers/passportController/facebook';
import initPassportGoogle from '../controllers/passportController/google'; 
import messageValidation from '../validation/messageValidation';
import groupChatValidation from '../validation/groupChatValidation';

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
  router.get('/logout',auth.checkLoggedIn ,auth.getLogout);

  router.put('/user/update-avatar',auth.checkLoggedIn , user.upDateAvatar );
  router.put('/user/update-infor',auth.checkLoggedIn , userValid.updateInfor ,user.updateInfor );
  router.put('/user/update-password',auth.checkLoggedIn, userValid.updatePassword ,user.updatePassword);

  router.get('/contact/find-users/:keyWord',auth.checkLoggedIn, contactValid.findUserContact , contact.finndUsersContact);
  router.post('/contact/add-new',auth.checkLoggedIn, contact.addNew);
  router.delete('/contact/remove-contact',auth.checkLoggedIn, contact.removeContact);
  router.delete('/contact/remove-request-contact-sent',auth.checkLoggedIn, contact.removeRequestContactSent);
  router.delete('/contact/remove-request-contact-received',auth.checkLoggedIn, contact.removeRequestContactReceived);
  router.put('/contact/approve-request-contact-received',auth.checkLoggedIn, contact.approveRequestContactReceived);
  router.get('/contact/read-more-contacts/:skipNumber',auth.checkLoggedIn, contact.readMoreContacts);
  router.get('/contact/read-more-contacts-sent/:skipNumber',auth.checkLoggedIn, contact.readMoreContactsSent);
  router.get('/contact/read-more-contacts-received/:skipNumber',auth.checkLoggedIn, contact.readMoreContactsReceived);
  
  router.get('/notification/read-more/:skipNumber',auth.checkLoggedIn ,notification.readMore);
  router.put('/notification/mark-all-as-read',auth.checkLoggedIn ,notification.markAllAsRead);
  
  router.post('/message/add-new-text-emoji',auth.checkLoggedIn,messageValidation.checkMessageLength,message.addNewTextEmoij);
  router.post('/message/add-new-message',auth.checkLoggedIn,message.addNewImage);
  router.post('/message/add-new-attachment',auth.checkLoggedIn,message.addNewAttachment);
  router.get('/message/read-more-all-chat',auth.checkLoggedIn,message.readMoreAllChat);

  router.get('/contact/search-friends/:keyword',auth.checkLoggedIn, contactValid.searchFriends , contact.searchFriends);
  router.get('/message/read-more',auth.checkLoggedIn, message.readMore);

  router.post('/group-chat/add-new',auth.checkLoggedIn, groupChatValidation.addNewGroup, groupChat.addNewGroup);

  return app.use('/',router);

}

module.exports = initRoutes;