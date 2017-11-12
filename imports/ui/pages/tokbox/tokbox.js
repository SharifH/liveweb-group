import React from 'react';
import { OTSession, OTPublisher, OTStreams, OTSubscriber, createSession } from 'opentok-react';



export class TokBoxChat extends React.Component {
	constructor(props){
		super(props);
    this.startSession = this.startSession.bind(this);
    this.joinSession = this.joinSession.bind(this);
    this.endSession = this.endSession.bind(this);
    this.state = {
      token: false,
    };
  }
  startSession(){
    test
    const sucessful = (response) => this.setState({token: response}); // store the token in state

    Meteor.call('video.createSession', '1', function(error, response){
      if (error) { Bert.alert(error.reason, 'danger'); return; } // throw error if we get an error
      Bert.alert('session created', 'success'); // fire alert
      sucessful(response);// fire method that calls this.setState
    });

  }
 joinSession(){
    const sucessful = (response) => this.setState({token: response}); // store the token in state

    Meteor.call('video.joinSession', '1', function(error, response){
      if (error) { Bert.alert(error.reason, 'danger'); return; } // throw error if we get an error
      Bert.alert('session joined', 'success'); // fire alert
      sucessful(response);// fire method that calls this.setState
    });

  }
 endSession(){
     const sucessful = () => this.setState({token: false}); // store the token in state

    Meteor.call('video.endSession', '1', function(error, response){
      if (error) { Bert.alert(error.reason, 'danger'); return; } // throw error if we get an error
      Bert.alert('session ended', 'success'); // fire alert
      sucessful();// fire method that calls this.setState
    });
 }
  render() {
    const { video } = this.props; //bring our variable in and destructure it from this.props for brevity
    return (
      <div>
      {!video.sessionOn && <button onClick={this.startSession}>start session</button>}
      {video.sessionOn && this.state.token && <button onClick={this.endSession}>end session</button>}
      {video.sessionOn && !this.state.token && <button onClick={this.joinSession}>join session</button>}
        {this.state.token && video.currentSessionId && video.sessionOn && <OTSession
        apiKey={Meteor.settings.public.tokbox.apiKey}
        sessionId={video.currentSessionId}
        token={this.state.token}>
        <OTPublisher />
        <OTStreams>
          <OTSubscriber />
        </OTStreams>
      </OTSession>}

      </div>
    );
  }
}
