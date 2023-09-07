import { HashRouter, Route, Routes } from 'react-router-dom';
import StartScreen from '../starting-screen';
import Login from '@src/pages/popup/pages/login/login';
// import CreatePassword from "../pages/create-password/create-password";
// import HeaderLanding from "../shared/Components/header-Landing";
import CreatePassword from '../pages/create-password/createPassword';
import SrpIntro from '../pages/srpIntro/srpIntro';
import Srp from '../pages/SRP/srp';
import SrpTest from '../pages/SRPtest/srpTest';
import SrpTestSuccess from '../pages/SRPtest/SRPTestSuccess';

const Routers = () => {
  console.log('Router');
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<StartScreen />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/CreatePassword" element={<CreatePassword />}></Route>
        <Route path="/srpIntro" element={<SrpIntro />}></Route>
        <Route path="/Srp" element={<Srp />}></Route>
        <Route path="/SrpTest" element={<SrpTest />}></Route>
        <Route path="/srpTestSuccess" element={<SrpTestSuccess />}></Route>
        {/* <Route path="/Dashboard" element={<Dashboard />}></Route> */}
      </Routes>
    </HashRouter>
  );
};

export default Routers;
