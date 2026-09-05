import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <h2 className="mt-2 text-2xl font-semibold text-gray-700">
        Page Not Found
      </h2>
      <p className="mt-2 text-gray-500">
        {"Sorry, the page you're looking for doesn't exist or has been moved."}
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-blue-500 px-6 py-2 text-white transition hover:bg-blue-600"
      >
        Go Back Home
      </Link>
    </div>
  );
}
