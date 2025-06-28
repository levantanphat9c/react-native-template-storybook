import {isEqual} from 'lodash';
import {ComponentProps, ComponentType, memo, PropsWithChildren} from 'react';

/**
 * Enhanced HOC for memoizing React components with optimized comparison
 *
 * Features:
 * - Optimized performance with early returns
 * - Better type safety
 * - Handles edge cases (null, undefined, functions)
 * - Configurable comparison strategy
 * - Memory efficient
 */
interface MemoOptions {
  /** Custom comparison function */
  propsAreEqual?: (prevProps: any, nextProps: any) => boolean;
  /** Keys to ignore in comparison */
  ignoreKeys?: string[];
  /** Use shallow comparison for specific keys */
  shallowKeys?: string[];
  /** Enable debug logging */
  debug?: boolean;
}

/**
 * Optimized default comparison function
 * - Early returns for performance
 * - Handles edge cases
 * - Configurable comparison strategy
 */
const createDefaultPropsAreEqual = (options: MemoOptions = {}) => {
  const {ignoreKeys = [], shallowKeys = [], debug = false} = options;

  return <P extends Record<string, any>>(
    prevProps: Readonly<PropsWithChildren<P>>,
    nextProps: Readonly<PropsWithChildren<P>>,
  ): boolean => {
    // Early return for same reference
    if (prevProps === nextProps) {
      if (debug) console.log('withMemo: Same reference, skipping comparison');
      return true;
    }

    const prevKeys = Object.keys(prevProps);
    const nextKeys = Object.keys(nextProps);

    // Early return for different key counts
    if (prevKeys.length !== nextKeys.length) {
      if (debug)
        console.log('withMemo: Different key counts', {
          prev: prevKeys.length,
          next: nextKeys.length,
        });
      return false;
    }

    // Compare each prop
    for (const key of prevKeys) {
      // Skip ignored keys
      if (ignoreKeys.includes(key)) {
        continue;
      }

      const prevValue = prevProps[key];
      const nextValue = nextProps[key];

      // Early return for different references
      if (prevValue === nextValue) {
        continue;
      }

      // Handle null/undefined
      if (prevValue == null || nextValue == null) {
        if (prevValue !== nextValue) {
          if (debug)
            console.log('withMemo: Null/undefined mismatch', {
              key,
              prev: prevValue,
              next: nextValue,
            });
          return false;
        }
        continue;
      }

      // Handle functions
      if (typeof prevValue === 'function' && typeof nextValue === 'function') {
        // For functions, we assume they're different unless same reference
        if (prevValue !== nextValue) {
          if (debug) console.log('withMemo: Function mismatch', {key});
          return false;
        }
        continue;
      }

      // Handle objects and arrays
      if (typeof prevValue === 'object' && typeof nextValue === 'object') {
        // Use shallow comparison for specific keys
        if (shallowKeys.includes(key)) {
          if (prevValue !== nextValue) {
            if (debug) console.log('withMemo: Shallow object mismatch', {key});
            return false;
          }
        } else {
          // Use deep comparison with lodash.isEqual
          if (!isEqual(prevValue, nextValue)) {
            if (debug) console.log('withMemo: Deep object mismatch', {key});
            return false;
          }
        }
        continue;
      }

      // Handle primitives
      if (prevValue !== nextValue) {
        if (debug)
          console.log('withMemo: Primitive mismatch', {
            key,
            prev: prevValue,
            next: nextValue,
          });
        return false;
      }
    }

    if (debug) console.log('withMemo: Props are equal');
    return true;
  };
};

/**
 * Enhanced withMemo HOC
 *
 * @param Component - React component to memoize
 * @param options - Memoization options
 * @returns Memoized component
 *
 * @example
 * ```tsx
 * // Basic usage
 * const MemoizedComponent = withMemo(MyComponent);
 *
 * // With custom comparison (ignoreKeys, shallowKeys, debug)
 * const MemoizedComponent = withMemo(MyComponent, {
 *   ignoreKeys: ['onPress'],
 *   shallowKeys: ['style'],
 *   debug: __DEV__
 * });
 *
 * // With custom propsAreEqual
 * const MemoizedComponent = withMemo(MyComponent, {
 *   propsAreEqual: (prev, next) => prev.id === next.id
 * });
 * ```
 */
const withMemo = <P extends ComponentType<any>>(
  Component: P,
  options?:
    | MemoOptions
    | ((
        prevProps: Readonly<ComponentProps<P>>,
        nextProps: Readonly<ComponentProps<P>>,
      ) => boolean),
): P => {
  // Handle legacy propsAreEqual function
  if (typeof options === 'function') {
    return memo(Component, options) as unknown as P;
  }

  // Use enhanced options
  const memoOptions = options || {};
  const propsAreEqual =
    memoOptions.propsAreEqual || createDefaultPropsAreEqual(memoOptions);

  return memo(Component, propsAreEqual) as unknown as P;
};

export default withMemo;
export type {MemoOptions};
