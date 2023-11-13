import { createContext } from 'react';
import * as Network from 'expo-network';

export const ConnectivityContext = createContext();

export const ConnectivityProvider = ({ children }) => {
	/**
	 * Vérifie si l'appareil est connecté à Internet en utilisant Expo Network.
	 *
	 * @async
	 * @function
	 * @returns {Promise<boolean>} Une promesse qui résout à `true` si l'appareil est connecté à Internet, sinon `false`.
	 * @throws {Error} Une erreur est levée si la vérification de la connexion échoue.
	 *
	 * @example
	 * // Exemple d'utilisation :
	 * checkInternetConnection().then((isConnected) => {
	 *   if (isConnected) {
	 *     console.log('Connecté à Internet');
	 *   } else {
	 *     console.log('Non connecté à Internet');
	 *   }
	 * });
	 */
	async function checkInternetConnection() {
		try {
			const networkState = await Network.getNetworkStateAsync();

			if (networkState.isConnected && networkState.isInternetReachable) {
				// Vous êtes connecté à Internet
				return true;
			} else {
				// Vous n'êtes pas connecté à Internet
				return false;
			}
		} catch (error) {
			console.error(
				'Erreur lors de la vérification de la connexion Internet :',
				error
			);
			return false;
		}
	}

	return (
		<ConnectivityContext.Provider value={{ checkInternetConnection }}>
			{children}
		</ConnectivityContext.Provider>
	);
};
