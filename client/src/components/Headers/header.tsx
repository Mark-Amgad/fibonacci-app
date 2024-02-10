export default function Header({ title }: { title: string }) {
  return (
    <div className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
    </div>
  );
}
