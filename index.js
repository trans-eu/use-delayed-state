import {
    useCallback,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';

const useDelayedState = (defaultState) => {
    const [state, setState] = useState(defaultState);
    const timeout = useRef();

    const setWithDelay = useCallback((value, delay = 0) => {
        clearTimeout(timeout.current);
        if (delay > 0) {
            timeout.current = setTimeout(setState, delay, value);
        } else {
            setState(value);
        }
    }, [setState, timeout]);

    useLayoutEffect(
        () => () => clearTimeout(timeout.current),
        [timeout]
    );

    return [state, setWithDelay];
};

export default useDelayedState;
