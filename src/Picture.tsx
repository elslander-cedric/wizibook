import * as React from 'react';

class Picture extends React.Component<{
  lat: number,
  lng: number}> {

  public render() {
    return <div>{this.props}</div>;
  }
}

export default Picture;