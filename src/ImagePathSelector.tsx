import * as React from 'react';
import { ImageMetaDataParser } from './ImageMetaDataParser';
import Picture from './Picture';

class ImagePathSelector extends React.Component<{ onPlot: (picture: Picture) => void }> {

    constructor(props: any) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    public handleChange(e: React.FormEvent<HTMLInputElement>): void {
        const files: FileList = e.currentTarget.files;        

        Array.prototype.forEach.call(files, (file: File) => {
            if(file.type.startsWith('image/')) {
                console.debug(`reading ${file.name} [${file.size}]`);

                new ImageMetaDataParser()
                .readFile(file)
                .then((exifMetaData: any) => {
                    this.props.onPlot(
                        new Picture({
                            // date: exifMetaData.DateTime,
                            lat: this.formatGPSCoords(exifMetaData.GPSLatitude),
                            lng: this.formatGPSCoords(exifMetaData.GPSLongitude)
                        }));
                })
                .catch((err) => {
                    console.error(err);
                });
            }
        });
    }

    public render(): any {
        return (
            <div>
                <input type="file" id="input" accept="image/*" multiple={true} onChange={this.handleChange}/>
            </div>
        );
    }

    private formatGPSCoords(gpsCoords: any): number {
        return gpsCoords[0] + (gpsCoords[1]/60 + gpsCoords[2]/3600);
    }

}

export default ImagePathSelector;