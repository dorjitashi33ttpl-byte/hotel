import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

export const PropertyWizard: React.FC = () => {
  const [step, setStep] = useState(1);
  const [lat, setLat] = useState(27.4728);
  const [lng, setLng] = useState(89.6339);

  useEffect(() => {
    if (step === 2) {
      const map = new mapboxgl.Map({
        container: 'map-picker',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: 12
      });
      const marker = new mapboxgl.Marker({ draggable: true })
        .setLngLat([lng, lat])
        .addTo(map);
      marker.on('dragend', () => {
        const { lng, lat } = marker.getLngLat();
        setLat(lat);
        setLng(lng);
      });
      return () => map.remove();
    }
  }, [step]);

  return (
    <div className="max-w-2xl mx-auto p-12 bg-white shadow-2xl rounded-3xl mt-12">
      <h2 className="text-3xl font-extrabold mb-8">Setup Your Property</h2>
      {step === 1 && (
        <div className="space-y-6">
          <input className="w-full border p-4 rounded-xl" placeholder="Property Name (e.g. Heritage Bhutan)" />
          <textarea className="w-full border p-4 rounded-xl h-32" placeholder="Description..." />
          <button onClick={() => setStep(2)} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold">Next: Pin on Map</button>
        </div>
      )}
      {step === 2 && (
        <div className="space-y-6">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Pin Location</p>
          <div id="map-picker" className="h-80 w-full rounded-2xl" />
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-gray-50 p-3 rounded-lg font-mono text-xs">Lat: {lat.toFixed(6)}</div>
            <div className="bg-gray-50 p-3 rounded-lg font-mono text-xs">Lng: {lng.toFixed(6)}</div>
          </div>
          <button onClick={() => setStep(3)} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold">Next: Rooms & Rates</button>
        </div>
      )}
      {step === 3 && (
        <div className="text-center py-12">
           <h3 className="text-2xl font-bold">Ready to Launch!</h3>
           <p className="text-gray-500 mb-8 mt-2">Finish setting up your deluxe rooms to go live.</p>
           <button className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold">Publish Property</button>
        </div>
      )}
    </div>
  );
};
