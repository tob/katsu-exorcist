import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import CandyCircles from "../sketches/CandyCircles";
import Bounce from "../sketches/Bounce";

class AudioAnalyser extends Component {
	constructor(props) {
		super(props);
		this.state = { audioData: new Uint8Array(0) };
		this.tick = this.tick.bind(this);
	}

	componentDidMount() {
		this.audioContext = new (window.AudioContext ||
			window.webkitAudioContext)();
		this.analyser = this.audioContext.createAnalyser();
		this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
		this.source = this.audioContext.createMediaStreamSource(this.props.audio);
		this.source.connect(this.analyser);
		this.rafId = requestAnimationFrame(this.tick);
	}

	componentWillUnmount() {
		cancelAnimationFrame(this.rafId);
		this.analyser.disconnect();
		this.source.disconnect();
	}

	tick() {
		this.analyser.getByteTimeDomainData(this.dataArray);
		this.setState({ audioData: this.dataArray });
		this.rafId = requestAnimationFrame(this.tick);
	}

	render() {
		const {sketch} = this.props
		console.log(sketch)
		return <>
			{/*<AudioVisualiser audioData={this.state.audioData} />*/}
			<P5Wrapper classname={'audiocard__canvas'} audioData={this.state.audioData} sketch={Bounce} color='white'/>
			{/*<P5Wrapper classname={'audiocard__canvas'} audioData={this.state.audioData} sketch={CandyCircles} color='white'/>*/}
			</>;
	}



}

export default AudioAnalyser;
