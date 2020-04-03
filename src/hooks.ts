import { useEffect, useRef } from "react";

export function useInterval(callback: () => void, delayMs: number): void {
    const savedCallback = useRef(callback);

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick(): void {
            savedCallback.current();
        }
        if (delayMs !== null) {
            const id = setInterval(tick, delayMs);
            return (): void => clearInterval(id);
        }
    }, [delayMs]);
}
