import React from "react";
import Sketch from '../../sketches/Bounce';
import P5Wrapper from 'react-p5-wrapper';



const GraphicCard = () => {
	return <P5Wrapper sketch={Sketch} color='black'></P5Wrapper>
}

export default GraphicCard

