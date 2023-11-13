import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import 'firebase/compat/firestore';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
	apiKey: 'AIzaSyAdT3R9QDCmTjhQDZ9Xawyk7TP0vFKm-bw',
	authDomain: 'reflet-consulting-cancx.firebaseapp.com',
	projectId: 'reflet-consulting-cancx',
	storageBucket: 'reflet-consulting-cancx.appspot.com',
	messagingSenderId: '83309963961',
	appId: '1:83309963961:web:4cdffcef8f55dc07558968',
	databaseURL:
		'https://reflet-consulting-cancx-default-rtdb.europe-west1.firebasedatabase.app',
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
	persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const FIRESTORE = getFirestore(FIREBASE_APP);
export const REALTIME_DATABASE = getDatabase(FIREBASE_APP);

export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
