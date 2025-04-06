export interface IRadioButton {
  value: string;
  label: string;
}

export interface IRadioButtonProps {
  control: any;
  name: string;
  label?: string;
  radioButtonList?: IRadioButton[];
  rules?: any;
  className?: string;
  error?: any;
  handleRadioButtonChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
}
