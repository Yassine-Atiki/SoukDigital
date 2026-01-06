// src/screens/EditProfileScreen.js
// Implements TESTING_GUIDE Section 3.2: EditProfileScreen
// - Photo de profil with camera button (functional with Image Picker)
// - Complete form: name, email, phone, bio (multiline TextInput)
// - Save button functional with AuthContext.updateProfile()
// - Alert confirmation after save
// - Modern Ionicons instead of emoji
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Image,
    Alert,
    TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { COLORS, SPACING, FONTS, SHADOWS, BORDER_RADIUS } from '../constants/theme';
import { useAuth } from '../context/AuthContext';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const EditProfileScreen = ({ navigation }) => {
    const { user, updateProfile } = useAuth();
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [bio, setBio] = useState(user?.bio || '');
    const [avatar, setAvatar] = useState(user?.avatar || '');
    const [isLoading, setIsLoading] = useState(false);

    // Handle image picker for profile photo
    const handleChangePhoto = async () => {
        try {
            // Request permission
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            
            if (status !== 'granted') {
                Alert.alert(
                    'Permission requise',
                    'Nous avons besoin de votre permission pour accéder à vos photos.'
                );
                return;
            }

            // Launch image picker
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                setAvatar(result.assets[0].uri);
                Alert.alert('Succès', 'Photo de profil modifiée. N\'oubliez pas d\'enregistrer!');
            }
        } catch (error) {
            console.error('Error picking image:', error);
            Alert.alert('Erreur', 'Impossible de charger l\'image');
        }
    };

    const handleSave = async () => {
        setIsLoading(true);
        try {
            const result = await updateProfile({ name, email, phone, bio, avatar });
            if (result.success) {
                Alert.alert('Succès', 'Votre profil a été mis à jour', [
                    { text: 'OK', onPress: () => navigation.goBack() }
                ]);
            } else {
                Alert.alert('Erreur', result.error || 'Erreur lors de la mise à jour');
            }
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur inattendue est survenue');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Modifier le profil</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Avatar Section */}
                <View style={styles.avatarSection}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: avatar }}
                            style={styles.avatar}
                        />
                        <TouchableOpacity 
                            style={styles.cameraButton}
                            onPress={handleChangePhoto}
                        >
                            <Ionicons name="camera" size={20} color={COLORS.surface} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.avatarHint}>Changer la photo</Text>
                </View>

                {/* Form */}
                <View style={styles.form}>
                    <CustomInput
                        placeholder="Nom complet"
                        value={name}
                        onChangeText={setName}
                        iconName="person-outline"
                        iconColor={COLORS.primary}
                    />

                    <CustomInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        iconName="mail-outline"
                        iconColor={COLORS.primary}
                    />

                    <CustomInput
                        placeholder="Téléphone"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                        iconName="call-outline"
                        iconColor={COLORS.primary}
                    />

                    <View style={styles.bioContainer}>
                        <Text style={styles.bioLabel}>Bio</Text>
                        <View style={styles.bioInputWrapper}>
                            <Ionicons 
                                name="create-outline" 
                                size={22} 
                                color={COLORS.primary} 
                                style={styles.bioIconStyle}
                            />
                            <TextInput
                                style={styles.bioInput}
                                numberOfLines={4}
                                multiline
                                placeholder="Parlez-nous de vous..."
                                placeholderTextColor={COLORS.textTertiary}
                                value={bio}
                                onChangeText={setBio}
                                textAlignVertical="top"
                            />
                        </View>
                    </View>
                </View>

                {/* Save Button */}
                <View style={styles.buttonContainer}>
                    <CustomButton
                        title={isLoading ? "Enregistrement..." : "Enregistrer"}
                        onPress={handleSave}
                        disabled={isLoading}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: SPACING.l,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: FONTS.sizes.xl,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    avatarSection: {
        alignItems: 'center',
        paddingVertical: SPACING.xl,
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: COLORS.primary,
    },
    cameraButton: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: COLORS.surface,
    },
    avatarHint: {
        marginTop: SPACING.m,
        fontSize: FONTS.sizes.sm,
        color: COLORS.primary,
        fontWeight: '600',
    },
    form: {
        padding: SPACING.l,
    },
    bioContainer: {
        marginTop: SPACING.m,
    },
    bioLabel: {
        fontSize: FONTS.sizes.sm,
        fontWeight: '600',
        color: COLORS.textSecondary,
        marginBottom: SPACING.s,
    },
    bioInputWrapper: {
        flexDirection: 'row',
        backgroundColor: COLORS.surface,
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.m,
        borderWidth: 1,
        borderColor: COLORS.border,
        minHeight: 100,
        alignItems: 'flex-start',
    },
    bioIconStyle: {
        marginRight: SPACING.s,
        marginTop: 2,
    },
    bioInput: {
        flex: 1,
        fontSize: FONTS.sizes.md,
        color: COLORS.text,
        textAlignVertical: 'top',
    },
    buttonContainer: {
        padding: SPACING.l,
    },
});

export default EditProfileScreen;
