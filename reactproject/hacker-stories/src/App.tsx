import { useState } from "react";
import EvenOddList from "./components/EvenOddList";
import InputsComponents from "./components/InputComponents";
import HistoryObject from "./model-objects/HistoryObject";

const App = () => {
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

  return (
    <div>
      <h1>HACKER STORY</h1>

      <hr />
      <InputsComponents inputValue={value} onChangeHandler={onChangeHandler} />
      <EvenOddList values={history} />
    </div>
  );
};

export default App;
