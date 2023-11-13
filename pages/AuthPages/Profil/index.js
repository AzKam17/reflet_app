import React, { useEffect, useState } from 'react';
import SafeView from '../SafeView';
import {
	KeyboardAvoidingView,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import Modal from 'react-native-modal';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import { useAuth } from '../../../provider/AuthProvider';
import { bold, semibold } from '../../../FontsConfig';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ProfileSVG from '../../../assets/icons/profile.svg';
import MessageSVG from '../../../assets/icons/Message.svg';
import CallSVG from '../../../assets/icons/Call.svg';
import LocationSVG from '../../../assets/icons/Location.svg';
import RightFacingArrowSvg from '../../../assets/icons/right_facing_arrow.svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Profil() {
	const avatarSize = 100;
	const { logout } = useAuth();
	const { getUser } = useAuth();
	const [user, setUser] = useState({});
	const [selectedTab, setSelectedTab] = useState(0);
	const [isModalVisible, setModalVisible] = useState(false);
	const [keyToModify, setKeyToModify] = useState(null);
	const [keyActualValue, setKeyActualValue] = useState(null);
	const [keyActualValueLabel, setKeyActualValueLabel] = useState(null);

	const toggleModal = () => {
		setModalVisible(!isModalVisible);
		setUser(getUser());
	};

	useEffect(() => {
		setUser(getUser());
	}, []);

	return (
		<SafeView style={styles.container}>
			<View
				style={{
					flex: 1,
					paddingTop: 30,
					paddingBottom: 60,
					gap: 10,
				}}
			>
				<View>
					<View
						style={{
							padding: 40,
							borderRadius: 100,
							backgroundColor: 'rgba(255,255,255,0.3)',
							justifyContent: 'center',
							alignItems: 'center',
							alignSelf: 'center',
						}}
					>
						<ProfileSVG color={'black'} size={50} />
					</View>
					<Text
						style={{
							fontFamily: bold,
							fontSize: 22,
							color: 'white',
							textAlign: 'center',
						}}
					>
						{user?.username || "Nom d'utilisateur"}
					</Text>
					<Text
						style={{
							fontFamily: semibold,
							fontSize: 15,
							color: 'rgba(255,255,255,0.6)',
							textAlign: 'center',
						}}
					>
						Tous pour la CAN 🔥
					</Text>
				</View>
				<View
					style={{
						height: 50,
						flexDirection: 'row',
						justifyContent: 'space-around',
					}}
				>
					<TabButtons
						title={'Mon Profil'}
						state={selectedTab === 0}
						onPress={() => setSelectedTab(0)}
					/>
					<TabButtons
						title={'Activité'}
						state={selectedTab === 1}
						onPress={() => setSelectedTab(1)}
					/>
					{/*
					<TabButtons
						title={'Paramètre'}
						state={selectedTab === 2}
						onPress={() => setSelectedTab(2)}
					/>*/}
				</View>
				<KeyboardAvoidingView
					behavior={'padding'}
					style={{
						flex: 1,
						width: 350,
						gap: 30,
						justifyContent: 'center',
					}}
				>
					<Field
						label={'Nom'}
						icon={<ProfileSVG />}
						field_key={'username'}
						setKeyToModify={setKeyToModify}
						setKeyActualValue={setKeyActualValue}
						setKeyActualValueLabel={setKeyActualValueLabel}
						toggleModal={() => toggleModal()}
						value={user?.username || "Nom d'utilisateur"}
					/>
					<Field
						label={'Email'}
						icon={<MessageSVG />}
						field_key={'email'}
						setKeyToModify={setKeyToModify}
						setKeyActualValue={setKeyActualValue}
						setKeyActualValueLabel={setKeyActualValueLabel}
						toggleModal={() => toggleModal()}
						value={user?.email || 'Email utilisateur'}
					/>
					<Field
						label={'Téléphone'}
						icon={<CallSVG />}
						field_key={'phone'}
						setKeyToModify={setKeyToModify}
						setKeyActualValue={setKeyActualValue}
						setKeyActualValueLabel={setKeyActualValueLabel}
						toggleModal={() => toggleModal()}
						value={user?.phone || 'Votre numéro de téléphone'}
					/>
					<Field
						label={'Adresse'}
						icon={<LocationSVG />}
						field_key={'addr'}
						setKeyToModify={setKeyToModify}
						setKeyActualValue={setKeyActualValue}
						setKeyActualValueLabel={setKeyActualValueLabel}
						toggleModal={() => toggleModal()}
						value={user?.addr || "Adresse de l'utilisateur"}
					/>
				</KeyboardAvoidingView>
			</View>
			<WrapperComponent
				keyToModify={keyToModify}
				keyActualValue={keyActualValue}
				keyActualValueLabel={keyActualValueLabel}
				isModalVisible={isModalVisible}
				toggleModal={() => toggleModal()}
			/>
			<PrimaryButton
				//onPress={logout}
				onPress={logout}
				text={'Déconnexion'}
				style={{
					alignSelf: 'center',
					position: 'absolute',
					bottom: 20,
				}}
			/>
		</SafeView>
	);
}

const TabButtons = ({ title = 'btn', state = true, onPress = () => {} }) => {
	return (
		<Pressable
			onPress={onPress}
			style={{
				padding: 10,
				borderRadius: 20,
				alignSelf: 'center',
				backgroundColor: state ? '#F17228' : 'transparent',
			}}
		>
			<Text
				style={{
					fontFamily: semibold,
					color: 'white',
				}}
			>
				{title}
			</Text>
		</Pressable>
	);
};

const Field = ({
	icon = <ProfileSVG />,
	label = 'label',
	value = 'value',
	field_key,
	setKeyToModify,
	setKeyActualValue,
	setKeyActualValueLabel,
	toggleModal,
}) => {
	const [inputValue, setInputValue] = useState(value);

	const onPress = () => {
		setKeyToModify(field_key);
		setKeyActualValueLabel(label);
		setKeyActualValue(value);
		toggleModal();
	};

	return (
		<Pressable
			onPress={onPress}
			style={{
				gap: 10,
				flexDirection: 'row',
				justifyContent: 'center',
			}}
		>
			<View
				style={{
					padding: 10,
					alignSelf: 'center',
					borderRadius: 100,
					backgroundColor: '#113427',
				}}
			>
				{React.cloneElement(icon, {
					width: 24,
					height: 24,
					style: {},
				})}
			</View>
			<View
				style={{
					flex: 1,
					gap: 2,
					borderBottomColor: 'black',
					borderBottomWidth: 1,
					paddingBottom: 5,
				}}
			>
				<Text
					style={{
						fontSize: 20,
						fontFamily: bold,
						color: '#48C543',
					}}
				>
					{label}
				</Text>
				<Text
					style={[
						{
							fontFamily: bold,
							color: 'white',
						},
					]}
				>
					{value}
				</Text>
			</View>
			<View
				style={{
					padding: 20,
					alignItems: 'center',
					justifyContent: 'center',
					borderRadius: 30,
				}}
			>
				<RightFacingArrowSvg />
			</View>
		</Pressable>
	);
};

function WrapperComponent({
	isModalVisible,
	toggleModal,
	keyToModify,
	keyActualValue = 'keyActualValue',
	keyActualValueLabel = 'keyActualValueLabel',
}) {
	const [inputValue, setInputValue] = useState('');
	const { updateUserKey } = useAuth();

	const confirmUpdate = () => {
		updateUserKey(keyToModify, inputValue);
		toggleModal();
	};

	return (
		<View>
			<Modal isVisible={isModalVisible}>
				<View style={{ padding: 20, backgroundColor: '#113427' }}>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'flex-end',
						}}
					>
						<Pressable
							onPress={() => {
								toggleModal();
								setInputValue('');
							}}
							style={{
								padding: 5,
							}}
						>
							<MaterialIcons
								name={'cancel'}
								color={'white'}
								size={20}
								style={{}}
							/>
						</Pressable>
					</View>
					<View
						style={{
							marginTop: 5,
							marginBottom: 10,
						}}
					>
						<Text
							style={{
								fontSize: 20,
								fontFamily: bold,
								color: '#48C543',
							}}
						>
							{keyActualValueLabel}
						</Text>
						<TextInput
							style={[
								{
									fontFamily: bold,
									color: 'white',
									backgroundColor: '#184D39',
									padding: 10,
								},
							]}
							placeholder={keyActualValue}
							placeholderTextColor={'white'}
							value={inputValue}
							onChangeText={setInputValue}
						/>
					</View>
					<View>
						<PrimaryButton
							onPress={confirmUpdate}
							text={'Valider'}
							style={{
								alignSelf: 'center',
							}}
						/>
					</View>
				</View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: 10,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
