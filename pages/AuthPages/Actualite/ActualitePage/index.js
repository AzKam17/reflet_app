import SafeView from '../../SafeView';
import {
	ActivityIndicator,
	Button,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { bold, regular, semibold } from '../../../../FontsConfig';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Image, ImageBackground } from 'expo-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import CommentItem from '../components/CommentItem';
import CommentItemList from '../components/CommentItemList';
import InputComment from './components/InputComment';
import { useNavigation } from '@react-navigation/native';
import ProfileSVG from '../../../../assets/icons/profile.svg';
import { useEffect, useState } from 'react';
import { getNewsById } from '../../../../firebase_functions/news/getAllNews';
import { getFile } from '../../../../firebase_functions/storage/getFile';

export default function ActualitePage({ navigation, route }) {
	const id = route.params?.id;
	const [news, setNews] = useState(null);
	const [img, setImg] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getNewsById(id).then((res) => {
			setNews(res);

			getFile(news?.image).then((r) => setImg(r));
		});
	}, [id]);

	useEffect(() => {
		getFile(news?.image).then((r) => {
			setImg(r);
			setLoading(false);
		});
	}, [news]);

	return (
		<SafeView
			style={[
				styles.container,
				{
					paddingLeft: 0,
					paddingRight: 0,
				},
			]}
		>
			<ScrollView style={{ flex: 1 }}>
				{loading ? ( // Affichez le loader si l'image est en cours de chargement
					<View
						style={{
							height: 300,
						}}
					>
						<ActivityIndicator
							size="large"
							color="#113427"
							style={styles.loader}
						/>
					</View>
				) : (
					<ImageBackground
						source={{
							uri: img,
						}}
						style={{
							height: 300,
							paddingTop: 10,
							paddingLeft: 10,
						}}
						imageStyle={{
							borderBottomLeftRadius: 30,
							borderBottomRightRadius: 30,
						}}
					>
						<Pressable
							onPress={() => navigation.goBack()}
							style={{
								backgroundColor: 'rgba(0, 0, 0, 0.7)',
								alignSelf: 'flex-start',
								padding: 15,
								borderRadius: 100,
							}}
						>
							<Ionicons name={'arrow-back'} color={'white'} size={20} />
						</Pressable>
					</ImageBackground>
				)}
				<View
					style={{
						marginTop: 10,
						paddingLeft: 20,
						paddingRight: 20,
					}}
				>
					<Text
						style={[
							{
								fontFamily: bold,
								color: 'white',
								textAlign: 'left',
								fontSize: 25,
							},
						]}
					>
						{news?.title}
					</Text>
					<View
						style={{
							height: 2,
							marginTop: 3,
							marginBottom: 3,
							backgroundColor: 'rgba(128, 128, 128, 0.7)',
						}}
					/>
					<View
						style={{
							flexDirection: 'row',
							paddingLeft: 10,
							marginTop: 10,
							marginBottom: 10,
							justifyContent: 'space-between',
						}}
					>
						<View
							style={{
								flexDirection: 'row',
								gap: 10,
							}}
						>
							<View
								style={{
									height: 60,
									width: 60,
									borderRadius: 100,
									backgroundColor: 'rgba(255,255,255,0.4)',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<ProfileSVG color={'#000000'} size={40} />
							</View>
							<View style={{ justifyContent: 'center' }}>
								<Text
									style={{
										color: 'white',
										fontFamily: bold,
										fontSize: 18,
									}}
								>
									Admin
								</Text>
								<Text
									style={{
										color: 'rgba(255,255,255,0.6)',
										fontFamily: bold,
										fontSize: 13,
									}}
								>
									May 10 2023
								</Text>
							</View>
						</View>

						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'center',
								alignItems: 'center',
								gap: 5,
								paddingRight: 30,
							}}
						>
							<AntDesign name={'eye'} color={'white'} size={20} />
							<Text
								style={{
									color: 'white',
									fontFamily: semibold,
									fontSize: 15,
								}}
							>
								{news?.view}
							</Text>
						</View>
					</View>
					<View
						style={{
							height: 2,
							marginTop: 3,
							marginBottom: 3,
							backgroundColor: 'rgba(128, 128, 128, 0.7)',
						}}
					/>
					<Text
						style={{
							color: 'white',
							fontFamily: 'srcss-rglr',
						}}
					>
						{news?.text}
					</Text>
				</View>
			</ScrollView>
		</SafeView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		gap: 10,
	},
	imgBox: {
		borderRadius: 10,
		minHeight: 300,
	},
	header: {
		paddingTop: 30,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	backIcon: {
		backgroundColor: '#113427',
		borderRadius: 100,
		padding: 5,
	},
	title: {
		color: 'white',
		fontFamily: semibold,
		fontSize: 25,
	},
	actionBox: {
		flexDirection: 'row-reverse',
		gap: 20,

		marginTop: 10,
		marginBottom: 10,
	},
	statsContainer: {
		gap: 5,
		flexDirection: 'row',
		alignItems: 'center',
	},
	statsText: {
		color: 'white',
		fontFamily: semibold,
		fontSize: 15,
	},
	separator: {
		height: 2,
		backgroundColor: 'rgba(255,255,255,0.1)',
		marginTop: 10,
		marginBottom: 10,
	},
	newsText: {
		color: 'white',
		textAlign: 'justify',
		fontFamily: regular,
	},
	loader: {
		flex: 1,

		justifyContent: 'center',
		alignItems: 'center',
	},
});
