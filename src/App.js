import logo from './logo.svg';
import './App.css';
import Device from './containers/device';



function App() {
  if("hid" in navigator){
    return (
      <div className="App">
          <Device />
      </div>
    );
  }else{
    return (
      <div   style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
          Please use supporterd desktop platforms (Chrome OS, Linux, macOS, and Windows) and latest version of supported browsers (Chrome and Edge).
      </div>
    );   
  }
}

export default App;
