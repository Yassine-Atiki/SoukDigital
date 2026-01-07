// Script pour migrer automatiquement SafeAreaView → SafeAreaWrapper
const fs = require('fs');
const path = require('path');

const screensToMigrate = [
    'CartScreen.js',
    'CheckoutScreen.js',
    'FavoritesScreen.js',
    'SearchScreen.js',
    'OrderHistoryScreen.js',
    'AddressesScreen.js',
    'SettingsScreen.js',
    'PaymentMethodsScreen.js',
    'ProductDetailScreen.js',
];

const screensDir = path.join(__dirname, '../src/screens');

screensToMigrate.forEach(filename => {
    const filePath = path.join(screensDir, filename);
    
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  Fichier non trouvé: ${filename}`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // 1. Retirer SafeAreaView de l'import React Native
    if (content.includes('SafeAreaView,')) {
        content = content.replace(/(\s*)SafeAreaView,\n/g, '');
        modified = true;
        console.log(`✅ ${filename}: SafeAreaView retiré des imports`);
    }

    // 2. Ajouter l'import SafeAreaWrapper si pas déjà présent
    if (!content.includes("import SafeAreaWrapper")) {
        // Trouver le dernier import de composants personnalisés
        const lastCustomImportMatch = content.match(/import.*from ['"]\.\.\/(?:components|constants|context|services)/g);
        if (lastCustomImportMatch) {
            const lastImport = lastCustomImportMatch[lastCustomImportMatch.length - 1];
            content = content.replace(
                lastImport,
                lastImport + "\nimport SafeAreaWrapper from '../components/SafeAreaWrapper';"
            );
            modified = true;
            console.log(`✅ ${filename}: Import SafeAreaWrapper ajouté`);
        }
    }

    // 3. Remplacer <SafeAreaView style={styles.container}> par <SafeAreaWrapper backgroundColor={COLORS.background}>
    if (content.includes('<SafeAreaView style={styles.container}>')) {
        content = content.replace(
            /<SafeAreaView style={styles\.container}>/g,
            '<SafeAreaWrapper backgroundColor={COLORS.background}>'
        );
        modified = true;
        console.log(`✅ ${filename}: <SafeAreaView> remplacé par <SafeAreaWrapper>`);
    }

    // 4. Remplacer </SafeAreaView> par </SafeAreaWrapper>
    if (content.includes('</SafeAreaView>')) {
        content = content.replace(
            /<\/SafeAreaView>/g,
            '</SafeAreaWrapper>'
        );
        modified = true;
        console.log(`✅ ${filename}: </SafeAreaView> remplacé par </SafeAreaWrapper>`);
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✨ ${filename}: Migration terminée!\n`);
    } else {
        console.log(`ℹ️  ${filename}: Aucune modification nécessaire\n`);
    }
});

console.log('🎉 Migration terminée pour tous les écrans!');
