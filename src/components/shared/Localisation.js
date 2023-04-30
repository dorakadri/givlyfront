import React, { useEffect, useState } from 'react'

export const Localisation = () => { 
    const [location, setLocation] = useState(null);
    const [distance, setDistance] = useState(null);
    const [destination, setDestination] = useState({
      latitude: 36.2411291,
      longitude: 9.6756932,
    }); // Set your destination coordinates here
  
    useEffect(() => {
      if (navigator.geolocation) {
        console.log("sdfsdf")
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            console.log(error);
          },
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
      } else {
        console.log('Geolocation is not supported by this browser.');
      }
    }, []);
  
    useEffect(() => {
      if (location) {
        const d = calculateDistance(
          location.latitude,
          location.longitude,
          destination.latitude,
          destination.longitude
        );
        setDistance(d);
      }
    }, [location]);
  
    function calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371; // Radius of the earth in km
      const dLat = deg2rad(lat2 - lat1); // deg2rad below
      const dLon = deg2rad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
          Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c; // Distance in km
      return d;
    }
  
    function deg2rad(deg) {
      return deg * (Math.PI / 180);
    }
  
    return (
      <div>
        {location ? (
          <p>
            Your location is: {location.latitude}, {location.longitude}
          </p>
        ) : (
          <p>Loading...</p>
        )}
        {distance ? (
          <p>The distance to your destination is {distance} km.</p>
        ) : (
          <p>Calculating distance...</p>
        )}
      </div>
    );
  }