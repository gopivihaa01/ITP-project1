import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BsFillCameraFill } from 'react-icons/bs';
import TextField from '@mui/material/TextField';
import { Col, Row } from 'reactstrap';
import { Multiselect } from 'multiselect-react-dropdown'
import { Avatar, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Form, InputGroup } from 'react-bootstrap';
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
    const userGetCurrency = userDetails[0].currency
    console.log(file)
    const [userData, setUserData] = useState({
        Id: "",
        FullName: "",
        Email: ""
    });
    console.log(userData)
    const [locationData, setLocationData] = useState({
        Country_id: userGetLocation.Country_id,
        State_id: userGetLocation.State_id,
        City_id: ""
    });
    const [phoneNumber, setPhoneNumber] = useState("");
    const [rateData, setRate] = useState({
        Hour: '',
        Rate: ''
    });
    // console.log(rateData)

    const [skillData, setSkillData] = useState();

    const [durationData, setDurationData] = useState({
        Start_hour: '',
        End_hour: ''
    });
    const [currencyData, setCurrencyData] = useState({
        Currency_Master_Id: ""
    });
    // console.log(currencyData)
    // console.log(currencyData);

    const [putData, setPutData] = useState({
        model: {
            UserData: userData,
            Locationdata: locationData,
            Ratedata: rateData,
            skilldata: skillData,
            DurationData: durationData,
            CurrencyData: currencyData

        }
    });
    // console.log(putData);
    const uploadavtarData = () => {
        let formData = new FormData();
        console.log(file)
        formData.append("file", file);
        console.log(formData)
        const url = `http://192.168.1.9/itp/api/values/UserProfilePicture?token=${UserToken}&id=${userId}`
        console.log(url);
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type':'multipart/form-data; boundary=<calculated when request is sent>','Accept':'*/*'},
            body: {
                ProfilePicture: file
            }
        }).then((response) =>
            response.Json()
        ).then((data)=>{
            // setFile(data)
            console.log(data)
        })
    }

    const showData = () => {
        fetch(`http://192.168.1.9/itp/api/values/UserDetails?User_id=${userId}&token=${UserToken}`, {
            method: "GET",
        }).then((resp) => {
            // getSkillData()
            const skillarr = new Array
            // console.log(skillarr)
            resp.json().then((result) => {
                result.skill.map((e) => {
                    skillarr.push({
                        Skill_Master_id: e.Skill_Master_id,
                        skill: e.skill
                    })
                    setSkillData(skillarr)
                })
                setFile(result.user.ProfilePicture)
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
                    Latitude: result.location.Latitude,
                    Longitude: result.location.Longitude,
                    Country_id: result.location.Country_id,
                    State_id: result.location.State_id,
                    City_id: result.location.City_id,
                    PostalCode: result.location.PostalCode
                })
                setRate({
                    Hour: result.rate.Hour,
                    Rate: result.rate.Rate

                })
                setCurrencyData({
                    Currency_Master_Id: result.currency.Currency_name
                })

                const usersdetails = new Array
                usersdetails.push(result)
                sessionStorage.setItem("users", JSON.stringify(usersdetails));
                // console.log(usersdetails)
                // sessionStorage.setItem("user",JSON.stringify(userdetails));

            })
        }

        )
    }
    //*************************************************************+++++++ On Change ++++++********************************************************* */
    const onChange =
        (e) => {
            const { name, value } = e.target;
            setUserData(() => {
                return {
                    ...userData,
                    [name]: value
                }
            })
        }
    const onChangeLocationData = (e) => {
        const { name, value } = e.target;
        setLocationData(() => {
            return {
                ...locationData,
                [name]: value
            }
        })
    }
    const onChangeRateData = (e) => {
        const { name, value } = e.target;
        setRate(() => {
            return {
                ...rateData,
                [name]: value
            }
        })
    }
    const onChangeDurationData = (e) => {
        const { name, value } = e.target;
        setDurationData((prevstate) => {
            return {
                ...prevstate,
                [name]: value
            }
        })
    }
    const onChangeCurrencyData = (e) => {
        const { name, value } = e.target;
        setCurrencyData(() => {
            return {
                ...currencyData,
                [name]: value
            }
        })
    }




    const handleSkillData = (e) => {
        setSkillData(e)
    }

    //************************+++++ BIND DATA++++***************************

    useEffect(() => {
        getcountries()
        getcurrency()
        getSkillData()
        uploadavtarData()
        showData();
    }, [userId]);

    useEffect(() => {
        getstateData()
        getcityData()
    }, [locationData]);

    const getSkillData = () => {
        fetch(`http://192.168.1.9/itp/api/values/BindSkill`).then(
            (response) => {
                const option = new Array
                response.json().then(
                    (data) => {
                        data.map((e) => {
                            option.push({
                                Skill_Master_id: e.Skill_Master_id,
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
        fetch(`http://192.168.1.9/itp/api/values/BindState?Country_id=${locationData.Country_id}`)
            .then((response) => response.json())
            .then(data => {
                setState(data);
            });
    }
    const getcityData = () => {
        fetch(`http://192.168.1.9/itp/api/values/BindCity?State_id=${locationData.State_id}`)
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
        } else if (rateData.Hour.length === 0) {
            toast.error("Enter the Availabel Hour", {
                position: "bottom-right"
            });
        } else if (durationData.Start_hour.length === 0) {
            toast.error("Select the start time", {
                position: "bottom-right"
            });
        } else if (durationData.End_hour.length === 0) {
            toast.error("Select the end time", {
                position: "bottom-right"
            });
        }
    }

    const handleChangeavtar = function loadFile(event) {
        if (event.target.files.length > 0) {
            const file = URL.createObjectURL(event.target.files[0]);
            setFile(file);
        }
    };

    return (
        <div className='main-editprofile'>
            <div className='other-userprofile'>Edit Profile</div>
            <Avatar id="avatar" className='avtar-editprofile-page' src={file} />
            <div className='edit-camera-circle'>
                <input type='file' id='file' ref={inputFile} style={{ display: 'none' }} onChange={handleChangeavtar} accept="image/*" />
                <BsFillCameraFill onClick={onButtonClick} className='edit-camera' />
            </div>
            <Row className="justify-content-md-center ">
                <Col sm={6} className="colSize">
                    <form className='mainform.edit' onSubmit={onSubmitHandler}>
                        <TextField id="outlined-basic" className="textfieldform-edit w-100" name='FullName' label="Full Name :" type="text"
                            value={userData.FullName} onChange={onChange} /><br />
                        <ToastContainer />
                        <TextField id="outlined-basic" className="textfieldform-edit w-100" label="Mobile Number :" type="text"
                            value={phoneNumber} disabled /><br />
                        <ToastContainer />
                        <TextField id="outlined-basic" className='w-100 textfieldform-edit' label="Email Address :" name='Email' type="text" value={userData.Email} onChange={onChange} /><br />

                        <TextField id="outlined-basic" onChange={onChangeRateData} name='Hour' value={rateData.Hour} className="textfieldform-edit w-100" label="Availabel hour :" type="text" /><br />
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
                                displayValue='skill' />
                        </FormControl>

                        <FormControl fullWidth className='mainskill-input-edit' size='small'>
                            <InputLabel id='demo-simple-select-outlined-label'>Country</InputLabel>
                            <Select
                                onChange={onChangeLocationData}
                                name='Country_id'
                                size="small"
                                label='country'
                                id='demo-simple-select-outlined' className='mainskill-inputheight-edit'
                                labelId='demo-simple-select-outlined-label'
                                value={locationData.Country_id || ""}
                            >
                                {countries.map((cou) => (
                                    <MenuItem key={cou.Country_id} value={cou.Country_id}>{cou.Country}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth className='mainskill-input-edit'>
                            <InputLabel id='demo-simple-select-outlined-label'>State</InputLabel>
                            <Select
                                onChange={onChangeLocationData}
                                name='State_id'
                                label='State'
                                id='demo-simple-select-outlined' className='mainskill-inputheight-edit'
                                labelId='demo-simple-select-outlined-label'
                                value={locationData.State_id || ""}
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
                                value={locationData.City_id || ""}
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
                                    onChange={onChangeCurrencyData}
                                    className='mainskill-inputheight-edit  currency'
                                    labelId='demo-simple-select-outlined-label'
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    name="Currency_Master_Id"
                                    value={currencyData.Currency_Master_Id || ""}>
                                    {currency.map(
                                        (c) => (
                                            <MenuItem key={c.Currency_Master_Id} value={c.Currency_Master_Id}>{c.Currency_name}</MenuItem>
                                        ))}
                                </Select>
                                <Form.Control onChange={onChangeRateData} value={rateData.Rate} name="Rate" aria-label="Text input with 2 dropdown buttons" />
                                {/* <Form.Control     aria-label="Text input with 2 dropdown buttons" /> */}
                            </InputGroup>
                        </FormControl>
                        <button className='submit-btn-edit' type="submit" onClick={uploadavtarData()} value="Submit">Submit</button>

                    </form>
                </Col>
            </Row>
        </div>
    );
}

export default Editprofile;