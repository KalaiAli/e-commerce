"use client";

import { useState } from "react";

export default function QuantitySelector({
  stock,
  price,
}: {
  stock: number;
  price: number;
}) {
  const [quantity, setQuantity] = useState(1);

  const totalPrice = quantity * Number(price);

  return (
    <div className="mb-6">
      <label
        htmlFor="quantity"
        className="mb-2 block text-sm font-bold text-gray-700"
      >
        Quantity
      </label>

      <div className="flex items-center  gap-10">
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            disabled={quantity <= 1}
            className="flex h-10 w-10 items-center justify-center rounded-l-md border border-gray-300 bg-gray-100 text-xl font-bold hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            −
          </button>

          <input
            type="number"
            id="quantity"
            name="quantity"
            min={1}
            max={stock}
            value={quantity}
            onChange={(e) => {
              const value = Number(e.target.value);

              if (value >= 1 && value <= stock) {
                setQuantity(value);
              }
            }}
            className="h-10 w-16 border-y border-gray-300 text-center"
          />

          <button
            type="button"
            onClick={() => setQuantity((prev) => Math.min(stock, prev + 1))}
            disabled={quantity >= stock}
            className="flex h-10 w-10 items-center justify-center rounded-r-md border border-gray-300 bg-gray-100 text-xl font-bold hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            +
          </button>
        </div>

        <div className="text-right">
          <p className="font-bold  text-gray-500 underline">Total Price</p>

          <p className="text-xl font-extrabold text-blue-600 ">
            {Number.isFinite(totalPrice)
              ? `${totalPrice.toLocaleString()} QAR`
              : "Price unavailable"}
          </p>
        </div>
      </div>

      <p className="mt-2 text-md font-extrabold text-blue-500">
        {stock} available
      </p>
    </div>
  );
}
