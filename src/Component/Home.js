import React, { useEffect, useState } from 'react'
// import { BsFilter } from 'react-icons/bs';
import { Button, Modal, ModalBody} from 'reactstrap';
import OTPInput, { ResendOTP } from "otp-input-react";
import { Menu, MenuList, MenuButton, MenuItem, } from "@reach/menu-button";
import "@reach/menu-button/styles.css";
import Avatar from 'react-avatar';
import { FaUserEdit } from 'react-icons/fa';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { TbSettings } from 'react-icons/tb';
import { BiLogOut } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import itp from '../assets/ITP.svg';
import user from '../assets/puser.jpg';
import { Data } from '@react-google-maps/api';

const ModalBasic = () => {
    const [loginModal, setLoginModal] = useState(false)
    const [signupModal, setSignUpModal]= useState(false)
    const [active, setActive] = useState('1')
    const [loginphone, setLoginPhone] = useState('');
    const [loginpassword, setLoginPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [otp1, setOtp1] = useState(false);
    const [otpNumber, setOtpNumber] = useState("");
    const [data, setData] = React.useState([]);
    const [showData, setShowData] = React.useState(false);
    const [lat, setLat] = useState('');
    const [long, setLon] = useState('');
    const navigate = useNavigate();
    const [menuItemActive, setMenuItemActive] = useState(false)
    const isLogin = window.localStorage.getItem('UserToken')
    const userId = window.localStorage.getItem('UserID');
    const loginName = localStorage.getItem("FullName");
    console.log(otpNumber);
    useEffect(() => {
        if (isLogin !== null) {
            setMenuItemActive(true);
        } else {
            setMenuItemActive(false);
        }
    }, [isLogin])

    const navigateToEdit = () => {
        const ID = window.localStorage.getItem('UserID')
        navigate(`/edit?id=${ID}`);
    };
    const navigateToChat = () => {
        navigate('/chatpage');
    };
    // const toggle = (tab) => {
    //     if (active !== tab) {
    //         setActive(tab)
    //     }
    // }
    function loginData() {
        fetch(`http://192.168.1.20/itp/api/values/Login`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "Phonenumber": loginphone,
                "Password": loginpassword,
            })
        }).then((resp) => {
            resp.json().then((result) => {
                if (result.Message === "Invalid User data.") {
                    toast.error(result.Message, {
                        position: "bottom-right"
                    });
                }
                else if (result.Statuscode === 200) {
                    console.log(result.UserData);
                    localStorage.setItem('UserToken', result.token)
                    localStorage.setItem('UserID', result.UserData.Id)
                    localStorage.setItem('FullName', result.UserData.FullName)
                    console.log(result.UserData)
                    toast.success("Login Successfully", {
                        position: "bottom-right"
                    });
                    navigateToEdit();
                    setLoginModal(false)
                }
            })
        })
    }
    
    const getUserData=()=>{

        const userToken = window.localStorage.getItem('UserToken');
        console.log(userId)
        fetch(`http://192.168.1.9/itp/api/values/UserDetails?User_id=${userId}&token=${userToken}`, {
            method: "GET",
        }).then((response) => {
            response.json().then((result) => {
                const usersdetails = new Array
                usersdetails.push(result)
                sessionStorage.setItem("users", JSON.stringify(usersdetails));
            })
        })
    }
    useEffect(()=>{
        getUserData()
    },[isLogin])

    function saveData() {
        if (name.length === 0) {
            toast.error("Enter the valid name", {
                position: "bottom-right"
            });
        } else if (phone.trim().length !== 10) {
            toast.error("Enter the valid phone number", {
                position: "bottom-right"
            });
        } else if (password.length !== 4) {
            toast.error("Enter the valid password", {
                position: "bottom-right"
            });
        } else {
            fetch(`http://192.168.1.20/itp/api/values/Register`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    FullName: name,
                    PhoneNumber: phone,
                    Password: password,
                    Lat: lat,
                    Long: long
                })
            }).then((resp) => {
                resp.json().then((resp) => {
                    console.log("resp", resp)
                    localStorage.setItem("OTP", resp.otp)
                    if(resp.Message === "User already exist."){
                        toast.error("User already exist", {
                            position: "bottom-right",
                        });
                    }else if(resp.message === "success"){
                        setOtp1(!otp1)
                    }
                    //bhavy
                    // if (resp.message === "success") {
                    //     setOtp1(!otp1)
                    // } else {
                    //     toast.error(resp.message)
                    // }
                    // setOtp(!otp)
                    // if(resp !== "User already exist"){
                    //     toast.success(`OPT: ${resp.otp}`)
                    // } else {
                    //     toast.error(resp)
                    // }
    
                })
            })
        }
    }
    const otpData = () => {
        setShowData(true)
        const url = `http://192.168.1.20/itp/api/values/Otp?otp=${otpNumber}` 
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setData(data);
            if(data === "Invalid otp"){
                alert('Please enter valid number')
            }else if(data.message === "valid otp"){
                alert('Register Successfully')
                setOtp1(false)
                setLoginModal(false) 
            }
            
        })
        // const url = `http://192.168.1.20/itp/api/values/Otp?otp=${otpNumber}` 
        // fetch(url)
        // .then((response) => response.json())
        // .then((json) => {
        // setData(json["results"])
        // console.log(json["results"])
        // toast.error(json);
        //     console.log(json);
        //     if (json.message === "valid otp") {
        //         toast.success("Register Successfully", {
        //             position: "bottom-right"
        //         });
        //         setLoginModal(false);
        //         setOtp1(false)
        //     }
            // if(otpNumber === 0){
            //     toast.error("not valid")
            // }
        //     })
        // .catch((error) => console.log(error));
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLat(position.coords.latitude)
            setLon(position.coords.longitude)
            console.log(position.coords.latitude)
            console.log(position.coords.longitude)
        })
    })

    return (
        <>
            <div>
                <nav className='main-header'>
                    <img className='logo-main' src={itp} alt="logoimage" />
                    {/* <a href='/'><BsFilter className='filter-icon' /></a> */}
                    <div className='maindiv-header'>
                      {userId === undefined || userId === null ? <div>
                        <button className='login-button-header' onClick={() => {
                            setLoginModal(!loginModal)
                            setSignUpModal(false)
                            }}>Login</button>
                        <button className='login-button-header' onClick={() => {
                            setLoginModal(!loginModal)
                            setSignUpModal(true)
                            }}>Signup </button>
                            </div> : <h5 className='user-name-header'>{loginName}</h5>}  
                        {menuItemActive &&
                            <Menu>
                                <MenuButton className="menu-button-header">
                                    <img className='menubar-avtar' src={user}/>
                                </MenuButton>
                                <MenuList>
                                    <MenuItem onClick={navigateToEdit}><FaUserEdit className='editp-icon-menubtn' /> Edit</MenuItem>
                                    <MenuItem onClick={navigateToChat}><BsFillChatDotsFill className='chat-icon-menubtn' /> Chat</MenuItem>
                                    <MenuItem onSelect={() => alert("Mark as Draft")}><TbSettings className='setting-icon-menubtn' /> Setting</MenuItem>
                                    <MenuItem onSelect={() => alert("Mark as Draft")}><BiLogOut className='setting-icon-menubtn' /> Log out</MenuItem>
                                </MenuList>
                            </Menu>
                        }
                    </div>
                </nav>
            </div>
            <div className='demo-inline-spacing'>
                <div className='basic-modal'>
                    <Modal isOpen={loginModal} toggle={() => setLoginModal(!loginModal)}>
                        <ModalBody>
                            {signupModal === false && <div>
                                <h5 className="hfive-header-modal">Login To My Account <img className='img-header-modal' src='image/dot.png' alt="dotimage" /></h5>
                                <p className='login-header'>Login</p>
                                <TextField className='phone-input' id="outlined-basic" label="Phone" type="number" value={loginphone} onChange={(e) => setLoginPhone(e.target.value)} /><br /><br /><br />
                                <ToastContainer />
                                <TextField className='phone-input' id="outlined-basic" label="Password" type="password" value={loginpassword} onChange={(e) => setLoginPassword(e.target.value)} /><br /><br /><br />
                                <ToastContainer />
                                <Button type='submit' className='modal-login-button' onClick={loginData} >Login</Button><br />
                                <button color='primary' className="signup-login-button" onClick={() => {
                                    setSignUpModal(true)
                                }}>Already me?Signup</button>
                            </div>
                            }
                            {signupModal === true && <div>
                                {otp1 !== true ? <h5 className="hfive-header-modal">Login To My Account <img className='img-header-modal' src='image/dot.png' alt="dotimage" /></h5> : <></>}
                                {otp1 !== true ? <p className='login-header'>Signup</p> : <></>}
                                {otp1 !== true ? <>
                                    <TextField className='phone-input' id="outlined-basic" label="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} /><br /><br /><br />
                                    <ToastContainer />
                                    <TextField className='phone-input' id="outlined-basic" label="Phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} /><br /><br /><br />
                                    <ToastContainer />
                                    <TextField className='phone-input' id="outlined-basic" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br /><br />
                                    <ToastContainer />
                                    <Button type='submit' className='modal-login-button' onClick={saveData}>Signup</Button><br />
                                    <button color='primary' className="signup-login-button"
                                        onClick={() => { setSignUpModal(false) }}
                                    >Are you never member?Login</button>
                                </> : <></>}
                                {otp1 && <div>
                                    <h3 className="otp-header">Verification</h3>
                                    <p className="otp-enterp">Enter your OTP number</p>
                                    <OTPInput className="otp-data"
                                        value={otpNumber}
                                        onChange={setOtpNumber}
                                        autoFocus
                                        OTPLength={4}
                                        otpType="number"
                                        disabled={false}
                                        secure
                                    />
                                    <button className="otp-verify-btn" onClick={otpData} type="submit">Submit</button>
                                </div>}
                            </div>}

                        </ModalBody>
                    </Modal>
                    {/* <Modal isOpen={signupModal} toggle={() => setSignUpModal(!signupModal)}>
                        <h5 className="hfive-header-modal">Sign Up To My Account <img className='img-header-modal' src='image/dot.png' alt="dotimage" /></h5>
                        <ModalBody>
                            {otp1 !== true ? <p className='login-header'>Signup</p> : <></>}
                            {otp1 !== true ? <>
                                <TextField className='phone-input' id="outlined-basic" label="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} /><br /><br /><br />
                                <ToastContainer />
                                <TextField className='phone-input' id="outlined-basic" label="Phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} /><br /><br /><br />
                                <ToastContainer />
                                <TextField className='phone-input' id="outlined-basic" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br /><br />
                                <ToastContainer />
                                <Button type='submit' className='modal-login-button' onClick={saveData}>Signup</Button><br />
                                <button color='primary' className="signup-login-button" onClick={() => { toggle('') }}>Are you never member?Login</button>
                            </> : <></>}
                            {otp1 && <div>
                                <h3 className="otp-header">Verification</h3>
                                <p className="otp-enterp">Enter your OTP number</p>
                                <OTPInput className="otp-data"
                                    value={otpNumber}
                                    onChange={setOtpNumber}
                                    autoFocus
                                    OTPLength={4}
                                    otpType="number"
                                    disabled={false}
                                    secure
                                />
                                <button className="otp-verify-btn" onClick={otpData} type="subit">Submit</button>
                            </div>}
                        </ModalBody>
                    </Modal> */}
                    {/* <Nav tabs>
                                <NavItem>
                                    <NavLink style={{ cursor: "pointer" }}
                                        active={active === '1'}
                                        onClick={() => {
                                            toggle('1')
                                        }}
                                    >
                                        Login
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink style={{ cursor: "pointer" }}
                                        active={active === '2'}
                                        onClick={() => {
                                            toggle('2')
                                        }}
                                    >
                                        Signup
                                    </NavLink>
                                </NavItem>
                            </Nav> */}

                    {/* <TabContent className='py-50' activeTab={active}> */}
                    {/* <TabPane tabId='1'>
                                    <p className='login-header'>Login</p>
                                    <form>
                                        <TextField className='phone-input' id="outlined-basic" label="Phone" type="number" value={loginphone} onChange={(e) => setLoginPhone(e.target.value)} /><br /><br /><br />
                                        <ToastContainer />
                                        <TextField className='phone-input' id="outlined-basic" label="Password" type="password" value={loginpassword} onChange={(e) => setLoginPassword(e.target.value)} /><br /><br /><br />
                                        <ToastContainer />
                                        <Button type='submit' className='modal-login-button' onClick={loginData}>Login</Button><br />
                                        <button color='primary' className="signup-login-button" onClick={() => { toggle('2') }}>Already me?Signup</button>
                                    </form>
                                </TabPane> */}
                    {/* <TabPane tabId='2'>
                                    {otp1 !== true ? <p className='login-header'>Signup</p> : <></>}
                                    {otp1 !== true ? <>
                                        <TextField className='phone-input' id="outlined-basic" label="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} /><br /><br /><br />
                                        <ToastContainer />
                                        <TextField className='phone-input' id="outlined-basic" label="Phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} /><br /><br /><br />
                                        <ToastContainer />
                                        <TextField className='phone-input' id="outlined-basic" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br /><br />
                                        <ToastContainer />
                                        <Button type='submit' className='modal-login-button' onClick={saveData} */}
                    {/* // onClick={()=>setOtp(!otp)} */}
                    {/* >Signup</Button><br />
                                        <button color='primary' className="signup-login-button" onClick={() => { toggle('1') }}>Are you never member?Login</button>
                                    </> : <></>} */}
                    {/* {otp1 && <div>
                                        <h3 className="otp-header">Verification</h3>
                                        <p className="otp-enterp">Enter your OTP number</p>
                                        <OTPInput className="otp-data"
                                            value={otpNumber}
                                            onChange={setOtpNumber}
                                            autoFocus
                                            OTPLength={4}
                                            otpType="number"
                                            disabled={false}
                                            secure
                                        /> */}
                    {/* <ResendOTP className="otp-second-content" handelResendClick={() => console.log("Resend clicked")} /> */}
                    {/* <button className="otp-verify-btn" onClick={otpData} type="subit">Submit</button> */}
                    {/* </div>}
                                </TabPane>

                            </TabContent> */}
                </div>
            </div>
        </>
    );

}
export default ModalBasic;

