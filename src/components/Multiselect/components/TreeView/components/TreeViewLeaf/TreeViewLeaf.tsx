import { ChangeEvent, FocusEventHandler } from 'react';
import { noop } from '../../utils';
import { Checkbox } from './Checkbox';

interface Props<T extends string | number> {
  id: T;
  label: string;
  disabled?: boolean;
  checked: boolean;
  className?: string;
  onChange(id: T, checked: boolean): void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

export const TreeViewLeaf = <T extends string | number>({
  checked,
  className,
  disabled,
  id,
  label,
  onChange,
  onBlur = noop,
}: Props<T>) => {
  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    onChange(id, evt.target.checked);
  };

  return (
    <li className={className}>
      <Checkbox
        label={label}
        checked={checked}
        onChange={handleChange}
        onBlur={onBlur}
        disabled={disabled}
      />
    </li>
  );
};
