import * as React from "react";
import { Container, Input, Item } from "./styled";

const KEY_CODE = {
  BACKSPACE: 8,
  DELETE: 46,
};

type Props = {
  autoFocus?: boolean;
  length?: number;
  onChange?: (data: string) => void;
  onCompleted?: (data: string) => void;
  placeholder?: string;
  value?: string;
};

const InputCode = ({
  autoFocus = false,
  length = 6,
  placeholder = "·",
  value: pValue,
}: Props) => {
  const emptyValue = new Array(length).fill(placeholder);

  const [activeIndex, setActiveIndex] = React.useState<number>(-1);
  const [value, setValue] = React.useState<string[]>(
    pValue ? pValue.split("") : emptyValue
  );

  const codeInputRef = React.createRef<HTMLInputElement>();
  const itemsRef = new Array(length)
    .fill(null)
    .map(() => React.createRef<HTMLDivElement>());

  const isCodeRegex = new RegExp(`^[0-9]{${length}}$`);

  const getItem = (index: number) => itemsRef[index]?.current;
  const focusItem = (index: number): void => getItem(index)?.focus();
  const blurItem = (index: number): void => getItem(index)?.blur();

  const onItemFocus = (index: number) => () => {
    setActiveIndex(index);
    if (codeInputRef.current) codeInputRef.current.focus();
  };

  const onInputKeyUp = ({ key, keyCode }: React.KeyboardEvent) => {
    const newValue = [...value];
    const nextIndex = activeIndex + 1;
    const prevIndex = activeIndex - 1;

    const codeInput = codeInputRef.current;
    const currentItem = getItem(activeIndex);

    const isLast = nextIndex === length;
    const isDeleting = keyCode === KEY_CODE.DELETE || keyCode === KEY_CODE.BACKSPACE;
    onItemFocus(activeIndex);

    if (isDeleting) {
      newValue[activeIndex] = placeholder;
      setValue(newValue);

      if (activeIndex > 0) {
        setActiveIndex(prevIndex);
        focusItem(prevIndex);
      }
      return;
    }
    if (Number.isNaN(+key)) return;

    if (codeInput) codeInput.value = "";
    newValue[activeIndex] = key;
    setValue(newValue);

    if (!isLast) {
      setActiveIndex(nextIndex);
      focusItem(nextIndex);
      return;
    }
    if (codeInput) codeInput.blur();
    if (currentItem) currentItem.blur();

    setActiveIndex(-1);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: changeValue } = e.target;
    const isCode = isCodeRegex.test(changeValue);

    if (!isCode) return;

    setValue(changeValue.split(""));
    blurItem(activeIndex);
  };

  const onInputBlur = () => {
    if (activeIndex === -1) return;

    blurItem(activeIndex);
    setActiveIndex(-1);
  };
  const renderItemText = (itemValue: string) => {
    return itemValue;
  };
  return (
    <>
      <Container itemsCount={length}>
        <Input
          ref={codeInputRef}
          className="Code-Input"
          onChange={onInputChange}
          onKeyUp={onInputKeyUp}
          onBlur={onInputBlur}
          activeIndex={activeIndex}
        />

        {itemsRef.map((ref, i) => (
          <Item
            key={i}
            ref={ref}
            tabIndex={0}
            className={`Code-Input ${i === activeIndex ? "is-active" : ""}`}
            onFocus={onItemFocus(i)}
          >
            {renderItemText(value[i])}
          </Item>
        ))}
      </Container>
    </>
  );
};

export default InputCode;
