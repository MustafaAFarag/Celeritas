function ExclusiveOffer() {
  return (
    <section className="custom-design rounded-lg bg-secondary p-8 text-white shadow-lg">
      <h2 className="mb-4 text-3xl font-bold">Exclusive Offers</h2>
      <p className="mb-4">
        Check out our exclusive offers for this season! You won't find these
        deals anywhere else.
      </p>
      <div className="flex justify-around">
        <div className="rounded-lg bg-background p-4 text-text shadow-md">
          <h3 className="text-xl font-semibold">Free Shipping</h3>
          <p>On orders over $50</p>
        </div>
        <div className="rounded-lg bg-background p-4 text-text shadow-md">
          <h3 className="text-xl font-semibold">Special Discounts</h3>
          <p>For our loyal customers</p>
        </div>
      </div>
    </section>
  );
}

export default ExclusiveOffer;
