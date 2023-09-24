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
        return product.name.toLowerCase().includes(name.toLowerCase());
    }));
    return (result);
};
exports.searchProductsByName = searchProductsByName;
//API
app.get("/users", (req, res) => {
    try {
        res.status(200).send(database_1.users);
    }
    catch (error) {
        res.status(404).send(error);
        console.log(error);
    }
});
app.get("/products", (req, res) => {
    try {
        const findName = req.query.name;
        if (findName) {
            if (findName.length < 2) {
                res.status(404);
                throw new Error("Digite mais de uma letra!");
            }
            const result = (0, exports.searchProductsByName)(findName);
            if (result.length === 0) {
                res.status(404);
                throw new Error("Produto não encontrado.");
            }
            res.status(200).send(result);
        }
        else {
            res.status(200).send(database_1.products);
        }
    }
    catch (error) {
        console.log(error);
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
});
app.post("/users", (req, res) => {
    try {
        const id = req.body.id;
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        if (!id || !name || !email || !password) {
            res.status(404);
            throw new Error("Digite todos os campos.");
        }
        const newId = database_1.users.find((user) => user.id === id);
        if (newId) {
            res.status(404);
            throw new Error("Esse usuário ja existe!");
        }
        const newEmail = database_1.users.find((user) => user.email === email);
        if (newEmail) {
            res.status(404);
            throw new Error("Esse email ja existe!");
        }
        const result = (0, exports.createUser)(id, name, email, password);
        res.status(201).send(result);
    }
    catch (error) {
        console.log(error);
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
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
app.delete("/users/:id", (req, res) => {
    try {
        const userDelete = req.params.id;
        const userIndex = database_1.users.findIndex((user) => user.id === userDelete);
        if (userIndex < 0) {
            res.status(404);
            throw new Error("Usuário não encontrado.");
        }
        database_1.users.splice(userIndex, 1);
        res.status(200).send("Usuário apagado com sucesso.");
    }
    catch (error) {
        console.log(error);
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
});
app.delete("/products/:id", (req, res) => {
    try {
        const prodDelete = req.params.id;
        const prodIndex = database_1.products.findIndex((product) => product.id === prodDelete);
        if (prodIndex < 0) {
            res.status(404);
            throw new Error("Produto não encontrado");
        }
        database_1.products.splice(prodIndex, 1);
        res.status(200).send("Produto apagado com sucesso");
    }
    catch (error) {
        console.log(error);
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
});
app.put("/products/:id", (req, res) => {
    try {
        const idProd = req.params.id;
        const productFind = database_1.products.find((product) => product.id === idProd);
        if (!productFind) {
            res.status(404);
            throw new Error("Produto não encontrado");
        }
        const newId = req.body.id;
        const newName = req.body.name;
        const newPrice = req.body.price;
        const newDesc = req.body.description;
        const newImage = req.body.imageUrl;
        if (isNaN(newPrice)) {
            res.status(400);
            throw new Error("Digite um valor valido para preço!");
        }
        if (newId || newName || newPrice || newDesc || newImage) {
            productFind.id = newId || productFind.id;
            productFind.name = newName || productFind.name;
            productFind.price = newPrice || productFind.price;
            productFind.description = newDesc || productFind.description;
            productFind.imageUrl = newImage || productFind.imageUrl;
            res.status(200).send("Produto atualizado com sucesso.");
        }
    }
    catch (error) {
        console.log(error);
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
});
//# sourceMappingURL=index.js.map