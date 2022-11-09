import { useState, useEffect } from "react";
import HistoryObject from "../model-objects/HistoryObject";
import HistoryFilter from "./HistoryFilter";

interface EvenOddListProps {
  values: Array<HistoryObject>;
}

const EvenOddList = (props: EvenOddListProps) => {
  const { values } = props;

  const [valueFilter, setValueFilter] = useState(0);
  const [otherFilter, setOtherFilter] = useState("none");

  const onValueFilterChange = (event: any) => {
    setValueFilter(event.target.value);
  };

  const onOtherFilterChange = (event: any) => {
    setOtherFilter(event.target.value);
  };

  useEffect(() => {
    setValueFilter(0);
    setOtherFilter("none");
  }, [values]);

  const filterHistoryItem = (item: HistoryObject) => {
    const filteredByValue =
      (valueFilter && item.value === valueFilter) || !valueFilter;

    const filterByOthers = item.result.includes(otherFilter);

    return (
      (filteredByValue && otherFilter === "none") ||
      (!valueFilter && filterByOthers)
    );
  };

  return (
    <div>
      <HistoryFilter
        inputFilterValue={valueFilter}
        onFilterChange={onValueFilterChange}
        otherFilter={otherFilter}
        onOtherFilterChange={onOtherFilterChange}
      />
      <ul>
        {values
          .filter((it) => filterHistoryItem(it))
          .map((it) => (
            <h1 key={it.id}>
              <span>{it.value}</span>_<span>{it.result}</span>
            </h1>
          ))}
      </ul>
    </div>
  );
};

export default EvenOddList;
