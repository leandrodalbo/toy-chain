import {
  ChainRequestState,
  ChainRequestAction,
  chainRequestReducer,
} from "./ChainRequestReducer";

describe("ChainRequestReducer test suite", () => {
  test("nochain is true without a chain", () => {
    const initialState: ChainRequestState = {
      isLoading: true,
      isError: false,
      data: [],
      isNoChain: false,
    };

    const action: ChainRequestAction = {
      type: "nochain",
    };

    const result: ChainRequestState = chainRequestReducer(initialState, action);

    expect(result.isError).toEqual(false);
    expect(result.isLoading).toEqual(false);
    expect(result.data?.length).toEqual(0);
    expect(result.isNoChain).toEqual(true);
  });

  test("during the request is successfull will return the data", () => {
    const initialState: ChainRequestState = {
      isLoading: true,
      isError: false,
      data: [],
      isNoChain: false,
    };

    const action: ChainRequestAction = {
      type: "success",
      results: [
        {
          hash: "fdd333",
          previousHash: "fdgh",
          timestamp: Date.now().toString(),
        },
      ],
    };

    const result: ChainRequestState = chainRequestReducer(initialState, action);

    expect(result.isError).toEqual(false);
    expect(result.isLoading).toEqual(false);
    expect(result.data?.length).toEqual(1);
    expect(result.isNoChain).toEqual(false);
  });

  test("during the request isLoading is true and isError is false", () => {
    const initialState: ChainRequestState = {
      isLoading: false,
      isError: true,
      data: [],
      isNoChain: false,
    };

    const action: ChainRequestAction = {
      type: "request",
    };

    const result: ChainRequestState = chainRequestReducer(initialState, action);

    expect(result.isError).toEqual(false);
    expect(result.isLoading).toEqual(true);
  });

  test("on failure isLoading is false and isError is true", () => {
    const initialState: ChainRequestState = {
      isLoading: true,
      isError: false,
      data: [],
      isNoChain: false,
    };

    const action: ChainRequestAction = {
      type: "failure",
    };

    const result: ChainRequestState = chainRequestReducer(initialState, action);

    expect(result.isError).toEqual(true);
    expect(result.isLoading).toEqual(false);
    expect(result.isNoChain).toEqual(false);
  });
});
