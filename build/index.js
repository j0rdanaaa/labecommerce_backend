"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProductsByName = exports.createProduct = exports.createUser = exports.getAllProducts = exports.getAllUsers = void 0;
const database_1 = require("./database");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
//teste
app.get("/ping", (req, res) => {
    res.send("Pong!");
});
const getAllUsers = () => {
    return (database_1.users);
};
exports.getAllUsers = getAllUsers;
function getAllProducts() {
    return (database_1.products);
}
exports.getAllProducts = getAllProducts;
const createUser = (id, name, email, password) => {
    const newUser = {
        id,
        name,
        email,
        password,
        createdAt: new Date().toISOString()
    };
    database_1.users.push(newUser);
    return ("Cadastro realizado com sucesso!");
};
exports.createUser = createUser;
const createProduct = (id, name, price, description, imageUrl) => {
    const newProduct = {
        id,
        name,
        price,
        description,
        imageUrl
    };
    database_1.products.push(newProduct);
    return ("Produto adicionado com sucesso!");
};
exports.createProduct = createProduct;
const searchProductsByName = (name) => {
    const result = database_1.products.filter((product => {
        return product.name.toLowerCase().includes(name);
    }));
    return (result);
};
exports.searchProductsByName = searchProductsByName;
//API
app.get("/users", (req, res) => {
    res.status(200).send(database_1.users);
});
app.get("/products", (req, res) => {
    const findName = req.query.name;
    if (findName) {
        const result = (0, exports.searchProductsByName)(findName);
        res.status(200).send(result);
    }
    else {
        res.status(200).send(database_1.products);
    }
});
app.post("/user", (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const result = (0, exports.createUser)(id, name, email, password);
    res.status(201).send(result);
});
app.post("/product", (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const result = (0, exports.createProduct)(id, name, price, description, imageUrl);
    res.status(201).send(result);
});
//# sourceMappingURL=index.js.map