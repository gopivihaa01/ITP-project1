// import { Chip, Typography } from '@mui/material';
// import React, { useEffect } from 'react';
// import { useState } from 'react';
// import { Async } from 'react-async-await';
import {HiOutlineArrowRight}from 'react-icons/hi';
// import {Col,Label, Row } from 'reactstrap';
import location from "../assets/distanceimg.png"

import { Chip, Typography } from "@mui/material";
import { Col, Label, Row } from "reactstrap";
import { useEffect, useState } from 'react';

// const Otheruserprofile = () => {

//     const [userdetail, setUserDetail] = useState ();
//     const UserToken = localStorage.getItem('UserToken');
//     const userId = localStorage.getItem('UserID');
//     console.log(userdetail.location);
//     console.log(userdetail.user.FullName);

//         const getskillData = () =>{
//         fetch("http://192.168.1.9/itp/api/values/UserDetails?User_id=1&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiOTA5M2QxZGItNDI5ZS00OGI4LWE4MjUtNTY3YzQ0ZGQzZjRkIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIxIiwiZXhwIjoxNjc0NjQ1MDQ5LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo0NDM0OSIsImF1ZCI6IlNlY3VyZUFwaVVzZXIifQ.kyzBnWHxQWilcwDtVjRyVRUfC4nCmhQVjmFysmNgYz8")
//         // fetch(`http://192.168.1.9/itp/api/values/UserDetails?User_id=${userId}&token=${UserToken}`)
//           .then((response) => response.json())
//           .then(data => {
//             setUserDetail(data);
//             console.log(data)
//           });
//     }
//     useEffect(() => {
//         getskillData()
//     }, []);

//     return(
//             <div>
//                 <div className='other-userprofile'></div>
//                 <img className='otheruser-avtar' src='image/puser.jpg' />
//                 <h5 className="hfive-bio-otheruser">
//                     {userdetail.user.FullName}
//                 </h5>
//                 <Typography className="pbio-otheruser">
//                     {/* {userdetail.currency.Currency}/ */}
//                    {/* {userdetail.rate.Rate}/{userdetail.rate.Hour}hr */}
//                 </Typography>
//                 <Row>
//                     <Col sm={{ offset: 1, order: 2, size: 5 }}>
//                         <Label className='mainskill-header-otheruser'>Main Skill</Label><br />
//                         <Chip label="C#" className='mainskill-fst-otheruser'/>
//                         <Chip label=".Net" className='mainskill-sec-otheruser'/><br /><br />
//                         <Label className='mainskill-header-otheruser'>Other Skill</Label><br />
//                         <Chip label="Jquery" className='otherskill-fst-otheruser'/>
//                         <Chip label="React" className='otherskill-sec-otheruser'/>
//                         <Chip label="Java" className='otherskill-sec-otheruser'/><br/><br />
//                         <Label className='mainskill-header-otheruser'>Address*</Label><br />
//                         <Label className='content-otheruser'>
//                             {/* {userdetail.location.Society_Name} */}
//                             Ganesh glory-11, Ahmedabad, Gujarat
//                         </Label><br /><br />
//                         <Label className='mainskill-header-otheruser'>Email Address*</Label><br />
//                         <Label  className='content-otheruser'>grishmapatel@gmail.com</Label><br />
//                         <div className="maindiv-otheruser">
//                             <img src={location}/>
//                             <h3 className='hthree-maindiv-otheruser'>3.5km</h3>
//                             <HiOutlineArrowRight className="right-arrow-otheruser" />
//                         </div>
//                     </Col>
//                 </Row>
//             </div>

//     );
// }
// export default Otheruserprofile;

const Otheruserprofile = () => {
    const [userDetail, setUserDetail] = useState();
    const [userCurrency, setUserCurrency] = useState(0);
    const [userLocation, setUserLocation] = useState(0);
    const [userRate, setUserRate] = useState(0);
    const [userSkill, setUserSkill] = useState([]);
    const getskillData = () => {
        fetch("http://192.168.1.9/itp/api/values/UserDetails?User_id=1&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiZmY0YThkN2ItMjliYi00MDcyLWEzMTYtMWJiM2JmYWYxZWYzIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIxIiwiZXhwIjoxNjc0NzM0ODM4LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo0NDM0OSIsImF1ZCI6IlNlY3VyZUFwaVVzZXIifQ.hkjsNMxY1XXv3DHxxvcWmGLe0Wj3zcsNyTQDG0V7Rvg")

            .then((response) => response.json())
            .then(data => {
                setUserDetail(data.user);
                setUserCurrency(data.currency)
                setUserLocation(data.location)
                setUserRate(data.rate)
                setUserSkill(data.skill);
                
            });
    }
    useEffect(() => {
        getskillData()
    }, []);
    return(
        <div>
            <div className='other-userprofile'></div>
            <img className='otheruser-avtar' src='image/puser.jpg' />
            <h5 className="hfive-bio-otheruser">
                {userDetail.FullName}
            </h5>
            <Typography className="pbio-otheruser">
                {userCurrency.Currency} / {userRate.Rate} / {userRate.Hour} hr
                </Typography>
            <Row>
                <Col sm={{ offset: 1, order: 2, size: 5 }}>
                <Label className='mainskill-header-otheruser'>Main Skill</Label><br />
                <Chip label="C#" className='mainskill-fst-otheruser'/>
                <Chip label=".Net" className='mainskill-sec-otheruser'/><br /><br />
                <Label className='mainskill-header-otheruser'>Other Skill</Label><br />
                <Chip label="Jquery" className='otherskill-fst-otheruser'/>
                <Chip label="React" className='otherskill-sec-otheruser'/>
                <Chip label="Java" className='otherskill-sec-otheruser'/><br/><br />
                <Label className='mainskill-header-otheruser'>Address*</Label><br />
                <Label className='content-otheruser'>{userLocation.House_no}, {userLocation.Society_Name}, {userLocation.PostalCode}, {userLocation.City}, {userLocation.State}, {userLocation.Country}</Label><br />
                <Label className='mainskill-header-otheruser'>Email Address*</Label><br />
                <Label  className='content-otheruser'>{userDetail.Email}</Label><br />
                <div className="maindiv-otheruser">
                    <img src={location}/>
                    <h3 className='hthree-maindiv-otheruser'>3.5km</h3>
                    <HiOutlineArrowRight className="right-arrow-otheruser" />
                </div>
                </Col>
            </Row>
        </div>
    );
}
export default Otheruserprofile;