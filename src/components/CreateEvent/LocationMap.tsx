import { ISubLocation } from "../../types/Location";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const LocationMap = ({ location }: { location: ISubLocation }) => {
  return (
    <div className="mt-3 max-h-[400px] w-full">
      <MapContainer
        center={{ lat: Number(location.lat), lng: Number(location.lon) }}
        zoom={15}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={{ lat: Number(location.lat), lng: Number(location.lon) }}
        >
          <Popup>{location?.display_name}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LocationMap;
