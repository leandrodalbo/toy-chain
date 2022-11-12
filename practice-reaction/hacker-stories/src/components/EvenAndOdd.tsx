import { useState } from "react";
import EvenOddList from "./EvenOddList";
import InputsComponents from "./InputComponents";
import HistoryObject from "../model-objects/HistoryObject";

const EvenAndOdd = () => {
  const [value, setValue] = useState(0);
  const [history, setHistory] = useState(Array<HistoryObject>);

  const onChangeHandler = (event: any) => {
    setValue(event.target.value);
    const historyValue: HistoryObject = {
      id: history.length + 1,
      result: event.target.value % 2 == 0 ? "is_even" : "is_odd",
      value: event.target.value,
    };

    setHistory(
      history.length == 5 ? [historyValue] : [...history, historyValue]
    );
  };

  const deleteHistoryItem = (id: number) => {
    setHistory(history.filter((it) => it.id !== id));
  };

  return (
    <div>
      <h1>EVEN AND ODD</h1>
      <InputsComponents inputValue={value} onChangeHandler={onChangeHandler} />
      <hr />
      <EvenOddList values={history} valueRemover={deleteHistoryItem} />
    </div>
  );
};

export default EvenAndOdd;
