/* eslint-disable @typescript-eslint/no-unused-vars */
import { Carousel } from 'primereact/carousel';
import { useState } from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion

type PaginatorProductProps = {
  id: number;
  image: string;
  alt: string;
};

function NewArrivalsPaginator() {
  const [products] = useState<PaginatorProductProps[]>([
    { id: 1, image: './technology.webp', alt: 'Furniture Product' },
    { id: 2, image: './furniture.webp', alt: 'Beauty Product 1' },
    { id: 3, image: './perfume.webp', alt: 'Beauty Product 2' },
    { id: 4, image: './bedroom.webp', alt: 'Beauty Product 3' },
  ]);

  const itemTemplate = (product: PaginatorProductProps) => {
    return (
      <div className="flex justify-center">
        <img
          src={product.image}
          alt={product.alt}
          className="h-[600px] w-full rounded-lg object-cover"
        />
      </div>
    );
  };

  // Animation variants for when the component comes into view
  const paginatorVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      className="relative my-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={paginatorVariants}
    >
      <Carousel
        value={products}
        itemTemplate={itemTemplate}
        numVisible={1}
        numScroll={1}
        autoplayInterval={3000}
        circular
        showNavigators={false}
      />
    </motion.div>
  );
}

export default NewArrivalsPaginator;
