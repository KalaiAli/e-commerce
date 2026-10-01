export default function ShopHeader() {
  return (
    <div className="w-full bg-linear-to-r from-green-600 to-green-400">
      <div className="container mx-auto px-4 py-10">
        <div className="mb-6 text-sm text-white">
          <span>Home</span>
          <span className="mx-2">/</span>
          <span className="font-semibold">All Products</span>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-3xl">
            📦
          </div>

          <div>
            <h1 className="text-4xl font-bold text-white">
              All Products
            </h1>

            <p className="mt-1 text-lg text-white">
              Explore our complete product collection
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}