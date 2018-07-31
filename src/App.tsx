import * as React from 'react';
import './App.css';
import PictureMap from './PictureMap';

// import logo from './logo.svg';

class App extends React.Component {
  public render() {
    const style = {
      height: '100vh',
      width: '100vw'      
    }

    return (
      <div style={style}>
        <PictureMap center={{ lat: 59.95, lng: 30.33 }} zoom={11}/>
      </div>
    );
  }
}

export default App;
