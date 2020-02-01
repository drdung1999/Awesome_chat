import ContactModel from "../models/contact.model";
import UserModel from "../models/user.model";
import NotificationModel from "../models/notification.model";
import _ from "lodash";

const LIMIT_NUMBER_TAKEN = 10;

let finndUsersContact = (currentUserId,keyWord) => {
  return new Promise( async (resolve, reject) =>{
    
    let deprecatedUserId = [currentUserId]; 
    let contactByUser = await ContactModel.findAllByUser(currentUserId);
    contactByUser.forEach(contact =>{
      deprecatedUserId.push(contact.userId);
      deprecatedUserId.push(contact.contactId);
    });
   
    deprecatedUserId = _.uniqBy(deprecatedUserId);
    let users = await UserModel.findAllForAddContact(deprecatedUserId,keyWord);
    resolve(users);
  });

}

let addNew = (currentUserId,contactId) => {
  return new Promise( async (resolve, reject) =>{
    let contactExists = await ContactModel.checkExists(currentUserId,contactId);
    if(contactExists){
      return reject(false);
    }
    // create contact
    let newContactItem = {
      userId: currentUserId,
      contactId: contactId
    };
    let newContact = await ContactModel.createNew(newContactItem);

    // create notification
    let notificationItem = {
      senderId : currentUserId,
      receiverId : contactId,
      type : NotificationModel.types.ADD_CONTACT
    };
    await NotificationModel.model.createNew(notificationItem);

    resolve(newContact);
  }); 

} 

let removeRequestContact = (currentUserId,contactId) => {
  return new Promise( async (resolve, reject) =>{
    let removeReq = await ContactModel.removeRequestContact(currentUserId,contactId);
    if(removeReq.result.n === 0){
      return reject(false);
    }
    // remove notification
    let notifTypeAddContact = NotificationModel.types.ADD_CONTACT;
    await NotificationModel.model.removeRequestContactNotification(currentUserId,contactId,notifTypeAddContact);
    resolve(true);
  }); 

} 

let getContacts = (currentUserId) => {
  return new Promise( async (resolve, reject) =>{
    try {
      let contacts = await ContactModel.getContacts(currentUserId,LIMIT_NUMBER_TAKEN);
      let users = contacts.map( async (contact) =>{
        if(contact.contactId == currentUserId){
          return await UserModel.findUserById(contact.userId);
        } else {
          return await UserModel.findUserById(contact.contactId);
        }
        
      });
      resolve(await Promise.all(users));
  } catch (error) {
      reject(error);  
    }
  }); 

}

let getContactsSent = (currentUserId) => {
  return new Promise( async (resolve, reject) =>{
    try {
      let contacts = await ContactModel.getContactsSent(currentUserId,LIMIT_NUMBER_TAKEN);
      let users = contacts.map( async (contact) =>{
        return await UserModel.findUserById(contact.contactId)
      });
      resolve(await Promise.all(users));
    } catch (error) {
      reject(error);
    }
  }); 

}

let getContactsReceived = (currentUserId) => {
  return new Promise( async (resolve, reject) =>{
    try {
      let contacts = await ContactModel.getContactsReceived(currentUserId,LIMIT_NUMBER_TAKEN);
      let users = contacts.map( async (contact) =>{
        return await UserModel.findUserById(contact.userId)
      });
      resolve(await Promise.all(users));
    } catch (error) {
      reject(error);
    }
  }); 

}

let countAllContacts = (currentUserId) => {
  return new Promise( async (resolve, reject) =>{
    try {
      let count = await ContactModel.countAllContacts(currentUserId);
      resolve(count);
    } catch (error) {
      reject(error);
    }
  }); 
}

let countAllContactsSent = (currentUserId) => {
  return new Promise( async (resolve, reject) =>{
    try {
      let count = await ContactModel.countAllContactsSent(currentUserId);
      resolve(count);
    } catch (error) {
      reject(error);
    }
  }); 
}

let countAllContactsReceived = (currentUserId) => {
  return new Promise( async (resolve, reject) =>{
    try {
      let count = await ContactModel.countAllContactsReceived(currentUserId);
      resolve(count);
    } catch (error) {
      reject(error);
    }
  }); 
}

module.exports = {
  finndUsersContact : finndUsersContact,
  addNew : addNew,
  removeRequestContact : removeRequestContact,
  getContacts : getContacts,
  getContactsSent : getContactsSent,
  getContactsReceived : getContactsReceived,
  countAllContacts : countAllContacts,
  countAllContactsSent : countAllContactsSent,
  countAllContactsReceived : countAllContactsReceived

}