'use strict';

var React = require('react-native');
var Utils = require('../utils');

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
					<View style={styles.ratingsContainer}>
						{(() => {
							switch(Number(review.rating)) {
								case 0:
									return <Image style={styles.ratings} source={{uri: Utils.zeroStars}} />
								case 1:
									return <Image style={styles.ratings} source={{uri: Utils.oneStars}} />
								case 2:
									return <Image style={styles.ratings} source={{uri: Utils.twoStars}} />
								case 3:
									return <Image style={styles.ratings} source={{uri: Utils.threeStars}} />
								case 4:
									return <Image style={styles.ratings} source={{uri: Utils.fourStars}} />
								case 5:
									return <Image style={styles.ratings} source={{uri: Utils.fiveStars}} />
							}
						})()}
					</View>
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
		marginTop: 80,
		alignItems: 'center'
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
		marginBottom: 4
	},
	reviewDescription: {
		paddingLeft: 15,
	},
	profilePicture: {
		width: 80,
		height: 80
	},
	ratingsContainer: {
		width: 120,
		height: 20
	},
	ratings: {
		resizeMode: Image.resizeMode.contain,
		flex: 1,
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
