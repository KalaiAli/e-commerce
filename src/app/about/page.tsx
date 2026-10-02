
import img1 from '../../assets/1.jpeg'
import img2 from "../../assets/2.png";
import img3 from "../../assets/3.jpeg";

import img4 from '../../assets/4.jpeg'
import img5 from "../../assets/5.jpeg";
import img6 from "../../assets/6.png";

import img7 from "../../assets/7.jpeg";
import img8 from "../../assets/8.jpeg";
import img9 from "../../assets/9.jpeg";


import Slider from "../_component/Slider/Slider";


export default function About() {
   const images = [img1.src, img2.src, img3.src, img4.src, img5.src, img6.src, img7.src, img8.src, img9.src];
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-green-600">
          About FreshMart
        </p>

        <h1 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
          Your Trusted Online Shopping Destination
        </h1>

        <p className="mb-10 text-base leading-7 text-gray-600 md:text-lg">
          Welcome to FreshMart, your one-stop destination for quality products
          at great prices. We make online shopping simple, convenient, and
          enjoyable by bringing a wide range of products and trusted brands
          directly to your doorstep.
        </p>
      </div>
      {/* image */}
      <div className="flex justify-center">
        <Slider spaceBetween={10} slidesPerView={3} pageList={images} />
      </div>
      <div className="mt-4 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            Quality Products
          </h2>

          <p className="text-sm leading-6 text-gray-600">
            We offer carefully selected products from trusted brands to give you
            a reliable shopping experience.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            Easy Shopping
          </h2>

          <p className="text-sm leading-6 text-gray-600">
            Browse products, add your favorites to your wishlist, and complete
            your shopping quickly and easily.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            Customer First
          </h2>

          <p className="text-sm leading-6 text-gray-600">
            Our goal is to provide a smooth and enjoyable experience from
            discovering products to receiving your order.
          </p>
        </div>
      </div>
    </section>
  );
}
