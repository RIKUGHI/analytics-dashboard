import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { FC } from "react";
import { Trip } from "../hooks";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

interface IMapView {
  data: Trip;
}

const MapView: FC<IMapView> = ({ data }) => {
  const pickup = {
    lat: Number(data.pickup_latitude),
    lng: Number(data.pickup_longitude),
  };
  const dropoff = {
    lat: Number(data.dropoff_latitude),
    lng: Number(data.pickup_longitude),
  };
  // const pickup = { lat: 40.79266, lng: -73.97345 };
  // const dropoff = { lat: 40.73614, lng: -73.98733 };

  return (
    <MapContainer
      center={[(pickup.lat + dropoff.lat) / 2, (pickup.lng + dropoff.lng) / 2]}
      zoom={13}
      // style={{ height: "90vh", width: "50%" }}
      className="w-full md:w-1/2 h-3/4 md:h-1/2"
    >
      {/* Base Map */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Pickup Marker */}
      <Marker position={[pickup.lat, pickup.lng]}>
        <Popup>Pickup Location</Popup>
      </Marker>

      {/* Dropoff Marker */}
      <Marker position={[dropoff.lat, dropoff.lng]}>
        <Popup>Dropoff Location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapView;
