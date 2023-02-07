import Avatar from "react-avatar";
import { Card, Row, Col, Input, Label, Badge, Button } from "reactstrap";
import { FiImage, FiSend } from 'react-icons/fi';
import { FaPhoneAlt, FaVideo } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { GoSearch } from 'react-icons/go';
import avtar from "../assets/puser.jpg";
import { useEffect, useState } from "react";
import moment from "moment/moment";



const Chat = () => {
    const navigate = useNavigate();
    const [useronedetail, setUseOneDetail] = useState([]);
    const [userchat, setUserChat] = useState(false);
    const [RecieverId, setRecieverId] = useState({});
    const [onClickUserId, setOnClickUserId] = useState();
    const [chatinput, setChatInput] = useState('');
    const [ToUserId, setToUserId] = useState();
    const [fromUserId, setFromUserId] = useState();
    const [onClickUserName, setOnClickUserName] = useState("");
    const [onClickFromUserName, setOnclickFromUserName]= useState("");
    const [chatuserdata , setChatUserData] = useState([]);
    const navigateToMap = () => {
        navigate('/');
    };
    // console.log(onClickFromUserName)
    // console.log(ToUserId)
    
    const loginUserId = localStorage.getItem('UserID');
    const userToken = localStorage.getItem('UserToken');
    const getuserchatData = () => {
        fetch(`http://192.168.1.20/itp/api/chat/userChatList?id=${loginUserId}&token=${userToken}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setUseOneDetail(data);
            })
    }
    const savechatuser = () =>{
        fetch(`http://192.168.1.20/itp/api/chat/SaveChat?token=${userToken}`,{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Sender_ID:loginUserId,
                Reciever_ID: ToUserId == loginUserId ? fromUserId : ToUserId,
                Messages:chatinput,
                
            })
        }).then((resp) => {
            resp.json().then((result) => {
                console.log("result", result.Reciever_ID)
                setRecieverId(result.Reciever_ID)
                setChatInput("")
                // console.log(resp.Reciever_ID)
            })

        })
        

    }
    const getusermessage = () =>{
        fetch(`http://192.168.1.20/itp/api/chat/userMessagesbyuserid?chatId=${onClickUserId}&token=${userToken}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.Messages)
                setChatUserData(data.Messages);
            })
    }
    useEffect(() => {
        getuserchatData()
    }, []);

    useEffect(() => {
    getusermessage()
    },[onClickUserId, chatinput === ""]);

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
                                console.log("user", user);
                                setUserChat(true);
                                setOnClickUserId(user.Chat_Id)
                                setFromUserId(user.From_User)
                                setToUserId(user.To_User)
                                setOnClickUserName(user.Tousername)
                                setOnclickFromUserName(user.fromusername)
                                
                                }}>
                                <div><Avatar className='header-avtar-chat' src="http://192.168.1.20/itp/Files/Images/avatar.png" /></div>
                                <div>
                                    <h6 className="title-contentmsg-chat">{user.To_User == loginUserId ? user.fromusername : user.Tousername}</h6>
                                    {/* <p className="content-msg-chat">hello .!</p> */}
                                </div>
                            </button>
                        ))}

                    </Col>
                   {userchat && <Col className="seccol-chat">
                       <div className="seccol-chatcontent-chat">
                        <Avatar className='avtarfst-chat' src={avtar} />
                        <h6 className="headerchat-seccol-chat">{ToUserId == loginUserId ? onClickFromUserName : onClickUserName}</h6>
                            <div className="main-menubar-chat">
                                <FaVideo className="righticon-menubar-chat" />
                                <FaPhoneAlt className="righticon-menubar-chat" />
                            </div>
                        </div> 
                        {chatuserdata.map((chat) => ( 
                        <div>
                            {loginUserId != chat.Sender_ID ? <div>
                                <Badge color="white" className="otheruser-badges-leftchat"> 
                                    {chat.Messages}
                                </Badge>
                                <Avatar className="badge-avtar" src={avtar} />
                                <p className="time-fstchat">{moment(chat.Send_Time).format('l')}</p>
                            </div> : <div>
                                <Badge color="cornflowerblue" className="user-badges-rightchat">
                                    {chat.Messages}
                                </Badge>
                                <Avatar className="badge-avtar-tochat" src={avtar} />
                                <p className="time-fstchat-tofst">{moment(chat.Send_Time).format('l')}</p> <br /><br /><br />
                            </div>
                            }

                           

                           
                        </div>))}
                
                        <div className="main-footer-chat">
                            <FiImage className="imageicon-footer-chat" />
                            <Input className="typeingbar-chat" type="" placeholder="send a message..." value={chatinput}  onChange={(e) => setChatInput(e.target.value)}></Input>
                            <Button className="button-send-chat" disabled={!chatinput}>
                            <FiSend className="sendicon-footer-chat"  onClick={() => {
                                savechatuser();
                            
                            }} />
                            </Button>
                        </div>

        
                    </Col>} 

                </Row>

            </Card>
        </>
    )
}

export default Chat;

