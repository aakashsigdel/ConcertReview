'use strict';

var React = require('react-native');
var ConcertListing = require('./components.ios/ConcertListing');

var {
	NavigatorIOS,
	StyleSheet,
	Component,
	AppRegistry
} = React;

class ConcertReview extends Component {
	render() {
		return(
			<NavigatorIOS style={styles.container}
				initialRoute={{
					title: 'Concerts',
					component: ConcertListing
				}} />
		);
	}
}

var styles = StyleSheet.create({
	container: {
		flex: 1
	}
});



AppRegistry.registerComponent('ConcertReview', () => ConcertReview);
