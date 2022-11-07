const HistoryFilter = (props:any) => {
  const { onFilterChange } = props;
  return (
    <div>
      <label htmlFor="valueFilter">ValueFilter: </label>
      <span><input id="valueFilter" type="number" onChange={onFilterChange} /></span>
    </div>
  );
};

export default HistoryFilter;
