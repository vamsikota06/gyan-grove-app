import { FaLocationDot } from "react-icons/fa6";

import "./style.css"
import { LiBgImage } from "./styledComponent"

import temp  from '../../images/temp.jpg';

const UpcomingEvents = ({event}) => {

    const {eventName, cityName, date, weather, distanceKm, imgUrl} = event
    console.log(imgUrl)

    const formatDate = (inputDate) => {
        const date = new Date(inputDate);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      }
      
      const formattedDate = formatDate(date);
      const roundedDistance = Math.round(distanceKm) + ' Km';
      //console.log("recommended component", imgUrl)

    return(
        <li className="upcoming-events-li">
            <div className="events-image-date-container"  style={{backgroundImage: `url(${temp})`}} >
                <p className="events-formatted-date">{formattedDate}</p>
            </div>
            <div className="events-li-content-container">
                <h4 className="events-li-event-name">{eventName}</h4>
                <div className="events-weather-distance-container">
                    <div className="events-li-location-container">
                        <FaLocationDot  />
                        <p className="events-city-name">{cityName}</p>
                    </div>
                    <div className="events-temprature-distance-container">
                        <p className="li-weather">{weather}</p>
                        <p className="events-pipe">|</p>
                        <p>{roundedDistance}</p>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default UpcomingEvents