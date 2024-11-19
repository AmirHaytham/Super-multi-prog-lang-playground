import 'react';

declare module 'react' {
  export interface FC<P = {}> {
    (props: P): ReactElement | null;
  }

  export function useState<T>(initialState: T | (() => T)): [T, (newState: T | ((prevState: T) => T)) => void];
  
  export function useCallback<T extends (...args: any[]) => any>(callback: T, deps: ReadonlyArray<any>): T;
  
  export interface ChangeEvent<T = Element> {
    target: EventTarget & T;
  }
} 