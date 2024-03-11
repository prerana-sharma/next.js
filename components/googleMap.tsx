import React from "react";
import GoogleMapReact from "google-map-react";
import GoogleMapList from "./googleMapList";

const GoogleMap = ({ locations, defaultProps }) => {
  const apiKey = process.env.GOOGLE_API_KEY;
  return (
    <div style={{ height: "400px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {locations?.map((location, index) => {
          return (
            <GoogleMapList
              key={index}
              lat={location.lat}
              lng={location.lng}
              text={location.title}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMap;
