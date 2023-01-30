import React, { useEffect, useState } from 'react'
// import { BiErrorCircle } from 'react-icons/bi';
// import { BsFilter } from 'react-icons/bs';
import { Button, Modal, ModalBody, ModalFooter, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
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
// import axios from "axios"


const ModalBasic = () => {
    const [basicModal, setBasicModal] = useState(false)
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
    const [menuItemActive,setMenuItemActive] = useState(false)
    const [loginButtonhide,setLoginButtonHide] = useState(true)
    const isLogin = window.localStorage.getItem('UserToken')
    
    
useEffect(()=>{

    if(isLogin !== null){
        setMenuItemActive(true);
    }else{
        setMenuItemActive(false); 
    }
},[isLogin])  

    const navigateToEdit = () => { 
        const ID = window.localStorage.getItem('UserID')
        navigate(`/edit?id=${ID}`);
    };
    const navigateToChat = () => {
        navigate('/chatpage');
    };
    const toggle = (tab) => {
        if (active !== tab) {
            setActive(tab)
        }
    }
        // e.preventDefault();
        // const user = { loginphone, loginpassword };
        // const result = fetch("http://192.168.1.9/itp/api/values/Login", user);
        // setUser(result.data)
        // // localStorage.setItem('user', result.data)
        // console.log(result.data)
        // if(loginphone.trim().length !== 10) {
        //     toast.error("Enter the valid phone number", {
        //         position: "bottom-right"
        //     });
        // }else if (loginpassword.length !== 4) {
        //     toast.error("Enter the valid password", {
        //         position: "bottom-right"
        //     });
        // }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        // if (name.length === 0) {
        //     toast.error("Enter the valid name", {
        //         position: "bottom-right"
        //     });
        // } else if (phone.trim().length !== 10) {
        //     toast.error("Enter the valid phone number", {
        //         position: "bottom-right"
        //     });
        // } else if (password.length !== 4) {
        //     toast.error("Enter the valid password", {
        //         position: "bottom-right"
        //     });
        // }
    }
    function loginData() {
        fetch("http://192.168.1.9/itp/api/values/Login", {
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
                // console.log("result", result)
                // setBasicModal(false);
                if (result.Message === "Invalid User data.") {
                    toast.error(result.Message, {
                        position: "bottom-right"
                    });
                }
                else if (result.Statuscode === 200) {
                    console.log((result.UserData));
                    localStorage.setItem('UserToken', result.token)
                    localStorage.setItem('UserID', result.UserData.User_Id)
                    toast.success("Login Successfully", {
                        position: "bottom-right"
                    });
                }
                
            })
        })
    }
  
    function saveData() {
        fetch("http://192.168.1.9/itp/api/values/Register", {
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
                // if(resp.Message === "User already exist"){
                //     toast.error("User already exist", {
                //     position: "bottom-right",
                // });

                // }else if(resp.message === "success"){
                //     setOtp1(!otp1)
                //  }
                //bhavy
                if (resp.message === "success") {
                    setOtp1(!otp1)
                } else {
                    toast.error(resp.message)
                }
                // setOtp(!otp)
                // if(result !== "User already exist"){
                //     toast.success(`OPT: ${result.otp}`)
                // } else {
                //     toast.error(result)
                // }

            })
        })
    }
    const otpData = () => {
        setShowData(true)
        const url = "http://192.168.1.16/itp/api/values/Otp";
        fetch(url)
            .then((response) => response.json())
            .then((json) => {

                setData(json["results"])
                console.log(json);
                if (json === "Successfully register") {
                    setBasicModal(false);
                }
            })
            .catch((error) => console.log(error));
    }
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLat(position.coords.latitude)
            setLon(position.coords.longitude)
            console.log(position.coords.latitude)
        })
    })

    return (
        <>
            <div>
                <nav className='main-header'>
                    <img className='logo-main' src={itp} alt="logoimage" />
                    {/* <a href='/'><BsFilter className='filter-icon' /></a> */}
                        <button className='login-button' onClick={() => setBasicModal(!basicModal)}>Login / Signup</button>

                    {menuItemActive&&
                    <Menu>
                        <MenuButton className="main-menubutton">
                            <img className='menubar-avtar' src={user} />
                        </MenuButton>
                         <MenuList>
                            <MenuItem onClick={navigateToEdit}><FaUserEdit className='editp-icon-menubtn' /> Edit</MenuItem>
                            <MenuItem onClick={navigateToChat}><BsFillChatDotsFill className='chat-icon-menubtn' /> Chat</MenuItem>
                            <MenuItem onSelect={() => alert("Mark as Draft")}><TbSettings className='setting-icon-menubtn' /> Setting</MenuItem>
                            <MenuItem onSelect={() => alert("Mark as Draft")}><BiLogOut className='setting-icon-menubtn' /> Log out</MenuItem>
                        </MenuList>
                    </Menu>}
                </nav>

            </div>
            <div className='demo-inline-spacing'>
                <div className='basic-modal'>
                    <Modal isOpen={basicModal} toggle={() => setBasicModal(!basicModal)}>
                        <h5 className="hfive-header-modal">Login To My Account <img className='img-header-modal' src='image/dot.png' alt="dotimage" /></h5>
                        <ModalBody>
                            <Nav tabs>
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
                            </Nav>

                            <TabContent className='py-50' activeTab={active}>
                                <TabPane tabId='1'>
                                    <p className='login-header'>Login</p>
                                    <form onSubmit={onSubmitHandler}>
                                        <TextField className='phone-input' id="outlined-basic" label="Phone" type="number" value={loginphone} onChange={(e) => setLoginPhone(e.target.value)} /><br /><br /><br />
                                        <ToastContainer />
                                        <TextField className='phone-input' id="outlined-basic" label="Password" type="password" value={loginpassword} onChange={(e) => setLoginPassword(e.target.value)} /><br /><br /><br />
                                        <ToastContainer />
                                        <Button type='submit' className='modal-login-button' onClick={loginData}>Login</Button><br />
                                        <button color='primary' className="signup-login-button" onClick={() => { toggle('2') }}>Already me?Signup</button>
                                    </form>
                                </TabPane>
                                <TabPane tabId='2'>
                                    {otp1 !== true ? <p className='login-header'>Signup</p> : <></>}
                                    {otp1 !== true ? <form onSubmit={onSubmitHandler}>
                                        <TextField className='phone-input' id="outlined-basic" label="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} /><br /><br /><br />
                                        <ToastContainer />
                                        <TextField className='phone-input' id="outlined-basic" label="Phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} /><br /><br /><br />
                                        <ToastContainer />
                                        <TextField className='phone-input' id="outlined-basic" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br /><br />
                                        <ToastContainer />
                                        <Button type='submit' className='modal-login-button' onClick={saveData}
                                        // onClick={()=>setOtp(!otp)}
                                        >Signup</Button><br />
                                        {/* <ToastContainer /> */}
                                        <button color='primary' className="signup-login-button" onClick={() => { toggle('1') }}>Are you never member?Login</button>
                                    </form> : <></>}
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
                                        <ResendOTP className="otp-second-content" handelResendClick={() => console.log("Resend clicked")} />
                                        <button className="otp-verify-btn" onClick={otpData} type="subit">Submit</button>
                                    </div>}
                                </TabPane>

                            </TabContent>
                        </ModalBody>
                        <ModalFooter>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        </>
    );

}
export default ModalBasic

