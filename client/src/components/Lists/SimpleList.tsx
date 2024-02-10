type SimpleListProps = {
  title: string;
  listItems: string[];
};

export default function SimpleList({ title, listItems }: SimpleListProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <ul className="list-disc pl-5">
        {listItems.map((item, index) => (
          <li key={index} className="mb-1">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
