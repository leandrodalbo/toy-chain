interface StoriesSearchFilterProps {
  onFilterChange: (newSelectedSearch: string) => void;
  searchOptions: string[];
  selectedSearch: string;
}

const StoriesSearchFilter = (props: StoriesSearchFilterProps) => {
  const { onFilterChange, searchOptions, selectedSearch } = props;
  return (
    <>
      <label htmlFor="dropDownFilters">Stories About:</label>
      <select
        id="dropDownStoriesFilter"
        name="historyDropDownFilter"
        value={selectedSearch}
        onChange={(event) => onFilterChange(event.target.value)}
      >
        {searchOptions.map((it) => (
          <option key={it} value={it}>
            {it}
          </option>
        ))}
      </select>
    </>
  );
};

export default StoriesSearchFilter;
