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
    <>
      <label htmlFor="valueFilter">ValueFilter: </label>
      <span>
        <input
          id="valueFilter"
          value={inputFilterValue}
          type="number"
          onChange={onFilterChange}
        />
      </span>
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
    </>
  );
};

export default HistoryFilter;
