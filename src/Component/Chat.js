import Avatar from "react-avatar";
import { Card, Row,Col, Input, Label,Badge } from "reactstrap";
import{FiImage , FiSend}from 'react-icons/fi';
import{FaPhoneAlt,FaVideo}from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import{IoIosArrowBack}from'react-icons/io';

const Chat=()=>{
    const navigate = useNavigate();
    const navigateToMap = () => {
        navigate('/');
    };
    return(
        <>
            <Card className="maincard-chat">
                <Row className="mainrow-chat">
                    <Col className="fstcol-chat">
                        <div className="fstcol-header-chat">
                            <IoIosArrowBack  onClick={navigateToMap} className="back-icon-chat" />
                            <Avatar  className='header-mainavtar-chat' src='image/puser.jpg' />
                            <Input className="header-search-chat" type="" placeholder="Search.."></Input>
                        </div>
                        <Label className="main-chat-header">Chats</Label>
                        <button className="fstmsg-chat">
                            <div><Avatar className='header-avtar-chat' src='image/puser.jpg' /></div>
                            <div>
                                <h6 className="title-contentmsg-chat">Grishma Patel</h6>
                                <p className="content-msg-chat">hello .!</p>
                            </div>
                        </button>
                        <button className="fstmsg-chat" >
                            <div><Avatar className='header-avtar-chat' src='image/puser.jpg' /></div>
                            <div>
                                <h6 className="title-contentmsg-chat">Kitty Allanson</h6>
                                <p className="contenttwo-msg-chat">How are you .?</p>
                            </div>
                        </button>
                    </Col>
                    <Col className="seccol-chat">
                        <div className="seccol-chatcontent-chat">
                            <Avatar className='avtarfst-chat' src='image/puser.jpg' />
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

