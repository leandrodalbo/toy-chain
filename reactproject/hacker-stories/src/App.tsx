import { useState } from "react";
import HistoryObject from "./model-objects/HistoryObject";

function App() {
  const [value, setValue] = useState(0);
  const [history, setHistory] = useState(Array<HistoryObject>);

  const onChangeHandler = (event: any) => {
    setValue(event.target.value);
    const historyValue: HistoryObject = {
      id: history.length + 1,
      result: event.target.value % 2 == 0 ? "is even" : "is Odd",
      value: event.target.value,
    };

    setHistory(
      history.length == 5 ? [historyValue] : [...history, historyValue]
    );
  };

  return (
    <div>
      <h1>HACKER STORY</h1>

      <label htmlFor="evenOrOdd">Even Or Odd: </label>
      <input id="evenOrOdd" type="number" onChange={onChangeHandler} />

      <ul>
        {history.map((it) => (
          <h1 key={it.id}>
            <span>{it.value}</span>:<span>{it.result}</span>
          </h1>
        ))}
      </ul>
    </div>
  );
}

export default App;
