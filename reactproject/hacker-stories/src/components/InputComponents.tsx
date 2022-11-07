const InputsComponents = (props:any) => {
  const { onChangeHandler } = props;
  return (
    <div>
      <label htmlFor="evenOrOdd">Even Or Odd: </label>
      <input id="evenOrOdd" type="number" onChange={onChangeHandler} />
    </div>
  );
};

export default InputsComponents;
