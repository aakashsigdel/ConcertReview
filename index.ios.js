'use strict';

var React = require('react-native');
var Photos = require('./components.ios/Photos');
var Reviews = require('./components.ios/Reviews');
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
		this.concertId = 12;
		this.state = {
			concertDetails: null,
			isLoading: true,
			view: viewConstants.photos
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
		if(this.state.view !== viewConstants.photos) {
			this.setState({
				view: viewConstants.photos
			});
		}
	}

	onClickReviews() {
		if(this.state.view !== viewConstants.reviews) {
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
						<Text style={styles.location}>{this.state.concertDetails.data.location}</Text>
						{(() => {
							switch(Number(this.state.concertDetails.rating)) {
								case 0:
									return <Image source={require('image!zeroStars')} style={styles.stars} />
								case 1:
									return <Image source={require('image!oneStars')} style={styles.stars} />
								case 2:
									return <Image source={require('image!twoStars')} style={styles.stars} />
								case 3:
									return <Image source={require('image!threeStars')} style={styles.stars} />
								case 4:
									return <Image source={require('image!fourStars')} style={styles.stars} />
								case 5:
									return <Image source={require('image!fiveStars')} style={styles.stars} />
							}
						})()}
					</View>
				</View>
				<View style={styles.navBar}>
					<TouchableHighlight style={styles.navButton}
						underlayColor="lightgrey"
						onPress={this.onClickPhotos.bind(this)}>
						<Text style={styles.navButtonText}>Photos</Text>
					</TouchableHighlight>
					<TouchableHighlight style={styles.navButton}
						underlayColor="lightgrey"
						onPress={this.onClickReviews.bind(this)}>
						<Text style={styles.navButtonText}>Reviews</Text>
					</TouchableHighlight>
					<TouchableHighlight style={[styles.navButton, styles.navButtonRight]}
						underlayColor="lightgrey">
						<Text style={styles.navButtonText}>More</Text>
					</TouchableHighlight>
				</View>
				<View style={styles.bottomContainer}>
				{
					this.state.view === viewConstants.photos ? 
						<Photos concertId={this.concertId} /> :
						<Reviews concertId={this.concertId} 
							concertLocation={this.state.concertDetails.data.location} />
				}
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
	loadingContainer: {
		flex: 1,
		marginTop: 40,
		backgroundColor: 'black',
		alignItems: 'center',
		justifyContent: 'center'
	},
	loadingText: {
		color: 'white',
		fontSize: 20,
	},
	headerImage: {
		flex: 1,
		height: 200,
	},
	innerHeader: {
		position: 'absolute',
		top: 140,
		left: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		width: 280,
		height: 80
	},
	title: {
		position: 'absolute',
		top: 2,
		left: 4,
		fontSize: 15,
		fontWeight: 'bold',
		color: 'white',
	},
	location: {
		fontSize: 12,
		top: 20,
		left: 4,
		color: 'white'
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
	},
	stars: {
		width: 90,
		height: 60
	},
	bottomContainer: {
		marginTop: 40,
	}
});

AppRegistry.registerComponent('ConcertReview', () => ConcertReview);
