import { ThanksCollection } from '/imports/api/ThanksCollection';
import { Meteor } from 'meteor/meteor';
import dotenv from 'dotenv';

dotenv.config();

Meteor.startup(async () => {
  // If the Links collection is empty, add some data.

  // We publish the entire Links collection to all clients.
  // In order to be fetched in real-time to the clients
  Meteor.publish("thanks", function () {
    return ThanksCollection.find();
  });
});
