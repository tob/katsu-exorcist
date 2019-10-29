export default function Triangle(p){
	let canvas;
	let imageTest;
	let graphic;
	let count = 0;
	const width = window.innerWidth;
	const height = window.innerHeight;

	p.setup = () => {
		canvas = p.createCanvas(width, height);
		p.noStroke();
		p.frameRate(60);
		// imageTest = p.loadImage("/static/media/dolfje_barking.bf3d5df6.jpg");
	}


	p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
		imageTest = p.loadImage(props.video);
		// p.image(imageTest, 0, 0, width, height);
		// if (props.video) {
		// 	const imagetest = p.loadImage(props.video);
		// 	console.log('video prop', imagetest);
		// 	p.image(imagetest, 0, 0, width, height);
		// }
		if (props.audioData) {
			const {audioData} = props;

			audioData.map((item, index) => {
					const x = ((item * width)/255)/4;

					const posX = width/2;
					const posY =  height/2;

					const triangleHeight = Math.sqrt(((x*2) ** 2) - (x ** 2));
					const triangleHalfWidth = x;

					if (index === 1000) {
						setTimeout(() => {
							p.image(imageTest, 0, 0);
							// p.background(255,255,255)
						}, 1500);
					}
					p.fill(0, 255, 0, 98);
					// p.fill(255,255,255);
					// p.stroke(0, 0 , 0);
					p.clear();
					p.triangle(posX - triangleHalfWidth, posY + triangleHeight/2, posX, posY - triangleHeight/2, posX + triangleHalfWidth, posY + triangleHeight/2);
				}
			)

		}

		if(canvas) //Make sure the canvas has been created
			p.fill(props.color);
	}
}
