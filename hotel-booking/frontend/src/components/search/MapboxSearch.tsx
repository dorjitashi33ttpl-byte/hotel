import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

interface MapboxSearchProps {
  onSearch: (results: any) => void;
  radiusKm: number;
}

export const MapboxSearch: React.FC<MapboxSearchProps> = ({ onSearch, radiusKm }) => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  useEffect(() => {
    // Initializing Mapbox map with Bhutan coordinates as default
    const m = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [89.6339, 27.4728], // Thimphu, Bhutan
      zoom: 12
    });
    setMap(m);
    return () => m.remove();
  }, []);

  return (
    <div className="relative h-full w-full">
      <div id="map-container" className="h-full w-full rounded-lg" />
      <div className="absolute top-4 left-4 z-10 bg-white p-4 rounded shadow">
        <input
          className="border p-2"
          placeholder="Search localities in Bhutan..."
          onChange={(e) => {/* logic to call /public/geo/autocomplete */}}
        />
      </div>
    </div>
  );
};
