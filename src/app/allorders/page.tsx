import Image from "next/image";
import { GetAllOrders } from "@/api/actions/Orders/getallOrders";
import Breadcrumb from "./../_component/BreadCrunmb";

export default async function AllOrders() {
  const payload = await GetAllOrders();

  if (!payload.success) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="mb-6 text-3xl font-bold text-gray-800 dark:text-white">
          My Orders
        </h1>

        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <p className="text-red-500">{payload.message}</p>
        </div>
      </section>
    );
  }

  if (payload.data.length === 0) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="mb-6 text-3xl font-bold text-gray-800 dark:text-white">
          My Orders
        </h1>

        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm dark:border-blue-900 dark:bg-blue-950">
          <p className="text-lg text-gray-500 dark:text-gray-300">
            You don't have any orders yet.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <Breadcrumb />

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            My Orders
          </h1>

          <p className="mt-2 text-gray-500 dark:text-gray-300">
            Here you can view all your orders and their details.
          </p>
        </div>

        <div className="space-y-6">
          {payload.data.map((order) => (
            <div
              key={order._id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:shadow-lg dark:border-blue-900 dark:bg-blue-950"
            >
              {/* Order Header */}
              <div className="flex flex-col gap-4 border-b border-gray-200 bg-gray-50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between dark:border-blue-900 dark:bg-blue-900/30">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    Order ID
                  </p>

                  <p className="mt-1 font-semibold text-gray-800 dark:text-white">
                    #{order._id}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span
                    className={`rounded-full px-4 py-2 text-sm font-medium ${
                      order.isPaid
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.isPaid ? "Paid" : "Not Paid"}
                  </span>

                  <span
                    className={`rounded-full px-4 py-2 text-sm font-medium ${
                      order.isDelivered
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {order.isDelivered ? "Delivered" : "Processing"}
                  </span>
                </div>
              </div>

              {/* Products */}
              <div className="divide-y divide-gray-100 px-6 dark:divide-blue-900">
                {order.cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center"
                  >
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 dark:border-blue-900 dark:bg-blue-900">
                      <Image
                        src={item.product.imageCover}
                        alt={item.product.title}
                        fill
                        className="object-contain p-2"
                      />
                    </div>

                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {item.product.title}
                      </h2>

                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                        Quantity:{" "}
                        <span className="font-semibold text-gray-700 dark:text-white">
                          {item.count}
                        </span>
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <p className="text-lg font-bold text-[#00b206]">
                        {item.price} EGP
                      </p>

                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                        {item.count} {item.count === 1 ? "item" : "items"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Footer */}
              <div className="flex flex-col gap-4 border-t border-gray-200 bg-gray-50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between dark:border-blue-900 dark:bg-blue-900/30">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    Payment Method
                  </p>

                  <p className="mt-1 font-semibold capitalize text-gray-800 dark:text-white">
                    {order.paymentMethodType}
                  </p>
                </div>

                <div className="sm:text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    Total Order Price
                  </p>

                  <p className="mt-1 text-2xl font-bold text-[#00b206]">
                    {order.totalOrderPrice} EGP
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
