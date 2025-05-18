import { ThanksCollection } from '/imports/api/ThanksCollection';
import { Meteor } from 'meteor/meteor';
import dotenv from 'dotenv';

dotenv.config();

Meteor.startup(async () => {
  Meteor.publish("thanks", function () {
    return ThanksCollection.find();
  });
});
