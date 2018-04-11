const databaseConnection = require('../DatabaseConnection')

var Subscriber = {

  getAllSubscriber: function(callback) {
    return databaseConnection.query("Select * From subscribed", callback);
  },

  getSbubscriberById: function(id, callback) {
    return databaseConnection.query("Select * from subscribed where Subscribed_Id=?", [id], callback);
  },

  addSubscriber: function(subscribed, callback) {
    return databaseConnection.query("Insert into subscribed values(?,?)", [subscribed.Subscriber_Id, subscribed.Subscribed_Id], callback);
  },

  deleteSubscriberAll: function(id, callback) {
    return databaseConnection.query("Delete From subscribed where Subscriber_Id=?", [id], callback);
  },

  deleteSubscribedAll: function(id, callback) {
    return databaseConnection.query("Delete From subscribed where Subscribed_Id=?", [id], callback);
  },
  deleteSubscribeSingle: function(subscriberid, subscribedid, callback) {
    return databaseConnection.query("Delete From subscribed where Subscriber_Id=? AND Subscribed_Id=?", [subscriberid, subscribedid], callback);
  },

  updateSubscriber: function(id, subscribed, callback) {
    return databaseConnection.query("Update subscribed set SubscriberId=? where Subscribed_Id=?", [subscribed.Subscriber_Id, id], callback);
  }
};


module.exports = Subscriber;