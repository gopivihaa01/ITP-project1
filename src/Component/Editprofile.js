import React, { useEffect, useRef, useState } from 'react';
import { BsFillCameraFill } from 'react-icons/bs';
import TextField from '@mui/material/TextField';
import { Col, Row } from 'reactstrap';
import { Multiselect } from 'multiselect-react-dropdown'
import { Autocomplete, Avatar, Box, Chip, FormControl, InputLabel, MenuItem, Select, OutlinedInput } from '@mui/material';
// import { AutoComplete } from '@mui/material/Autocomplete';
// import { top100Films } from 'src/@fake-db/autocomplete'
import { Form, InputGroup } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Editprofile = () => {
    const [editField, setEditField] = useState({
        fullName: "",
        phone: '',
        email: '',
        availabelHour: '',
        startTime: '',
        endTime: '',
        userCountry: '',
        userState: '',
        userCity: ''
    });
    console.log(editField);
    const [userSkill, setUserSkill] = useState();
    console.log(userSkill)
    const option = []
    const [skill, setSkill] = useState(option);
    console.log(option)
    const [countries, setCountries] = useState([]);
    const [state, setState] = useState([]);
    const [city, setCity] = useState([]);
    const [currency, setCurrency] = useState([]);
    const [file, setFile] = useState(null);
    const UserToken = window.localStorage.getItem('UserToken');
    const userId = window.localStorage.getItem('UserID');

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
                setEditField({
                    fullName: result.user.FullName,
                    phone: result.user.PhoneNumber,
                    email: result.user.Email,
                    availabelHour: result.rate.Hour,
                    userCountry: result.location.Country,
                    userState: result.location.State,
                    userCity: result.location.City,
                    userCurrency: result.currency.Currency
                })

            })
        }

        )
    }
    //*************************************************************+++++++ On Change ++++++********************************************************* */
    const onChange = (e) => {
        const { name, value } = e.target;
        setEditField(() => {
            return {
                ...editField,
                [name]: value
            }
        })
    }

    const handleSkillData = (e) => {
        // setUserSkill({
        //     skill: e.target.value
        // })
    }

    //************************+++++ BIND DATA++++***************************

    useEffect(() => {
        getcountries()
        getstateData()
        getcityData()
        getSkillData()
        getcurrency()
        uploadavtarData()
        showData();
    }, []);

    // useEffect(() => {
    // }, [options]);

    const getSkillData = () => {
        fetch(`http://192.168.1.9/itp/api/values/BindSkill`).then(
            (response) => response.json()
        ).then(
            (data) => {
                data.map((e) => {
                    option.push({
                        skillId: e.Skill_Master_id,
                        skill: e.Skill
                    })
                })
            });
    }
    const getcountries = () => {
        fetch(`http://192.168.1.9/itp/api/values/BindCountry`)
            .then((response) => response.json())
            .then((data) => {
                setCountries(data)
            });
    }
    const getstateData = () => {
        fetch(`http://192.168.1.9/itp/api/values/BindState?Country_id=101`)
            .then((response) => response.json())
            .then(data => {
                setState(data);
            });
    }
    const getcityData = () => {
        fetch(`http://192.168.1.9/itp/api/values/BindCity?State_id=12`)
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
        if (editField.fullName.length === 0) {
            toast.error("Enter the valid name", {
                position: "bottom-right"
            });
        } else if (editField.phone.length !== 10) {
            toast.error("Enter the mobile number", {
                position: "bottom-right"
            });
        } else if (editField.availabelHour.length === 0) {
            toast.error("Enter the Availabel Hour", {
                position: "bottom-right"
            });
        } else if (editField.startTime.length === 0) {
            toast.error("Select the start time", {
                position: "bottom-right"
            });
        } else if (editField.endTime.length === 0) {
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
            <div className='edit-camera-circle'>
                <input type='file' id='file' ref={inputFile} style={{ display: 'none' }} onChange={handleChangeavtar} accept="image/*" />
                <BsFillCameraFill onClick={onButtonClick} className='edit-camera' />
            </div>
            <Row className="justify-content-md-center ">
                <Col sm={6} className="colSize">
                    <form className='mainform.edit' onSubmit={onSubmitHandler}>
                        <TextField id="outlined-basic" className="textfieldform-edit w-100" name='fullName' label="Full Name :" type="text"
                            value={editField.fullName} onChange={onChange} /><br />
                        <ToastContainer />
                        <TextField id="outlined-basic" className="textfieldform-edit w-100" name='phone' label="Mobile number :"
                            value={editField.phone} onChange={onChange} /><br />
                        <ToastContainer />
                        <TextField id="outlined-basic" className='w-100 textfieldform-edit' label="Email Address :" name='email' type="text" value={editField.email} onChange={onChange} /><br />

                        <TextField id="outlined-basic" className="textfieldform-edit w-100" label="Availabel hour :" type="text" name='availabelHour' value={editField.availabelHour} onChange={onChange} /><br />
                        <ToastContainer />
                        <Row style={{ marginTop: "10px" }}>
                            <Col sm={6} >
                                <TextField id="outlined-basic"
                                    className='w-100'
                                    label="StartTime :"
                                    name='startTime'
                                    type="time"
                                    value={editField.startTime} onChange={onChange}
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
                                    value={editField.endTime} onChange={onChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300,
                                    }}
                                />
                            </Col>
                        </Row>

                        {/* <Autocomplete
                                multiple
                                fullWidth
                                onChange={(e) => {
                                    setSkillValue(e)
                                }}
                                value={skillValue || ""}
                                // defaultValue={}
                                options={mainskill || ""}
                                filterSelectedOptions
                                id='autocomplete-multiple-outlined'
                                getOptionLabel={option => option}
                                size="small"
                                renderInput={(params) => <TextField {...params} label='Main skill' />}
                            />*/}
                        <FormControl fullWidth className='mainskill-input-edit'>

                            <Multiselect placeholder="Skill" selectedValues={userSkill} options={skill} onChange={handleSkillData} displayValue='skill' />
                        </FormControl>

                        <FormControl fullWidth className='mainskill-input-edit' size='small'>
                            <InputLabel id='demo-simple-select-outlined-label'>Country</InputLabel>
                            <Select
                                onChange={onChange}
                                name='userCountry'
                                size="small"
                                label='country'
                                id='demo-simple-select-outlined' className='mainskill-inputheight-edit'
                                labelId='demo-simple-select-outlined-label' value={editField.userCountry || ""}
                            >
                                {countries.map((cou) => (
                                    <MenuItem value={cou.Country_id}>{cou.Country}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth className='mainskill-input-edit'>
                            <InputLabel id='demo-simple-select-outlined-label'>State</InputLabel>
                            <Select
                                onChange={onChange}
                                name='userState'
                                label='State'
                                id='demo-simple-select-outlined' className='mainskill-inputheight-edit'
                                labelId='demo-simple-select-outlined-label' value={editField.userState || ""}
                            >
                                {state.map((v) => (
                                    <MenuItem value={v.State_Id}>{v.State}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth className='mainskill-input-edit'>
                            <InputLabel id='demo-simple-select-outlined-label'>City</InputLabel>
                            <Select
                                onChange={onChange}
                                name='userCity'
                                label='City'
                                id='demo-simple-select-outlined' className='mainskill-inputheight-edit'
                                labelId='demo-simple-select-outlined-label'
                                value={editField.userCity}
                            >
                                {city.map((ct) => (
                                    <MenuItem value={ct.City_id}>{ct.City}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth className='mainskill-input-edit'>
                            <InputGroup size='small'>
                                <Select size='small' onChange={onChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }} name="userCurrency"
                                    value={editField.userCurrency || ""}>
                                    {currency.map(
                                        (c) => (
                                            <MenuItem value={c.Currency_Master_Id}>{c.Currency_name}</MenuItem>
                                        ))}
                                </Select>
                                <Form.Control aria-label="Text input with 2 dropdown buttons" />
                                <Form.Control aria-label="Text input with 2 dropdown buttons" />
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