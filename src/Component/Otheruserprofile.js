import {HiOutlineArrowRight}from 'react-icons/hi';
import locimg from "../assets/distanceimg.png";
import { Chip, Typography } from "@mui/material";
import { Col, Label, Row } from "reactstrap";
import avtar from "../assets/puser.jpg";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function getDistance ({}){

}
const Otheruserprofile = () => {
    const [userDetail, setUserDetail] = useState({});
    const [userCurrency, setUserCurrency] = useState({});
    const [userLocation, setUserLocation] = useState({});
    const [userRate, setUserRate] = useState({});
    const [userSkill, setUserSkill] = useState([]);
    const [distnceValue, setDistanceValue] = useState();
    const [userLat, setUserLat] = useState({});
    const [userLon, setUserLon] = useState({});
    const [lat, setLat] = useState('');
    const [long, setLon] = useState('');

    const navigate = useNavigate();

    const loginUserId = localStorage.getItem('UserID');
    const userToken = localStorage.getItem('UserToken');
    
    console.log(distnceValue);
    console.log(lat);
    console.log(long);
    console.log(userLat);
    console.log(userLon)

    const navigateToMap = () => {
        navigate('/chatpage');
    };
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLat(position.coords.latitude)
            setLon(position.coords.longitude)
            console.log(position.coords.latitude)
        })
    })

const distance = () => {
   
   
    var R = 6371;
	var dLat = (lat-userLat) * Math.PI / 180;
	var dLon = (long-userLon) * Math.PI / 180;
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(userLat * Math.PI / 180 ) * Math.cos(lat * Math.PI / 180 ) *
		Math.sin(dLon/2) * Math.sin(dLon/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var d = R * c;
    
	if (d>1){ 
        
        setDistanceValue(Math.round(d)+"km")
        return Math.round(d)+"km";
}
	else if (d<=1) {
        setDistanceValue(Math.round(d*1000)+"m")
        return Math.round(d*1000)+"m"
    };
    
    
	// return d;
    
}



    const location = (window.location.pathname).split("/")
    // console.log(location[2]);
    const getallUserData = () => {
        fetch(`http://192.168.1.9/itp/api/values/freeUserDetails?User_id=${location[2]}`)

            .then((response) => response.json())
            .then(data => {
                console.log(data)
                setUserDetail(data.user);
                setUserCurrency(data.currency)
                setUserLocation(data.location)
                setUserRate(data.rate)
                setUserSkill(data.skill);
                setUserLat(data.location.Latitude);
                setUserLon(data.location.Longitude);
            });
    }
    const chatroomdata = () =>{
        fetch(`http://192.168.1.9/itp/api/chat/createChat?token=${userToken}`,{
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                From_User: loginUserId,
                To_User: userDetail.Id,
            })
        })
        
    }
    useEffect(() => {
        getallUserData()
        distance()

    }, []);
    return(
        <div>
            <div className='other-userprofile'></div>
            <img className='otheruser-avtar' src={avtar}/>
            <h5 className="hfive-bio-otheruser">
                
                {userDetail.FullName}
            </h5>
            <Typography className="pbio-otheruser">
                
                {userCurrency.Currency} / {userRate.Rate} / {userRate.Hour} hr
                </Typography>
            <Row>
                <Col sm={{ offset: 1, order: 2, size: 5 }}>
                <Label className='mainskill-header-otheruser'>Main Skill</Label><br />
                {
                    userSkill.map((t) => {
                        return <Chip label={t.skill} className='mainskill-fst-otheruser'/>
                    })
                }<br /><br />
               <Label className='mainskill-header-otheruser'>Other Skill</Label><br />
                <Chip label="Jquery" className='otherskill-fst-otheruser'/>
                <Chip label="React" className='otherskill-sec-otheruser'/>
                <Chip label="Java" className='otherskill-sec-otheruser'/><br/><br />
                <Label className='mainskill-header-otheruser'>Address*</Label><br />
                <Label className='content-otheruser'>
                    {userLocation.House_no}, {userLocation.Society_Name}, {userLocation.PostalCode}, {userLocation.City}, {userLocation.State}, {userLocation.Country}
                </Label><br />
                <Label className='mainskill-header-otheruser'>Email Address*</Label><br />
                <Label  className='content-otheruser'>
                    {userDetail.Email}
                </Label><br />
                <div className="maindiv-otheruser">
                    <img src={locimg} />
                    <h3 className='hthree-maindiv-otheruser'>{distnceValue}</h3>
                    <button className='arrowicon-button' onClick={() => {
                        chatroomdata();
                        navigateToMap();
                    }}>
                        <HiOutlineArrowRight className="right-arrow-otheruser" /> 
                    </button>
                </div>
                 
                </Col>
            </Row>
        </div>
    );
}
export default Otheruserprofile;