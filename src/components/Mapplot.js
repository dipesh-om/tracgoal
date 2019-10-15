import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup, Polygon } from 'react-leaflet'

export default class Mapplot extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lat: 31.708401,
            lng: 76.932198,
            zoom: 11,
            latlongPoint: [[31.708401, 76.932198], [31.708401, 75.932198]]
        }
    }
    componentDidUpdate(prevProps) {

        if (this.props.latlong !== prevProps.latlong) {
            this.setState({
                latlongPoint: this.props.latlong
            });
        }

    }

    render() {
        console.log("Plotting ...")
        console.log(this.props.latlong)
        console.log(this.state.latlongPoint)

        const position = [this.state.lat, this.state.lng]
        return (
            <div>
                <Map className="leaflet-container" center={position} zoom={this.state.zoom}>
                    <Polygon color="red" weight="5" positions={this.state.latlongPoint} />
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                        <Popup>
                            Hey Buddy <br /> It's ITT MANDI.
                        </Popup>
                    </Marker>
                </Map>
            </div>
        )
    }
}
