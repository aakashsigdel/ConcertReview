'use strict';

var React = require('react-native');

var {
	StyleSheet,
	View,
	Text,
	Image,
	ListView,
	ActivityIndicatorIOS,
	StyleSheet,
	Component
} = React;

var QUERY_URL = 'http://api.revuzeapp.com:80/api/v1/concerts/concert_id/reviews?access_token=abcde';
class Reviews extends Component {
	constructor() {
		super();
		this.state ={
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1.id !== row2.id
			}),
			isLoading: true
		};
	}

	componentDidMount() {
		this._fetchReviews();
	}

	_fetchReviews() {
		var query = QUERY_URL.replace('concert_id', this.props.concertId);
		console.log('yao ming');
		console.log(query);
		fetch(query)
			.then((response) => response.json())
			.then((responseData) => {
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(responseData.data),
					isLoading: false
				});
			}).done();
	}

	renderReveiw(review) {
		return(
			<View style={styles.reviewRow}>
				<Image source={{uri: review.user.profile_picture}}
					style={styles.profilePicture} />
				<View style={styles.reviewDescription}>
				{(() => {
					switch(Number(review.rating)) {
						case 0:
							return <Image source={require('image!zeroStars')} />
						case 1:
							return <Image source={require('image!oneStars')} />
						case 2:
							return <Image source={require('image!twoStars')} />
						case 3:
							return <Image source={require('image!threeStars')} />
						case 4:
							return <Image source={require('image!fourStars')} />
						case 5:
							return <Image source={require('image!fiveStars')} />
					}
					})()}
					<Text style={styles.userName}>{review.user.full_name.toUpperCase()}</Text>
					<View style={styles.locationAndDateContainer}>
						<Text style={styles.location}>{this.props.concertLocation}</Text>
						<Text style={styles.date}>{' ●  ' + review.date.split(',')[0] + ' ago'}</Text>
					</View>
					<Text style={styles.comment}>{review.comment}</Text>
				</View>
			</View>
		);
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
			<ListView
				dataSource={this.state.dataSource}	
				renderRow={this.renderReveiw.bind(this)}
				style={styles.listView} />
		)
	}
}

var styles = StyleSheet.create({
	loadingContainer: {
		alignItems: 'center',
	},
	loadingText: {
		color: 'white',
		fontSize: 20,
		marginBottom: 140
	},
	reviewRow: {
		flexDirection: 'row',
		paddingTop: 4,
		paddingLeft: 5,
	},
	reviewDescription: {
		paddingLeft: 15,
	},
	profilePicture: {
		width: 80,
		height: 80
	},
	userName: {
		color: 'white',
		fontWeight: 'bold',
		fontFamily: 'Avenir Next'
	},
	location: {
		color: 'white',
		fontSize: 9,
		fontWeight: 'bold',
		fontFamily: 'Avenir Next',
	},
	date: {
		color: 'white',
		fontSize: 9,
		fontWeight: 'bold',
		fontFamily: 'Avenir Next',
		paddingLeft: 4
	},
	locationAndDateContainer: {
		flexDirection: 'row'
	},
	comment: {
		color: 'white',
		fontSize: 9,
		fontFamily: 'Avenir Next',
		width: 190
	}

});

module.exports = Reviews;
