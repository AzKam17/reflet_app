import { Pressable, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { bold, semibold } from '../../../../FontsConfig';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { getFile } from '../../../../firebase_functions/storage/getFile';

export default function LineActualite({ data }) {
	const navigation = useNavigation();
	const imgSize = 70;
	const [img, setImg] = useState(null);

	useEffect(() => {
		getFile(data?.image).then((r) => setImg(r));
	}, []);
	return (
		<Pressable
			onPress={() =>
				navigation.navigate('ActualitePage', {
					id: data?.id,
				})
			}
			style={{
				gap: 10,
				flexDirection: 'row',
				marginBottom: 10,
			}}
		>
			<Image
				source={{
					uri: img,
				}}
				style={{
					width: imgSize,
					height: imgSize,
				}}
			/>
			<View
				style={{
					gap: 10,
					justifyContent: 'center',
				}}
			>
				<Text
					style={{
						color: 'white',
						fontFamily: bold,
						fontSize: 20,
					}}
				>
					{data?.title.substr(0, 20) + '...'}
				</Text>
				<Text
					style={{
						color: 'rgba(255,255,255,0.8)',
						fontFamily: semibold,
					}}
				>
					07/07/2023 à 14h00
				</Text>
			</View>
		</Pressable>
	);
}
