import { useEffect, useState } from "react";

const CELL_WIDTH = 44;
const CELL_HEIGHT = 64;
const COLUMNS = Math.floor(1365 / CELL_WIDTH);
const ROWS = Math.floor(647 / CELL_HEIGHT);
const TOTAL_CELLS = COLUMNS * ROWS;

const App = () => {
	const [blinking, setBlinking] = useState<number[]>([]);
	useEffect(() => {
		const interval = setInterval(() => {
			const randomSet = new Set<number>();
			while (randomSet.size < 12) {
				randomSet.add(Math.floor(Math.random() * TOTAL_CELLS));
			}
			setBlinking(Array.from(randomSet));
		}, 2000);
		return () => clearInterval(interval);
	}, []);
	return (
		<div className="min-h-screen flex items-center justify-center">
			<div
				className="grid"
				style={{
					gridTemplateColumns: `repeat(${COLUMNS},${CELL_WIDTH}px)`,
					gridTemplateRows: `repeat(${ROWS},${CELL_HEIGHT}px)`,
					width: `${COLUMNS * CELL_WIDTH}px`,
					height: `${ROWS * CELL_HEIGHT}px`,
				}}
			>
				{Array.from({ length: TOTAL_CELLS }).map((_, index) => (
					<div
						key={index}
						className={`transition-colors duration-300 border border-gray-200 ${
							blinking.includes(index) ? "bg-purple-600" : "bg-gray-50"
						}`}
					/>
				))}
			</div>
		</div>
	);
};

export default App;
