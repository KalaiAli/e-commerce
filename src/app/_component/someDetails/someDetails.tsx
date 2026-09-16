const features = [
  {
    title: "Free Shipping",
    description: "On orders over 500 EGP",
    path: "M3 7h11v10H3V7Zm11 3h4l3 3v4h-7v-7Zm-7 9a2 2 0 100-4 2 2 0 000 4Zm10 0a2 2 0 100-4 2 2 0 000 4Z",
  },
  {
    title: "Best Prices",
    description: "100% secure transactions",
    path: "M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3Zm-3 8 2 2 4-4",
  },
  {
    title: "Easy Returns",
    description: "14-day return policy",
    path: "M9 14l-4-4m0 0l4-4m-4 4h10a5 5 0 015 5v1",
  },
  {
    title: "24/7 Support",
    description: "Dedicated support team",
    path: "M4 13a8 8 0 0116 0v1a2 2 0 01-2 2h-1v-5h1a2 2 0 012 2M4 13v1a2 2 0 002 2h1v-5H6a2 2 0 00-2 2Zm8 6h2a2 2 0 002-2",
  },
];
export default function SomeDetails() {
  return (
    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
  
      {features.map(({ title, description, path }) => (
        <div
          key={title}
          className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <svg
            className="h-8 w-8 shrink-0 text-green-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d={path} />
          </svg>
          <div className="flex flex-col">
            
            <h3 className="text-base font-semibold text-gray-900">
              {title}
            </h3>
            <p className="text-sm leading-tight text-gray-500">
              {description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
