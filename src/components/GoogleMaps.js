import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: 45.3750393, lng: -71.9846157 }}
    >
    <Marker position={{ lat: 45.3750393, lng: -71.9846157 }} />
  </GoogleMap>
))

export default MyMapComponent
