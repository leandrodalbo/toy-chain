import { useReducer, useEffect } from "react";
import Story from "../model-objects/Story";
import StoriesList from "./StoriesList";

const endpoint = "https://hn.algolia.com/api/v1/search?query=Java";

type State = {
  data?: Array<Story>;
  isLoading: boolean;
  isError?: boolean;
};

type Action =
  | { type: "request" }
  | { type: "success"; results: any }
  | { type: "failure" };

const storiesReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "request":
      return { isLoading: true, isError: false, data: [] };
    case "success":
      return {
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
      return { isLoading: false, isError: true, data: [] };

    default:
      return state;
  }
};

const Stories = () => {
  const [{ data, isLoading, isError }, dispatchStories] = useReducer(
    storiesReducer,
    {
      isError: false,
      isLoading: false,
      data: [],
    }
  );

  const fetchStories = async () => {
    const response = await fetch(endpoint);
    const data = response.json();
    return data;
  };

  useEffect(() => {
    dispatchStories({ type: "request" });
    fetchStories()
      .then((it) => {
        dispatchStories({ type: "success", results: it });
      })
      .catch(() => {
        dispatchStories({ type: "failure" });
      });
  }, []);

  return (
    <div>
      <h1>STORIES</h1>
      {isError && <h2>Error Fetching Stories</h2>}
      {!isError && isLoading && <h4>Loading Stories</h4>}
      {!isError && !isLoading && <StoriesList values={data || []} />}
    </div>
  );
};

export default Stories;
