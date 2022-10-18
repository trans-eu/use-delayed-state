# useDelayedState

A React hook for setting state with a delay.


## Usage

```jsx
const [state, setState] = useDelayedState(initialState);
```
The hook is an extension to [React's useState](https://beta.reactjs.org/apis/react/useState#usestate). It takes in the state's initial value as an argument and returns an array with the current state and a set function. The set function takes two arguments: the next state value and a delay in milliseconds.


## Example

```jsx
import React from 'react';
import useDelayedState from '@trans.eu/use-delayed-state';

const Counter = () => {
    const [count, setCount] = useDelayedState(0);

    const handleClick = () => setCount(prevCount => prevCount + 1, 1500);
    
    return (
        <button onClick={handleClick}>
            Button was pressed {count} times
        </button>
    );
}
```
