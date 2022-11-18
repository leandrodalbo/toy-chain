import { useReducer, useEffect } from "react";
import Story from "../model-objects/Story";

const localStories: Array<Story> = [
  { id: 1, storyName: "x" },
  { id: 1, storyName: "y" },
  { id: 3, storyName: "z" },
];

type State = {
  data?: Array<Story>;
  isLoading: boolean;
  isError?: boolean;
};

type Action =
  | { type: "request" }
  | { type: "success"; results: Array<Story> }
  | { type: "failure" };

const storiesReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "request":
      return { isLoading: true, isError: false, data: [] };
    case "success":
      return { isLoading: false, isError: false, data: action.results };
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

  const fetchStories = () =>
    new Promise<Story[]>((resolve, reject) =>
      setTimeout(() => resolve(localStories), 2000)
    );

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
      {!isError && !isLoading && (
        <ul>
          {data.map((it) => (
            <li>{`${it.id}_${it.storyName}`}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Stories;
