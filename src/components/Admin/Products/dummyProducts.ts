// dummyProducts.ts

export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
  }
  
  const dummyProducts: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      price: 10,
      description: 'This is the description for Product 1.',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 20,
      description: 'This is the description for Product 2.',
    },
    {
      id: 3,
      name: 'Product 3',
      price: 30,
      description: 'This is the description for Product 3.',
    },
    {
      id: 4,
      name: 'Product 4',
      price: 40,
      description: 'This is the description for Product 4.',
    },
  ];
  
  export default dummyProducts;
  