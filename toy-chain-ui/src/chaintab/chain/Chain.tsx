import React from "react";
import { useReducer, useEffect } from "react";
import { ENDPOINT } from "../../api/api";
import { chainRequestReducer } from "../../reducers/ChainRequestReducer";
import ChainGrid from "../grid/ChainGrid";

const Chain = () => {
  const [{ data, isLoading, isError }, dispatchStories] = useReducer(
    chainRequestReducer,
    {
      isError: false,
      isLoading: false,
      data: [],
    }
  );

  const fetchStories = async () => {
    const response = await fetch(`${ENDPOINT}/allBlocks`);
    const data = response.json();
    return data;
  };

  useEffect(() => {
    dispatchStories({ type: "request" });
    fetchStories()
      .then((it) => {
        dispatchStories({ type: "success", results: it });
      })
      .catch((it) => {
        dispatchStories({ type: "failure" });
      });
  }, [data]);

  return (
    <div data-testid="chainComponent">
      {isError && <h2>Error Fetching Blocks</h2>}
      {!isError && isLoading && <h4>Loading Blocks</h4>}
      {!isError && !isLoading && <ChainGrid blocksList={data || []} />}
    </div>
  );
};

export default Chain;
