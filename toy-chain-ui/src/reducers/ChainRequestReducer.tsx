import { Block } from "../model/Block";

export type ChainRequestState = {
  data?: Array<Block>;
  isLoading: boolean;
  isError?: boolean;
};

export type ChainRequestAction =
  | { type: "request" }
  | { type: "success"; results: Array<Block> }
  | { type: "failure" };

export const chainRequestReducer = (
  state: ChainRequestState,
  action: ChainRequestAction
): ChainRequestState => {
  switch (action.type) {
    case "request":
      return {
        isLoading: true,
        isError: false,
        data: [],
      };
    case "success":
      return {
        isLoading: false,
        isError: false,
        data: action.results,
      };
    case "failure":
      return {
        isLoading: false,
        isError: true,
        data: [],
      };

    default:
      return state;
  }
};
