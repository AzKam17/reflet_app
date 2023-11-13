import { ImageBackground } from 'expo-image';
import { Pressable, Text, View } from 'react-native';
import { bold } from '../../../../FontsConfig';
import { getFile } from '../../../../firebase_functions/storage/getFile';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function GridActualite({ data }) {
	const navigation = useNavigation();
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
				marginRight: 10,
			}}
		>
			<ImageBackground
				style={{
					height: 150,
					width: 200,
					padding: 10,
					justifyContent: 'flex-end',
				}}
				imageStyle={{
					opacity: 0.5,
					borderRadius: 10,
					borderColor: 'rgba(0,0,0,0.3)',
					borderWidth: 1,
				}}
				source={{
					uri: img,
				}}
			>
				<Text
					style={{
						color: 'white',
						fontFamily: bold,
					}}
				>
					{data?.title.substr(0, 20) + '...'}
				</Text>
				<Text
					style={{
						color: 'white',
						fontFamily: bold,
					}}
				>
					15 Oct. 2023
				</Text>
			</ImageBackground>
		</Pressable>
	);
}
