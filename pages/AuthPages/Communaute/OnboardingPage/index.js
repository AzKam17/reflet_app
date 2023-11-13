import { StyleSheet, Text, View } from 'react-native';
import SafeView from '../../SafeView';
import OnboardingSvg from '../../../../assets/icons/OnboardingIcon.svg';
import { bold, regular } from '../../../../FontsConfig';
import PrimaryButton from '../../../../components/buttons/PrimaryButton';
import { useAuth } from '../../../../provider/AuthProvider';
import { useEffect, useState } from 'react';
import { updateUserOnboardingCommunaute } from '../../../../firebase_functions/communaute/updateOnboardingCommunaute';

export default function OnboardingPage({ navigation }) {
	const { getUser } = useAuth();
	const [isLoading, setIsLoading] = useState(false);

	const acceptCommunaute = () => {
		setIsLoading(true);
		updateUserOnboardingCommunaute(getUser()?.uid).then((r) => {
			setIsLoading(false);
			navigation.navigate('Communaute');
		});
	};

	return (
		<SafeView style={styles.container}>
			<OnboardingSvg />
			<Text style={styles.header}>Fanzone</Text>
			<View style={styles.textContainer}>
				<Text style={styles.text_one}>
					Débattez, discutez et échangez avec{'\n'}des fans de football
					africain.
				</Text>
				<Text style={styles.text_one}>
					Rejoignez des groupes de supporters de différentes nations et partagez
					votre passion. Ne regardez pas seulement les matchs, vivez-les
					ensemble avec des milliers d'autres fans. Célébrez les victoires,
					partagez les déceptions et faites de chaque match une expérience
					collective inoubliable.
				</Text>
				<PrimaryButton
					text={'Suivant'}
					isLoading={isLoading}
					onPress={acceptCommunaute}
					style={{
						alignSelf: 'center',
						width: 200,
					}}
					text_style={{
						fontFamily: bold,
						fontSize: 20,
					}}
				/>
			</View>
		</SafeView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingLeft: 20,
		paddingRight: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	header: {
		color: 'white',
		fontSize: 40,
		fontFamily: bold,
	},
	text_one: {
		color: 'white',
		fontSize: 15,
		fontFamily: regular,
		textAlign: 'center',
	},
	textContainer: {
		gap: 20,
	},
});
