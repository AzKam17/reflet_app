import { Pressable, Text, View, Animated } from 'react-native'; // Importez Animated depuis 'react-native'
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useReply } from '../../../../../provider/ReplyProvider';

export default function ReplyBox() {
	const { messageToReply, isReplying, cancelReply } = useReply();
	const translateY = new Animated.Value(100); // Créez une nouvelle valeur animée avec une valeur initiale

	if (!isReplying) {
		return null;
	}

	// Utilisez Animated.spring pour animer le composant ReplyBox
	Animated.spring(translateY, {
		toValue: 0,
		useNativeDriver: false,
		duration: 30,
	}).start();

	return (
		<Animated.View // Utilisez Animated.View au lieu de View pour appliquer l'animation
			style={{
				backgroundColor: '#113427',
				padding: 10,
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
				transform: [{ translateY }], // Appliquez l'animation de translation
			}}
		>
			<View
				style={{
					flexDirection: 'row',
					gap: 10,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Entypo name={'reply'} color={'rgba(255,255,255,0.7)'} size={20} />
				<View style={{ width: 2, backgroundColor: 'rgba(255,255,255,0.7)' }} />
				<View>
					<Text
						style={{
							color: 'rgba(255,255,255,1)',
						}}
					>
						{messageToReply?.sender || 'Auteur'}
					</Text>
					<Text
						style={{
							color: 'rgba(255,255,255,0.7)',
						}}
					>
						{messageToReply?.text || 'Modèle du message'}
					</Text>
				</View>
			</View>
			<Pressable onPress={() => cancelReply()}>
				<MaterialIcons
					name={'cancel'}
					color={'rgba(255,255,255,0.7)'}
					size={20}
				/>
			</Pressable>
		</Animated.View>
	);
}
