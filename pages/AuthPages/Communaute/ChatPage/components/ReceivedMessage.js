import Message from './Message';
import { bold, regular } from '../../../../../FontsConfig';
import { StyleSheet, View } from 'react-native';
import { GetCountryBySlug } from '../../../../../fixtures/CountryRepository';

export default function ReceivedMessage({
	id = null,
	sender = 'def',
	text,
	time,
	reply,
	prefered_country = null,
}) {
	function isoToEmoji(code) {
		return code
			.split('')
			.map((letter) => (letter.charCodeAt(0) % 32) + 0x1f1e5)
			.map((n) => String.fromCodePoint(n))
			.join('');
	}
	return (
		<Message
			id={id}
			sender={
				sender +
				' ' +
				(prefered_country === null
					? ''
					: isoToEmoji(GetCountryBySlug(prefered_country)?.iso_code))
			}
			text={text}
			time={time}
			reply={reply}
			style={{
				alignSelf: 'flex-start',
				backgroundColor: 'white',
				marginLeft: 10,
			}}
			timeStyle={{
				color: 'black',
				textAlign: 'right',
			}}
			textStyle={{
				color: 'black',
				fontFamily: regular,
			}}
			senderStyle={{
				color: '#48C543',
				fontFamily: bold,
			}}
			styleReply={{
				padding: 5,
				borderRadius: 5,
				backgroundColor: 'rgba(0,0,0,0.1)',
			}}
			styleTextReply={{ color: 'rgba(0,0,0,0.6)' }}
			arrows={
				<>
					<View style={styles.leftArrow}></View>
					<View style={styles.leftArrowOverlap}></View>
				</>
			}
		/>
	);
}

const styles = StyleSheet.create({
	leftArrow: {
		position: 'absolute',
		backgroundColor: 'white',
		//backgroundColor:"red",
		width: 10,
		height: 25,
		bottom: -10,
		borderBottomRightRadius: 25,
		left: -15,
	},

	leftArrowOverlap: {
		position: 'absolute',
		backgroundColor: '#184D39',
		//backgroundColor:"green",
		width: 10,
		height: 35,
		bottom: -10,
		borderBottomRightRadius: 18,
		left: -20,
	},
});
