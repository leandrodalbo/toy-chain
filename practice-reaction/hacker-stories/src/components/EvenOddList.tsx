import { useState, useEffect } from "react";
import HistoryObject from "../model-objects/HistoryObject";
import HistoryFilter from "./HistoryFilter";

interface EvenOddListProps {
  values: Array<HistoryObject>;
  valueRemover: (id: number) => void;
}

const EvenOddList = ({ values, valueRemover }: EvenOddListProps) => {
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
      <hr />
      <table style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>VALUE</th>
            <th>RESULT</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {values
            .filter((it) => filterHistoryItem(it))
            .map((it) => (
              <tr>
                <td>{it.id}</td>
                <td>{it.value}</td>
                <td>{it.result}</td>
                <td>
                  <button onClick={() => valueRemover(it.id)}>delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default EvenOddList;
