import React, { useState } from "react";
import { useReducer, useEffect } from "react";
import { ENDPOINT } from "../../api/api";
import { Block } from "../../model/Block";
import { chainRequestReducer } from "../../reducers/ChainRequestReducer";
import ChainGrid from "../grid/ChainGrid";

const Chain = () => {
  const [{ data, isLoading, isError, isNoChain }, dispatchStories] = useReducer(
    chainRequestReducer,
    {
      isError: false,
      isLoading: false,
      data: [],
      isNoChain: false,
    }
  );

  const seedChain = async () => {
    const response = await fetch(`${ENDPOINT}/seedChain`);
    const data = await response.json();
    if (data) {
      dispatchStories({ type: "success", results: [data] });
    } else {
      dispatchStories({ type: "failure" });
    }
  };

  const fetchAllBlocks = async () => {
    const response = await fetch(`${ENDPOINT}/allBlocks`);
    const data = await response.json();

    return data as Block[];
  };

  useEffect(() => {
    dispatchStories({ type: "request" });
    fetchAllBlocks()
      .then((it) => {
        if (!it || it.length === 0) {
          dispatchStories({ type: "nochain" });
        } else {
          dispatchStories({ type: "success", results: it });
        }
      })
      .catch((it) => {
        dispatchStories({ type: "failure" });
      });
  }, []);

  return (
    <div>
      {isError && <h2>Error Fetching Blocks</h2>}
      {isNoChain && (
        <h2>
          No Chain available:
          <span>
            <button
              data-testid="SeedingButton"
              className="btn btn-primary"
              onClick={() => seedChain()}
            >
              Seed Chain
            </button>
          </span>
        </h2>
      )}
      {!isError && isLoading && <h4>Loading Blocks</h4>}
      {!isError && !isLoading && <ChainGrid blocksList={data || []} />}
    </div>
  );
};

export default Chain;
