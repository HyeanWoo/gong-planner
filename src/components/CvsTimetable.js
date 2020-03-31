import React, { Component } from 'react';
import _ from 'lodash';
import dayjs from 'dayjs';
import { Stage, Layer, Rect, Line, Text } from 'react-konva';
import TimeTable from '../lib/timetable';

export default class CvsTimetable extends Component {
	state = {
		width: 500,
		height: 700
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.timeTable) {
			const { timeTable } = nextProps;

			const refinedTimeTable = timeTable.map(time => {
				if (time.start.seconds > time.end.seconds) {
					[ time.start.seconds, time.end.seconds ] = [ time.end.seconds, time.start.seconds ];
				}

				return {
					...time,
					start: dayjs.unix(time.start.seconds),
					end: dayjs.unix(time.end.seconds)
				};
			});

			return {
				...prevState,
				timeTable: new TimeTable(refinedTimeTable)
			};
		}
		return {};
	}

	componentDidMount() {
		this.checkSize();
		window.addEventListener('resize', this.checkSize.bind(this));
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.checkSize.bind(this));
	}

	checkSize() {
		if (this.element) {
			const width = this.element.attrs.container.offsetWidth;
			const height = this.element.attrs.container.offsetHeight;
			if (this.state.width !== width || this.state.height !== height) {
				this.setState(prevState => {
					return { ...prevState, width, height };
				});
			}
		}
	}

	render() {
		const maxWidth = this.state.width;
		const maxHeight = this.state.height;
		const timeTable = this.state.timeTable;

		const hourWidth = 30;
		const restWidth = maxWidth - hourWidth;
		const cellHeight = maxHeight / 24;

		return (
			<Stage
				ref={element => {
					this.element = element;
				}}
				width={maxWidth}
				height={maxHeight}>
				<Layer name='frame'>
					<Rect x={0} y={0} width={maxWidth} height={maxHeight} stroke='black' />
					<Line points={[ hourWidth, 0, hourWidth, maxHeight ]} stroke='black' strokeWidth={1} />
					{[ ...Array(6) ].map((_, i) => {
						const x = hourWidth + i * restWidth / 6;
						return <Line key={x} points={[ x, 0, x, maxHeight ]} stroke='black' strokeWidth={0.5} />;
					})}
					{[ ...Array(24) ].map((_, i) => {
						const y = (i + 1) * cellHeight;
						const textY = y - cellHeight;

						return (
							<React.Fragment>
								<Text
									x={0}
									y={textY}
									width={hourWidth}
									maxWidth={hourWidth}
									height={cellHeight}
									maxHeight={cellHeight}
									text={`${i}시`}
									align='center'
									verticalAlign='middle'
									fontSize={11}
								/>
								<Line points={[ 0, y, maxWidth, y ]} stroke='black' strokeWidth={1} />
							</React.Fragment>
						);
					})}
				</Layer>
				<Layer name='study'>
					{_.isEmpty(timeTable) ? (
						<React.Fragment />
					) : (
						timeTable.studyTime.map((arr, hour) => {
							if (arr) {
								const y = hour * cellHeight;
								return arr.map(study => {
									const x = hourWidth + study.start * (restWidth / 60);
									const width = (study.end - study.start) * (restWidth / 60);
									return <Rect x={x} y={y} width={width} height={cellHeight} fill={study.color} />;
								});
							} else {
								return <React.Fragment />;
							}
						})
					)}
				</Layer>
			</Stage>
		);
	}
}
