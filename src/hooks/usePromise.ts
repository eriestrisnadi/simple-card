import { DependencyList, useEffect, useReducer } from "react";

type PromiseKind = "pending" | "rejected" | "resolved";
type PendingState = [undefined, undefined, "pending"];
type ResolvedState<Result> = [Result, undefined, "resolved"];
type RejectedState = [undefined, Error, "rejected"];

interface PromiseAction {
  type: PromiseKind;
  payload?: any;
}

interface PromiseState {
  error?: any;
  result?: any;
  state: PromiseKind;
}

const actionKind: Record<PromiseKind, PromiseKind> = {
  pending: "pending",
  rejected: "rejected",
  resolved: "resolved",
};

export function usePromise<T>(
  factory: () => Promise<T> | undefined | null,
  deps: DependencyList
): PendingState | ResolvedState<T> | RejectedState;
export function usePromise<T>(
  factory: () => Promise<T> | undefined | null,
  deps: DependencyList,
  initial: T
): PendingState | ResolvedState<T> | RejectedState;
export function usePromise<T>(
  factory: () => Promise<T> | undefined | null,
  deps: DependencyList,
  initial?: T
) {
  const defaultState: PromiseState = {
    error: undefined,
    result: initial,
    state: "pending",
  };

  function reducer(state: PromiseState, action: PromiseAction): PromiseState {
    switch (action.type) {
      case actionKind.pending:
        return defaultState;

      case actionKind.resolved:
        return {
          error: undefined,
          result: action.payload,
          state: actionKind.resolved,
        };

      case actionKind.rejected:
        return {
          error: action.payload,
          result: undefined,
          state: actionKind.rejected,
        };

      default:
        return state;
    }
  }

  const [{ error, result, state }, dispatch] = useReducer(
    reducer,
    defaultState
  );

  useEffect(() => {
    const promise = factory();
    if (promise === undefined || promise === null) return;

    let canceled = false;

    dispatch({ type: actionKind.pending });

    promise.then(
      (result) =>
        !canceled &&
        dispatch({
          payload: result,
          type: actionKind.resolved,
        }),
      (error) =>
        !canceled &&
        dispatch({
          payload: error,
          type: actionKind.rejected,
        })
    );

    return () => {
      canceled = true;
    };
  }, deps);

  return [result, error, state];
}

export default usePromise;
