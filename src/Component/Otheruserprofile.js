import {HiOutlineArrowRight}from 'react-icons/hi';
import location from "../assets/distanceimg.png"
import { Chip, Typography } from "@mui/material";
import { Col, Label, Row } from "reactstrap";
import avtar from "../assets/puser.jpg";
import { useEffect, useState } from 'react';
const Otheruserprofile = () => {
    const [userDetail, setUserDetail] = useState({});
    const [userCurrency, setUserCurrency] = useState({});
    const [userLocation, setUserLocation] = useState({});
    const [userRate, setUserRate] = useState({});
    const [userSkill, setUserSkill] = useState([]);

    const location = (window.location.pathname).split("/")
    console.log(location[2]);
    const getallUserData = () => {
        fetch(`http://192.168.1.9/itp/api/values/freeUserDetails?User_id=${15}`)

            .then((response) => response.json())
            .then(data => {
                console.log(data)
                 setUserDetail(data.user);
                 setUserCurrency(data.currency)
                 setUserLocation(data.location)
                 setUserRate(data.rate)
                 setUserSkill(data.skill);
                
            });
    }
    useEffect(() => {
        getallUserData()
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
                    <img src={location} />
                    <h3 className='hthree-maindiv-otheruser'>3.5km</h3>
                    <HiOutlineArrowRight className="right-arrow-otheruser" />
                </div>
                 
                </Col>
            </Row>
        </div>
    );
}
export default Otheruserprofile;