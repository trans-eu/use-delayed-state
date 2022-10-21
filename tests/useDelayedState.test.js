/**
 * @jest-environment jsdom
 */

import { act, renderHook } from '@testing-library/react-hooks';
import useDelayedState from '../index';

describe('useDelayedState', () => {
    test('should return an array with a state value and a set function', () => {
        const { result } = renderHook(() => useDelayedState());
        expect(result.current[0]).toBe(undefined);
        expect(typeof result.current[1]).toBe('function');
    });

    test('should set the initial state value if initialized with a variable', () => {
        const initialValue = true;
        const { result } = renderHook(() => useDelayedState(initialValue));
        expect(result.current[0]).toBe(initialValue);
    });

    test('should set the initial state value if initialized with a function', () => {
        const initialValue = false;
        const { result } = renderHook(() => useDelayedState(() => initialValue));
        expect(result.current[0]).toBe(initialValue);
    });

    test('should update the state value if the set function\'s called with a variable', () => {
        const { result } = renderHook(() => useDelayedState(0));
        const nextValue = 1;
        act(() => {
            result.current[1](nextValue);
        });
        expect(result.current[0]).toBe(nextValue);
    });

    test('should update the state value if the set function\'s called with a function', () => {
        const { result } = renderHook(() => useDelayedState(0));
        act(() => {
            result.current[1](prevValue => prevValue + 1);
        });
        expect(result.current[0]).toBe(1);
    });

    test('should update the state value without a delay if the set function\'s called without a delay value', () => {
        const { result } = renderHook(() => useDelayedState());
        const nextValue = 'sync';
        act(() => {
            result.current[1](nextValue);
        });
        expect(result.current[0]).toBe(nextValue);
    });

    test('should update the state value with a delay if the set function\'s called with a delay value', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useDelayedState());
        const nextValue = 'async';
        const delay = 1500;
        act(() => {
            result.current[1](nextValue, delay);
        });
        expect(result.current[0]).not.toBe(nextValue);
        await waitForNextUpdate({ timeout: delay })
        expect(result.current[0]).toBe(nextValue);
    });

});
