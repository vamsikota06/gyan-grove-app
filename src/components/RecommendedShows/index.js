import { FaLocationDot } from "react-icons/fa6";

import "./style.css"
import { LiBgImage } from "./styledComponent"

import temp  from '../../images/temp.jpg';

const RecommendedShows = ({show}) => {

    const {eventName, cityName, date, weather, distanceKm, imgUrl} = show

    const formatDate = (inputDate) => {
        const date = new Date(inputDate);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      }
      
      const formattedDate = formatDate(date);
      const roundedDistance = Math.round(distanceKm) + ' Km';
      //console.log("recommended component", imgUrl)

    return(
        <li className="recommended-shows-li" style={{backgroundImage: `url(${temp})`}} >
            <div className="li-content-container">
                <div className="li-top-container">
                    <h4 className="li-event-name">{eventName}</h4>
                    <p className="formatted-date">{formattedDate}</p>
                </div>
                <div className="li-bottom-container">
                    <div className="li-location-container">
                        <FaLocationDot className="location-icon" />
                        <p className="city-name">{cityName}</p>
                    </div>
                    <div className="weather-distance-container">
                        <p className="li-weather">{weather}</p>
                        <p>|</p>
                        <p>{roundedDistance}</p>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default RecommendedShows