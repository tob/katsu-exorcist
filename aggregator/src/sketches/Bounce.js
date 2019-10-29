export default function bounce(p){
	let canvas;
	let count = 0;
	let pg;
	const width = window.innerWidth/2;
	const height = window.innerHeight/2;

	p.setup = () => {
		canvas = p.createCanvas(width, height);
		p.noStroke();
	}


	p.myCustomRedrawAccordingToNewPropsHandler = function (props) {

		// a full circle
		const twoPi = 2*Math.PI;
		const objectsCount = 12;
		const radius = width/4;

// you want to align objectsCount objects on the circular path
// with constant distance between neighbors
		const change = twoPi/objectsCount;


		if (props.audioData) {
			const {audioData} = props;

			audioData.map((item, index) => {
					// const y = (item / 255.0) * height;
					// const x = (item / 255) * width;
				const x = radius*Math.cos(index);
				const y = radius*Math.sin(index);

					if (item === 10 || item === 200) {
					}

					if (item % 30 === 0) {
						p.fill(255, 255, 255 );
						p.rect(x + 200, y + 200, 100, 100);
					}

					if (item % 24 === 0) {
						p.fill(0, 255);
						p.rect(0, 0, width, height);
					}

					if (item % 16 === 0) {
						// p.background(51);
						p.fill(255);
						p.noStroke();

						p.fill(255, 51, item * 2);
						p.circle(x + 200, y + 200, y/5 );

						p.fill(51, 51, 51)
						p.circle(200 - y, y/3 + 200, y/5 );

						p.fill(25, 255, x);
						p.circle(200 + x, 200 + x/3, x/5 );
						}
						// setTimeout(() => {
						// 	p.background(51);
						// 	p.noFill();
						// 	p.stroke(255);
						// 	p.circle(x -150, height/2 -75, 10);
						// }, 1500)}

				}
			)

		}

		if(canvas) //Make sure the canvas has been created
			p.fill(props.color);
	}
}
