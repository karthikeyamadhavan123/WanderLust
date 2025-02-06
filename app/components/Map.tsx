"use client";
import L from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Set local paths from the public folder
const markerIcon = "/markers/marker-icon.png";
const markerIcon2x = "/markers/marker-icon-2x.png";
const markerShadow = "/markers/marker-shadow.png";

// Fix marker icons in Next.js
// @ts-expect-error: Leaflet's _getIconUrl is a private method, and TypeScript will throw an error if we try to access it. This is a workaround to override the default icon URLs.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface Props {
  center?: number[];
}

const Map: React.FC<Props> = ({ center }) => {

  if (typeof window === "undefined") {
    return null; 
  }

  return (
    <MapContainer
      center={(center as L.LatLngExpression) || [51, -0.09]}
      zoom={center ? 4 : 2}
      scrollWheelZoom={false}
      className="h-[35vh] rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {center && <Marker position={center as L.LatLngExpression} />}
    </MapContainer>
  );
};

export default Map;