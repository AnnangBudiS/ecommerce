export default function Input({ id, label, ...props }) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="font-semibold mb-1">
        {label}
      </label>
      <input
        required
        name={id}
        {...props}
        className="w-full pl-2 py-2 rounded border"
      />
    </div>
  );
}
