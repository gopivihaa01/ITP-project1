
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Component, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';


const Mpapplication = (props) => {

  const navigate = useNavigate();
  const [maplocation , setMapLocation]= useState ([]);
  const [selectInfowindow , setSelectInfowindow] = useState(null);
  // const [activeMarker, setActiveMarker] = useState(null);
  // const [showInfoWindow, setInfoWindowFlag] = useState(true);
  // const [center, setCenter] = useState({lat: 23.033863, lng: 72.585022});
  const icon = { url: require("../assets/pin.png"), scaledSize: { width: 35, height: 42 } };
// console.log(maplocation.map((e) => e.UserData.Id));
  const apiKey = "AIzaSyC1t9XVQUGSxr9Vdn2catWhv4gQJ5AwjL4";
  const getmaplData = () => {
    fetch("http://192.168.1.9/itp/api/values/Location")
      .then((resp) => {
      resp.json().then((result) => {
        console.log("result", result.Userlist)
        setMapLocation(result.Userlist);
      })
    })
  }
  useEffect(() => {
    getmaplData();
  },[]);
  return(
    <>
      <Map className="mapstyle-main" google={props.google} zoom={5} >
        {maplocation.map((map)=> (
        <Marker icon={icon} key={map.UserData.Id} position={{ lat: map.Locationdata.Latitude, lng: map.Locationdata.Longitude}}
        onClick={()=>{setSelectInfowindow(map)}}
        />
        ))}
        {selectInfowindow && (
        <InfoWindow 
          position={{ lat: selectInfowindow.Locationdata.Latitude, lng: selectInfowindow.Locationdata.Longitude}}
        >
          <div>{selectInfowindow.UserData.FullName}</div>
        </InfoWindow>)}





        {/* <Marker onClick={() => navigate("/otheruserprofile")}
        icon={icon} 
        position={center}
        /> */}
      {/* {maplocation.map((maploc) => (
        <Marker onClick={() => navigate(`/otheruserprofile/${maploc.user_id}`)} icon={icon} key={maploc.user_id}  position={{ lat: maploc.latitude, lng: maploc.longitude}}  />
      ))} */}
      {/* <InfoWindow onClose={""}></InfoWindow> */}
    </Map>
    </>
  );
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyC1t9XVQUGSxr9Vdn2catWhv4gQJ5AwjL4")
  })(Mpapplication)

