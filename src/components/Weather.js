import React, { Component } from 'react';
import axios from 'axios';
import BackgroundImage from './BackgroundImage.jpg';

export default class Weather extends Component {
    state = {
        longitude:'',
        latitude:'',
        key:'265fb7fa2d05985be26ac37c25e8e1a8',
        weatherData: {},
    }

    refresh = () => {
        window.location.reload();
    }

    componentDidMount () {
        this.getLocation();
    }

    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getWeather);
        }
    }

    getWeather = async ( position ) => {
        this.setState({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
        })
        const { longitude, latitude, key } = this.state
        await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`)
        .then(res => {
            this.setState({ weatherData: res.data })
            console.log(this.state.weatherData)
        }).catch(error => {
            console.error(error.message)
        })
    }

    render() {
        const { weatherData } = this.state;
        if (weatherData.main) {
                return (
                    <div className="row">
                        <div className="col col-lg-6 col-md-6 col-sm-12 col-sx-12 my-2 mx-auto">
                            <div className="card shadow">
                                <img className="card-img-top" style={{ height: '500px'}} src={BackgroundImage} />
                                <div className="card-body bg-info">

                                    <div className="card-img-overlay">

                                        <ul className="nav justify-content-end">
                                            <li className="nav-item">
                                                <a className="nav-link" href="/" style={{ color:'white', cursor:'pointer' }}><i class="fas fa-redo-alt" onClick={this.refresh}></i></a>
                                            </li>
                                        </ul>

                                        <p className="text-white">{weatherData.name}</p>
//                                         {weatherData.weather.map( item => (
//                                         <div key={item.id}>
//                                             <img src={`http://openweathermap.org/img/wn/${item.icon}@2x.png`} alt="alternate" />
//                                             <p className="text-white">{item.description}</p>
//                                         </div>
//                                         ))}
                                        
                                        <div>
                                            <img src={`http://openweathermap.org/img/wn/${item.icon}@2x.png`} alt="alternate" />
                                            <p className="text-white">{weatherData.weather[0].description}</p>
                                        </div>

                                        <h3 className="display-3 text-white">{weatherData.main.temp} &deg;C</h3>
                                    </div>
                                    <table className="table text-white">
                                        <tbody>
                                            <tr>
                                                <td><span style={{ float: 'left'}}>Minimum temperature</span></td>
                                                <td>{weatherData.main.temp_min} &deg;C</td>
                                            </tr>

                                            <tr>
                                                <td><span style={{ float: 'left'}}>Maximum temperature</span></td>
                                                <td>{weatherData.main.temp_max} &deg;C</td>
                                            </tr>

                                            <tr>
                                                <td><span style={{ float: 'left'}}>Humidity</span></td>
                                                <td>{weatherData.main.humidity} &deg;C</td>
                                            </tr>

                                            <tr>
                                                <td><span style={{ float: 'left'}}>Sunrise</span></td>
                                                <td>{new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</td>
                                            </tr>

                                            <tr>
                                                <td><span style={{ float: 'left'}}>Sunset</span></td>
                                                <td>{new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
            )
        } else {
            return (
                <div className="row">
                    <div className="col col-lg-6 col-md-6 col-sm-12 col-sx-12 mx-auto">
                        <div className="card shadow mt-2">
                            <div className="card-body bg-info">
                                <h1 className="display-3 text-white">Loading...</h1>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
