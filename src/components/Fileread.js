import React from "react";
import "./filereadstyle.css";

class Fileread extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadedFileContents: null,
            latlongFile: [],
            waitingForFileUpload: false,
            xmlSource: null,
            waypoints: [],
        };
    }

    static readUploadedFileAsText = inputFile => {
        const temporaryFileReader = new FileReader();

        return new Promise((resolve, reject) => {
            temporaryFileReader.onerror = () => {
                temporaryFileReader.abort();
                reject(new DOMException("Problem parsing input file."));
            };

            temporaryFileReader.onload = () => {
                resolve(temporaryFileReader.result);
            };
            temporaryFileReader.readAsText(inputFile);
        });
    };

    static readLatLongFromText = textLatLong => {
        var domParser = new DOMParser();
        return new Promise((resolve) => {
            this.xmlSource = domParser.parseFromString(textLatLong, 'text/xml');
            var ll = this.xmlSource.documentElement.getElementsByTagName("trkpt");
            var len = ll.length;
            var i;
            var trackpoints = [];
            for (i = 0; i < len; i++) {
                var pt = [];
                pt = [parseFloat(ll.item(i).getAttribute("lat")), parseFloat(ll.item(i).getAttribute("lon"))];
                trackpoints.push(pt);
            }
            resolve(trackpoints)
        });
    }

    uploadFile = async event => {
        event.persist();

        if (!event.target || !event.target.files) {
            return;
        }

        this.setState({ waitingForFileUpload: true });

        const fileList = event.target.files;

        // Uploads will push to the file input's `.files` array. Get the last uploaded file.
        const latestUploadedFile = fileList.item(fileList.length - 1);

        try {
            const fileContents = await Fileread.readUploadedFileAsText(latestUploadedFile);
            const latlong = await Fileread.readLatLongFromText(fileContents);

            this.setState({
                uploadedFileContents: fileContents,
                latlongFile: latlong,
                waitingForFileUpload: false
            });

            this.props.callbackFromParent(this.state.latlongFile)

        } catch (e) {
            console.log(e);
            this.setState({
                waitingForFileUpload: false
            });
        }
    };

    render() {
        return (
            <div style={{ display: "grid" }}>
                <input type="file" onChange={this.uploadFile} />
                <textarea
                    readOnly
                    value={
                        this.state.uploadedFileContents
                            ? this.state.uploadedFileContents
                            : "No contents to display."
                    }
                />
                {this.state.waitingForFileUpload && <span>Uploading file...</span>}
            </div>
        );
    }
}

export default Fileread