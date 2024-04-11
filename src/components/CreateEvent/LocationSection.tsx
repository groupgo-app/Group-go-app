import React from "react";
import FormSection from "./FormSection";
import InputField from "../InputField";
// import ILocation, { ISubLocation } from "../../types/Location";
// import Loader from "../Loader";
// import LocationMap from "./LocationMap";
import { IEventData } from "../../types/Event";

const LocationSection = ({
  eventData,
  setEventData,
}: {
  eventData: IEventData;
  setEventData: any;
}) => {
  // const [locations, setLocations] = useState<ILocation[]>([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [location, setLocation] = useState<ISubLocation | null>();

  // const [query, setQuery] = useState("");

  // const fetchLocations = async (queryStr: string) => {
  //   // setIsLoading(true);

  //   try {
  //     const response = await fetch(
  //       `https://geocode.maps.co/search?q=${queryStr}&api_key=66119c7f0d076851480238pcd2ce6af`,
  //     );
  //     // Construct URL with query
  //     const data = await response.json();

  //     setLocations(data);
  //   } catch (error: any) {
  //     // console.error(error);
  //     if (error) {
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // if (location?.display_name) setLocation(null);
    // setQuery(e.target.value);
    // fetchLocations(e.target.value);
    const newData: IEventData = {
      ...eventData,
      eventInfo: {
        ...eventData.eventInfo,
        eventLocation: e.target.value,
      },
    };
    setEventData(newData);
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
        value={eventData.eventInfo.eventLocation}
        onChange={handleChange}
      />
      {/* <div>
        {isLoading ? (
          <>
            <Loader />
          </>
        ) : (
          <>
            {locations.length > 0 && (
              <div className="p-4 my-2 bg-gray-200 rounded-xl">
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
                        const newData: IEventData = {
                          ...eventData,
                          eventInfo: {
                            ...eventData.eventInfo,
                            eventLocation: subLocation,
                          },
                        };

                        setQuery(location?.display_name);
                        setLocations([]);
                        setLocation(subLocation);
                        setEventData(newData);
                      }}
                      className="p-2 my-2 bg-gray-500 rounded-xl cursor-pointer hover:bg-gray-300"
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
      </div> */}
    </FormSection>
  );
};

export default LocationSection;
