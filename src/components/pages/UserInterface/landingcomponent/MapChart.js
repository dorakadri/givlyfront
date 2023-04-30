import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Annotation,

} from "react-simple-maps";

const MapChart = () => {
  return (
    <ComposableMap
      projection="geoAzimuthalEqualArea"
      projectionConfig={{
        rotate: [-10.0, -52.0, 0],
        center: [0, -20],
        scale: 2000
      }}
      style={{width:"100%" , height:"100%",  }}
    >
      <Geographies
        geography="/features.json"
        fill="transparent"
        stroke="#FFFFFF"
        strokeWidth={0.5}
      
    
      >
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))
        }
      </Geographies>
      <Annotation
        subject={[9

          , 37.60]}
        dx={30}
        dy={40}
        connectorProps={{
          stroke: "#FF5533",
          strokeWidth: 3,
          strokeLinecap: "round"
        }}
      >
        <text x="-30" y="-30" textAnchor="end" alignmentBaseline="middle" fill="#F53">
          {"Tunis"}
        </text>
      </Annotation>
    </ComposableMap>
  );
};

export default MapChart;
