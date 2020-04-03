import { useState } from "react";

export enum UseLoaderStatus {
    PENDING,
    LOADING,
    LOADED,
    ERROR
}

// [value, status, error, reload]
export type UseLoaderResult<T> = [T | undefined, UseLoaderStatus, unknown, () => void];

export default function useLoader<T>(callback: () => Promise<T>): UseLoaderResult<T> {
    const [value, setValue] = useState<T | undefined>(undefined);
    const [status, setStatus] = useState(UseLoaderStatus.PENDING);
    const [error, setError] = useState(undefined);

    if (status === UseLoaderStatus.PENDING) {
        setStatus(UseLoaderStatus.LOADING);
        callback()
            .then(async v => {
                setStatus(UseLoaderStatus.LOADED);
                setValue(v);
                setError(undefined);
            })
            .catch(e => {
                setStatus(UseLoaderStatus.ERROR);
                setValue(undefined);
                setError(e);
            });
    }

    return [value, status, error, (): void => setStatus(UseLoaderStatus.PENDING)];
}
