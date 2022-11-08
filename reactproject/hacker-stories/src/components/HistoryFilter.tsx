interface HistoryFilterProps {
  onFilterChange: (event: any) => void;
  inputFilterValue: number | undefined;
}

const HistoryFilter = (props: HistoryFilterProps) => {
  const { onFilterChange, inputFilterValue } = props;
  return (
    <div>
      <label htmlFor="valueFilter">ValueFilter: </label>
      <span>
        <input
          id="valueFilter"
          value={inputFilterValue}
          type="number"
          onChange={onFilterChange}
        />
      </span>
    </div>
  );
};

export default HistoryFilter;
