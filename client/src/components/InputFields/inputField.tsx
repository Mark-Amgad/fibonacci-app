type InputFieldProps = {
  label: string;
  placeholder: string;
};

export default function InputField({ label, placeholder }: InputFieldProps) {
  return (
    <div className="flex justify-center items-center gap-2">
      <label className="text-gray-700 text-sm font-bold mb-1">{label}</label>
      <input
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
}
