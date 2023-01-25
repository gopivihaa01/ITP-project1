import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { BsFilter } from 'react-icons/bs';
// import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';



const Login = (props) => {
  const [open, setOpen] = useState(false);
  // const [openModel, setOpenModel] = useState(false);
  const [phone , setPhone] = useState('');
  const [password , setPassword] = useState('');
  
  const onSubmitHandler =(e)=>{
    e.preventDefault();
    if(!(phone.trim().match(/^[0-9]{10}$/))){
      alert("enter the valid phone number")
    }else if(!(password.trim().match(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/))){
      alert("enter the valid password")
    } else {
      alert(" login successfully")
    }
  }
  return (
    <>
    <div>
        <nav className='main-header'>
          <h1 className='logo-map'>Google Map Application</h1>
          <a href='/'><BsFilter className='filter-icon' /></a>
         <button className='login-button' onClick={() => setOpen(true)}>Login</button>
          <button className='signup-button'>Sign-up</button>
        </nav>
      
    </div>
    <Modal className='modal-dialog' isOpen={open} toggle={() => setOpen(!open)}>
          <ModalHeader className='login-header' toggle={() => setOpen(!open)}>Login</ModalHeader>
          <ModalBody>
            <form onSubmit={onSubmitHandler}>
            {/* <input className='phone-input' type="number" placeholder='Phone*' value={phone} onChange={(e) => setPhone(e.target.value)} /> <br /> <br/> */}
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            {/* <input className='phone-input' type="password" name="Password" placeholder='Password*' value={password} onChange={(e) => setPassword(e.target.value)} /> <br /> <br/> */}
            <Button type='submit' className='modal-login-button' >Login</Button>
            </form>
          </ModalBody>
          <ModalFooter>
            <button className="signup-login-button" onClick={()=>props.onFormSwitch('Signup')}>Are you never member?signup</button>
          </ModalFooter>
        </Modal>
{/* 
        <Modal className='modal-dialog' isOpen={openModel} toggle={() => setOpenModel(!openModel)}>
          <ModalHeader className='login-header' toggle={() => setOpenModel(!openModel)}>Signup</ModalHeader>
          <ModalBody>
            <form>
            <input className='phone-input' type="text" placeholder='Phone*' value={phone} required  onChange={(e) => setPhone(e.target.value)} /> <br /> <br/>
            <input className='phone-input' type="text" name="Password" placeholder='Password*' value={password} required  onChange={(e) => setPassword(e.target.value)} /> <br /> <br/>
            <Button className='modal-login-button' color="primary" >Login</Button>{' '}
            </form>
          </ModalBody>
          <ModalFooter>
            <button className=""color="primary" onClick={() => setOpenModel(!openModel)}>Are you never member?signup</button>{' '}
                      </ModalFooter>
        </Modal> */}
      </>
  );
};

export default Login;
