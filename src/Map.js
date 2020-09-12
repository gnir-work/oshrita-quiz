import React from "react";
import ReactDOM from "react-dom";
import {compose, withProps} from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";
import Treasure from './treasure.png'

const MyMapComponent = compose(
    withProps({
        /**
         * Note: create and replace your own key in the Google console.
         * https://console.developers.google.com/apis/dashboard
         * The key "AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q" can be ONLY used in this sandbox (no forked).
         */
        googleMapURL:
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyDj42tuYtW8WuCz9fNMCCcTlrT1t1bL0O4&v=3.exp&libraries=geometry,drawing,places&language=he",
        loadingElement: <div style={{height: `100%`, width: '100%'}}/>,
        containerElement: <div style={{height: `400px`, width: '100%'}}/>,
        mapElement: <div style={{height: `100%`, width: '100%'}}/>
    }),
    withScriptjs,
    withGoogleMap
)(props => (
    <GoogleMap className="map" defaultZoom={8} center={props.center}>
        {props.isMarkerShown && (
            <Marker position={props.center} icon={{
                url: props.treasure ? Treasure : null
            }}/>
        )}
    </GoogleMap>
));

export default MyMapComponent;