import { createContext, useContext, useEffect, useState } from 'react';
import { Audio } from 'expo-av';

export const RadioContext = createContext();

export const RadioProvider = ({ children }) => {
	const [name, setName] = useState('Nom du match');
	const [playing, setPlaying] = useState(false);
	const [sound, setSound] = useState();
	const [isPlaying, setIsPlaying] = useState(false);

	const playSound = async () => {
		// from url 'https://rfimonde64k.ice.infomaniak.ch/rfiafrique-64.mp3'
		const { sound } = await Audio.Sound.createAsync(
			{ uri: 'http://icecast.radiofrance.fr/franceinfo-midfi.mp3' },
			{
				shouldPlay: true,
			}
		);
		setSound(sound);
		console.log('Playing Sound');
		await sound.playAsync();
	};

	const stopSound = async () => {
		await sound?.unloadAsync();
	};

	const getStatus = () => {
		return isPlaying;
	};

	useEffect(() => {
		return sound
			? () => {
					console.log('Unloading Sound');
					sound?.unloadAsync();
			  }
			: undefined;
	}, [sound]);

	useEffect(() => {
		if (playing) {
			playSound();
		} else {
			stopSound();
		}
	}, [playing]);

	useEffect(() => {
		if (sound) {
			sound?.setOnPlaybackStatusUpdate((status) => {
				setIsPlaying(status.isPlaying);
			});
		}
	}, [sound]);

	return (
		<RadioContext.Provider
			value={{ name, setName, playSound, stopSound, getStatus, isPlaying }}
		>
			{children}
		</RadioContext.Provider>
	);
};

export function useRadio() {
	return useContext(RadioContext);
}
