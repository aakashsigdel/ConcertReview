'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
	ActivityIndicatorIOS,
	Image,
	TouchableHighlight,
	Component
} = React;

var QUERY_URL = 'http://api.revuzeapp.com:80/api/v1/concerts/12?access_token=abcde';
var viewConstants = {
	photos: 'photos',
	reviews: 'reviews'
};

class ConcertReview extends Component {
	constructor() {
		super();
		this.state = {
			concertDetails: null,
			isLoading: true,
			views: viewConstants.photos
		};
	}

	componentDidMount() {
		this._fetchConcertDetails();
	}

	_fetchConcertDetails(id) {
		fetch(QUERY_URL)
			.then((response) => response.json())	
			.then((concertDetails) => {
				this.setState({
					concertDetails: concertDetails,
					isLoading: false
				});
			}).done();
	}

	onClickPhotos() {
		console.log('going to set photos');
		if(this.state.view !== viewConstants.photos) {
			console.log('setting photos');
			this.setState({
				view: viewConstants.photos
			});
		}
	}

	onClickReviews() {
		console.log('going to set Review');
		if(this.state.view !== viewConstants.reviews) {
			console.log('setting review');
			this.setState({
				view: viewConstants.reviews
			});
		}
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
			<View style={styles.container}>
				<View style={styles.header}>
					<Image 
						source={{uri: this.state.concertDetails.data.artist.image.original}}
						style={styles.headerImage} />
					<View style={styles.innerHeader}>
						<Text style={styles.title}>{this.state.concertDetails.data.artist.name}</Text>
						<Text style={styles.location}></Text>
					</View>
				</View>
				<View style={styles.navBar}>
					<TouchableHighlight style={styles.navButton}
						underlayColor='lightgrey'
						onPress={this.onClickPhotos.bind(this)}>
						<Text style={styles.navButtonText}>Photos</Text>
					</TouchableHighlight>
					<TouchableHighlight style={styles.navButton}
						underlayColor='lightgrey'
						onPress={this.onClickReviews.bind(this)}>
						<Text style={styles.navButtonText}>Reviews</Text>
					</TouchableHighlight>
					<TouchableHighlight style={[styles.navButton, styles.navButtonRight]}
						underlayColor='lightgrey'>
						<Text style={styles.navButtonText}>More</Text>
					</TouchableHighlight>
				</View>
			</View>
		)
	}
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black',
		marginTop: 40,
	},
	loadingText: {
		color: 'white',
		fontSize: 20,
	},
	loadingContainer: {
		flex: 1,
		marginTop: 40,
		backgroundColor: 'black',
		alignItems: 'center',
		justifyContent: 'center'
	},
	headerImage: {
		flex: 1,
		height: 200
	},
	innerHeader: {
		position: 'absolute',
		top: 150,
		left: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		width: 250,
		height: 50
	},
	title: {
		position: 'absolute',
		top: 2,
		left: 4,
		fontSize: 15,
		color: 'white',
	},
	navBar: {
		flex: 1,
		marginTop: 5,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	navButton: {
		flex: 1,
		width: 60,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: 'red',
		borderStyle: 'solid',
		borderRightWidth: 1
	},
	navButtonRight: {
		borderRightWidth: 0
	},
	navButtonText: {
		color: 'white'
	}
})

AppRegistry.registerComponent('ConcertReview', () => ConcertReview);
