import Message from './Message';
import { StyleSheet, View } from 'react-native';
import { GetCountryBySlug } from '../../../../../fixtures/CountryRepository';

export default function SendedMessage({
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
			text={text}
			time={time}
			sender={
				sender +
				' ' +
				(prefered_country === null
					? ''
					: isoToEmoji(GetCountryBySlug(prefered_country)?.iso_code))
			}
			reply={reply}
			arrows={
				<>
					<View style={styles.rightArrow}></View>
					<View style={styles.rightArrowOverlap}></View>
				</>
			}
			style={{
				alignSelf: 'flex-end',
				backgroundColor: '#113427',
				marginRight: 5,
			}}
			timeStyle={{
				textAlign: 'right',
			}}
			styleReply={{
				padding: 5,
				borderRadius: 5,
				backgroundColor: 'rgba(0,0,0,0.1)',
			}}
			styleTextReply={{ color: 'rgba(255,255,255,0.6)' }}
		/>
	);
}

const styles = StyleSheet.create({
	rightArrow: {
		position: 'absolute',
		//backgroundColor: '#113427',
		backgroundColor: '#113427',
		//backgroundColor:"red",
		width: 10,
		height: 30,
		bottom: -10,
		borderBottomLeftRadius: 25,
		right: -15,
	},

	rightArrowOverlap: {
		position: 'absolute',
		backgroundColor: '#184D39',
		//backgroundColor:"green",
		width: 10,
		height: 35,
		bottom: -10,
		borderBottomLeftRadius: 18,
		right: -20,
	},
});
