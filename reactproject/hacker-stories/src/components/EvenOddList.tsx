import { useState } from "react";
import HistoryObject from "../model-objects/HistoryObject";
import HistoryFilter from "./HistoryFilter";

const EvenOddList = (props: any) => {
  const [filterValue, setFilterValue] = useState(undefined);

  const onFilterChange = (event: any) => {
    setFilterValue(event.target.value);
  };

  const filterHistoryItem = (item: HistoryObject) => {
    let filteredByValue;
    if (!filterValue) {
      filteredByValue = true;
    } else {
      filteredByValue = item.value == filterValue;
    }

    return filteredByValue;
  };

  const values: Array<HistoryObject> = props.values;
  return (
    <div>
      <HistoryFilter onFilterChange={onFilterChange} />
      <ul>
        {values
          .filter((it) => filterHistoryItem(it))
          .map((it) => (
            <h1 key={it.id}>
              <span>{it.value}</span>:<span>{it.result}</span>
            </h1>
          ))}
      </ul>
    </div>
  );
};

export default EvenOddList;
