import { useReducer, useEffect } from "react";
import Story from "../model-objects/Story";
import StoriesList from "./StoriesList";
import StoriesSearchFilter from "./StoriesSearchFilter";

const endpoint = "https://hn.algolia.com/api/v1/search";

const searchQueryOptions = [
  "Java",
  "React",
  "Kotlin",
  "WASM",
  "Rust",
  "Blockchain",
];

type State = {
  data?: Array<Story>;
  isLoading: boolean;
  isError?: boolean;
  selectedSearch: string;
};

type Action =
  | { type: "newsearch"; selectedSearch: string }
  | { type: "request" }
  | { type: "success"; results: any }
  | { type: "failure" };

const storiesReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "newsearch":
      return {
        isLoading: false,
        isError: false,
        data: [],
        selectedSearch: action.selectedSearch,
      };
    case "request":
      return {
        isLoading: true,
        isError: false,
        data: [],
        selectedSearch: state.selectedSearch,
      };
    case "success":
      return {
        selectedSearch: state.selectedSearch,
        isLoading: false,
        isError: false,
        data: action.results["hits"].map((it: any) => {
          return {
            title: it["title"],
            points: it["points"],
            url: it["url"],
          } as Story;
        }),
      };
    case "failure":
      return {
        isLoading: false,
        isError: true,
        data: [],
        selectedSearch: state.selectedSearch,
      };

    default:
      return state;
  }
};

const Stories = () => {
  const [{ data, isLoading, isError, selectedSearch }, dispatchStories] =
    useReducer(storiesReducer, {
      isError: false,
      isLoading: false,
      data: [],
      selectedSearch: "",
    });

  const fetchStories = async () => {
    const response = await fetch(`${endpoint}?query=${selectedSearch}`);
    const data = response.json();
    return data;
  };

  useEffect(() => {
    if (!selectedSearch) return;

    dispatchStories({ type: "request" });
    fetchStories()
      .then((it) => {
        dispatchStories({ type: "success", results: it });
      })
      .catch((it) => {
        dispatchStories({ type: "failure" });
      });
  }, [selectedSearch]);

  const onSelectedSearchChange = (newSelectedSearch: string) => {
    dispatchStories({ type: "newsearch", selectedSearch: newSelectedSearch });
  };

  return (
    <div className="p-8 bg-amber-100">
      <span>
        <StoriesSearchFilter
          onFilterChange={onSelectedSearchChange}
          searchOptions={searchQueryOptions}
          selectedSearch={selectedSearch}
        />
      </span>
      {isError && <h2>Error Fetching Stories</h2>}
      {!isError && isLoading && <h4>Loading Stories</h4>}
      {!isError && !isLoading && <StoriesList values={data || []} />}
    </div>
  );
};

export default Stories;
