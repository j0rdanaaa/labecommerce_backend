-- Active: 1697060876673@@127.0.0.1@3306

-- USERS

--cria tabela

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT DEFAULT(DATETIME()) NOT NULL
    );

--GetAllUsers

SELECT * FROM users;

--createUser

INSERT INTO
    users (
        id,
        name,
        email,
        password,
        created_at
    )
VALUES (
        'u01',
        'Belchior',
        'belchior@email.com',
        '123',
        date ('now')
    ), (
        'u02',
        'Cora',
        'cora@email.com',
        '123',
        date ('now')
    ), (
        'u03',
        'Doritos',
        'doritos@email.com',
        '123',
        date ('now')
    ), (
        'u04',
        'Brianna',
        'brianna@email.com',
        '123',
        date ('now')
    ), (
        'u05',
        'Cícero',
        'cicero@email.com',
        '123',
        date ('now')
    ), (
        'u06',
        'Frajola',
        'frajola@email.com',
        '123',
        date ('now')
    );

--deleta tabela

DROP TABLE users;

-- PRODUCTS

--cria tabela

CREATE TABLE
    products(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL
    );

--getAllProducts

SELECT * FROM products;

--adiciona itens na tabela

INSERT INTO
    products (
        id,
        name,
        price,
        description,
        image_url
    )
VALUES (
        'prod01',
        'Camiseta',
        75,
        'A melhor camiseta do mundo!',
        'https://picsum.photos/200'
    ), (
        'prod02',
        'Moleton',
        155,
        'O melhor moleton do mundo!',
        'https://picsum.photos/200'
    ), (
        'prod03',
        'Calça',
        110,
        'A melhor calça do mundo!',
        'https://picsum.photos/200'
    ), (
        'prod04',
        'Meia',
        35,
        'A melhor meia do mundo!',
        'https://picsum.photos/200'
    ), (
        'prod05',
        'Tênis',
        175,
        'O melhor tênis do mundo!',
        'https://picsum.photos/200'
    ), (
        'prod06',
        'Almofada',
        55,
        'A melhor almofada do mundo!',
        'https://picsum.photos/200'
    ), (
        'prod07',
        'Adesivo',
        15,
        'O melhor adesivo do mundo!',
        'https://picsum.photos/200'
    ), (
        'prod08',
        'Caneta',
        7,
        'A melhor caneta do mundo!',
        'https://picsum.photos/200'
    );

--deleta a tabela inteira

DROP TABLE products;

--PEDIDOS

--Cria tabela

CREATE TABLE
    purchases (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        buyer TEXT NOT NULL,
        total_price REAL NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (buyer) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

INSERT INTO
    purchases (
        id,
        buyer,
        total_price,
        created_at
    )
VALUES (
        'prc001',
        'u01',
        680,
        datetime('now')
    ), (
        'prc002',
        'u02',
        700,
        datetime('now')
    ), (
        'prc003',
        'u03',
        850,
        datetime('now')
    );

--GetPurchases

SELECT * FROM purchases;

--JOIN purchases X users

--Deleta-tabela-purchases

DROP TABLE purchases;

--createTable (relação purchases x products)

CREATE TABLE
    purchases_products (
        purchase_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY (purchase_id) REFERENCES purchases(id),
        FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

--GetPurchases

SELECT * FROM purchases_products;

--relação purchases x products

INSERT INTO
    purchases_products (
        purchase_id,
        product_id,
        quantity
    )
VALUES ('prc001', 'prod03', 2), ('prc002', 'prod02', 5), ('prc003', 'prod04', 1);

--Deleta-purchases_products

DROP TABLE purchases_products;