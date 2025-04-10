import logo from './logo.svg';
import './App.css';
import OtpInput from './OtpInput';
import './styles.css';
function App() {
  return (
   <>
   <OtpInput  onSubmit={(otp) => console.log("OTP Submitted:", otp)}/>
   </>
  );
}

export default App;
