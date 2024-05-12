// ProductListItem.tsx
import React from 'react';
import { List, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { Product } from './dummyProducts'; // Import Product interface

interface ProductListItemProps {
  product: Product;
}

const { Text } = Typography;

const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
  return (
    <List.Item>
      <List.Item.Meta
        title={<Link to={`/product/${product.id}`}>{product.name}</Link>}
        description={<Text strong>${product.price}</Text>}
      />
    </List.Item>
  );
};

export default ProductListItem;
