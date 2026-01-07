// Script pour réinitialiser les mots de passe des utilisateurs
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

async function resetPasswords() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'soukdigital'
    });

    console.log('🔐 Réinitialisation des mots de passe...\n');

    // Mot de passe à utiliser (en clair)
    const plainPassword = 'test123';
    
    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    
    console.log('📝 Mot de passe: test123');
    console.log('🔒 Hash bcrypt:', hashedPassword.substring(0, 30) + '...\n');

    // Récupérer tous les utilisateurs
    const [users] = await connection.query('SELECT id, email, full_name FROM users');

    console.log('👥 Utilisateurs trouvés:');
    console.table(users);

    // Mettre à jour le mot de passe pour chaque utilisateur
    for (const user of users) {
        await connection.query(
            'UPDATE users SET password_hash = ? WHERE id = ?',
            [hashedPassword, user.id]
        );
        console.log(`✅ Mot de passe mis à jour pour: ${user.email}`);
    }

    console.log('\n🎉 Tous les mots de passe ont été réinitialisés à: test123');
    console.log('\n📋 Comptes disponibles:');
    
    const [updatedUsers] = await connection.query(
        'SELECT id, full_name, email, user_type FROM users ORDER BY id'
    );
    
    updatedUsers.forEach(user => {
        console.log(`\n${user.user_type === 'customer' ? '👤' : '🎨'} ${user.full_name}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Password: test123`);
        console.log(`   Type: ${user.user_type}`);
    });

    await connection.end();
}

resetPasswords().catch(console.error);
