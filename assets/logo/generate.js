var sizes = [
	20,
	29,
	32,
	40,
	48,
	50,
	55,
	57,
	58,
	60,
	64,
	72,
	76,
	80,
	80,
	87,
	88,
	100,
	114,
	120,
	128,
	144,
	152,
	167,
	172,
	180,
	192,
	196,
	216,
	256,
	512,
	1024,
];

const density = 300;
const quality = 100;
const lossless = true;
// var sizes = [16, 32, 64, 128, 256, 512, 1024, 2048];
// var sizes = [2048];

var formats = ["png", "jpg", "webp", "ico"];
// var formats = ["png"];

const files = ["icon.svg", "icon_fullsize.svg", "icon_round.svg"];
// const files = ["icon.svg"];

var styles = {
	// default: ``,
	dropshadow: [
		`#blob {
			filter: url(#dropshadow);
		}`,
		`<filter id="dropshadow" x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox">
			<feOffset dx="0" dy="0" in="SourceAlpha" result="shadowOffsetOuter1"/>
			<feGaussianBlur stdDeviation="10" in="shadowOffsetOuter1" result="shadowBlurOuter1"/>
			<feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.4 0" in="shadowBlurOuter1" type="matrix" result="shadowMatrixOuter1"/>
			<feMerge>
				<feMergeNode in="shadowMatrixOuter1"/>
				<feMergeNode in="SourceGraphic"/>
			</feMerge>
		</filter>`,
	],
	// inner_shadow: [
	// 	`#blob {
	// 		filter: url(#InnerShadow);
	// 	}
	// 	.eye {
	// 		filter: url(#dropshadow);
	// 	}`,
	// 	`<filter id="dropshadow" x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox">
	// 		<feOffset dx="0" dy="0" in="SourceAlpha" result="shadowOffsetOuter1"/>
	// 		<feGaussianBlur stdDeviation="10" in="shadowOffsetOuter1" result="shadowBlurOuter1"/>
	// 		<feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.4 0" in="shadowBlurOuter1" type="matrix" result="shadowMatrixOuter1"/>
	// 		<feMerge>
	// 			<feMergeNode in="shadowMatrixOuter1"/>
	// 			<feMergeNode in="SourceGraphic"/>
	// 		</feMerge>
	// 	</filter>
	// 	<filter id="InnerShadow" height="130%">
	// 		<feOffset dx="0" dy="0" />
	// 		<feGaussianBlur stdDeviation="10" result="blurOut"/>
	// 		<feComposite in="SourceGraphic" in2="blurOut" operator="out" result="inverseOut"/>
	// 		<feFlood flood-color="black" flood-opacity="1" result="color" />
	// 		<feComposite in="color" in2="inverseOut" operator="in" result="shadow"/>
	// 		<feComposite in="shadow" in2="SourceGraphic" operator="over" />
	// 	</filter>`,
	// ],
};

// 84,117,244
// 143,64,245

const colors = {
	black: `#background {
		fill: black;
	}`,
	white: `
	.eye {
		fill: white;
	}
	#background {
		fill: white;
	}

	#blob {
		fill: black;
	}
	svg {
		background: black;
	}
	`,
	blurple: `#background {
		fill: #7289DA;
	}`,
	blue: [
		`#background {
			fill: url(#gradient);
		}`,
		`<linearGradient id="gradient" gradientTransform="rotate(90)">
			<stop offset="5%"  stop-color="rgb(84,117,244)" />
			<stop offset="95%" stop-color="rgb(143,64,245)" />
		</linearGradient>`,
	],
};

const { execSync } = require("child_process");
const { readFileSync, writeFileSync, existsSync } = require("fs");
const path = require("path");
const temp = path.join(__dirname, "temp.svg");

for (const file of files) {
	const name = file.split(".")[0];

	for (const size of sizes) {
		for (const colorName in colors) {
			for (const styleName in styles) {
				for (const format of formats) {
					const input = path.join(__dirname, file);

					const output = path.join(
						__dirname,
						"variants",
						`${name}_${size}_${colorName}.${format}`
						// `${name}_${size}_${colorName}_${styleName}.${format}`
					);
					if (existsSync(output)) continue;
					var fileData = readFileSync(input, { encoding: "utf8" });

					const cssEnd = fileData.indexOf(`</style>`);
					if (cssEnd === -1) continue;

					const color = colors[colorName];
					const style = styles[styleName];

					var cssStyle = "";
					var xmlStyle = "";

					if (Array.isArray(style)) {
						cssStyle += style[0];
						xmlStyle += style[1];
					} else {
						cssStyle += style;
					}
					if (Array.isArray(color)) {
						cssStyle += color[0];
						xmlStyle += color[1];
					} else {
						cssStyle += color;
					}

					fileData = fileData.slice(0, cssEnd) + cssStyle + fileData.slice(cssEnd);

					const svgEnd = fileData.indexOf(`</svg>`);
					if (svgEnd === -1) continue;
					fileData = fileData.slice(0, svgEnd) + xmlStyle + fileData.slice(svgEnd);

					writeFileSync(temp, fileData, {
						encoding: "utf8",
					});

					execSync(
						`sharp -i ${temp} -o ${output} --density ${density} --progressive true -q ${quality} ${
							lossless ? "--lossless" : ""
						} resize ${size}`
					);
					console.log(`[File] written ${output}`);
				}
			}
		}
	}
}
