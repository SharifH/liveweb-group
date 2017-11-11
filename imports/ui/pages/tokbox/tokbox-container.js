import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import {TokBoxChat} from './tokbox.js';
import Loading from '../../components/Loading.js';
import Video from '../../../api/video/video';


const composer = (params, onData) => {

	const videoSub = Meteor.subscribe('videos'); // susbcribe to the publciation we just made

	if (videoSub.ready()) {

		let video = Video.findOne({_id: '1'}); // find the video record and store it in a variable called video
		onData(null, { video }); // pass the video object into our TokboxChat component
	}


};

export default composeWithTracker(composer, Loading)(TokBoxChat);
