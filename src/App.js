import { Route,Routes} from 'react-router-dom';
import './App.css';
import Editprofile from './Component/Editprofile';
import ModalBasic from './Component/Home';
import Otheruserprofile from './Component/Otheruserprofile';
import Chat from './Component/Chat';
import Mpapplication from './Component/Map';

function App() {
  return (
    <div>
      <ModalBasic />
      <Routes>
        <Route exact path="/" element={<Mpapplication />} />
        <Route exact path="/edit" element={<Editprofile />} />
        <Route exact path="/otheruserprofile/:id" element={<Otheruserprofile />} />
        <Route exact path="/chatpage" element={<Chat />} />
      </Routes>
    </div>
  );
}


export default App;
