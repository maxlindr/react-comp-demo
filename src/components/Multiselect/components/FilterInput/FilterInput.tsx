import { useEffect, useRef, useState } from 'react';
import styles from './FilterInput.module.scss';
import cn from 'classnames';

interface Props {
  onInputChange: (value: string) => void;
  onOpen: () => void;
  onFocus?: () => void;
  open: boolean;
  placeholder?: string;
  error?: boolean;
  autoFocus?: boolean;
}

const FilterInput = ({
  onInputChange,
  open,
  onOpen,
  onFocus,
  placeholder,
  error,
  autoFocus,
}: Props) => {
  const [inputValue, setInputValue] = useState('');
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) ref.current?.focus();
  }, [autoFocus]);

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setInputValue(value);
    onInputChange(value);
  };

  const handleResetClick = () => {
    const value = '';
    setInputValue(value);
    onInputChange(value);
  };

  const handleInputFocus = () => {
    onFocus && onFocus();

    if (!open) {
      onOpen();
    }
  };

  const isValueNotEmpty = inputValue !== '';

  return (
    <div className={styles.wrapper}>
      <input
        ref={ref}
        className={cn(styles.input, {
          [styles.open]: open,
          [styles.error]: !open && error,
        })}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        placeholder={placeholder}
      />

      <div className={styles.buttonsContainer}>
        {isValueNotEmpty && (
          <button
            className={styles.xBtn}
            type="button"
            onClick={handleResetClick}
          ></button>
        )}
        {!open && (
          <button
            className={styles.openBtn}
            type="button"
            onClick={onOpen}
          ></button>
        )}
      </div>
    </div>
  );
};

export default FilterInput;
