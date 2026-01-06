import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Service for handling local data persistence using AsyncStorage.
 * Provides a wrapper around AsyncStorage with error handling and JSON parsing.
 */
const StorageService = {
    /**
     * Save data to storage
     * @param {string} key - The key to save data under
     * @param {any} value - The data to save (will be stringified)
     */
    setItem: async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
            return true;
        } catch (e) {
            console.error(`Error saving data for key ${key}:`, e);
            return false;
        }
    },

    /**
     * Retrieve data from storage
     * @param {string} key - The key to retrieve data for
     * @returns {Promise<any>} - The parsed data or null if not found
     */
    getItem: async (key) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.error(`Error retrieving data for key ${key}:`, e);
            return null;
        }
    },

    /**
     * Remove data from storage
     * @param {string} key - The key to remove
     */
    removeItem: async (key) => {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error(`Error removing data for key ${key}:`, e);
            return false;
        }
    },

    /**
     * Clear all data from storage
     * @returns {Promise<boolean>}
     */
    clear: async () => {
        try {
            await AsyncStorage.clear();
            return true;
        } catch (e) {
            console.error('Error clearing storage:', e);
            return false;
        }
    },

    /**
     * Get all keys from storage
     * @returns {Promise<string[]>}
     */
    getAllKeys: async () => {
        try {
            return await AsyncStorage.getAllKeys();
        } catch (e) {
            console.error('Error getting all keys:', e);
            return [];
        }
    }
};

export default StorageService;
