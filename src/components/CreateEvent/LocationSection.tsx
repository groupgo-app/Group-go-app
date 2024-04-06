import React, { useState } from "react";
import FormSection from "./FormSection";
import InputField from "../InputField";
import ILocation, { ISubLocation } from "../../types/Location";
import Loader from "../Loader";
import LocationMap from "./LocationMap";

const LocationSection = ({ eventData, setEventData }: any) => {
  //  const [searchTerm, setSearchTerm] = useState("");
  const [locations, setLocations] = useState<ILocation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState<ISubLocation | null>();
  //   const [error, setError] = useState<Error | null>(null);
  const [query, setQuery] = useState("");

  const fetchLocations = async (queryStr: string) => {
    setIsLoading(true);
    // setError(null);

    // Aol-zxyi8gK_9ofVj52bsJ7JXmJiCxbW54bzdGlFj2vwH7ic_IkMzJhHjgAhhlHm
    // EcNYkrXwqtViczUMWnsq

    try {
      //   const response = await fetch(
      //     `https://us1.locationiq.com/v1/search?key=pk.7f38e677f03b97a09a6b1584cf9df61d&format=json&q=${queryStr}`,
      //   );
      const response = await fetch(
        `https://geocode.maps.co/search?q=${queryStr}&api_key=66119c7f0d076851480238pcd2ce6af`,
      );
      // Construct URL with query
      const data = await response.json();
      console.log(data);
      setLocations(data);
    } catch (error: any) {
      //   setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (location?.display_name) setLocation(null);
    setQuery(e.target.value);
    fetchLocations(e.target.value);
  };

  // Only fetch when searchTerm is not empty
  // if (searchTerm) {
  //   fetchLocations();
  // }

  return (
    <FormSection title="Location">
      <InputField
        id="location"
        type="text"
        required={true}
        label="Where are you having the event"
        name="eventLocation"
        placeholder="Where are you having the event?"
        value={query}
        onChange={handleChange}
      />
      <div>
        {isLoading ? (
          <>
            <Loader />
          </>
        ) : (
          <>
            {locations.length > 0 && (
              <div className="my-2 rounded-xl bg-gray-200 p-4">
                {locations.map((location) => {
                  const { place_id, display_name, lon, lat, licence } =
                    location;
                  const subLocation = {
                    place_id,
                    display_name,
                    lon,
                    lat,
                    licence,
                  };
                  return (
                    <div
                      key={location.place_id}
                      onClick={() => {
                        const newData = {
                          ...eventData,
                          eventInfo: {
                            ...eventData.eventInfo,
                            eventLocation: subLocation,
                          },
                        };
                        console.log(newData);
                        setQuery(location?.display_name);
                        setLocations([]);
                        setLocation(subLocation);
                        setEventData(newData);
                      }}
                      className="my-2 cursor-pointer rounded-xl bg-gray-500 p-2 hover:bg-gray-300"
                    >
                      {location.display_name}
                    </div>
                  );
                })}
              </div>
            )}
            {location && <LocationMap location={location} />}
          </>
        )}
      </div>
    </FormSection>
  );
};

export default LocationSection;
