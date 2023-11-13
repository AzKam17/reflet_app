import { Image } from 'expo-image';
import {
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import CountryCarousel from './components/CountryCarousel';
import { bold, regular, semibold } from '../../FontsConfig';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
	BottomSheetBackdrop,
	BottomSheetModal,
	BottomSheetModalProvider,
	BottomSheetView,
} from '@gorhom/bottom-sheet';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import { useCallback, useMemo, useRef } from 'react';
import InscriptionSheet from './bottom_sheets/InscriptionSheet';
import LoginSheet from './bottom_sheets/LoginSheet';

export default function DefaultPage() {
	const insets = useSafeAreaInsets();

	// Ref pour la sheet d'inscription
	const inscription_modal_ref = useRef(null);
	// Ouverture du modal
	const displayModal = useCallback(() => {
		inscription_modal_ref.current?.present();
	}, []);

	// Ref pour la sheet de connexion
	const connexion_modal_ref = useRef(null);
	// Ouverture du modal
	const displayConnexionModal = useCallback(() => {
		connexion_modal_ref.current?.present();
	}, []);

	return (
		<BottomSheetModalProvider>
			<View style={styles.container}>
				<View style={styles.logoContainer}>
					<Image
						style={styles.logoStyle}
						source={require('../../assets/images/can_logo.png')}
					/>
				</View>
				<View style={styles.part}>
					<CountryCarousel />
					<View style={styles.textBox}>
						<Text style={styles.title}>Vivez la CAN{'\n'}dans la CAN !</Text>
						<Text style={styles.sub_text}>
							Plongez au cœur de la CAN, célébrez{'\n'}vos nations, faites-vous
							des amis et{'\n'}vivez ensemble votre passion !
						</Text>
						<Text style={styles.catch_phrase}>
							Actualité - Discussion – Jeu
						</Text>
					</View>
					<View
						style={{
							flex: 2,
							paddingBottom: insets.bottom,
						}}
					>
						<PrimaryButton
							text={'Go !'}
							style={{
								alignSelf: 'center',
								width: '70%',
							}}
							text_style={{
								fontSize: 20,
							}}
							onPress={displayModal}
						/>
						<Pressable
							style={styles.se_connecter}
							onPress={displayConnexionModal}
						>
							<Text style={styles.se_connecter_text_style}>
								Déjà un compte ?{' '}
							</Text>
							<Text
								style={[
									styles.se_connecter_text_style,
									{ textDecorationLine: 'underline' },
								]}
							>
								Se connecter{' '}
							</Text>
						</Pressable>
					</View>
				</View>
			</View>
			<BottomSheetModal
				ref={inscription_modal_ref}
				name={'inscription_modal'}
				enableDynamicSizing
			>
				<BottomSheetView>
					<InscriptionSheet
						modalCloseFunction={() => inscription_modal_ref.current?.dismiss()}
					/>
				</BottomSheetView>
			</BottomSheetModal>
			<BottomSheetModal
				ref={connexion_modal_ref}
				name={'connexion_modal'}
				enableDynamicSizing
			>
				<BottomSheetView>
					<LoginSheet
						modalCloseFunction={() => connexion_modal_ref.current?.dismiss()}
					/>
				</BottomSheetView>
			</BottomSheetModal>
		</BottomSheetModalProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#184D39',
	},
	logoContainer: {
		flex: 1,
		alignItems: 'center',
	},
	part: {
		flex: 1,
	},
	logoStyle: { flex: 1, aspectRatio: 0.75, contentFit: 'contain' },
	textBox: {
		flex: 4,
		justifyContent: 'space-between',
		marginBottom: 20,
		marginTop: 20,
	},
	sub_text: {
		fontFamily: regular,
		textAlign: 'center',
		color: '#FFFFFF',
		fontSize: 15,
	},
	title: {
		fontFamily: semibold,
		color: 'white',
		fontSize: 44,
		textAlign: 'center',
		lineHeight: 55,
	},
	catch_phrase: {
		fontFamily: bold,
		color: 'white',
		textAlign: 'center',
		fontSize: 18,
	},
	se_connecter: { flexDirection: 'row', justifyContent: 'center', padding: 5 },
	se_connecter_text_style: {
		fontFamily: regular,
		color: 'white',
		textAlign: 'center',
	},
});
