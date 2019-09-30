import React from "react";
import AudioAnalyser from "../AudioAnalyser";
import CandyCircles from "../../sketches/CandyCircles";


class AudioCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			audio: null
		};
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
		return (
			<>
						<div className="audiocard">
							<button onClick={this.toggleMicrophone}>
								{this.state.audio ? 'Stop microphone' : 'Get microphone input'}
							</button>
							{this.state.audio ? <AudioAnalyser audio={this.state.audio} sketch={sketch} /> : ''}
						</div>
			</>
		);
	}
}

export default AudioCard;
