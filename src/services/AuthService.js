import StorageService from './StorageService';

const USERS_KEY = 'souk_users';
const CURRENT_USER_KEY = 'souk_current_user';

/**
 * Service for handling User Authentication and Management.
 */
const AuthService = {
    /**
     * Login user
     * @param {string} email 
     * @param {string} password 
     * @param {string} userType 
     * @returns {Promise<{success: boolean, user?: Object, error?: string}>}
     */
    login: async (email, password, userType) => {
        try {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // In a real app, we would hash passwords and check against a DB.
            // Here we will check if user exists in our local "DB" or create a mock one if it's a demo login.

            const users = await StorageService.getItem(USERS_KEY) || [];
            const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.userType === userType);

            if (user) {
                // Check password (simple string comparison for demo)
                if (user.password === password) {
                    await StorageService.setItem(CURRENT_USER_KEY, user);
                    return { success: true, user };
                } else {
                    return { success: false, error: 'Mot de passe incorrect' };
                }
            } else {
                // For demo purposes, if user doesn't exist, we can either fail or auto-create.
                // Let's fail to encourage signup, BUT allow specific demo accounts.
                // TESTING_GUIDE: user@test.com / password
                if (email === 'user@test.com' && password === 'password') {
                    const demoUser = {
                        id: 'test_user_1',
                        name: 'Test User',
                        email: email,
                        userType: userType,
                        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
                        password: password
                    };
                    await StorageService.setItem(CURRENT_USER_KEY, demoUser);
                    return { success: true, user: demoUser };
                }

                // Demo account: demo@souk.ma / 123456
                if (email === 'demo@souk.ma' && password === '123456') {
                    const demoUser = {
                        id: 'demo_user_1',
                        name: 'Demo User',
                        email: email,
                        userType: userType,
                        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
                        password: password
                    };
                    await StorageService.setItem(CURRENT_USER_KEY, demoUser);
                    return { success: true, user: demoUser };
                }

                return { success: false, error: 'Utilisateur non trouvé. Veuillez vous inscrire.' };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: 'Erreur de connexion' };
        }
    },

    /**
     * Sign up new user
     * @param {string} fullName 
     * @param {string} email 
     * @param {string} password 
     * @param {string} userType 
     * @returns {Promise<{success: boolean, user?: Object, error?: string}>}
     */
    signup: async (fullName, email, password, userType) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const users = await StorageService.getItem(USERS_KEY) || [];

            if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
                return { success: false, error: 'Cet email est déjà utilisé' };
            }

            const newUser = {
                id: Date.now().toString(),
                name: fullName,
                email: email,
                password: password, // In production, NEVER store plain text passwords
                userType: userType,
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
                createdAt: new Date().toISOString()
            };

            users.push(newUser);
            await StorageService.setItem(USERS_KEY, users);
            await StorageService.setItem(CURRENT_USER_KEY, newUser);

            return { success: true, user: newUser };
        } catch (error) {
            console.error('Signup error:', error);
            return { success: false, error: 'Erreur lors de l\'inscription' };
        }
    },

    /**
     * Logout user
     */
    logout: async () => {
        await StorageService.removeItem(CURRENT_USER_KEY);
    },

    /**
     * Get current authenticated user
     * @returns {Promise<Object|null>}
     */
    getCurrentUser: async () => {
        return await StorageService.getItem(CURRENT_USER_KEY);
    },

    /**
     * Update user profile
     * @param {Object} updates 
     * @returns {Promise<{success: boolean, user?: Object}>}
     */
    updateProfile: async (updates) => {
        try {
            const currentUser = await StorageService.getItem(CURRENT_USER_KEY);
            if (!currentUser) return { success: false, error: 'Non connecté' };

            const updatedUser = { ...currentUser, ...updates };
            await StorageService.setItem(CURRENT_USER_KEY, updatedUser);

            // Also update in the main users list
            const users = await StorageService.getItem(USERS_KEY) || [];
            const userIndex = users.findIndex(u => u.id === currentUser.id);
            if (userIndex >= 0) {
                users[userIndex] = { ...users[userIndex], ...updates };
                await StorageService.setItem(USERS_KEY, users);
            }

            return { success: true, user: updatedUser };
        } catch (error) {
            console.error('Update profile error:', error);
            return { success: false, error: 'Erreur de mise à jour' };
        }
    }
};

export default AuthService;
