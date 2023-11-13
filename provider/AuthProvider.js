import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH, FIRESTORE } from '../FirebaseConfig';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
	const firestore = FIRESTORE;
	const [user, setUser] = useState(null);
	const [firestoreUser, setFirestoreUser] = useState(null);
	const [isFirestoreLoaded, setIsFirestoreLoaded] = useState(true);

	useEffect(() => {
		// Utilisez la fonction onAuthStateChanged de Firebase pour suivre l'état de l'authentification
		onAuthStateChanged(FIREBASE_AUTH, (user) => {
			setUser(user);
			if (user !== null) {
				setIsFirestoreLoaded(false);
				if (user?.hasOwnProperty('uid')) {
					const unsuscribe = onSnapshot(
						doc(firestore, 'users', user?.uid),
						(doc) => {
							setFirestoreUser(doc.data());
							setIsFirestoreLoaded(true);
						}
					);
					return () => {
						unsuscribe();
					};
				}
			}
		});
	}, []);

	const getUser = () => {
		return { ...user, ...firestoreUser };
	};

	const logout = () => {
		FIREBASE_AUTH.signOut().then(() => {
			console.log("[AuthProvider] - Déconnexion de l'utilisateur");
		});
	};

	const reloadUserData = () => {
		if (user?.hasOwnProperty('uid')) {
			setIsFirestoreLoaded(false);
			onSnapshot(doc(firestore, 'users', user?.uid), (doc) => {
				setFirestoreUser(doc.data());
				setIsFirestoreLoaded(true);
			});
		}
	};

	const updateUserKey = async (key, value) => {
		if (user?.hasOwnProperty('uid')) {
			try {
				const userDocRef = doc(firestore, 'users', user.uid);
				await updateDoc(userDocRef, {
					[key]: value,
				});
				await reloadUserData();
			} catch (error) {
				console.error(
					'[AuthProvider] - Erreur lors de la mise à jour de la clé utilisateur :',
					error
				);
			}
		}
	};

	// Si le firestore n'est pas loaded, affichage activity loader
	if (!isFirestoreLoaded) {
		return (
			<View style={styles.container}>
				<ActivityIndicator color={'#113427'} size={'large'} />
			</View>
		);
	}

	// Renvoyez le contexte d'authentification avec l'utilisateur actuel
	return (
		<AuthContext.Provider
			value={{
				user,
				firestoreUser,
				getUser,
				logout,
				reloadUserData,
				updateUserKey,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export function useAuth() {
	return useContext(AuthContext);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#184D39',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
