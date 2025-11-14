import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type TFormSelectProps = {
  options: TOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

type TOption = {
  label: string;
  value: string;
};

export function FormSelect({ value, onChange, options, placeholder }: TFormSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map(({ label, value }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
