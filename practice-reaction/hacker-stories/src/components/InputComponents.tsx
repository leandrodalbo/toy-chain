interface InputsComponentsProps {
  onChangeHandler: (event: any) => void;
  inputValue: number | undefined;
}

const InputsComponents = ({
  onChangeHandler,
  inputValue,
}: InputsComponentsProps) => {
  return (
    <div>
      <label htmlFor="evenOrOdd">Even Or Odd: </label>
      <input
        id="evenOrOdd"
        value={inputValue}
        type="number"
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default InputsComponents;
