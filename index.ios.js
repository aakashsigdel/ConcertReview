'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
	ActivityIndicatorIOS,
	Image,
	Component
} = React;

var QUERY_URL = 'http://api.revuzeapp.com:80/api/v1/concerts/12?access_token=abcde';
class ConcertReview extends Component {
	constructor() {
		super();
		this.state = {
			concertDetails: null,
			isLoading: true
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
		height: 230
	},
	title: {
		position: 'absolute',
		top: 2,
		left: 4,
		fontSize: 15,
		color: 'white',
	},
	innerHeader: {
		position: 'absolute',
		top: 180,
		left: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		width: 250,
		height: 50
	}
})

AppRegistry.registerComponent('ConcertReview', () => ConcertReview);
