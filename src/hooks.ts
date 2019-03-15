import { useEffect, useRef, useState } from "react";

export function useInterval(callback: () => void, delay: number) {
    const savedCallback = useRef(callback);

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

export function useIntervalMemo<T>(callback: () => T, delay: number): T {
    const [value, setValue] = useState(callback);
    useInterval(() => setValue(callback()), delay);
    return value;
}
