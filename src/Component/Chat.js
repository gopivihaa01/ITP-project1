import Avatar from "react-avatar";
import { Card, Row,Col, Input, Label,Badge } from "reactstrap";
import{FiImage , FiSend}from 'react-icons/fi';
import{FaPhoneAlt,FaVideo}from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import{IoIosArrowBack}from'react-icons/io';
import avtar from "../assets/puser.jpg";
import { useEffect, useState } from "react";


const Chat=()=>{
    const navigate = useNavigate();
    const [useronedetail , setUseOneDetail] = useState([]);
    const navigateToMap = () => {
        navigate('/');
    };
    const getuserchatData = () => {
        fetch(`http://192.168.1.9/itp/api/chat/userChatList?id=1&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiZGYwYzQxMTItMDhkMS00YjA4LWIyZjktOTk2ZmMzMDliNTJmIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIxIiwiZXhwIjoxNjc0ODE2NTI0LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo0NDM0OSIsImF1ZCI6IlNlY3VyZUFwaVVzZXIifQ.SGJhuwBGJ2YVsgcCpYf136FChsfT9nHrwOoGrSPmIbE`)
        .then((response) => response.json())
        .then((data)=>{
            console.log(data)
        }) 
    }
    useEffect(() => {
        getuserchatData()
    }, []);
    return(
        <>
            <Card className="maincard-chat">
                <Row className="mainrow-chat">
                    <Col className="fstcol-chat">
                        <div className="fstcol-header-chat">
                            <IoIosArrowBack  onClick={navigateToMap} className="back-icon-chat" />
                            <Avatar  className='header-mainavtar-chat' src={avtar} />
                            <Input className="header-search-chat" type="" placeholder="Search.."></Input>
                        </div>
                        <Label className="main-chat-header">Chats</Label>
                        <button className="fstmsg-chat">
                            <div><Avatar className='header-avtar-chat' src={avtar}/></div>
                            <div>
                                <h6 className="title-contentmsg-chat">Grishma Patel</h6>
                                <p className="content-msg-chat">hello .!</p>
                            </div>
                        </button>
                        <button className="fstmsg-chat" >
                            <div><Avatar className='header-avtar-chat' src={avtar} /></div>
                            <div>
                                <h6 className="title-contentmsg-chat">Kitty Allanson</h6>
                                <p className="contenttwo-msg-chat">How are you .?</p>
                            </div>
                        </button>
                    </Col>
                    <Col className="seccol-chat">
                        <div className="seccol-chatcontent-chat">
                            <Avatar className='avtarfst-chat' src={avtar} />
                            <h6 className="headerchat-seccol-chat">Kitty Allanson</h6>
                            <div className="main-menubar-chat">
                                <FaVideo className="righticon-menubar-chat"/>
                                <FaPhoneAlt className="righticon-menubar-chat" />
                            </div>
                        </div>
                        <div>
                            <div>
                                <Badge color="white" className="otheruser-badges-leftchat"> Hello .! </Badge>
                            </div>
                            <div>
                            <Badge color="cornflowerblue" className="user-badges-rightchat"> Hello .! </Badge><br /><br />
                            <Badge color="cornflowerblue" className="user-badgessec-rightchat"> How can I help You .? </Badge>
                            </div>
                        </div>
                        <div className="main-footer-chat">
                            <FiImage className="imageicon-footer-chat" />
                            <Input className="typeingbar-chat" type="" placeholder="send a message..."></Input>
                            <FiSend className="sendicon-footer-chat" />
                        </div>
                        
                    
                    </Col>

                </Row>

        </Card>
        </>
    )
}

export default Chat;

