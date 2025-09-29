import './App.css';
import { Link, Route, Routes } from './router';

const JoyPage = () => <h1>기쁨이</h1>;
const SadnessPage = () => <h1>슬픔이</h1>;
const AngerPage = () => <h1>버럭이</h1>;
const DisgustPage = () => <h1>까칠이</h1>;
const FearPage = () => <h1>소심이</h1>;
const AnxietyPage = () => <h1>불안이</h1>;
const EmbarrasmentPage = () => <h1>부끄럼</h1>;
const EnvyPage = () => <h1>엔비</h1>;
const EnnuiPage = () => <h1>지루</h1>;
const NotFoundPage = () => <h1>404</h1>;

const Header = () => {
  return (
    <nav style={{ display: 'flex', gap: '10px' }}>
      <Link to='/joy'>JOY</Link>
      <Link to='/sadness'>SADNESS</Link>
      <Link to='/anger'>ANGER</Link>
      <Link to='/disgust'>DISGUST</Link>
      <Link to='/fear'>FEAR</Link>
      <Link to='/anxiety'>ANXIETY</Link>
      <Link to='/embarrasment'>EMBARRASMENT</Link>
      <Link to='/envy'>ENVY</Link>
      <Link to='/ennui'>ENNUI</Link>
      <Link to='/not-found'>NOT FOUND</Link>
    </nav>
  );
};

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/joy' component={JoyPage} />
        <Route path='/sadness' component={SadnessPage} />
        <Route path='/anger' component={AngerPage} />
        <Route path='/disgust' component={DisgustPage} />
        <Route path='/fear' component={FearPage} />
        <Route path='/anxiety' component={AnxietyPage} />
        <Route path='/embarrasment' component={EmbarrasmentPage} />
        <Route path='/envy' component={EnvyPage} />
        <Route path='/ennui' component={EnnuiPage} />
        <Route path='/not-found' component={NotFoundPage} />
      </Routes>
    </>
  );
}

export default App;