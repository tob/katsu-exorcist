import React from "react";
import AudioAnalyser from "../AudioAnalyser";
import video from '../../assets/coverr-breathtaking-reflection.mp4'
import dolfjie from '../../assets/dolfje_barking.jpg'


class AudioCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			audio: null
		};
		this.videoNode = React.createRef();
		this.toggleMicrophone = this.toggleMicrophone.bind(this);
	}

	async getMicrophone() {
		const audio = await navigator.mediaDevices.getUserMedia({
			audio: true,
			video: false
		});
		this.setState({ audio });
	}

	stopMicrophone() {
		this.state.audio.getTracks().forEach(track => track.stop());
		this.setState({ audio: null });
	}

	toggleMicrophone() {
		if (this.state.audio) {
			this.stopMicrophone();
		} else {
			this.getMicrophone();
		}
	}


	render() {
		const {sketch} = this.props;
		// const videoElement = this.videoNode && this.videoNode.current;
		const videoElement = video;
		console.log(videoElement);

		return (
			<>
						<div className="audiocard">

							<button onClick={this.toggleMicrophone}>
								{this.state.audio ? 'Stop microphone' : 'Get microphone input'}
							</button>
							{this.state.audio ? <AudioAnalyser audio={this.state.audio} video={videoElement} sketch={sketch} /> : ''}
							<video ref={this.videoNode} className="audiocard__video" autoPlay loop>
								<source src={video} type="video/mp4" />
							</video>
						</div>
			</>
		);
	}
}

export default AudioCard;
