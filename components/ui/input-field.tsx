import { Input } from "./input";
import { Label } from "./label";

export default function InputField({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-[0.25rem]">
      <Label className="font-bold">{label}</Label>
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={error ? "border-red-500" : ""}
      />
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
}
