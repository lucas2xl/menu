import {
  Category,
  Prisma,
  PrismaClient,
  Product,
  Store,
  User,
} from "@prisma/client";

import { hashed } from "@/adapters/hash";

const client = new PrismaClient();

const getEmailList = (): Prisma.AuthorizedEmailListCreateInput[] => [
  {
    email: "admin@admin.com",
  },
];

const getAdmin = (password: string): Prisma.UserCreateInput => ({
  role: "ADMIN",
  email: "admin@admin.com",
  username: "John Doe",
  password,
  plan: {
    create: {
      price: 0,
      quantity: 1,
      status: "ACTIVE",
    },
  },
});

const getStore = (user: User): Prisma.StoreCreateInput => ({
  name: "Loja 1",
  slug: "loja-1",
  logo: "https://picsum.photos/200",
  user: {
    connect: {
      id: user.id,
    },
  },
  settings: {
    create: {
      preparationTime: 50,
      isTableName: false,
      hasDelivery: false,
    },
  },
});

const getQRCodes = (store: Store): Prisma.QrcodeCreateInput[] => {
  const qrCodeValue = 1;
  const qrCodeList: Prisma.QrcodeCreateInput[] = [];
  for (let i = 0; i < 10; i++) {
    qrCodeList.push({
      value: qrCodeValue + i,
      store: {
        connect: {
          id: store.id,
        },
      },
    });
  }
  return qrCodeList;
};

const getCategories = (store: Store): Prisma.CategoryCreateInput[] => [
  {
    name: "Pratos para 2 pessoas",
    description: "Pratos completos para 2 pessoas",
    order: 1,
    store: {
      connect: {
        id: store.id,
      },
    },
  },
  {
    name: "Frutos do mar",
    description: "Pratos completos de frutos do mar",
    order: 2,
    store: {
      connect: {
        id: store.id,
      },
    },
  },
  {
    name: "Carnes grelhadas",
    description: "Pratos completos de carnes grelhadas",
    order: 3,
    store: {
      connect: {
        id: store.id,
      },
    },
  },
  {
    name: "Pratos ao forno",
    description: "Pratos completos feitos no forno",
    order: 4,
    store: {
      connect: {
        id: store.id,
      },
    },
  },
  {
    name: "Bebidas",
    description: "Bebidas alcoólicas e não alcoólicas",
    order: 5,
    store: {
      connect: {
        id: store.id,
      },
    },
  },
  {
    name: "Sobremesas",
    description: "Doces e sobremesas variadas",
    order: 6,
    store: {
      connect: {
        id: store.id,
      },
    },
  },
];

const getProducts = (
  store: Store,
  categories: Category[]
): Prisma.ProductCreateInput[] => [
  {
    name: "Camarão a milanesa",
    description:
      "Arroz branco, arroz a grega, batata frita, salada mista e maionese (500g de porção)",
    price: 17599,
    serves: 2,
    discount: 10,
    isFeatured: true,
    order: 1,
    category: { connect: { id: categories[0].id } },
    store: { connect: { id: store.id } },
    images: {
      createMany: { data: [{ url: "https://picsum.photos/200" }] },
    },
  },
  {
    name: "Filé mignon grelhado",
    description:
      "Arroz branco, arroz a grega, batata frita, salada mista e maionese, (500g de porção)",
    price: 19199,
    serves: 2,
    discount: 0,
    isFeatured: false,
    order: 2,
    category: { connect: { id: categories[0].id } },
    store: { connect: { id: store.id } },
    images: {
      createMany: { data: [{ url: "https://picsum.photos/200" }] },
    },
  },

  {
    name: "Peixe a milanesa",
    description:
      "Arroz branco, arroz a grega, batata frita, salada mista e maionese",
    price: 20499,
    serves: 2,
    discount: 0,
    isFeatured: false,
    order: 3,
    category: { connect: { id: categories[1].id } },
    store: { connect: { id: store.id } },
    images: {
      createMany: { data: [{ url: "https://picsum.photos/200" }] },
    },
  },
  {
    name: "Salmão a moda da casa grelhado",
    description:
      "Grelhado na manteiga com legumes, arroz branco, arroz a grega, batata frita, salada mista e maionese",
    price: 32599,
    serves: 4,
    discount: 0,
    isFeatured: false,
    order: 4,
    category: { connect: { id: categories[1].id } },
    store: { connect: { id: store.id } },
    images: {
      createMany: { data: [{ url: "https://picsum.photos/200" }] },
    },
  },
  {
    name: "Alcatra grelhada",
    description:
      "Arroz branco, arroz a grega, batata frita, salada mista e maionese",
    price: 22899,
    serves: 2,
    discount: 0,
    isFeatured: true,
    order: 5,
    category: { connect: { id: categories[2].id } },
    store: { connect: { id: store.id } },
    images: {
      createMany: { data: [{ url: "https://picsum.photos/200" }] },
    },
  },
  {
    name: "Picanha grelhada",
    description:
      "Arroz branco, arroz a grega, batata frita, salada mista e maionese",
    price: 26599,
    serves: 2,
    discount: 0,
    isFeatured: false,
    order: 6,
    category: { connect: { id: categories[2].id } },
    store: { connect: { id: store.id } },
    images: {
      createMany: { data: [{ url: "https://picsum.photos/200" }] },
    },
  },
  {
    name: "Frango a parmegiana",
    description:
      "Arroz branco, arroz a grega, batata frita, salada mista e maionese",
    price: 21699,
    serves: 2,
    discount: 0,
    isFeatured: false,
    order: 7,
    category: { connect: { id: categories[3].id } },
    store: { connect: { id: store.id } },
    images: {
      createMany: { data: [{ url: "https://picsum.photos/200" }] },
    },
  },
  {
    name: "Alcatra a parmegiana",
    description:
      "Arroz branco, arroz a grega, batata frita, salada mista e maionese",
    price: 22899,
    serves: 2,
    discount: 10,
    isFeatured: true,
    order: 8,
    category: { connect: { id: categories[3].id } },
    store: { connect: { id: store.id } },
    images: {
      createMany: { data: [{ url: "https://picsum.photos/200" }] },
    },
  },
  {
    name: "Coca cola 2L",
    description: "",
    price: 2199,
    serves: 0,
    discount: 0,
    isFeatured: false,
    order: 9,
    category: { connect: { id: categories[4].id } },
    store: { connect: { id: store.id } },
    images: {
      createMany: { data: [{ url: "https://picsum.photos/200" }] },
    },
  },
  {
    name: "H2O",
    description: "",
    price: 999,
    serves: 0,
    discount: 0,
    isFeatured: false,
    order: 10,
    category: { connect: { id: categories[4].id } },
    store: { connect: { id: store.id } },
    images: {
      createMany: { data: [{ url: "https://picsum.photos/200" }] },
    },
  },
  {
    name: "Pudim de leite",
    description: "1 fatia de pudim de leite",
    price: 1899,
    serves: 1,
    discount: 0,
    isFeatured: false,
    order: 11,
    category: { connect: { id: categories[5].id } },
    store: { connect: { id: store.id } },
    images: {
      createMany: { data: [{ url: "https://picsum.photos/200" }] },
    },
  },
  {
    name: "Mouse de chocolate",
    description: "",
    price: 2399,
    serves: 1,
    discount: 0,
    isFeatured: false,
    order: 12,
    category: { connect: { id: categories[5].id } },
    store: { connect: { id: store.id } },
    images: {
      createMany: { data: [{ url: "https://picsum.photos/200" }] },
    },
  },
];

const getProductCategory = (
  products: Product[]
): Prisma.ProductCategoryCreateInput[] => [
  {
    name: "Escolha sua porção",
    quantity: 1,
    inputType: "radio",
    order: 1,
    product: {
      connect: {
        id: products[2].id,
      },
    },
    items: {
      createMany: {
        data: [
          {
            name: "1/4 de porção",
            price: 22799,
            description: "Serve de 3 a 4 pessoas",
            order: 1,
          },
          {
            name: "1/2 de porção",
            price: 31299,
            description: "Serve de 5 a 6 pessoas",
            order: 2,
          },
          {
            name: "Inteira",
            price: 37799,
            description: "Serve de 7 a 8 pessoas",
            order: 3,
          },
        ],
      },
    },
  },
];

try {
  console.log("🌱 Iniciando o seeding da base de dados...");

  // Criação do usuário admin
  const authorizedEmailListPromise = getEmailList().map((email) =>
    client.authorizedEmailList.create({ data: email })
  );
  await Promise.all(authorizedEmailListPromise);
  console.log("Lista de e-mails autorizados criada com sucesso!");

  // Criação do usuário admin
  const passwordHash = await hashed.hash("12345678");
  const admin = await client.user.create({ data: getAdmin(passwordHash) });
  console.log(`Usuário ${admin.username} criado com sucesso!`);

  // Criação da loja
  const store = await client.store.create({ data: getStore(admin) });
  console.log(`Loja ${store.name} criada com sucesso!`);

  // Criação dos QR codes
  const qrCodesPromises = getQRCodes(store).map((qrcode) =>
    client.qrcode.create({ data: qrcode })
  );
  await Promise.all(qrCodesPromises);
  console.log("QR codes criados com sucesso!");

  // Criação das categorias
  const categoriesPromises = getCategories(store).map((category) =>
    client.category.create({ data: category })
  );
  const categories = await Promise.all(categoriesPromises);
  console.log("Categorias criadas com sucesso!");

  // Criação dos produtos
  const productsPromises = getProducts(store, categories).map((product) =>
    client.product.create({ data: product })
  );
  const products = await Promise.all(productsPromises);
  console.log("Produtos criados com sucesso!");

  // Criação das categorias de produtos
  const productCategoriesPromises = getProductCategory(products).map(
    (productCategory) =>
      client.productCategory.create({ data: productCategory })
  );
  await Promise.all(productCategoriesPromises);
  console.log("Categorias de produtos criadas com sucesso!");

  console.log("🌱 Seeding completo!");
} catch (e) {
  console.error("Erro durante o seeding:", e);
} finally {
  await client.$disconnect();
  console.log("Desconectado do Prisma Client.");
}
