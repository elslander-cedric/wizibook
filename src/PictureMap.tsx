import * as React from 'react';
import GoogleMap, { Coords } from 'google-map-react';
import Picture from './Picture';
import ImagePathSelector from './ImagePathSelector';

class PictureMap extends React.Component<{
  center?: Coords,
  zoom?: number

}, any> {
  private pictures: JSX.Element[] = [];

  constructor(props: any) {
    super(props);
    this.plotPicture = this.plotPicture.bind(this);
  }



  public plotPicture(picture: Picture) {
    console.debug(`plot picture `, picture);

    this.pictures.push(
      (<Picture
        lat={picture.props.lat} 
        lng={picture.props.lat}   
      />)); 
  }

  public render() {
    const style = {
      height: '100vh',
      width: '100vw'      
    }

    const getDistanceToMouse = (pt: {x: 1, y: 1}, mousePos: {x: 1, y: 1}) => {
      console.debug('getDistanceToMouse');
    }

    return (
      <div style={style}>
        <ImagePathSelector onPlot={this.plotPicture}/>
        <GoogleMap
          bootstrapURLKeys={{ key: 'AIzaSyATJnu9FYOi3-s2QZqmKne3LS_ECbUzc-M' }}
          center={this.props.center}
          zoom={this.props.zoom}
          distanceToMouse={getDistanceToMouse}
        >
          {this.pictures}
        </GoogleMap>
      </div>
    );
  }
}

export default PictureMap;
