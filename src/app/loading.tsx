import { RingLoader } from "react-spinners";
export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <RingLoader size={180} color="#16a34a" />
    </div>
  );
}
