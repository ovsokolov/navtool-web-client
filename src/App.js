import logo from './logo.svg';
import './App.css';
import Device from './containers/device';



function App() {
  const checkBrowser = () => {
    var isChromium = window.chrome;
    var winNav = window.navigator;
    var vendorName = winNav.vendor;
    var isOpera = typeof window.opr !== "undefined";
    var isIEedge = winNav.userAgent.indexOf("Edge") > -1;
    var isIOSChrome = winNav.userAgent.match("CriOS");

    if (isIOSChrome) {
      console.log('is Google Chrome on IOS');
      //alert("Not Suppored Platform");
      return false;
    } else if(
      isChromium !== null &&
      typeof isChromium !== "undefined" &&
      vendorName === "Google Inc." &&
      isOpera === false &&
      isIEedge === false
    ) {

      var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
      let version = parseInt(raw[2], 10);
      if(version >= 89){
        console.log('valid chrome');
        //alert("Valid Chrome");
        return true;
      }else{
        console.log('invalid chrome');
        //alert("Please install latest version of Chrome");
        return false;
      }
      //console.log('is Google Chrome:', version);
      //alert('is Google Chrome:', version);
    } else { 
      console.log('not Google Chrome');
      //alert("Update works only in Chrome browser. Please install latest version of Chrome");
      return false;
    }   
  }

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
          Please use supplorterd desktop platforms (Chrome OS, Linux, macOS, and Windows) and latest version of Chrome browser.
      </div>
    );   
  }
}

export default App;
