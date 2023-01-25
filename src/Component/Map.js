
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Component, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';


const Mpapplication = (props) => {

  const navigate = useNavigate();
  const [maplocation , setMapLocation]= useState ([]);
  // const [center, setCenter] = useState({lat: 23.033863, lng: 72.585022});
  const icon = { url: require("../assets/pin.png"), scaledSize: { width: 35, height: 42 } };

  const apiKey = "AIzaSyC1t9XVQUGSxr9Vdn2catWhv4gQJ5AwjL4";
  const getmaplData = () => {
    fetch("http://192.168.1.9/itp/api/values/Location")
      .then((resp) => {
      resp.json().then((result) => {
        console.log("result", result)
        setMapLocation(result);
      })
    })
  }
  useEffect(() => {
    getmaplData();
  },[]);
  return(
    <>
      <Map className="mapstyle-main" google={props.google} zoom={5} >

        {/* <Marker onClick={() => navigate("/otheruserprofile")}
        icon={icon} 
        position={center}
        /> */}
      {maplocation.map((maploc) => (
        <Marker icon={icon} key={maploc.Location_id}  position={{ lat: maploc.latitude, lng: maploc.longitude}}  />
      ))}
      <InfoWindow onClose={""}></InfoWindow>



      </Map>
    </>
  );
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyC1t9XVQUGSxr9Vdn2catWhv4gQJ5AwjL4")
  })(Mpapplication)

