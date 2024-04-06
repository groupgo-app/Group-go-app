type ILocation = {
  place_id: number;
  licence: string;
  osm_type?: string;
  osm_id?: number;
  boundingbox: [string, string, string, string];
  lat: string;
  lon: string;
  display_name: string;
  class?: string;
  type?: string;
  importance: number;
};

export type ISubLocation = {
  place_id: number;
  licence: string;
  lat: string;
  lon: string;
  display_name: string;
};

export default ILocation;
