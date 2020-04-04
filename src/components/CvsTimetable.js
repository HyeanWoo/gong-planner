import React, { Component } from 'react';
import _ from 'lodash';
import dayjs from 'dayjs';
import { styled } from '@material-ui/styles';
import { Stage, Layer, Rect, Line, Text } from 'react-konva';
import TimetableModal from '../components/Modals/TimetableModal';
import TimeTable from '../lib/timetable';

const StyledStage = styled(Stage)({
	height: '100%'
});

export default class CvsTimetable extends Component {
	state = {
		width: 240,
		height: 550,
		showModal: false,
		timeTable: new TimeTable(this.props.timeTable)
	};

	componentDidMount() {
		this.checkSize();
		window.addEventListener('resize', this.checkSize.bind(this));
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.checkSize.bind(this));
	}

	handleModal() {
		this.setState(prevState => {
			return {
				showModal: !prevState.showModal
			};
		});
	}

	setTimeTable(timetable) {
		this.setState({
			timeTable: new TimeTable(timetable)
		});
	}

	checkSize() {
		if (this.element) {
			const container = this.element.attrs.container;
			const width = container.offsetWidth;
			const height = container.offsetHeight;
			if (this.state.width !== width || this.state.height !== height) {
				this.setState({ width, height });
			}
		}
	}

	render() {
		const { colName, date, subjects } = this.props;

		const maxWidth = this.state.width;
		const maxHeight = this.state.height;
		const timeTable = this.state.timeTable;
		const showModal = this.state.showModal;

		const hourWidth = 30;
		const restWidth = maxWidth - hourWidth;
		const cellHeight = maxHeight / 24;

		return (
			<React.Fragment>
				<StyledStage ref={element => (this.element = element)} width={maxWidth} height={maxHeight}>
					<Layer name='frame'>
						<Line points={[ hourWidth, 0, hourWidth, maxHeight ]} stroke='black' strokeWidth={1} />
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
						{[ ...Array(6) ].map((_, i) => {
							const x = hourWidth + i * restWidth / 6;
							return <Line key={x} points={[ x, 0, x, maxHeight ]} stroke='black' strokeWidth={0.5} />;
						})}
					</Layer>
					<Layer name='click-frame'>
						<Rect
							x={hourWidth}
							y={0}
							width={restWidth}
							height={maxHeight}
							onClick={this.handleModal.bind(this)}
							onTap={this.handleModal.bind(this)}
						/>
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
										return (
											<Rect x={x} y={y} width={width} height={cellHeight} fill={study.color} />
										);
									});
								} else {
									return <React.Fragment />;
								}
							})
						)}
					</Layer>
				</StyledStage>
				<React.Fragment>
					<TimetableModal
						date={date}
						colName={colName}
						show={showModal}
						handleModal={this.handleModal.bind(this)}
						onSetTimeTable={this.setTimeTable.bind(this)}
						subjects={subjects}
						role='add'
					/>
				</React.Fragment>
			</React.Fragment>
		);
	}
}
