import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { StarIcon, ShoppingCartIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { productById } from "@/redux/slices/productsSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.products);
  const [selectedImage, setSelectedImage] = useState();
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    const getById = async () => {
      await dispatch(productById(id));
      setSelectedImage(products[0]?.images[0]);
    };
    getById();
  }, [dispatch]);

  if (loading) {
    return <p>Loading ......</p>;
  }

  return (
    <div className="container mx-auto px-8 md:px-20 py-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <img
            src={selectedImage}
            alt={products[0]?.name}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
          <div className="flex gap-2">
            {products[0]?.images?.map((img, index) => (
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
          <h1 className="text-3xl font-bold">{products[0]?.name}</h1>
          <p className="text-gray-700">{products[0]?.description}</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold text-blue-500">
              ${products[0]?.price}
            </span>
            <div className="flex items-center gap-1 text-yellow-500">
              <StarIcon className="w-5 h-5" />
              <span>{products[0]?.rating}</span>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            {products[0]?.stock > 0
              ? `En stock (${products[0]?.stock} disponibles)`
              : "Rupture de stock"}
          </p>

          <div className="flex items-center gap-4">
            <label className="font-semibold">Quantité :</label>
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
            disabled={products[0]?.stock === 0}
          >
            <ShoppingCartIcon className="w-5 h-5" />
            Ajouter au panier
          </Button>
        </div>
      </div>

      <div className="mt-12 w-full md:w-[60%]">
        <h2 className="text-2xl font-semibold mb-4">Avis des clients</h2>
        {products[0]?.reviews?.length > 0 ? (
          <div className="space-y-4">
            {products[0]?.reviews?.map((review, index) => (
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
          <p className="text-gray-500">Aucun avis pour ce produit.</p>
        )}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Produits similaires</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products[0]?.similarProducts?.map((similar) => (
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
                  Voir le produit
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
