import { MdErrorOutline } from "react-icons/md";

export default function ErrorFallback({ error }) {
  return (
    <div className="flex h-screen w-full items-center justify-center gap-8">
      <span>
        <MdErrorOutline size={50} />
      </span>
      <h1 className="text-center text-4xl font-normal text-gray-900">
        {error}
      </h1>
    </div>
  );
}
