import {notification} from '../sevices/index';

let readMore = async (req,res) =>{ 
  try {
    let skipNumberNotification = +(req.params.skipNumber);
    let newNotification = await notification.readMore(req.user._id, skipNumberNotification);

    return res.status(200).send(newNotification);
  } catch (error) {
    return res.status(500).send(error);
  }
};

let markAllAsRead = async (req,res) =>{ 
  try {
    let mark = await notification.markAllAsRead(req.user._id, req.body.targetUsers);
    return res.status(200).send(mark);
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  readMore : readMore,
  markAllAsRead : markAllAsRead
}