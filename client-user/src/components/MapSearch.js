import mapboxgl from "mapbox-gl";
import React, { useEffect, useRef, useState } from "react";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";

const MapSearch = ({ data, populateFunction }) => {
  const mapContainerRef = useRef(null);
  const [lng, setLng] = useState(106.82713133932072);
  const [lat, setLat] = useState(-6.1752110636303605);
  const [zoom, setZoom] = useState(9.5);
  //buat munculin map
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    data.getHouse.forEach((feature, i) => {
      const formatIdr1 = +feature.price;
      const price1 = formatIdr1.toLocaleString("id-Id", {
        style: "currency",
        currency: "IDR",
      });
      let coordinate = [feature.longitude, feature.latitude];
      new mapboxgl.Marker()
        .setLngLat(coordinate)
        .setPopup(
          new mapboxgl.Popup({ offset: 10 }).setHTML(`
        <div className="flex">
          <a href='detail/${feature.id}'> 
          <h4 style="font-weight: bold;">${feature.title}</h4>
          <h4>${price1}</h4>
            <img src=${feature.Images[0].image} width="100%">
          </a>
        </div>
        `)
        )
        .addTo(map);
    });
    let marker = new mapboxgl.Marker();
    let coordinates;
    function add_marker(event) {
      coordinates = event.lngLat;
      populateFunction(coordinates);
      marker.setLngLat(coordinates).addTo(map);
    }
    map.on("click", add_marker);

    let geocoder;
    map.addControl(
      (geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      }))
    );
    geocoder.on("result", function (e) {
      let longitude = e.result.center[0];
      let latitude = e.result.center[1];
    });
    map.addControl(new mapboxgl.NavigationControl(), "top-right");
    let locateUser;
    map.addControl(
      (locateUser = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
        showUserLocation: true,
      }))
    );
    locateUser.on("geolocate", function (e) {
      let longitude = e.coords.longitude;
      let latitude = e.coords.latitude;
    });
    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });
    return () => map.remove();
  }, []);

  return (
    <div>
      <div className="sidebarStyle"></div>
      <div
        className="map-container w-screen h-screen mr-auto"
        ref={mapContainerRef}
      />
    </div>
  );
};

export default MapSearch;
