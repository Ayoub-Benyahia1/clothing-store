import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { StarIcon, ShoppingCartIcon } from "lucide-react";
import { addToCart } from "@/redux/slices/cartSlice";
import { useProductById } from "@/hooks/useProducts";
import { useDispatch } from "react-redux";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: products, isLoading, error } = useProductById(id);
  const product = products?.[0];
  const [selectedImage, setSelectedImage] = useState();
  const [quantity, setQuantity] = useState(1);
  const handleAddToCart = () => {
    const product = { ...products[0], quantity: quantity };
    dispatch(addToCart(product));
  };

  useEffect(() => {
    if (products && product.images?.length > 0) {
      setSelectedImage(product.images[0]);
    }
  }, [products]);

  if (isLoading) {
    return <p>Loading ......</p>;
  }

  return (
    <div className="container mx-auto px-8 md:px-20 py-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <img
            src={selectedImage}
            alt={product?.name}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
          <div className="flex gap-2">
            {product?.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition ${
                  selectedImage === img ? "border-2 border-blue-500" : "border"
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold">{product?.name}</h1>
          <p className="text-gray-700">{product?.description}</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold text-blue-500">
              ${product?.price}
            </span>
            <div className="flex items-center gap-1 text-yellow-500">
              <StarIcon className="w-5 h-5" />
              <span>{product?.rating}</span>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            {product?.stock > 0
              ? `In stock (${product?.stock} available)`
              : "Out of stock"}
          </p>

          <div className="flex items-center gap-4">
            <label className="font-semibold">Quantity :</label>
            <Input
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value)))
              }
              className="w-16 text-center"
            />
          </div>

          <Button
            className="w-full flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            disabled={product?.stock === 0 || product?.stock < quantity}
            onClick={handleAddToCart}
          >
            {product?.stock === 0 || product?.stock < quantity ? (
              "Out of stock"
            ) : (
              <>
                <ShoppingCartIcon className="w-5 h-5" />
                Add to cart
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="mt-12 w-full md:w-[60%]">
        <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
        {product?.reviews?.length > 0 ? (
          <div className="space-y-4">
            {product?.reviews?.map((review, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{review.user}</h3>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <StarIcon className="w-5 h-5" />
                      <span>{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-2">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews for this product.</p>
        )}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Similar products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {product?.similarProducts?.map((similar) => (
            <Card key={similar.id}>
              <CardContent className="p-4">
                <img
                  src={similar.image}
                  alt={similar.name}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h3 className="mt-4 font-semibold">{similar.name}</h3>
                <p className="text-blue-500 font-bold">${similar.price}</p>
                <Button className="mt-2 w-full bg-gray-700 hover:bg-gray-800">
                  View product
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
