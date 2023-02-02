import React, { useEffect, useRef, useState } from 'react';
import { BsFillCameraFill } from 'react-icons/bs';
import TextField from '@mui/material/TextField';
import { Col, Row } from 'reactstrap';
import { Multiselect } from 'multiselect-react-dropdown'
import {  Avatar,   FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import {  InputGroup } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Editprofile = () => {
    const [skills, setSkill] = useState([]);
    const [countries, setCountries] = useState([]);
    const [state, setState] = useState([]);
    const [city, setCity] = useState([]);
    const [currency, setCurrency] = useState([]);
    const [file, setFile] = useState(null);
    const UserToken = window.localStorage.getItem('UserToken');
    const userId = window.localStorage.getItem('UserID');
    const userDetails = JSON.parse(window.sessionStorage.getItem("users"))
    const userGetLocation = userDetails[0].location
    const [userData, setUserData] = useState({
        Id : userId,
        FullName : "",
        Email: ""
    });
    console.log(userData);
    const [locationData, setLocationData] = useState({
        Floor : userGetLocation.Floor,
        userCountry: userGetLocation.Country_id,
        userState: userGetLocation.State_id,
        userCity: userGetLocation.City_id
    });
    const [phoneNumber, setPhoneNumber] = useState("");
    const [Ratedata, setRate] = useState({
        availabelHour: '',
    });
    const [userSkill, setUserSkill] = useState();
    const [durationData, setDurationData] = useState({
        startTime: '',
        endTime: ''
    });    
    const [currencyData, setCurrencyData] = useState({
        userCurrency:'INR'
    });
    const uploadavtarData = (onUploadProgress) => {
        let formData = new FormData();
        formData.append("file", 'pin.png');
        return axios.post("http://192.168.1.9/itp/api/values/UserProfilePicture?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiODlkNmQ0ZmYtYWViZi00OTJmLWEwNWYtZjdjYzg4ZmU1NjVjIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIxIiwiZXhwIjoxNjc0NjQyNDE2LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo0NDM0OSIsImF1ZCI6IlNlY3VyZUFwaVVzZXIifQ.xAvrpxdK4VEDBW1sgCNpwOQ-lOphqTSigyl3IpF-kKk&id=1", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
        });
    }

    const showData = () => {
        fetch(`http://192.168.1.9/itp/api/values/UserDetails?User_id=${userId}&token=${UserToken}`, {
            method: "GET",
        }).then((resp) => {
            // getSkillData()
            const skillarr = new Array
            console.log(skillarr)
            resp.json().then((result) => {
                result.skill.map((e) => {
                    skillarr.push({
                        skillId: e.Skill_Master_id,
                        skill: e.skill
                })
                setUserSkill(skillarr)
                })
                setFile(result.user.ProfilePicture)
                setPhoneNumber(result.user.PhoneNumber)
                setUserData({
                    FullName: result.user.FullName,
                    Email: result.user.Email
                })
                setLocationData({
                    userCountry: result.location.Country_id,
                    userState: result.location.State_id,
                    userCity: result.location.City_id
                })
                setRate({
                    availabelHour: result.rate.Hour
                })
                setCurrencyData({
                    userCurrency: result.currency.Currency
                })
                
                const usersdetails = new Array
                usersdetails.push(result)
                sessionStorage.setItem("users",JSON.stringify(usersdetails));

                console.log(usersdetails)
                // sessionStorage.setItem("user",JSON.stringify(userdetails));
                
            })
        }

        )
    }
    //*************************************************************+++++++ On Change ++++++********************************************************* */
    const onChange = (e) => {
        const { name, value } = e.target;       
        setUserData(()=>{
            return{
                ...userData,
                [name] : value
            }
        })
    }
    const onChangeLocationData = (e) => {
        const { name, value } = e.target;  
        setLocationData(()=>{
            return{
                ...locationData,
                [name] : value
            }
        })
    }
    const onChangeRateData = (e) => {
        const { name, value } = e.target;  
        setRate(()=>{
            return{
                ...Ratedata,
                [name] : value
            } 
        })
    }
    const onChangeDurationData = (e) => {
        const { name, value } = e.target;  
        setDurationData(()=>{
            return{
                ...durationData,
                [name] : value
            } 
        })
    }
    const onChangeCurrencyData = (e) => {
        const { name, value } = e.target;  
        setCurrencyData(()=>{
            return{
                ...currencyData,
                [name] : value
            } 
        })
    }
        
    
    const handleSkillData = (e) => {
        setUserSkill(e)
    }

    //************************+++++ BIND DATA++++***************************

    useEffect(() => {
        getcountries()
        getSkillData()
        getcurrency()
        uploadavtarData()
        showData();
    }, []);
    
    useEffect(() => {
        getstateData()
        getcityData()
    }, [locationData]);

    const getSkillData = () => {
        fetch(`http://192.168.1.9/itp/api/values/BindSkill`).then(
            (response) =>{
                const option = new Array
             response.json().then(
            (data) => {
                data.map((e)=>{
                    option.push({
                        skillId : e.Skill_Master_id,
                        skill: e.Skill
                    })
                    setSkill(option)
                })
            })
        }
        )
      }
    const getcountries = () => {
        fetch(`http://192.168.1.9/itp/api/values/BindCountry`)
            .then((response) => response.json())
            .then((data) => {
                setCountries(data)
            });
    }
    const getstateData = () => {
        fetch(`http://192.168.1.9/itp/api/values/BindState?Country_id=${locationData.userCountry}`)
            .then((response) => response.json())
            .then(data => {
                setState(data);
            });
    }
    const getcityData = () => {
        fetch(`http://192.168.1.9/itp/api/values/BindCity?State_id=${locationData.userState}`)
            .then((response) => response.json())
            .then(data => {
                setCity(data);
            });
    }
    const getcurrency = () => {
        fetch(`http://192.168.1.9/itp/api/values/BindCurrency`)
            .then((response) => response.json())
            .then(data => {
                setCurrency(data);
            });
    }

    const inputFile = useRef();
    const onButtonClick = () => {
        inputFile.current.click();
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (userData.FullName.length === 0) {
            toast.error("Enter the valid name", {
                position: "bottom-right"
            });
        } else if (phoneNumber.length !== 10) {
            toast.error("Enter the mobile number", {
                position: "bottom-right"
            });
        } else if (Ratedata.availabelHour.length === 0) {
            toast.error("Enter the Availabel Hour", {
                position: "bottom-right"
            });
        } else if (durationData.startTime.length === 0) {
            toast.error("Select the start time", {
                position: "bottom-right"
            });
        } else if (durationData.endTime.length === 0) {
            toast.error("Select the end time", {
                position: "bottom-right"
            });
        }
    }

    const handleChangeavtar = function loadFile(event) {
        if (event.target.files.length > 0) {
            const file = URL.createObjectURL(event.target.files[0]);
            setFile(file);
            console.log(event.target.files[0].name);
        }
    };

    return (
        <div className='main-editprofile'>
            <div className='other-userprofile'>Edit Profile</div>
            <Avatar id="avatar" className='avtar-editprofile-page' src={file} />
            <div  className='edit-camera-circle'>
                <input type='file' id='file' ref={inputFile} style={{ display: 'none' }} onChange={handleChangeavtar} accept="image/*" />
                <BsFillCameraFill   onClick={onButtonClick} className='edit-camera' />
            </div>
            <Row className="justify-content-md-center ">
                <Col sm={6} className="colSize">
                    <form className='mainform.edit' onSubmit={onSubmitHandler}>
                        <TextField id="outlined-basic" className="textfieldform-edit w-100" name='FullName' label="Full Name :" type="text"
                            value={userData.FullName} onChange={onChange} /><br />
                        <ToastContainer />
                        <TextField id="outlined-basic" className="textfieldform-edit w-100"  label="Mobile Number :" type="text"
                            value={phoneNumber} disabled  /><br />
                        <ToastContainer />
                        <TextField id="outlined-basic" className='w-100 textfieldform-edit' label="Email Address :" name='Email' type="text" value={userData.Email} onChange={onChange} /><br />

                        <TextField id="outlined-basic" className="textfieldform-edit w-100" label="Availabel hour :" type="text" name='availabelHour' value={Ratedata.availabelHour} onChange={onChangeRateData} /><br />
                        <ToastContainer />
                        <Row style={{ marginTop: "10px" }}>
                            <Col sm={6} >
                                <TextField id="outlined-basic"
                                    className='w-100'
                                    label="StartTime :"
                                    name='startTime'
                                    type="time"
                                    value={durationData.startTime || ""} 
                                    onChange={onChangeDurationData}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300,
                                    }}
                                />
                            </Col>
                            <Col sm={6}>
                                <TextField id="outlined-basic"
                                    className='w-100'
                                    label="EndTime :"
                                    name='endTime'
                                    type="time"
                                    value={durationData.endTime} onChange={onChangeDurationData}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300,
                                    }}
                                />
                            </Col>
                        </Row>

                    
                        <FormControl fullWidth className='mainskill-input-edit'>
                            
                            <Multiselect  
                            placeholder="Skill" 
                            selectedValues={userSkill} 
                            options={skills} 
                            onRemove={
                                handleSkillData}
                            onSelect={handleSkillData}
                            displayValue='skill' />
                        </FormControl>

                        <FormControl fullWidth className='mainskill-input-edit' size='small'>
                            <InputLabel id='demo-simple-select-outlined-label'>Country</InputLabel>
                            <Select
                                onChange={onChangeLocationData}
                                name='userCountry'
                                size="small"
                                label='country'
                                id='demo-simple-select-outlined' className='mainskill-inputheight-edit'
                                labelId='demo-simple-select-outlined-label'
                                 value={locationData.userCountry || ""}
                            >
                                {countries.map((cou) => (
                                    <MenuItem value={cou.Country_id}>{cou.Country}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth className='mainskill-input-edit'>
                            <InputLabel id='demo-simple-select-outlined-label'>State</InputLabel>
                            <Select
                                onChange={onChangeLocationData}
                                name='userState'
                                label='State'
                                id='demo-simple-select-outlined' className='mainskill-inputheight-edit'
                                labelId='demo-simple-select-outlined-label' 
                                value={locationData.userState || ""}
                            >
                                {state && state.map((v) => (
                                    <MenuItem value={v.State_Id}>{v.State}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth className='mainskill-input-edit'>
                            <InputLabel id='demo-simple-select-outlined-label'>City</InputLabel>
                            <Select
                                onChange={onChangeLocationData}
                                name='userCity'
                                label='City'
                                id='demo-simple-select-outlined' className='mainskill-inputheight-edit'
                                labelId='demo-simple-select-outlined-label'
                                value={locationData.userCity || ""}
                            >
                                {city && city.map((ct) => (
                                    <MenuItem value={ct.City_id}>{ct.City}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth className='mainskill-input-edit'>
                            <InputGroup size='small'>
                                <Select size='small' onChange={onChangeCurrencyData} displayEmpty inputProps={{ 'aria-label': 'Without label' }} name="userCurrency"
                                    value={currencyData.userCurrency || ""}>
                                    {currency.map(
                                        (c) => (
                                            <MenuItem value={c.Currency_name}>{c.Currency_name}</MenuItem>
                                        ))}
                                </Select>
                                {/* <Form.Control aria-label="Text input with 2 dropdown buttons" /> */}
                                {/* <Form.Control aria-label="Text input with 2 dropdown buttons" /> */}
                            </InputGroup>
                        </FormControl>
                        <button className='submit-btn-edit' type="submit" value="Submit" onClick={uploadavtarData}>Submit</button>

                    </form>
                </Col>
            </Row>
        </div>
    );
}

export default Editprofile;