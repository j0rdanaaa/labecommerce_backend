import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./database/knex";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

//FUNÇÕES

export const getAllUsers = async (id?: string, email?: string) => {
  if (id) {
    const [result] = await db("users").select().where({ id: id });

    return result;
  }

  if (email) {
    const [result] = await db("users").select().where({ email: email });

    return result;
  }

  const result = await db("users").select(
    "id",
    "name",
    "email",
    "password",
    "created_at AS createdAt"
  );

  return result;
};

export const createUser = async (
  id: string,
  name: string,
  email: string,
  password: string
) => {
  await db
    .insert({
      id: id,
      name: name,
      email: email,
      password: password,
      created_at: new Date().toISOString(),
    })
    .into("users");

  return "Cadastro realizado com sucesso.";
};

export const getAllProd = async (id?: string, name?: string) => {
  if (id) {
    const [result] = await db("products").select().where({ id: id });

    return result;
  }

  if (name) {
    const [result] = await db("products").select().where({ name: name });

    return result;
  }

  const result = await db("products").select(
    "id",
    "name",
    "price",
    "description",
    "image_url AS imageUrl"
  );

  return result;
};

export const createProduct = async (
  id: string,
  name: string,
  price: number,
  description: string,
  image_url: string
) => {
  await db
    .insert({
      id: id,
      name: name,
      price: price,
      description: description,
      image_url: image_url,
    })
    .into("products");

  return "Produto adicionado com sucesso!";
};

export const searchProductsByName = async (name: string) => {
  const result = await db("products")
    .select()
    .where("name", "LIKE", `%${name}%`);

  return result;
};

export const searchProductsById = async (id: string) => {
  const [result] = await db("products").select().where({ id: id });

  return result;
};

export const getAllPurchases = async (id: string) => {
  const [result] = await db("purchases").select().where({ id: id });

  return result;
};

export const createPurchase = async (
  id: string,
  buyer: string,
  total_price: number
) => {
  await db
    .insert({
      id: id,
      buyer: buyer,
      total_price: total_price,
      created_at: new Date().toISOString(),
    })
    .into("purchases");

  return "Pedido realizado com sucesso!";
};

//----API----

//Users

app.get("/users", async (req: Request, res: Response) => {
  try {
    db;

    const result = await getAllUsers();

    res.status(200).send(result);
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message)
    } else {
    res.send("Erro inesperado");
  }
}});

app.post("/users", async (req: Request, res: Response) => {
  try {
    const id = req.body.id as string;
    const name = req.body.name as string;
    const email = req.body.email as string;
    const password = req.body.password as string;

    if (!id || !name || !email || !password) {
      res.status(404);
      throw new Error("Digite todos os campos.");
    }

    const newId = await getAllUsers(id);

    if (newId) {
      res.status(404);
      throw new Error("Esse usuário ja existe!");
    }

    const newEmail = await getAllUsers(undefined, email);

    if (newEmail) {
      res.status(404);
      throw new Error("Esse email ja existe!");
    }

    const result = await createUser(id, name, email, password);

    res.status(201).send(result);
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message)
    } else {
    res.send("Erro inesperado");
  }
}});

//Products

app.get("/products", async (req: Request, res: Response) => {
  try {
    const findName = req.query.name as string;

    if (findName) {
      if (findName.length < 2) {
        res.status(404);
        throw new Error("Digite mais de uma letra!");
      }

      const result = await searchProductsByName(findName);

      if (result.length === 0) {
        res.status(404);
        throw new Error("Produto não existe na lista!");
      }

      if (!result) {
        res.status(500);
        throw new Error("Erro do servidor.");
      }

      res.status(200).send(result);
    } else {
      const result = await getAllProd();
      res.status(200).send(result);
    }
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message)
    } else {
    res.send("Erro inesperado");
  }
}});

app.post("/product", async (req: Request, res: Response) => {
  try {
    const id = req.body.id as string;
    const name = req.body.name as string;
    const price = req.body.price as number;
    const description = req.body.description as string;
    const image_url = req.body.image_url as string;

    if (!id || !name || !price || !description || !image_url) {
      res.status(404);
      throw new Error("Digite todos os campos.");
    }

    const newId = await getAllProd(id);

    if (newId) {
      res.status(404);
      throw new Error("Esse produto ja existe!");
    }
    const newName = await getAllProd(undefined, name);

    if (newName) {
      res.status(404);
      throw new Error("Um produto com esse nome ja existe!");
    }

    const result = await createProduct(id, name, price, description, image_url);

    res.status(201).send(result);
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message)
    } else {
    res.send("Erro inesperado");
  }
}});

app.put("/products/:id", async (req: Request, res: Response) => {
  try {
    const searchId = req.params.id;
    const productSearch = await searchProductsById(searchId);

    if (!productSearch) {
      res.status(404);
      throw new Error("Produto não encontrado.");
    }

    const newId = req.body.id as string | undefined;
    const newName = req.body.name as string | undefined;
    const newPrice = req.body.price as number | undefined;
    const newDesc = req.body.description as string | undefined;
    const newImage = req.body.imageUrl as string | undefined;

    if (newId || newName || newPrice || newDesc || newImage) {
      productSearch.id = newId || productSearch.id;
      productSearch.name = newName || productSearch.name;
      productSearch.price = newPrice || productSearch.price;
      productSearch.description = newDesc || productSearch.description;
      productSearch.imageUrl = newImage || productSearch.imageUrl;

      res.status(200).send("Produto atualizado com sucesso.");
    }
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message)
    } else {
    res.send("Erro inesperado");
  }
}});

app.delete("/products/:id", async (req: Request, res: Response) => {
  try {
    const prodDelete = req.params.id;
    const [prod] = await db
      .select("*")
      .from("products")
      .where({ id: prodDelete });

    const result = await getAllProd(prodDelete);

    if (!result) {
      res.status(404);
      throw new Error("Produto não encontrado.");
    }

    await db.delete().from("products").where({ id: prodDelete });

    res.status(200).send("Produto apagado com sucesso.");
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message)
    } else {
    res.send("Erro inesperado");
  }
}});

//Purchases

app.post("/purchases", async (req: Request, res: Response) => {
  try {
    const id = req.body.id as string;
    const buyer = req.body.buyer as string;
    const products = req.body.products;

    if (!id || !buyer || !products) {
      res.status(404);
      throw new Error("Digite todos os campos.");
    }

    const searchId = await getAllPurchases(id);

    if (searchId) {
      res.status(404);
      throw new Error(`A compra ${id} já existe.`);
    }

    const resultProd = [];
    let totalPrice = 0;

    for (let prod of products) {
      const product = await searchProductsById(prod.id);

      if (!product) {
        res.status(400);
        throw new Error(`${prod.id} não existe!`);
      }

      resultProd.push({
        ...product,
        quantity: prod.quantity,
      });
      totalPrice = totalPrice + product.price * prod.quantity;
    }

    const result = await createPurchase(id, buyer, totalPrice);

    const purchaseProds = [];

    for (let prod of resultProd) {
      const newPurchaseProd = {
        purchase_id: id,
        product_id: prod.id,
        quantity: prod.quantity,
      };

      await db.insert(newPurchaseProd).into("purchases_products");
      purchaseProds.push(newPurchaseProd);
    }

    res.status(201).send(result);
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message)
    } else {
    res.send("Erro inesperado");
  }
}});
app.get("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    if (id) {
      const result = await getAllPurchases(id);

      if (!result) {
        res.status(404);
        throw new Error("Essa compra não existe!");
      }

      const [resultPurchase] = await db("users")
        .select(
          "purchases.id AS idPurchase",
          "purchases.buyer AS idBuyer",
          "users.name AS userName",
          "users.email AS userEmail",
          "purchases.total_price AS totalPrice",
          "purchases.created_at AS createdAt"
        )
        .innerJoin("purchases", "purchases.buyer", "=", "users.id")
        .where("purchases.id", "=", id);

      const resultProd = await db("products")
        .select(
          "products.id AS id",
          "products.name AS name",
          "products.price AS price",
          "products.description AS description",
          "products.image_url AS imageUrl",
          "purchases_products.quantity"
        )
        .innerJoin(
          "purchases_products",
          "purchases_products.product_id",
          "=",
          "products.id"
        )
        .where("purchases_products.purchase_id", "=", id);

      const resultadoFinal = { ...resultPurchase, products: resultProd };

      res.status(200).send(resultadoFinal);
    }
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message)
    } else {
    res.send("Erro inesperado");
  }
}});

app.delete("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const purchDelete = req.params.id;
    const [purch] = await db
      .select("*")
      .from("purchases")
      .where({ id: purchDelete });

    const result = await getAllPurchases(purchDelete);

    if (!result) {
      res.status(404);
      throw new Error("Pedido não encontrado.");
    }

    await db.delete().from("purchases").where({ id: purchDelete });

    res.status(200).send("Pedido cancelado com sucesso.");
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message)
    } else {
    res.send("Erro inesperado");
  }
}});