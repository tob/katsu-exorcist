export default function CandyCircles(p){
	let canvas;
	let count = 0;
	const width = window.innerWidth/2;
	const height = window.innerHeight/2;

	p.setup = () => {
		canvas = p.createCanvas(width, height);
		p.noStroke();
	}


	p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
		if (props.audioData) {
			const {audioData} = props;

			audioData.map((item, index) => {
					const y = (item / 255.0) * height;
					const x = (item / 255) * width;

					const posX = p.randomGaussian(width/2, x/100);
					const posY = p.randomGaussian( height/2, y/100);
					if (index === 1000) {
						setTimeout(() => {

							p.background(item, x, item *2)
						}, 1500);
					}
					p.fill(item * 2, x, item);
					p.stroke(0, 0 , 0);
					p.circle(posX,posY, x/10);
				}
			)

		}

		if(canvas) //Make sure the canvas has been created
			p.fill(props.color);
	}
}
