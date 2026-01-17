
import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '0.5rem'
};

const defaultCenter = {
    lat: 18.5204, // Pune coordinates
    lng: 73.8567
};

interface CollegeMapProps {
    colleges: {
        name: string;
        location: string;
        lat?: number;
        lng?: number;
    }[];
}

const CollegeMap: React.FC<CollegeMapProps> = ({ colleges }) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
    });

    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [selectedCollege, setSelectedCollege] = useState<any>(null);

    const onLoad = useCallback(function callback(map: google.maps.Map) {
        const bounds = new window.google.maps.LatLngBounds();
        // Fit bounds to include all markers if provided, else center on Pune
        if (colleges.length > 0) {
            colleges.forEach(college => {
                if (college.lat && college.lng) {
                    bounds.extend({ lat: college.lat, lng: college.lng });
                }
            });
            if (!bounds.isEmpty()) {
                map.fitBounds(bounds);
            } else {
                map.setCenter(defaultCenter);
                map.setZoom(10);
            }
        } else {
            map.setCenter(defaultCenter);
            map.setZoom(10);
        }
        setMap(map);
    }, [colleges]);

    const onUnmount = useCallback(function callback(map: google.maps.Map) {
        setMap(null);
    }, []);

    if (!isLoaded) {
        return <div className="h-[400px] w-full bg-muted animate-pulse rounded-lg flex items-center justify-center">Loading Maps...</div>;
    }

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={defaultCenter}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
                mapId: 'YOUR_MAP_ID_HERE', // Optional: for custom styles
                disableDefaultUI: false,
                zoomControl: true,
            }}
        >
            {/* Example Markers - In a real app, we'd need geocoded coordinates for each college */}
            {/* For demo purposes, we can hardcode coords for the top colleges if available, or just show the center */}
            {colleges.map((college, index) => (
                college.lat && college.lng && (
                    <Marker
                        key={index}
                        position={{ lat: college.lat, lng: college.lng }}
                        onClick={() => setSelectedCollege(college)}
                    />
                )
            ))}

            {selectedCollege && (
                <InfoWindow
                    position={{ lat: selectedCollege.lat, lng: selectedCollege.lng }}
                    onCloseClick={() => setSelectedCollege(null)}
                >
                    <div className="p-2 text-black">
                        <h3 className="font-bold">{selectedCollege.name}</h3>
                        <p className="text-sm">{selectedCollege.location}</p>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
};

export default React.memo(CollegeMap);
