type SubmitButtonProps = {
  label: string;
  onClick: () => void;
};

export default function SubmitButton({ label, onClick }: SubmitButtonProps) {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type="submit"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
