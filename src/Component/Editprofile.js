import React, { useEffect, useRef, useState } from 'react';
import { BsFillCameraFill } from 'react-icons/bs';
import TextField from '@mui/material/TextField';
import { Col, Row } from 'reactstrap';
import { useNavigate ,useLocation} from 'react-router-dom';
import { Autocomplete, Avatar, Box, Chip, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
// import { AutoComplete } from '@mui/material/Autocomplete';
// import { top100Films } from 'src/@fake-db/autocomplete'
import { Form, InputGroup } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';




const Editprofile = () => {
    const [fullname, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [availabelhour, setAvailabelHour] = useState('');
    const [starttime, setStartTime] = useState('');
    const [endtime, setEndTime] = useState('');
    // const [uploadavtar, setUploadAvtar] = useState('');
    const [option, setOption] = React.useState('');
    const [mainskill, setMainSkill] = useState([]);
    const [countries, setCountries] = useState([]);
    const [countriesid, setCountriesid] = useState('');
    const [state, setState] = useState([]);
    const [stateid, setStateid] = useState('');
    const [city, setCity] = useState([]);
    const [currency, setCurrency] = useState([]);
    const [file, setFile] = useState(null);
    const [value, setValue] = React.useState([]);


    const UserToken = window.localStorage.getItem('UserToken');
    const userId = window.localStorage.getItem('UserID');

    
    const uploadavtarData = () => {
        // const formData = new FormData()

    const UserToken = localStorage.getItem('UserToken');
    const userId = localStorage.getItem('UserID');
    console.log(UserToken);

    // const uploadavtarData = () => {
    //     const formData = new FormData()
    //     formData.append('file', file)
    //     fetch(`http://192.168.1.9/itp/api/values/UserProfilePicture?token=${UserToken}&id=${userId}`, {
    //         method: "POST",

    //     }).then((resp) => {
    //         console.log(resp)
    //     })
    // }

  const uploadavtarData = (file, onUploadProgress) => {
        let formData = new FormData();
    
        formData.append("file", 'pin.png');
    
        return axios.post("http://192.168.1.9/itp/api/values/UserProfilePicture?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiODlkNmQ0ZmYtYWViZi00OTJmLWEwNWYtZjdjYzg4ZmU1NjVjIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIxIiwiZXhwIjoxNjc0NjQyNDE2LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo0NDM0OSIsImF1ZCI6IlNlY3VyZUFwaVVzZXIifQ.xAvrpxdK4VEDBW1sgCNpwOQ-lOphqTSigyl3IpF-kKk&id=1", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress,
        });
      }
        // const url = `http://192.168.1.9/itp/api/values/UserProfilePicture?token=${UserToken}&id=${userId}`
        // const formData = new FormData ()
        // formData.append('file',file)
        // axios.post(url,formData).then((res)=>{
        //     console.log(res)
        // })
        // )}
    const getskillData = () =>{
        fetch(`http://192.168.1.9/itp/api/values/BindSkill`)
          .then((response) => response.json())
          .then(data => {
            setMainSkill(data);
          });
    }
    const showData = () =>{
    fetch (`http://192.168.1.9/itp/api/values/UserDetails?User_id=${userId}&token=${UserToken}`, {
        method: "GET",

    }).then((resp) => {
        resp.json().then((result)=>{
            console.log(result);
            setFile(result.user.ProfilePicture)
            setFullName(result.user.FullName)
            setPhone(result.user.PhoneNumber)
            setAvailabelHour(result.rate.Hour)
            setMainSkill(result.skill)
            setCountries(result.location.Country)
            // setState(result.location.State)
            // setCity(result.location.City)
            // setCurrency(result.currency.Currency)

        })
    })
}
        // formData.append('file', file)

    useEffect(() => {
        uploadavtarData()
        showData();
    }, []);
  
    const getskillData = () => {
        fetch(`http://192.168.1.9/itp/api/values/BindSkill`)
            .then((response) => response.json())
            .then(data => {
                setMainSkill(data);
            });
    }
    const getcountries = () => {
        fetch(`http://192.168.1.9/itp/api/values/BindCountry`)
            .then((response) => response.json())
            .then(data => {
                setCountries(data);
            });
        console.log(countries.map((c) => console.log(c.countries)));
    }
    const handlecountries = (event) => {
        const getcountriesid = event.target.value;
        setCountriesid(getcountriesid);
    }
    const getstateData = () => {
        fetch(`http://192.168.1.9/itp/api/values/BindState?Country_id=101`)
            .then((response) => response.json())
            .then(data => {
                setState(data);
            });
        console.log(state.map((s) => console.log(s.state)));
    }
    const handlestate = (event) => {
        const getstateid = event.target.value;
        setStateid(getstateid);
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
    useEffect(() => {
        getcountries()
        getstateData()
        getcityData()
        getskillData()
        getcurrency()
    }, []);
    const handleChange1 = (event) => {
        setOption(event.target.value);
    };
    const inputFile = useRef();
    const onButtonClick = () => {
        inputFile.current.click();
    };
    const navigate = useNavigate();
    const navigateToMap = () => {
        navigate('/');
    };
    const [skillName, setSkillName] = React.useState([]);
    const handleChangeskill = (event) => {
        setSkillName(event.target.value)
    }
    const ITEM_HEIGHT = 48
    const ITEM_PADDING_TOP = 8
    const MenuProps = {
        PaperProps: {
            style: {
                width: 250,
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
            }
        }
    }

 
    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (fullname.length === 0) {
            toast.error("Enter the valid name", {
                position: "bottom-right"
            });
        } else if (phone.length !== 10) {
            toast.error("Enter the mobile number", {
                position: "bottom-right"
            });
        } else if (availabelhour.length === 0) {
            toast.error("Enter the Availabel Hour", {
                position: "bottom-right"
            });
        } else if (starttime.length === 0) {
            toast.error("Select the start time", {
                position: "bottom-right"
            });
        } else if (endtime.length === 0) {
            toast.error("Select the end time", {
                position: "bottom-right"
            });
        }
    }
    // const [otherskillName, setOtherSkillName] = React.useState([]);
    // const handleChangeotherskill = (event) => {
    //     setOtherSkillName(event.target.value)
    // }
    // const otherskill = [
    //     'React Js',
    //     'C#',
    //     '.net',
    //     'Jquery',
    //     'Angular',
    // ]
    const handleChangeavtar = function loadFile(event) {
        if (event.target.files.length > 0) {
            const file = URL.createObjectURL(event.target.files[0]);
            setFile(file);
            console.log(event.target.files[0].name);
        }
    };
    const [age, setAge] = useState('');

    const handleChangeage = (event) => {
        setAge(event.target.value);
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
                        <TextField id="outlined-basic" className="textfieldform-edit w-100" label="Full Name :" type="text" value={fullname} onChange={(e) => setFullName(e.target.value)} /><br />
                        <ToastContainer />
                        <TextField id="outlined-basic" className="textfieldform-edit w-100" label="Mobile number :" value={phone} onChange={(e) => setPhone(e.target.value)} /><br />
                        <ToastContainer />
                        <TextField id="outlined-basic" className="textfieldform-edit w-100" label="Availabel hour :" type="text" value={availabelhour} onChange={(e) => setAvailabelHour(e.target.value)} /><br />
                        <ToastContainer />
                        <Row style={{ marginTop: "10px" }}>
                            <Col sm={6} >
                                <TextField id="outlined-basic"
                                    className='w-100'
                                    label="StartTime :"
                                    type="time"
                                    value={starttime} onChange={(e) => setStartTime(e.target.value)}
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
                                    type="time"
                                    value={endtime} onChange={(e) => setEndTime(e.target.value)}
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
                            <Autocomplete
                                multiple
                                fullWidth
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                                options={mainskill}
                                filterSelectedOptions
                                id='autocomplete-multiple-outlined'
                                getOptionLabel={option => option.Skill}
                                size="small"
                                renderInput={params => <TextField {...params} label='Main skill'
                                    required={value.length === 0}
                                />}
                            />
                        </FormControl>
                   
                        <FormControl fullWidth className='mainskill-input-edit' size='small'>
                            <InputLabel id='demo-simple-select-outlined-label'>Country</InputLabel>
                            <Select
                                // onChange={(e) => handlecountries(e)}
                                size="small"
                                label='country'
                                defaultValue=''
                                id='demo-simple-select-outlined' className='mainskill-inputheight-edit'
                                labelId='demo-simple-select-outlined-label'
                            >
                                {countries && countries.map((cou) => (
                                    <MenuItem value={cou.Country_id}>{cou.Country}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth className='mainskill-input-edit'>
                            <InputLabel id='demo-simple-select-outlined-label'>State</InputLabel>
                            <Select
                                // onChange={(e) => handlestate(e)}
                                label='State'
                                defaultValue=''
                                id='demo-simple-select-outlined' className='mainskill-inputheight-edit'
                                labelId='demo-simple-select-outlined-label'
                            >
                                {state.map((sta) => (
                                    <MenuItem value={sta.State_Id}>{sta.State}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth className='mainskill-input-edit'>
                            <InputLabel id='demo-simple-select-outlined-label'>City</InputLabel>
                            <Select
                                label='City'
                                defaultValue=''
                                id='demo-simple-select-outlined' className='mainskill-inputheight-edit'
                                labelId='demo-simple-select-outlined-label'
                            >
                                {city.map((ct) => (
                                    <MenuItem value={ct.City_id}>{ct.City}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth className='mainskill-input-edit'>
                            <InputGroup size='small'>
                                <Select size='small' defaultValue='' displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                                    <MenuItem value=''></MenuItem>
                                    {currency.map(currency => (
                                        <MenuItem value={currency.Currency_name}>{currency.Currency_name}</MenuItem>
                                    ))}
                                </Select>
                                <Form.Control aria-label="Text input with 2 dropdown buttons" />
                                <Form.Control aria-label="Text input with 2 dropdown buttons" />
                            </InputGroup>
                        </FormControl>
                        <TextField id="outlined-basic" className='w-100 textfieldform-edit' label="Email Address :" type="text" /><br />
                        <button className='submit-btn-edit' type="submit" value="Submit" onClick={uploadavtarData}>Submit</button>

                    </form>
                </Col>
            </Row>
        </div>
    );
}

export default Editprofile;