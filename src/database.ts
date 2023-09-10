import { TUsers, TProduct } from "./types"

export const users: TUsers[] = [{
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
]

export const products: TProduct[] = [{
    id: '1',
    name: 'Camiseta Azul',
    price: 75,
    description: 'A melhor camiseta azul do mundo!',
    imageUrl: 'https://picsum.photos/200',
},{
    id: '2',
    name: 'Meia Azul',
    price: 35,
    description: 'A melhor meia azul do mundo!',
    imageUrl: 'https://picsum.photos/200',
},{
    id: '3',
    name: 'Tênis Azul',
    price: 250,
    description: 'O melhor tênis azul do mundo!',
    imageUrl: 'https://picsum.photos/200',
}]

export function createUsers(id: string, name: string, email: string, password: string): string {
    const createdAt: string = new Date().toISOString();
    const newUser: TUsers = {id,name, email, password, createdAt}
    users.push(newUser)
    return "Cadastro realizado com sucesso!"
}

export function getAllUsers(): TUsers[] {
    return users
}

const listaDeUsuarios: TUsers[] = getAllUsers()

export function createProduct(id: string, name: string, price: number, description: string, imageUrl: string): string {
    const newProduct: TProduct = {id, name, price, description, imageUrl}
    products.push(newProduct)
    return "Produto criado com sucesso!"
}

export function getAllProducts() {
    return products
}

export function searchProductsByName(name: string): TProduct[] {
    name = name.toLowerCase()
    const matchingProducts = products.filter(product => product.name.toLowerCase().includes(name))
    return matchingProducts
}