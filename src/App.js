import { Route,Routes} from 'react-router-dom';
import './App.css';
import Editprofile from './Component/Editprofile';
import ModalBasic from './Component/ModalExample';
import Otheruserprofile from './Component/Otheruserprofile';
import Chat from './Component/Chat';
import Mpapplication from './Component/Map';
// import Signup from './Component/Signup';
// import UseReducer from './Component/Dispatch';
// import ModalBasic from './Component/ModalExample';
// import Example from './Component/ModalExample';
// import ModalExample from './Component/ModalExample';
// import Login from './Component/Login';
import Signup from './Component/Signup';

function App() {

  return (
    
    <div>
      <ModalBasic />
       <Routes>
         <Route exact path="/" element={<Mpapplication />} />
         <Route exact path="/edit" element={<Editprofile />} />
         <Route exact path="/otheruserprofile" element={<Otheruserprofile />} />
         <Route exact path="/chatpage" element={<Chat />} />
       </Routes>
      {/* <Signup /> */}
      
      {/* <UseReducer /> */}
    </div>

  );
}


export default App;
