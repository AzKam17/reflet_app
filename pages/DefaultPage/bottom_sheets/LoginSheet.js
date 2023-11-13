import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ModalTitle from './ModalTitle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useMemo, useState } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import BottomSheetInput from './BottomSheetInput';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import useEmail from '../../../hooks/useEmail';
import { loginUser } from '../../../firebase_functions/auth/loginUser';
import useFirebaseError from '../../../firebase_functions/useFirebaseError';

export default function LoginSheet({ modalCloseFunction = () => {} }) {
	const insets = useSafeAreaInsets();
	const [email, setEmail, isValid] = useEmail();
	const [password, setPassword] = useState(null);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorCode, resetError] = useFirebaseError();

	const EyeIcon = useMemo(() => {
		return (
			<Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
				{isPasswordVisible ? (
					<Feather name={'eye'} size={20} color={'white'} />
				) : (
					<Feather name={'eye-off'} size={20} color={'white'} />
				)}
			</Pressable>
		);
	}, [isPasswordVisible]);

	const connexion = () => {
		resetError();
		setIsLoading(true);
		loginUser({
			email: email,
			password: password,
		})
			.then((res) => {
				setIsLoading(false);
			})
			.catch((error) => {
				setIsLoading(false);
				console.log(error.code);
				setErrorCode(error.code);
			});
		setIsLoading(false);
	};

	return (
		<View
			style={{
				padding: 10,
			}}
		>
			<View style={styles.header}>
				<ModalTitle text={'Connectez-vous'} />
				<Pressable onPress={modalCloseFunction}>
					<MaterialIcons
						name="cancel"
						size={24}
						color="black"
						style={{
							padding: 10,
						}}
					/>
				</Pressable>
			</View>
			<Text
				style={{
					height: 20,
				}}
			>
				{errorMessage}
			</Text>
			<View style={styles.form}>
				<BottomSheetInput
					data={email}
					onChange={setEmail}
					placeholder={'Email'}
					leftIcon={<Fontisto name={'email'} size={24} color={'white'} />}
				/>
				<BottomSheetInput
					data={password}
					onChange={setPassword}
					placeholder={'Mot de passe'}
					leftIcon={
						<MaterialCommunityIcons
							name={'form-textbox-password'}
							size={24}
							color={'white'}
						/>
					}
					rightIcon={EyeIcon}
					secureTextEntry={!isPasswordVisible}
				/>
			</View>
			<PrimaryButton
				isLoading={isLoading}
				text={'Connexion'}
				onPress={connexion}
				style={{
					alignSelf: 'center',
					marginTop: 5,
					width: '100%',
				}}
				text_style={{
					fontSize: 20,
				}}
			/>
			<View style={{ height: insets.bottom }} />
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	form: {
		gap: 5,
		marginTop: 10,
	},
});
