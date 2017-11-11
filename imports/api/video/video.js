import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

const Video = new Mongo.Collection('Video');
export default Video;

Video.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Video.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Video.schema = new SimpleSchema({
  sessionOn: {
    type: Boolean,
    autoValue: function() {
        if (this.isInsert && (!this.isSet || this.value.length === 0)) {  // only set on insert
            return false
        }
    }
  },
  currentSessionId: {
    type: String,
    optional: true
  }
});

Video.attachSchema(Video.schema);

Factory.define('video', Video, {
  title: () => 'Factory Title',
  body: () => 'Factory Body',
});
