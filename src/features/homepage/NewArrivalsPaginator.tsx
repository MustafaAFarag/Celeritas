import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

function NewArrivalsPaginator() {
  return (
    <div className="relative my-10">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true, el: '.custom-swiper-pagination' }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        spaceBetween={100}
        className="swiper-container"
      >
        <SwiperSlide className="flex justify-center">
          <img
            src="./furniture.webp"
            alt="Furniture Product"
            className="h-[600px] w-full rounded-lg"
          />
        </SwiperSlide>
        <SwiperSlide className="flex justify-center">
          <img
            src="./perfume.webp"
            alt="Beauty Product 1"
            className="h-[600px] w-full rounded-lg object-cover"
          />
        </SwiperSlide>
        <SwiperSlide className="flex justify-center">
          <img
            src="./beauty.jpg"
            alt="Beauty Product 2"
            className="h-[600px] w-full rounded-lg"
          />
        </SwiperSlide>
        <SwiperSlide className="flex justify-center">
          <img
            src="./beauty.jpg"
            alt="Beauty Product 3"
            className="h-[600px] w-full rounded-lg"
          />
        </SwiperSlide>
      </Swiper>
      {/* Pagination dots positioned at the bottom of the images */}
      <div className="custom-swiper-pagination absolute bottom-4 left-1/2 z-50 -translate-x-1/2 transform"></div>
    </div>
  );
}

export default NewArrivalsPaginator;
