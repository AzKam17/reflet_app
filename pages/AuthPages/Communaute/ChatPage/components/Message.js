import { Text, StyleSheet, View, Pressable } from 'react-native';
import { regular } from '../../../../../FontsConfig';
import { convertTimestampToHumanReadable } from '../../../../../custom_functions/convertTimestampToHumanReadable';
import * as Haptics from 'expo-haptics';
import { useReply } from '../../../../../provider/ReplyProvider';
import { useEffect, useState } from 'react';

export default function Message({
	id = null,
	sender = null,
	text = 'Hi',
	time = null,
	style = {},
	timeStyle = {},
	senderStyle = {},
	textStyle = {},
	styleReply = {},
	styleTextReply = {},
	reply = null,
	arrows = <></>,
}) {
	const { setMessageToReply } = useReply();
	const [zoomed, setZoomed] = useState(false);

	useEffect(() => {
		if (zoomed) {
			const zoomTimeout = setTimeout(() => {
				setZoomed(false);
			}, 1000);
			return () => {
				clearTimeout(zoomTimeout);
			};
		}
	}, [zoomed]);

	return (
		<Pressable
			style={[
				styles.container,
				style,
				zoomed ? { transform: [{ scale: 1.1 }] } : {},
			]}
			delayLongPress={300}
			onLongPress={() => {
				setMessageToReply({ id, text, sender });
				Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
				setZoomed(true);
			}}
		>
			<View>
				{reply != null && Object.keys(reply).length > 0 && (
					<View
						style={[
							styleReply,
							{
								marginBottom: 5,
							},
						]}
					>
						<Text style={[styles.sender, styleTextReply]}>{reply?.sender}</Text>
						<Text style={styleTextReply}>{reply?.text}</Text>
					</View>
				)}
				{sender && <Text style={[styles.sender, senderStyle]}>{sender}</Text>}
				<Text style={[styles.text, textStyle]}>{text}</Text>
				<Text style={[styles.time, timeStyle]}>
					{!sender &&
						(convertTimestampToHumanReadable(time) === '01/01'
							? 'En cours'
							: 'Envoyé')}
					{sender && convertTimestampToHumanReadable(time)}
				</Text>
				{arrows}
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		alignSelf: 'start',
		backgroundColor: 'grey',
		marginTop: 5,
		marginBottom: 5,
		borderRadius: 15,
	},
	sender: {
		color: 'white',
		fontSize: 10,
	},
	text: {
		color: 'white',
		fontFamily: regular,
	},
	time: {
		color: 'white',
		fontFamily: regular,
		fontSize: 10,
	},
});
