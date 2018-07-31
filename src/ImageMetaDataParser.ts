import * as exif from 'exif-js';

export class ImageMetaDataParser {

    private static FILE_READER_DONE = 2;

    public readFile(file: File): Promise<any> {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();

            fileReader.onload = (e: FileReaderProgressEvent): any => {
                if(e.target.readyState === ImageMetaDataParser.FILE_READER_DONE) {
                    console.log(`parse ${e.target.result.byteLength} bytes`);
                    resolve(this.parseImageMetaData(e.target.result));
                }
            };
    
            fileReader.readAsArrayBuffer(file);
        });
    }

    public parseImageMetaData(arrayBuffer: ArrayBuffer): any {
        const exifMetaData = exif.readFromBinaryFile(arrayBuffer);

        console.debug(`metadata:`, exifMetaData);

        if(exifMetaData === false) {
            throw Error("invalid file, must be JPEG");
        }

        return exifMetaData;
    }
}