import ProductCard from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { allProducts, specificFieldsLimit } from "@/redux/slices/productsSlice";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const fields = ["id", "name", "price"];
  useEffect(() => {
    const fetchProducts = async () => {
      await dispatch(specificFieldsLimit(fields));
    };
    fetchProducts();
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 flex justify-center">
      <div className="max-w-5xl w-full p-8">
        {/* Hero Section */}
        <section className="text-center py-16">
          <motion.h1
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Discover the Latest Fashion Trends
          </motion.h1>
          <p className="text-gray-600 mb-6">
            Upgrade your wardrobe with the best styles.
          </p>
          <Link to="/all-products">
            <Button className="px-6 py-3">Shop Now</Button>
          </Link>
        </section>

        {/* Featured Products */}
        <section className="py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Featured Clothing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products?.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Shop by Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Men",
              "Women",
              "Kids",
              "Accessories",
              "Shoes",
              "Dresses",
              "Outerwear",
              "Activewear",
            ].map((category) => (
              <Link
                key={category}
                to={`/categories/${category.toLowerCase()}`}
                className="block p-6 bg-gray-100 rounded-lg text-center"
              >
                {category}
              </Link>
            ))}
          </div>
        </section>

        {/* Customer Reviews */}
        <section className="py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((review) => (
              <Card key={review} className="p-4">
                <CardContent>
                  <p className="text-gray-600 italic">
                    “Amazing quality and stylish fit. Love it!”
                  </p>
                  <h3 className="text-sm font-semibold mt-2">
                    - Happy Customer {review}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
