'use strict';

var React = require('react-native');

var {
	StyleSheet,
	View,
	Text,
	TouchableHighlight,
	Image,
	ActivityIndicatorIOS,
	ListView,
	Component
} = React;

var QUERY_URL = 'http://api.revuzeapp.com:80/api/v1/concerts/concert_id/photos?access_token=abcde';
class Photos extends Component {
	constructor() {
		super();
		this.threeCount = 0;
		this.state = {
			photos: null,
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1.id !== row2.id
			}),
			isLoading: true
		};
	}

	componentDidMount() {
		this._fetchPhotos();
	}

	_fetchPhotos() {
		var query = QUERY_URL.replace('concert_id', this.props.concertId);
		console.log('woh aakash');
		console.log(query);
		fetch(query)
			.then((response) => response.json())
			.then((responseData) => {
				this.setState({
					photos: responseData,
					dataSource: this.state.dataSource.cloneWithRows(responseData.data),
					isLoading: false
				});
			}).done();
	}

	renderPhotosThumbs(photo) {
		return(
			<TouchableHighlight 
				underlayColor="lightgrey"
				style={styles.photoThumbnailContainer}>
				<Image source={{uri: photo.image.original}}
					style={styles.photoThumbnail} />
			</TouchableHighlight>
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
			)
		}
		return(
			<ListView
				contentContainerStyle={styles.listView}
				dataSource={this.state.dataSource}
				renderRow={this.renderPhotosThumbs} />
		);
	}
}

var styles = StyleSheet.create({
	photoThumbnail: {
		width: 80,
		height: 80
	},
	listView: {
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	loadingContainer: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	loadingText: {
		color: 'white',
		fontSize: 20,
	},
});

module.exports = Photos;
