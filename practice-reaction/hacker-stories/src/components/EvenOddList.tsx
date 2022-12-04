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
    <div className="overflow-hidden border rounded-lg mx-2">
      <HistoryFilter
        inputFilterValue={valueFilter}
        onFilterChange={onValueFilterChange}
        otherFilter={otherFilter}
        onOtherFilterChange={onOtherFilterChange}
      />
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
            >
              ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
            >
              VALUE
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
            >
              RESULT
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
            >
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {values
            .filter((it) => filterHistoryItem(it))
            .map((it) => (
              <tr>
                <td className="px-6 py-2 text-sm font-medium text-gray-800 whitespace-nowrap">
                  {it.id}
                </td>
                <td className="px-6 py-2 text-sm font-medium text-gray-800 whitespace-nowrap">
                  {it.value}
                </td>
                <td className="px-6 py-2 text-sm font-medium text-gray-800 whitespace-nowrap">
                  {it.result}
                </td>
                <td>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => valueRemover(it.id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default EvenOddList;
