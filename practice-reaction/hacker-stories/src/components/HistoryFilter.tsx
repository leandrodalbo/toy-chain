interface HistoryFilterProps {
  onFilterChange: (event: any) => void;
  inputFilterValue: number;
  onOtherFilterChange: (event: any) => void;
  otherFilter: string;
}

const HistoryFilter = (props: HistoryFilterProps) => {
  const { onFilterChange, inputFilterValue, otherFilter, onOtherFilterChange } =
    props;

  const otherFilterValues = ["none", "even", "odd"];
  return (
    <div className="mb-2">
      <ul className="flex">
        <li className="mr-1">
          <label htmlFor="valueFilter">ValueFilter: </label>
          <span>
            <input
              id="valueFilter"
              value={inputFilterValue}
              type="number"
              onChange={onFilterChange}
            />
          </span>
        </li>
        <li className="mr-1">
          <label htmlFor="dropDownFilters">Others:</label>
          <select
            id="dropDownFilters"
            name="historyDropDownFilter"
            value={otherFilter}
            onChange={onOtherFilterChange}
          >
            {otherFilterValues.map((it) => (
              <option key={it} value={it}>
                {it}
              </option>
            ))}
          </select>
        </li>
      </ul>
    </div>
  );
};

export default HistoryFilter;
