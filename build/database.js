"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProductsByName = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUsers = exports.products = exports.users = void 0;
exports.users = [{
        id: '1',
        name: 'Fulaninho',
        email: 'fulaninha@email',
        password: '123',
        createdAt: new Date().toLocaleString(),
    },
    {
        id: '2',
        name: 'Ciclaninha',
        email: 'ciclaninha@email',
        password: '123',
        createdAt: new Date().toISOString(),
    },
];
exports.products = [{
        id: '1',
        name: 'Camiseta Azul',
        price: 75,
        description: 'A melhor camiseta azul do mundo!',
        imageUrl: 'https://picsum.photos/200',
    }, {
        id: '2',
        name: 'Meia Azul',
        price: 35,
        description: 'A melhor meia azul do mundo!',
        imageUrl: 'https://picsum.photos/200',
    }, {
        id: '3',
        name: 'Tênis Azul',
        price: 250,
        description: 'O melhor tênis azul do mundo!',
        imageUrl: 'https://picsum.photos/200',
    }];
function createUsers(id, name, email, password) {
    const createdAt = new Date().toISOString();
    const newUser = { id, name, email, password, createdAt };
    exports.users.push(newUser);
    return "Cadastro realizado com sucesso!";
}
exports.createUsers = createUsers;
function getAllUsers() {
    return exports.users;
}
exports.getAllUsers = getAllUsers;
const listaDeUsuarios = getAllUsers();
function createProduct(id, name, price, description, imageUrl) {
    const newProduct = { id, name, price, description, imageUrl };
    exports.products.push(newProduct);
    return "Produto criado com sucesso!";
}
exports.createProduct = createProduct;
function getAllProducts() {
    return exports.products;
}
exports.getAllProducts = getAllProducts;
function searchProductsByName(name) {
    name = name.toLowerCase();
    const matchingProducts = exports.products.filter(product => product.name.toLowerCase().includes(name));
    return matchingProducts;
}
exports.searchProductsByName = searchProductsByName;
//# sourceMappingURL=database.js.map