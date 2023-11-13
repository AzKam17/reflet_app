import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Pressable, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRadio } from '../../provider/RadioProvider';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function SafeView({ style = {}, children }) {
	const insets = useSafeAreaInsets();
	const { isPlaying, getStatus, name, stopSound } = useRadio();

	return (
		<View
			style={[
				{
					paddingTop: insets.top,
					paddingBottom: insets.bottom,
					backgroundColor: '#184D39',
				},
				style,
			]}
		>
			<StatusBar style="light" />
			{isPlaying && (
				<View
					style={{
						flexDirection: 'row',
						backgroundColor: '#113427',
						paddingTop: 8,
						paddingBottom: 8,
						paddingLeft: 15,
						paddingRight: 15,
						justifyContent: 'space-between',
						alignItems: 'center',
						marginBottom: 10,
					}}
				>
					<View
						style={{
							gap: 10,
							flexDirection: 'row',
							alignItems: 'center',
						}}
					>
						<Pressable
							onPress={stopSound}
							style={{
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<MaterialIcons name={'cancel'} color={'white'} size={20} />
						</Pressable>
						<Text
							style={{
								color: 'white',
							}}
						>
							{' '}
							Radio France Afrique | {name}
						</Text>
					</View>
				</View>
			)}
			{children}
		</View>
	);
}
