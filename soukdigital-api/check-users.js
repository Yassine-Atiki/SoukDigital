const mysql = require('mysql2/promise');

(async () => {
    try {
        const conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'soukdigital'
        });

        console.log('📊 Vérification des utilisateurs en base de données:\n');

        const [users] = await conn.query(
            'SELECT id, full_name, email, phone, bio, avatar_url, specialty, location FROM users WHERE id IN (1,2)'
        );

        users.forEach(u => {
            console.log(`═══════════════════════════════════════`);
            console.log(`👤 ID: ${u.id}`);
            console.log(`📝 Nom: ${u.full_name}`);
            console.log(`📧 Email: ${u.email}`);
            console.log(`📞 Phone: ${u.phone || '(vide)'}`);
            console.log(`💬 Bio: ${u.bio || '(vide)'}`);
            console.log(`🖼️  Avatar: ${u.avatar_url || '(vide)'}`);
            console.log(`🎨 Specialty: ${u.specialty || '(vide)'}`);
            console.log(`📍 Location: ${u.location || '(vide)'}`);
        });

        console.log(`═══════════════════════════════════════\n`);

        await conn.end();
    } catch (error) {
        console.error('Erreur:', error);
    }
})();
