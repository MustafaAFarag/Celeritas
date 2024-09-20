import { Product } from '../../services/apiProducts';
import ProductCard from '../../ui/ProductCard';
import { motion } from 'framer-motion'; // Import Framer Motion

type BestSellersCarouselProps = {
  products: Product[];
};

function BestSellersCarousel({ products }: BestSellersCarouselProps) {
  const topProductsByStock = products
    ?.slice()
    .sort((a, b) => b.stock - a.stock)
    .slice(0, 10);

  // Animation variants for the carousel
  const carouselVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} // Trigger when 20% of the component is visible
      variants={carouselVariants}
    >
      <h2 className="rounded-t-lg bg-sellers-background p-5 text-center text-3xl font-bold text-nochange-text">
        Best Sellers
      </h2>
      <section className="mb-5 overflow-x-auto rounded-b-lg bg-sellers-background px-4 pb-6">
        <div className="flex space-x-6">
          {topProductsByStock?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              className="min-w-[220px]"
            />
          ))}
        </div>
      </section>
    </motion.div>
  );
}

export default BestSellersCarousel;
