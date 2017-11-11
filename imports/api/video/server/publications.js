import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Video from '../video';

Meteor.publish('videos', () => Video.find());
