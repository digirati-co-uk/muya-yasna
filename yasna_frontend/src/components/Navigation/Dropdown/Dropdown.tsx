import { useEffect, useState } from 'react';
import { Menu } from '@reach/menu-button';
import '@reach/menu-button/styles.css';
import { Button, Item, ItemsContainer, Popover } from './Dropdown.style';

type Option = {
  label: string;
  displayLabel?: string;
  value: string | number;
};

export type DropdownProps = {
  placeholder: string;
  options: Option[];
  onSelect: (selected: string | number) => void;
};

export function Dropdown({ placeholder, options, onSelect }: DropdownProps) {
  const [selectedOption, setSelectedOption] = useState<Option>();

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    if (selectedOption) {
      onSelect(selectedOption.value);
    }
  }, [selectedOption, onSelect]);

  return (
    <Menu>
      <Button>{selectedOption ? selectedOption.label : placeholder}</Button>
      <Popover>
        <ItemsContainer>
          {options.map(option => {
            const { label, displayLabel } = option;
            const listText = displayLabel ? `${label} - ${displayLabel}` : label;
            return (
              <Item key={label} onSelect={() => handleSelect(option)}>
                <span dangerouslySetInnerHTML={{ __html: listText }} />
              </Item>
            );
          })}
        </ItemsContainer>
      </Popover>
    </Menu>
  );
}
