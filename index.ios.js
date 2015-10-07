'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
	ActivityIndicatorIOS,
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
				<View style={styles.container}>
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
					<Text style={styles.title}></Text>
					<Text style={styles.location}></Text>
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
		alignItems: 'center',
		justifyContent: 'center'
	},
	loadingText: {
		color: 'white',
		fontSize: 20,
	},
	loadingContainer: {
		flex: 1,
		backgroundColor: 'black',
		alignItems: 'center',
		justifyContent: 'center'
	}
})

AppRegistry.registerComponent('ConcertReview', () => ConcertReview);
