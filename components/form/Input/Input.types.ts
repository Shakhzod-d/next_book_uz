export interface IInputProps {
  label?: string;
  params?: any;
  error?: any;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  value?: unknown;
  onChange?: (e: unknown) => void;
}
