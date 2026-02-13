import { useSyncExternalStore } from 'react';

export default function useWindowWidth() {
    return useSyncExternalStore(
        (callback) => {
            window.addEventListener('resize', callback);
            return () => window.removeEventListener('resize', callback);
        },
        () => window.innerWidth, // Client value
        () => 0 // Server value (default)
    );
}