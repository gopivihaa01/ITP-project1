
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Component, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
// import { API_URL } from '../confing';


const Mpapplication = (props) => {

  const navigate = useNavigate();
  const [maplocation , setMapLocation]= useState ([]);
  const [selectInfowindow , setSelectInfowindow] = useState(null);
  const [showInfoWindow, setInfoWindowFlag] = useState(true);
  const [mapAnchor, setMapAnchor] = useState(null);
  const latitude = 23.014509 ;
  const longitude = 72.591759 ;
  const [center, setCenter] = useState({lat: 23.033863, lng: 72.585022});
  const icon = { url: require("../assets/pin.png"), scaledSize: { width: 35, height: 42 } };
  const apiKey = "AIzaSyC1t9XVQUGSxr9Vdn2catWhv4gQJ5AwjL4";
  const getmaplData = () => {
    fetch("https://5931-103-240-204-253.in.ngrok.io/api/values/Location")
      .then((resp) => {
      resp.json().then((result) => {
        console.log("result", result.Userlist)
        setMapLocation(result.Userlist);
      })
    })
    
  }
  useEffect(() => {
    getmaplData();
  },
  []);
  return(
    <>
      <Map className="mapstyle-main" google={props.google} zoom={9} initialCenter={center}
      >
        {maplocation.map((m)=> {
          return(
            <Marker icon={icon} key={m.UserData.Id} position={{ lat:parseFloat(m.Locationdata.Latitude), lng: parseFloat(m.Locationdata.Longitude)}}
             onClick={()=>{setSelectInfowindow(m)}}
            />
          );
        })}
        {selectInfowindow && (
        <InfoWindow onCloseClick={""}
          anchor={mapAnchor}
          visible={showInfoWindow}
          position={{ lat: parseFloat(selectInfowindow.Locationdata.Latitude), lng: parseFloat(selectInfowindow.Locationdata.Longitude)}}
        >
        <div className='infowindow-main'>
          <img className='infowindow-img' src="http://192.168.1.9/itp/Files/Images/avatar.png"/>
          <a className='infowindow-content' href={`http://localhost:3000/otheruserprofile/${selectInfowindow.UserData.Id}`}><h6>{selectInfowindow.UserData.FullName}</h6></a>
        </div>
        </InfoWindow>)}
        
        {/* <Marker onClick={() => navigate("/otheruserprofile")} */}

    </Map>
    
    </>
  );
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyC1t9XVQUGSxr9Vdn2catWhv4gQJ5AwjL4")
  })(Mpapplication)

