import React, { useCallback, useEffect,useRef, useState } from 'react';
import { BsFillCameraFill } from 'react-icons/bs';
import TextField from '@mui/material/TextField';
import { Col, Row } from 'reactstrap';
import { Multiselect } from 'multiselect-react-dropdown'
import { Avatar, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Form, InputGroup } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import Geocode from "react-geocode";
import 'react-toastify/dist/ReactToastify.css';

// import axios from 'axios';
// import { json } from 'react-router-dom';

const Editprofile = () => {
    const [skills, setSkill] = useState([]);
    const [otherskill, setOtherSkill] = useState([]);
    const [countries, setCountries] = useState([]);
    const [countryid, setCountryid] = useState(0);
    const [state, setState] = useState([]);
    const [stateid, setStateid] = useState (0);
    const [city, setCity] = useState([]);
    const [currency, setCurrency] = useState([]);
    const [profileimage , setProfileImage] = useState({});
    const UserToken = window.localStorage.getItem('UserToken');
    const userId = window.localStorage.getItem('UserID');
    const userDetails = JSON.parse(window.sessionStorage.getItem("users"))
    const userGetLocation = userDetails[0].location
    const userGetCurrency = userDetails[0].currency

    const [userData, setUserData] = useState({
        Id: "",
        FullName: "",
        Email: "",
    //     ProfilePicture:"",
    // });
    // const [fileData, setFileData] = useState({
    //     ProfilePicture:"",
    });
    
    const [locationData, setLocationData] = useState({
        Floor: "",
        House_no: "",
        Society_Name: "",
        Country:"",
        // State_id:"",
        // City_id: "",
        // Country_id: userGetLocation.Country_id,
        // State_id: userGetLocation.State_id,
        // Latitude :"",
        // Longitude :"",
        // City_id: "",
        PostalCode: ""
    });
    console.log(locationData)
    console.log(locationData.Country)
    // console.log(locationData.Latitude,locationData.Longitude)
    const [phoneNumber, setPhoneNumber] = useState("");
    const [rateData, setRate] = useState({
        Hour: '',
        Rate: ''
    });
    // console.log(rateData)

    const [skillData, setSkillData] = useState('');
    const [otherskilldata, setOtherSkillData] = useState('');
    const [durationData, setDurationData] = useState({
        Start_hour: '',
        End_hour: ''
    });

    // const [currencyData, setCurrencyData] = useState({
    //     Currency_Master_Id: ""
    // });
    // console.log(currencyData)
    // console.log(currencyData);

    // const [putData, setPutData] = useState({
    //     model: {
    //         UserData: userData,
    //         Locationdata: locationData,
    //         Ratedata: rateData,
    //         skilldata: skillData,
    //         oskilldata:otherskilldata,
    //         DurationData: durationData,
    //         CurrencyData: currencyData

    //     }
    // });
    Geocode.setApiKey("AIzaSyCsZumKPEHgGE2OXvpFpmPrTAwCYR4gJfM")
    const getUserCoordinates = () => {
        Geocode.fromAddress(`${locationData.Society_Name},${locationData.PostalCode}`).then(
            (response) => {
                console.log(response)
                const {lat , lng} = response.results[0].geometry.location;
                setLocationData({
                    Latitude:lat ,
                    Longitude:lng ,
                }).then((response) =>{
                    response.json().then((result)=>{
                        console.log(result)
                    })
                })
            }

        );
        // navigator.geolocation.getCurrentPosition((position) => {
        //     console.log("Latitude is :", position.coords.latitude);
        //     console.log("Longitude is :", position.coords.longitude);
        // setLocationData({
        //     Latitude : position.coords.latitude ,
        //     Longitude : position.coords.longitude

        // })
        //   });
    }



    const updateData = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("file", profileimage);
        fetch(`http://192.168.1.17/itp/api/values/UserProfilePicture?token=${UserToken}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ProfilePicture: profileimage
            })
        }).then((resp) => {
            resp.json().then((resp) => {
                console.log("resp", resp)
            })
        })
        // const url = `http://192.168.1.17/itp/api/values/UserProfilePicture?token=${UserToken}&id=${userId}`
        // fetch(url, {
        //     method: 'POST',
        //     headers: { 
        //         'Content-Type': 'application/json' ,
        //         'accept': 'application/json',
        //     },
        //     body: JSON.stringify({ ProfilePicture: profileimage })

        // }).then((response) => {
        //     response.json()
        // }).then((result) => {
        //     console.log(result)
        // })
        const putUrl = `http://192.168.1.17/itp/api/values/AddEditUserDetails?token=${UserToken}`
        fetch(putUrl, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: {
                    UserData: userData,
                    Locationdata: locationData,
                    // Ratedata: rateData,
                    skilldata: skillData,
                    otherskill: otherskilldata,
                    DurationData: durationData,
                    // CurrencyData: currencyData
                }
            })
        })
    }

    const showData = () => {
        fetch(`http://192.168.1.17/itp/api/values/UserDetails?User_id=${userId}&token=${UserToken}`, {
            method: "GET",
        }).then((resp) => {
            // getSkillData()
            const skillarr = new Array
            const otherskillarr = new Array
            console.log(otherskillarr)
            resp.json().then((result) => {
                result.skill.map((e) => {
                    skillarr.push({
                        Skill_Master_id: e.Skill_Master_id,
                        skill: e.skill
                    })
                    setSkillData(skillarr)
                })
                result.skill.map((e) => {
                    otherskillarr.push({
                        Skill_Master_id: e.Skill_Master_id,
                        skill: e.skill
                    })
                    setOtherSkillData(otherskillarr)
                })
                setProfileImage(result.user.ProfilePicture)
                console.log(result.user.ProfilePicture)
                setPhoneNumber(result.user.PhoneNumber)
                setUserData({
                    Id: result.user.Id,
                    FullName: result.user.FullName,
                    Email: result.user.Email
                })
                setLocationData({
                    Floor: result.location.Floor,
                    House_no: result.location.House_no,
                    Society_Name: result.location.Society_Name,
                    Latitude:result.location.Latitude,
                    Longitude: result.location.Longitude,
                    Country: result.location.Country,
                    
                    State_id: result.location.State_id,
                    City_id: result.location.City_id,
                    PostalCode: result.location.PostalCode
                })
                console.log(result.location.Country);
                setRate({
                    Hour: result.rate.Hour,
                    Rate: result.rate.Rate

                })
                // setCurrencyData({
                //     Currency_Master_Id: result.currency.Currency_name
                // })
            })
        })
    }
    //*************************************************************+++++++ On Change ++++++********************************************************* */
    const onChangeUserData = useCallback((e) => {
        const { name, value } = e.target;
        setUserData(() => {
            return {
                ...userData,
                [name]: value
            }
        })
    }, [userData])
    
    const onChangeLocationData = useCallback((e) => {
        const { name, value } = e.target;
        setLocationData(() => {
            return {
                ...locationData,
                [name]: value
            }
        })
    //    setCountryid(value)
    }, [locationData])
// console.log(`aaaaaaaaaa: ${countryid}`)
    const onChangeRateData = useCallback((e) => {
        const { name, value } = e.target;
        setRate(() => {
            return {
                ...rateData,
                [name]: value
            }
        })
    }, [rateData])

    const onChangeDurationData = useCallback((e) => {
        const { name, value } = e.target;
        setDurationData(() => {
            return {
                ...durationData,
                [name]: value
            }
        })
    }, [durationData])

    const onChangeCountryData = (event) => {
        const getCountryid = event.target.value;
        setCountryid (getCountryid)
    }
    // const onChangeCurrencyData = useCallback((e) => {
    //     const { name, value } = e.target;
    //     setCurrencyData(() => {
    //         return {
    //             ...currencyData,
    //             [name]: value
    //         }
    //     })
    // }, [currencyData])
    const handleSkillData = useCallback((e) => {
        setSkillData(e)
    }, [skillData])
    const handleOtherSkillData = useCallback((e) => {
        setOtherSkillData(e)
    },[otherskill])
    //************************+++++ BIND DATA++++***************************

    useEffect(() => {
        getcountries()
        // getcurrency()
        getSkillData()
        getOtherSkillData()
        // updateData()
        showData();
    }, [userId]);

useEffect(()=>{
    getUserCoordinates()

},[locationData.PostalCode])
    // useEffect(() => {
    //     getStateData()
    //     getcityData()

    // }, [locationData]);

    const getSkillData = () => {
        fetch(`http://192.168.1.17/itp/api/values/BindSkill`).then(
            (response) => {
                const option = new Array
                response.json().then(
                    (data) => {
                        data && data.map((e) => {
                            option.push({
                                Skill_Master_id: e.Skill_Master_id,
                                skill: e.Skill
                            })
                            setSkill(option)
                        })
                    }
                )
            }
        )
    }
    const getOtherSkillData = () => {
        fetch(`http://192.168.1.17/itp/api/values/BindSkill`).then(
            (response) => {
                const option = new Array
                response.json().then(
                    (data) => {
                        data && data.map((e) => {
                            option.push({
                                Skill_Master_id: e.Skill_Master_id,
                                skill: e.Skill
                            })
                            setOtherSkill(option)
                        })
                    }
                )
            }
        )
    }
    const getuserprofile = () =>{
        const imageurl = `http://192.168.1.17/itp/Files/Images/avatar.png`
        fetch(imageurl, {
            method:"GET",

        }).then((response) => {
            response.json()
        }).then((result) => {
            console.log(result)
        })
        // fetch(`http://192.168.1.17/itp/Files/Images/avatar.png`)
        // .then((response) => response.json())
        // .then((data) => {
        //     setProfileImage(data)
        //     console.log(data)
        // }); 
    }
    useEffect(() => {
        getuserprofile()
    }, []);

    const getcountries = () => {
        fetch(`http://192.168.1.17/itp/api/values/BindCountry`)
            .then((response) => response.json())
            .then((data) => {
                setCountries(data)
            });
    }
    const getStateData = () =>{
        fetch (`http://192.168.1.17/itp/api/values/BindState?Country_id=${countryid}`)
        .then((response)=> response.json())
        .then(data => {
            setState(data);
        });
    }
    console.log("Country_Id",countryid)
    useEffect(() =>{
        getStateData()
    },[countryid]);
    const getcityData = () =>{
        fetch(`http://192.168.1.17/itp/api/values/BindCity?State_id=${stateid}`)
        .then((response) => response.json())
        .then(data =>{
            setCity(data);
        });
    }
    console.log("State_Id",stateid)
    useEffect(() =>{
        getcityData()
    },[stateid]);
    // const getstateData = useCallback(() => {
    //     fetch(`http://192.168.1.17/itp/api/values/BindState?Country_id=${countryid}`)

    //         .then((response) => response.json())
    //         .then(data => {
    //             setState(data);
    //         });
    // },[countryid])
    // console.log(locationData.Country_id)
    // const getcityData = useCallback(() => {
    //     fetch(`http://192.168.1.17/itp/api/values/BindCity?State_id=${locationData.State_id}`)   

    //         .then((response) => response.json())
    //         .then(data => {
    //             setCity(data);
    //         });
    // },locationData.State_id)
    
    // const getcurrency = () => {
    //     fetch(`http://192.168.1.17/itp/api/values/BindCurrency`)
    //         .then((response) => response.json())
    //         .then(data => {
    //             setCurrency(data);
    //         });
    // }

    // const inputFile = useRef();
    // const onButtonClick = () => {
    //     inputFile.current.click();
    // };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        // if (userData.FullName.length === 0) {
        //     toast.error("Enter the valid name", {
        //         position: "bottom-right"
        //     });
        // } else if (phoneNumber.length !== 10) {
        //     toast.error("Enter the mobile number", {
        //         position: "bottom-right"
        //     });
        // } else if (rateData.Hour.length === 0) {
        //     toast.error("Enter the Availabel Hour", {
        //         position: "bottom-right"
        //     });
        // } else if (durationData.Start_hour.length === 0) {
        //     toast.error("Select the start time", {
        //         position: "bottom-right"
        //     });
        // } else if (durationData.End_hour.length === 0) {
        //     toast.error("Select the end time", {
        //         position: "bottom-right"
        //     });
        // }
    }
    const handleChangeavtar = function loadFile(event) {
        if (event.target.files.length > 0) {
            const file = URL.createObjectURL(event.target.files[0]);
            setProfileImage(file);
        }
    };

    return (
        <div className='main-editprofile'>
            <div className='other-userprofile'>Edit Profile</div>
            <Avatar id="avatar" className='avtar-editprofile-page' src={profileimage} />
            <div className='edit-camera-circle'>
                <input type='file' id='file' 
                // ref={inputFile} 
                style={{ display: 'none' }} onChange={handleChangeavtar} accept="*/*" />
                <BsFillCameraFill 
                // onClick={onButtonClick} 
                className='edit-camera' />
            </div>
            <Row className="justify-content-md-center ">
                <Col sm={6} className="colSize">
                    <form className='mainform.edit' onSubmit={(e) => e.preventDefault()} >
                        <TextField id="outlined-basic" className="textfieldform-edit w-100" name='FullName' label="Full Name :" type="text"
                            value={userData.FullName} onChange={onChangeUserData} 
                            />
                            <br />
                        <ToastContainer />
                        <TextField id="outlined-basic" className="textfieldform-edit w-100" label="Mobile Number :" type="text"
                            value={phoneNumber} 
                            disabled /><br />
                        <ToastContainer />
                        <TextField id="outlined-basic" className='w-100 textfieldform-edit' label="Email Address :" name='Email' type="text" 
                        value={userData.Email} onChange={onChangeUserData} 
                        /><br />

                        <TextField id="outlined-basic" name='Hour'
                         onChange={onChangeRateData}  value={rateData.Hour} 
                         className="textfieldform-edit w-100" label="Availabel hour :" type="text" /><br />
                        <ToastContainer />
                        <Row style={{ marginTop: "10px" }}>
                            <Col sm={6} >
                                <TextField id="outlined-basic"
                                    className='w-100'
                                    label="StartTime :"
                                    name='Start_hour'
                                    type="time"
                                    value={durationData.Start_hour || ""}
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
                                    name='End_hour'
                                    type="time"
                                    value={durationData.End_hour} onChange={onChangeDurationData}
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
                                selectedValues={skillData}
                                options={skills}
                                onRemove={
                                    handleSkillData}
                                onSelect={handleSkillData}
                                displayValue='skill' 
                            />
                        </FormControl>
                        <FormControl fullWidth className='mainskill-input-edit'>
                            <Multiselect
                                placeholder="OtherSkill"
                                selectedValues={otherskilldata}
                                options={otherskill}
                                onRemove={handleOtherSkillData}
                                onSelect={handleOtherSkillData}
                                displayValue='skill' 
                            />
                        </FormControl>
                        <FormControl fullWidth className='mainskill-input-edit'>
                            <InputGroup size='large' >
                                <TextField id="outlined-basic" className='mainskill-inputheight-edit Floor-edit'
                                    value={locationData.Floor || ""} 
                                    name='Floor' label="Floor" 
                                    onChange={onChangeLocationData} 
                                    type="number" />
                                <TextField id="outlined-basic" className='mainskill-inputheight-edit houseno-edit' name='House_no'
                                    value={locationData.House_no || ""}  onChange={onChangeLocationData} 
                                    label="HouseNo" type="text" />
                            </InputGroup>
                        </FormControl>

                        <FormControl fullWidth className='mainskill-input-edit'>
                            <InputGroup size='large' >
                                <TextField id="outlined-basic" className='mainskill-inputheight-edit societyname-edit' name='Society_Name'
                                value={locationData.Society_Name || ""}  onChange={onChangeLocationData} 
                                 label="Society Name" type="textarea" />
                                <TextField id="outlined-basic" className='mainskill-inputheight-edit postalcode-edit'
                                    onChange={onChangeLocationData} value={locationData.PostalCode} 
                                    label="PostalCode" name="PostalCode" type="number" />
                            </InputGroup>
                        </FormControl>

                        <FormControl fullWidth className='mainskill-input-edit' size='small'>
                            <InputLabel id='demo-simple-select-outlined-label'>Country</InputLabel>
                            <Select
                                onChange={e => setCountryid(e.target.value)}
                                name='Country'
                                size="small"
                                label='country'
                                id='demo-simple-select-outlined' className='mainskill-inputheight-edit'
                                labelId='demo-simple-select-outlined-label'
                                value={locationData.Country || ""}
                            >
                                {countries && countries.map((cou) => (
                                    <MenuItem key={cou.Country_id} value={cou.Country_id}>{cou.Country}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth className='mainskill-input-edit'>
                            <InputLabel id='demo-simple-select-outlined-label'>State</InputLabel>
                            <Select
                                // onChange={onChangeLocationData}
                                onChange={e => setStateid(e.target.value)}
                                name='State_id'
                                label='State'
                                id='demo-simple-select-outlined' className='mainskill-inputheight-edit'
                                labelId='demo-simple-select-outlined-label'
                                // value={locationData.State_id || ""}
                            >
                                {state && state.map((v) => (
                                    <MenuItem key={v.State_Id} value={v.State_Id}>{v.State}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth className='mainskill-input-edit'>
                            <InputLabel id='demo-simple-select-outlined-label'>City</InputLabel>
                            <Select
                                onChange={onChangeLocationData}
                                name='City_id'
                                label='City'
                                id='demo-simple-select-outlined' className='mainskill-inputheight-edit'
                                labelId='demo-simple-select-outlined-label'
                                // value={locationData.City_id || ""}
                            >
                                {city && city.map((ct) => (
                                    <MenuItem key={ct.City_id} value={ct.City_id}>{ct.City}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth className='mainskill-input-edit'>
                            <InputLabel id='demo-simple-select-outlined-label'>Currency</InputLabel>
                            <InputGroup size='large'>
                                <Select
                                    label='Currency'
                                    size='small'
                                    // onChange={onChangeCurrencyData}
                                    className='mainskill-inputheight-edit  currency'
                                    labelId='demo-simple-select-outlined-label'
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    name="Currency_Master_Id"
                                    // value={currencyData.Currency_Master_Id || ""}
                                    >
                                    {currency && currency.map(
                                        (c) => (
                                            <MenuItem key={c.Currency_Master_Id} value={c.Currency_Master_Id}>{c.Currency_name}</MenuItem>
                                        ))}
                                </Select>
                                <Form.Control 
                                // onChange={onChangeRateData} value={rateData.Rate} 
                                name="Rate" aria-label="Text input with 2 dropdown buttons" />
                                {/* <Form.Control     aria-label="Text input with 2 dropdown buttons" /> */}
                            </InputGroup>
                        </FormControl>
                        <button className='submit-btn-edit' type="submit" 
                        // onClick={} 
                        value="Submit">Submit</button>

                    </form>
                </Col>
            </Row>
        </div>
    );
}

export default Editprofile;