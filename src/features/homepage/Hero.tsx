import { motion } from 'framer-motion';

function Hero() {
  // Animation variants
  const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={heroVariants}
      transition={{ duration: 0.5 }} // Customize duration as needed
      className="relative mb-12 flex items-center justify-center rounded-lg bg-primary p-8 text-white shadow-lg"
      style={{
        backgroundImage: 'url("./hero.webp")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '500px',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50" />
      <div className="relative z-10 text-center">
        <h1 className="mb-4 text-5xl font-bold shadow-lg">
          Welcome to Schnell Korb
        </h1>
        <p className="text-lg">
          Discover the best deals on high-quality products. Shop now and enjoy
          fast delivery and excellent customer service!
        </p>
        <button className="hover:bg-secondary-dark mt-4 rounded-lg bg-secondary px-6 py-3 text-white transition duration-200">
          Shop Now
        </button>
      </div>
    </motion.section>
  );
}

export default Hero;
