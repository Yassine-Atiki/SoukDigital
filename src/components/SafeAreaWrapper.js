// src/components/SafeAreaWrapper.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * Composant wrapper pour gérer les zones de sécurité (notch, barre de statut, etc.)
 * Ajoute automatiquement du padding en haut et en bas selon l'appareil
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenu de l'écran
 * @param {string} props.backgroundColor - Couleur de fond (défaut: blanc)
 * @param {Object} props.style - Styles additionnels
 * @param {boolean} props.edges - Quels bords protéger: ['top', 'bottom'] (défaut: tous)
 */
const SafeAreaWrapper = ({ 
    children, 
    backgroundColor = '#FFFFFF', 
    style = {},
    edges = ['top', 'bottom'] 
}) => {
    const insets = useSafeAreaInsets();

    // Calculer le padding selon les edges demandés
    const paddingTop = edges.includes('top') ? insets.top : 0;
    const paddingBottom = edges.includes('bottom') ? insets.bottom : 0;

    return (
        <View 
            style={[
                styles.container, 
                { 
                    backgroundColor,
                    paddingTop,
                    paddingBottom 
                },
                style
            ]}
        >
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default SafeAreaWrapper;
