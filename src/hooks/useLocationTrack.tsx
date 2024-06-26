import { useEffect, useState } from 'react';

interface Location {
    latitude: number | null;
    longitude: number | null;
}

interface LocationTrackReturn {
    location: Location;
    error: string | null;
    isDenied: boolean;
}

const useLocationTrack = (): LocationTrackReturn => {
    const [location, setLocation] = useState<Location>({ latitude: null, longitude: null });
    const [error, setError] = useState<string | null>(null);
    const [isDenied, setIsDenied] = useState<boolean>(false);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return;
        }

        const success = (position: GeolocationPosition) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
        };

        const error = (err: GeolocationPositionError) => {
            if (err.code === err.PERMISSION_DENIED) {
                setIsDenied(true);
            } else {
                setError(err.message);
            }
        };

        navigator.geolocation.getCurrentPosition(success, error);
    }, []);

    return { location, error, isDenied };
};

export default useLocationTrack;
