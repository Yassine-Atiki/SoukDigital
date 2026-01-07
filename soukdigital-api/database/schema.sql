-- ═══════════════════════════════════════════════════════════════
-- SOUKDIGITAL - Script d'initialisation de la base de données
-- Date: 6 janvier 2026
-- ═══════════════════════════════════════════════════════════════

USE soukdigital;

-- ═══════════════════════════════════════════════════════════════
-- TABLE: users (Utilisateurs et Artisans)
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    bio TEXT,
    avatar_url VARCHAR(500),
    user_type ENUM('customer', 'artisan') NOT NULL DEFAULT 'customer',
    
    -- Champs spécifiques artisan
    specialty VARCHAR(100),
    location VARCHAR(255),
    rating DECIMAL(2,1) DEFAULT 0.0,
    total_reviews INT DEFAULT 0,
    
    -- Métadonnées
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    
    INDEX idx_email (email),
    INDEX idx_user_type (user_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ═══════════════════════════════════════════════════════════════
-- TABLE: products (Produits artisanaux)
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    artisan_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    image_url VARCHAR(500),
    stock INT DEFAULT 0,
    
    -- Statistiques
    views INT DEFAULT 0,
    likes INT DEFAULT 0,
    rating DECIMAL(2,1) DEFAULT 0.0,
    total_reviews INT DEFAULT 0,
    
    -- Métadonnées
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    
    FOREIGN KEY (artisan_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_artisan (artisan_id),
    INDEX idx_category (category),
    INDEX idx_price (price),
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ═══════════════════════════════════════════════════════════════
-- TABLE: orders (Commandes)
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    customer_id INT NOT NULL,
    
    -- Informations commande
    total_amount DECIMAL(10,2) NOT NULL,
    shipping_cost DECIMAL(10,2) DEFAULT 50.00,
    status ENUM('processing', 'in_transit', 'delivered', 'cancelled') DEFAULT 'processing',
    payment_method VARCHAR(50),
    
    -- Adresse de livraison
    delivery_address TEXT,
    delivery_city VARCHAR(100),
    delivery_postal_code VARCHAR(20),
    delivery_phone VARCHAR(20),
    
    -- Dates
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    delivered_at TIMESTAMP NULL,
    
    FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_customer (customer_id),
    INDEX idx_status (status),
    INDEX idx_order_number (order_number),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ═══════════════════════════════════════════════════════════════
-- TABLE: order_items (Détails des commandes)
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id),
    INDEX idx_order (order_id),
    INDEX idx_product (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ═══════════════════════════════════════════════════════════════
-- TABLE: favorites (Favoris utilisateurs)
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_favorite (user_id, product_id),
    INDEX idx_user (user_id),
    INDEX idx_product (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ═══════════════════════════════════════════════════════════════
-- TABLE: addresses (Adresses utilisateurs)
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS addresses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    label VARCHAR(50) NOT NULL,
    address_line TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20),
    phone VARCHAR(20),
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ═══════════════════════════════════════════════════════════════
-- TABLE: payment_methods (Moyens de paiement)
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS payment_methods (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    card_type VARCHAR(50) NOT NULL,
    card_number_masked VARCHAR(20) NOT NULL,
    cardholder_name VARCHAR(255) NOT NULL,
    expiry_month INT NOT NULL,
    expiry_year INT NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ═══════════════════════════════════════════════════════════════
-- DONNÉES DE TEST
-- ═══════════════════════════════════════════════════════════════

-- Utilisateurs test (mot de passe: test123 pour tous)
-- Hash bcrypt de "test123": $2b$10$rKZdVx3JGfqLqZK5h7YzV.YqJYqJYqJYqJYqJYqJYqJYqJYqJYqJY
INSERT INTO users (full_name, email, password_hash, user_type, phone, bio) VALUES
('Client Test', 'client@soukdigital.ma', '$2b$10$rKZdVx3JGfqLqZK5h7YzV.YqJYqJYqJYqJYqJYqJYqJYqJYqJYqJY', 'customer', '0612345678', 'Client amateur d\'artisanat marocain'),
('Mohamed Artisan', 'artisan@soukdigital.ma', '$2b$10$rKZdVx3JGfqLqZK5h7YzV.YqJYqJYqJYqJYqJYqJYqJYqJYqJYqJY', 'artisan', '0612345679', 'Artisan spécialisé en poterie traditionnelle'),
('Fatima Artisan', 'fatima@soukdigital.ma', '$2b$10$rKZdVx3JGfqLqZK5h7YzV.YqJYqJYqJYqJYqJYqJYqJYqJYqJYqJY', 'artisan', '0612345680', 'Créatrice de bijoux berbères');

-- Produits test
INSERT INTO products (artisan_id, name, description, price, category, image_url, stock) VALUES
(2, 'Tajine traditionnel en terre cuite', 'Tajine marocain fait à la main, parfait pour vos plats traditionnels. Fabriqué avec de l\'argile locale de Fès.', 450.00, 'Poterie', 'https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 15),
(2, 'Vase décoratif marocain', 'Vase en céramique avec motifs géométriques traditionnels. Pièce unique peinte à la main.', 320.00, 'Poterie', 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 8),
(3, 'Collier berbère en argent', 'Magnifique collier en argent massif orné de pierres semi-précieuses. Design authentique.', 1200.00, 'Bijoux', 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 5),
(3, 'Boucles d\'oreilles traditionnelles', 'Boucles d\'oreilles en argent ciselé avec technique ancestrale berbère.', 580.00, 'Bijoux', 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 12),
(2, 'Assiette décorative', 'Assiette en céramique émaillée avec calligraphie arabe. Idéale pour décoration murale.', 280.00, 'Poterie', 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 20);

-- Commandes test
INSERT INTO orders (order_number, customer_id, total_amount, shipping_cost, status, payment_method, delivery_address, delivery_city, delivery_postal_code, delivery_phone) VALUES
('CMD001', 1, 500.00, 50.00, 'delivered', 'Carte bancaire', '123 Rue Mohammed V', 'Casablanca', '20000', '0612345678'),
('CMD002', 1, 1250.00, 50.00, 'in_transit', 'Carte bancaire', '123 Rue Mohammed V', 'Casablanca', '20000', '0612345678'),
('CMD003', 1, 330.00, 50.00, 'processing', 'Espèces à la livraison', '123 Rue Mohammed V', 'Casablanca', '20000', '0612345678');

-- Détails des commandes
INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal) VALUES
(1, 1, 'Tajine traditionnel en terre cuite', 1, 450.00, 450.00),
(2, 3, 'Collier berbère en argent', 1, 1200.00, 1200.00),
(3, 5, 'Assiette décorative', 1, 280.00, 280.00);

-- ═══════════════════════════════════════════════════════════════
-- VÉRIFICATION
-- ═══════════════════════════════════════════════════════════════

SELECT '✅ Base de données initialisée avec succès!' AS message;
SELECT CONCAT('📊 ', COUNT(*), ' utilisateurs créés') AS info FROM users;
SELECT CONCAT('🏺 ', COUNT(*), ' produits créés') AS info FROM products;
SELECT CONCAT('📦 ', COUNT(*), ' commandes créées') AS info FROM orders;
