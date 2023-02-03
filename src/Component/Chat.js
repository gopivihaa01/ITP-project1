import Avatar from "react-avatar";
import { Card, Row, Col, Input, Label, Badge } from "reactstrap";
import { FiImage, FiSend } from 'react-icons/fi';
import { FaPhoneAlt, FaVideo } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { GoSearch } from 'react-icons/go';
import avtar from "../assets/puser.jpg";
import { useEffect, useState } from "react";


const Chat = () => {
    const navigate = useNavigate();
    const [useronedetail, setUseOneDetail] = useState([]);
    const [userchat, setUserChat] = useState(false);
    const [RecieverId, setRecieverId] = useState();
    const [onClickUserId, setOnClickUserId] = useState();
    const [ToUserId, setToUserId] = useState();
    const [onClickUserName, setOnClickUserName] = useState();
    const [onClickFromUserName, setOnclickFromUserName]= useState();
    const [chatuserdata , setChatUserData] = useState([]);
    const navigateToMap = () => {
        navigate('/');
    };
    const loginUserId = localStorage.getItem('UserID');
    const userToken = localStorage.getItem('UserToken');
    const getuserchatData = () => {
        fetch(`http://192.168.1.9/itp/api/chat/userChatList?id=${loginUserId}&token=${userToken}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setUseOneDetail(data);
            })
    }
    const savechatuser = () =>{
        fetch(`http://192.168.1.9/itp/api/chat/SaveChat?token=${userToken}`,{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Sender_ID:loginUserId,
                Reciever_ID:RecieverId,
            })
        }).then((resp) => {
            resp.json().then((resp) => {
                console.log("resp", resp)
                setRecieverId(resp.Reciever_ID)
                console.log(resp.Reciever_ID)
            })
        })
    }
    const getusermessage = () =>{
        fetch(`http://192.168.1.9/itp/api/chat/userMessagesbyuserid?chatId=2008&token=${userToken}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.Messages)
                setChatUserData(data.Messages);
                // console.log(chatuserdata)
            })
    }
    useEffect(() => {
        getuserchatData()
        getusermessage()
    }, []);
    return (
        <>
            <Card className="maincard-chat">
                <Row className="mainrow-chat">
                    <Col className="fstcol-chat">
                        <div className="fstcol-header-chat">
                            <IoIosArrowBack onClick={navigateToMap} className="back-icon-chat" />
                            <h2 className='header-mainavtar-chat'>Chats</h2>
                            {/* <GoSearch className="header-search-chat" /> */}
                        </div>
                        {useronedetail.map((user) => (
                            <button className="fstmsg-chat" onClick={() => {
                                savechatuser();
                                setUserChat(true);
                                setOnClickUserId(user.Chat_Id)
                                setToUserId(user.To_User)
                                console.log(user.To_User);
                                setOnClickUserName(user.Tousername)
                                setOnclickFromUserName(user.fromusername)
                                console.log(user.fromusername);
                                }}>
                                <div><Avatar className='header-avtar-chat' src="http://192.168.1.9/itp/Files/Images/avatar.png" /></div>
                                <div>
                                    <h6 className="title-contentmsg-chat">{user.Tousername}</h6>
                                    {/* <p className="content-msg-chat">hello .!</p> */}
                                </div>
                            </button>
                        ))}

                    </Col>
                   {userchat && <Col className="seccol-chat">
                       <div className="seccol-chatcontent-chat">
                        <Avatar className='avtarfst-chat' src={avtar} />
                        <h6 className="headerchat-seccol-chat">{onClickUserName}</h6>
                            <div className="main-menubar-chat">
                                <FaVideo className="righticon-menubar-chat" />
                                <FaPhoneAlt className="righticon-menubar-chat" />
                            </div>
                        </div> 
                        {chatuserdata.map((chat) => (  <div>
                            <div>
                                {
                                <Badge color="white" className="otheruser-badges-leftchat"> Hello .! </Badge>
                                }
                                <Avatar className="badge-avtar" src={avtar} />
                                <p className="time-fstchat">3:45 pm</p>
                            </div>
                           
                            <div>
                                <Badge color="cornflowerblue" className="user-badges-rightchat">{chat.Messages}</Badge>
                                {/* <Avatar className="badge-avtar-tochat" src={avtar} /> */}
                                <p className="time-fstchat-tofst">{chat.Send_Time}</p> <br /><br /><br />
                            </div>
                           
                        </div>
                         ))} 
                        <div className="main-footer-chat">
                            <FiImage className="imageicon-footer-chat" />
                            <Input className="typeingbar-chat" type="" placeholder="send a message..."></Input>
                            <FiSend className="sendicon-footer-chat" />
                        </div>


                    </Col>} 

                </Row>

            </Card>
        </>
    )
}

export default Chat;

