import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deliverygetOneAction } from "../../../ReduxB/slices/delivery/deliverysSlices";

const LeafletMaps = () => {
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(deliverygetOneAction(params.id));
  }, [params.id, dispatch]);

  const detail = useSelector((state) => state?.delivery?.getOne);


  const map = useMap();
  let DefaultIcon = L.icon({
    iconUrl: "/marche.gif",
    iconSize: [90, 90],
  });

  useEffect(() => {
    if (detail) {
      var marker1 = L.marker(
        [detail?.locationOwner.latitude, detail?.locationOwner.longitude],
        { icon: DefaultIcon }
      ).addTo(map);
      start();

      function start() {
        L.marker([
          detail?.locationUser.latitude,
          detail?.locationUser.longitude,
        ]).addTo(map);
        L.Routing.control({
          waypoints: [
            L.latLng(
              detail?.locationOwner.latitude,
              detail?.locationOwner.longitude
            ),
            L.latLng(
              detail?.locationUser.latitude,
              detail?.locationUser.longitude
            ),
          ],
          lineOptions: {
            styles: [
              {
                color: "blue",
                weight: 4,
                opacity: 0.7,
              },
            ],
          },
          routeWhileDragging: false,
          geocoder: L.Control.Geocoder.nominatim(),
          addWaypoints: false,
          draggableWaypoints: false,
          fitSelectedRoutes: true,
          showAlternatives: true,
        })
          .on("routesfound", function (e) {
            e.routes[0].coordinates.forEach((c, i) => {
              setTimeout(() => {
                marker1.setLatLng([c.lat, c.lng]);
              }, 1000 * i);
            });
          })
          .addTo(map);
      }
    }
  }, [detail, map, DefaultIcon]);

  return null;
};

export default LeafletMaps;
