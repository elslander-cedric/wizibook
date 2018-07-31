
export class GoogleMapsService {

  public load(): Promise<any> {

    const gmapsKey = 'AIzaSyATJnu9FYOi3-s2QZqmKne3LS_ECbUzc-M'; // TODO: load from config
    const gmapsCallback = 'onGoogleMapsLoaded';

    return new Promise((resolve: (loaded: boolean) => void, reject) => {
      let timeoutId: NodeJS.Timer;

      // if (!documentRef.getElementById('gmaps')) {
      if (!window[gmapsCallback]) {
        console.debug('need to add google maps script');
        
        timeoutId = setTimeout(() => {
          console.error('could not load google maps script');
          reject();
        }, 1000);

        window[gmapsCallback] = () => {
          clearTimeout(timeoutId);
          console.debug('google maps script loaded');
          resolve(true);
        };

        const gmapsScript: HTMLScriptElement = document.createElement('script');

        Object.assign(gmapsScript, {
          async: true,
          defer: true,
          id: 'gmaps',
          src: 'https://maps.googleapis.com/maps/api/js?' +
                `key=${gmapsKey}&` +
                `libraries=geometry,places&` +
                `callback=${gmapsCallback}`,
          type: 'text/javascript'
        });

        document.body.appendChild(gmapsScript);
      } else {
        console.warn('google maps script already present');
        resolve(false);
      }
    });
  }
}