import Video from './video'; // pull in our Video collection so we can add/edit/delete from this file's code
import { Meteor } from 'meteor/meteor';
import OpenTok from 'opentok'; // pull in the opentok npm package


Meteor.methods({
	'video.createSession': function(documentId){
		check(documentId, String); // we will pass the video record _id in from the client, which as this point is hard coded as '1'

    // first we'll grab our api keys and create a new opentok instance
		const opentok = new OpenTok(Meteor.settings.public.opentok.apiKey, Meteor.settings.public.opentok.apiSecret);

    //next we'll make the opentok async npm package's call into a syncrhonous call with Meteor's wrapAsync function
		let createSessionSync = Meteor.wrapAsync(opentok.createSession, opentok);

		let sessionId; // create a variable where we can store the sessionId we get back from opentok's api

    // then we try/catch the call to opentok
		try {
	      	const response = createSessionSync(); // this will make the api call and store response in the 'response' variable
	      	console.log(response.sessionId); // this wont run until we get a response back
	      	sessionId = response.sessionId; // store the sessionId from the response into the sessionId variable

	      } catch (err) {
	      	console.log(err);
	        throw new Meteor.Error('oops', err); // throw an error if we have problems hitting the tokbox api
	      }
	       // update the video record with the sessionId we got from tokbox, and turn sessionOn to true
	       Video.update({_id: documentId}, {$set: { currentSessionId: sessionId, sessionOn: true}});
          // generate a token to send back to the client, we need the sessionId to do this (but it happens on npm/locally, we dont call tokbox api... I dont think we do atleast)
	       const token = opentok.generateToken(sessionId); // generate token
	       return token; // return token

	},
  'video.endSession': function(documentId){
		check(documentId, String);

	      Video.update({_id: documentId}, {$set: { sessionOn: false}});
	      return;

	},
  'video.joinSession': function(documentId, user){
		check(documentId, String);

		const opentok = new OpenTok(Meteor.settings.opentok.apiKey, Meteor.settings.opentok.apiSecret); // create openTok instance

		let video = Video.findOne({_id: documentId}); // find the relevant video record
		const token = opentok.generateToken(video.currentSessionId); // generate a token for the user
	  return token; // return the token


	}
});
