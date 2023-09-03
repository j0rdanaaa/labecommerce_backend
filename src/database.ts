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
