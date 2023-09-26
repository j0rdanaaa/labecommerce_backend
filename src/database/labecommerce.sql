-- Active: 1695686983793@@127.0.0.1@3306


-- USERS

--cria tabela
CREATE TABLE
users (
id TEXT PRIMARY KEY UNIQUE NOT NULL,
name TEXT NOT NULL,
email TEXT UNIQUE NOT NULL,
password TEXT NOT NULL,
created_at TEXT NOT NULL
);

--retorna itens da tabela

SELECT * FROM users;

--retorna estrutura da TABLESPACE
PRAGMA table_info('users');

--adiciona itens na tabela
INSERT INTO users (id, name, email, password, created_at)
VALUES
('u01', 'Belchior', 'belchior@email.com', '123', date ('now')),
('u02', 'Cora', 'cora@email.com', '123', date ('now')),
('u03', 'Doritos', 'doritos@email.com', '123', date ('now'));

--edita users
UPDATE users
SET email = 'belchorzinho@email.com'
WHERE id = 'u01';

--deleta user 
DELETE FROM users
WHERE id = 'u01';

--deleta tabela
DROP TABLE users;

-- PRODUCTS

--cria tabela
CREATE TABLE products(
id TEXT PRIMARY KEY UNIQUE NOT NULL,
name TEXT NOT NULL,
price REAL NOT NULL,
description TEXT NOT NULL,
image_url TEXT NOT NULL
);

--retorna itens da tabela
SELECT * FROM products;

--retorna estrutura da tabela
PRAGMA table_info('products');

--adiciona itens na tabela
INSERT INTO products (id, name, price, description, image_url)
VALUES
('prod01', 'Camiseta', 75, 'A melhor camiseta do mundo!', 'https://picsum.photos/200'),
('prod02', 'Moleton', 155, 'O melhor moleton do mundo!', 'https://picsum.photos/200'),
('prod03', 'Calça', 110, 'A melhor calça do mundo!', 'https://picsum.photos/200'),
('prod04', 'Meia', 35, 'A melhor meia do mundo!', 'https://picsum.photos/200'),
('prod05', 'Tênis', 175, 'O melhor tênis do mundo!', 'https://picsum.photos/200');

--edita produtos

UPDATE products
SET price = 80
WHERE id = 'prod01';

--deleta produto
DELETE FROM products
WHERE id = 'prod01';

--deleta TABLESPACE
DROP TABLE products;