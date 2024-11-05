// components/ProductDetails.tsx

import React from 'react';

interface ProductDetailsProps {
  name: string;
  value: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ name, value }) => {
  return (
    <div className="border p-4 rounded-md mt-8">
      <h3 className="font-bold text-black font-roboto text-3xl">{name}</h3>
      <p className="text-gray-600 font-roboto mt-2">{value}</p>
    </div>
  );
};

export default ProductDetails;
