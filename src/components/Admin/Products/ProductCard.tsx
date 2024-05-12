// ProductCard.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from 'antd';
import { Product } from './dummyProducts'; // Import Product interface
import dummyProducts from './dummyProducts'; // Import dummyProducts array

const { Title, Paragraph } = Typography;

const ProductCard: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();

  const product = dummyProducts.find((p) => p.id === parseInt(productId, 10));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <Title level={2}>{product.name}</Title>
      <Paragraph>
        <strong>Price:</strong> ${product.price}
      </Paragraph>
      <Paragraph>{product.description}</Paragraph>
    </div>
  );
};

export default ProductCard;
