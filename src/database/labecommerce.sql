-- Active: 1695686983793@@127.0.0.1@3306

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

--retorna estrutura da TABLESPACE

PRAGMA table_info('users');

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
    );

--editUserById

UPDATE users SET email = 'belchorzinho@email.com' WHERE id = 'u01';

--deleteUserById

DELETE FROM users WHERE id = 'u01';

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

--getProductsById

SELECT * FROM products WHERE id = 'prod03';

--getProductsByName

SELECT * FROM products WHERE name LIKE '%meia%';

--retorna estrutura da tabela

PRAGMA table_info('products');

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
    );

--editProductById

UPDATE products SET price = 80 WHERE id = 'prod02';

UPDATE products
SET
    id = 'prodtesteprod',
    name = 'teste',
    price = 300,
    description = 'testando a edição do produto',
    image_url = 'https://picsum.photos/200'
WHERE id = 'prod01';

--deleteProductById

DELETE FROM products WHERE id = 'prod01';

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
        FOREIGN KEY (buyer) REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
    );

INSERT INTO
    purchases (id, buyer, total_price, created_at)
VALUES ('prc001', 'u01', 680, datetime('now')), ('prc002', 'u02', 700, datetime('now')), ('prc003', 'u03', 850, datetime('now'));

--GetPurchases

SELECT * FROM purchases;

--JOIN purchases X users

SELECT
    users.id AS idUser,
    purchases.id AS idCompra,
    users.name AS nome,
    users.email,
    purchases.total_price AS precoTotal,
    purchases.created_at AS data
FROM purchases
    INNER JOIN users ON purchases.buyer = users.id;

--edit-purchase

UPDATE purchases SET total_price = 780 WHERE id = 'prc001';

--Deleta-tabela-purchases

DROP TABLE purchases;

--createTable (relação purchases x products)

CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
    );

--GetPurchases  
SELECT * FROM purchases_products;

--relação purchases x products

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES
('prc001', 'prod03', 2),
('prc002', 'prod02', 5),
('prc003', 'prod04', 1);

SELECT
purchases.id AS purchaseId,
products.id AS productId,
products.name AS productName,
quantity,
purchases.buyer AS purchaseBuyer
FROM purchases_products
INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id
INNER JOIN products
ON purchases_products.product_id = products.id;

--Deleta-purchases_products

DROP TABLE purchases_products;

