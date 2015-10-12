'use strict';

var React = require('react-native');
var PhotosAndReviewsContainer = require('./PhotosAndReviewsContainer');

var {
	View,
	Text,
	Image,
	ListView,
	TouchableHighlight,
	StyleSheet,
	ActivityIndicatorIOS,
	Component,
	NavigatorIOS,
	AppRegistry
} = React;

var QUERY_URL = 'http://api.revuzeapp.com:80/api/v1/concerts/past?access_token=abcde';
class ConcertListing extends Component {
	constructor() {
		super();
		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1.id !== row2.id
			}),
			isLoading: true
		};
	}

	componentDidMount() {
		this._fetchData();
	}

	_fetchData() {
		fetch(QUERY_URL)
			.then((response) => response.json())
			.then((responseData) => {
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(responseData.data),
					isLoading: false
				});
			}).done();
	}

	rowPressed(id) {
		this.props.navigator.push({
			title: 'Details',
			component: PhotosAndReviewsContainer,
			passProps: {concert_id: id}
		});
	}

	renderConcertList(concert) {
		return(
			<TouchableHighlight 
				onPress={this.rowPressed.bind(this, concert.id)}
				underlayColor="lightgrey">
				<View style={styles.concertRow}>
						<Image style={styles.rowImage} source={{uri: concert.artist.image.normal}} />
						<View style={styles.concertDescription}>
							<Text style={styles.title}>{concert.artist.name}</Text>
							<Text style={styles.stage}>{concert.stage}</Text>
							<View style={styles.locationAndDate}>
								<Text style={styles.loaction}>{concert.location}</Text>
								<Text style={styles.date}>
									{concert.date.month + ' ' + concert.date.day + ', ' + concert.date.year}
								</Text>
							</View>
						</View>
				</View>
			</TouchableHighlight>
		)		
	}

	render() {
		if(this.state.isLoading) {
			return(
				<View style={styles.loadingContainer}>
					<ActivityIndicatorIOS
						hidden='true'
						size='large' />
					<Text style={styles.loadingText}>Loading...</Text>
				</View>
			);
		}

			return(
				<ListView style={styles.listView}
					dataSource={this.state.dataSource}
					renderRow={this.renderConcertList.bind(this)} />
			);
	}
}

var styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		backgroundColor: 'black',
		alignItems: 'center',
		justifyContent: 'center'
	},
	loadingText: {
		color: 'white',
		fontSize: 20
	},
	listView: {
		backgroundColor: 'black'
	},
	concertRow: {
		flexDirection: 'row',
		padding: 10,
		borderBottomWidth: 1,
		borderColor: 'grey',
		borderStyle: 'solid'
	},
	rowImage: {
		width: 80,
		height: 80,
	},
	concertDescription: {
		paddingLeft: 10,
	},
	title: {
		flexDirection: 'column',
		fontSize: 15,
		fontWeight: 'bold',
		color: 'white'
	},
	stage: {
		fontSize: 12,
		color: 'white'
	},
	location: {
		fontSize: 12,
		color: 'white'
	},
	date: {
		fontSize: 12,
		color: 'white'
	}
});

module.exports = ConcertListing;
