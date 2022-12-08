import { Block } from "../model/Block";

export type ChainRequestState = {
  data?: Array<Block>;
  isLoading: boolean;
  isError?: boolean;
  isNoChain: boolean;
};

export type ChainRequestAction =
  | { type: "request" }
  | { type: "success"; results: Array<Block> }
  | { type: "failure" }
  | { type: "nochain" };

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
        isNoChain: false,
      };
    case "success":
      return {
        isLoading: false,
        isError: false,
        data: action.results,
        isNoChain: false,
      };
    case "failure":
      return {
        isLoading: false,
        isError: true,
        data: [],
        isNoChain: false,
      };

    case "nochain":
      return {
        isLoading: false,
        isError: false,
        data: [],
        isNoChain: true,
      };

    default:
      return state;
  }
};
