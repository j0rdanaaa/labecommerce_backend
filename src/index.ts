import { products, users } from "./database";
import { TProduct, TUsers } from "./types";
import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

//teste

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!");
});




export function getAllProducts(){

    return (products)
}


export const createUser = (id: string, name: string, email: string, password: string) => {
    const newUser:TUsers =  {
        id,
        name,
        email,
        password,
        createdAt: new Date().toISOString()
        
    }

    
}


export const createProduct = (id: string, name: string, price: number, description: string, imageUrl: string): string => {
    const newProduct:TProduct =  {
        id,
        name,
        price,
        description,
        imageUrl
    }
    

    products.push(newProduct)      

    return ("Produto adicionado com sucesso!")
}
export const getAllUsers = () => {
    
    return (users)
}



export const searchProductsByName = (name: string)  => {

    const result = products.filter((product => {
        return product.name.toLowerCase().includes(name)
    }))

    return(result)

}


//API

app.get("/users", (req: Request, res: Response) => {
    res.status(200).send(users);
});



app.get("/products", (req: Request, res: Response) => {
    const findName = req.query.name as string

    if (findName) {
        
        const result = searchProductsByName(findName)

        res.status(200).send(result);
        
    } else {
        res.status(200).send(products);
    }

});

app.post('/users', (req: Request, res: Response) => {
    const { id, name, email, password, createdAt }: TUsers = req.body
    const newUser: TUsers = { id, name, email, password, createdAt }
    users.push(newUser)
    res.status(201).send("Cadastro realizado com sucesso!")
})

app.post('/products', (req: Request, res: Response) => {
    const id = req.body.id as string
    const name = req.body.name as string
    const price = req.body.prince as number
    const description = req.body.description as string
    const imageUrl = req.body.imageUrl as string
     
    const newProduct: TProduct = { id, name, price, description, imageUrl }
    products.push(newProduct)
    res.status(201).send("Produto cadastrado com sucesso!")
})