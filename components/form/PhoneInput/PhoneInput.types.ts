export interface IPhoneInputProps {
  defaultValue?: any;
  error?: any;
  params?: any;
  placeholder?: string;
  name?: string;
  label?: string;
  className?: string;
  value?: string;
  onChange?: (formattedPhone: string) => void;
}
