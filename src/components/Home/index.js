import { useState, useEffect } from 'react'
import { BarLoader, BeatLoader } from 'react-spinners'
import InfiniteScroll from 'react-infinite-scroll-component';


import './style.css'

import { FaLocationDot } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { FaLongArrowAltRight } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

import RecommendedShows from "../RecommendedShows"
import UpcomingEvents from "../UpcomingEvents"


const apiStatusConstants = {
    'initial': 'INITIAL',
    'pending': 'PENDING',
    'success': 'SUCCESS',
    'failure': 'Failure',
}

const Home = () => {

    const [showsApiStatus, setShowsApiStatus] = useState(apiStatusConstants.initial)
    const [eventsApiStatus, setEventsApiStatus] = useState(apiStatusConstants.initial)
    const [pageNo, setPageNo] = useState(1)

    const [shows, setShows] = useState([])
    const [events, setEvents] = useState([])

    useEffect(() => {
        const getShowsData = async () => {
            setShowsApiStatus(apiStatusConstants.pending)
            const response = await fetch("https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&type=reco")

            if (response.status === 200){
                const data = await response.json()
                
                console.log('showsData', data)

                setShows(data.events)
                setShowsApiStatus(apiStatusConstants.success)
            } else {
                setShowsApiStatus(apiStatusConstants.failure)
            }
        }
        getShowsData()
    }, [])

    const getEventsData = async () => {
        //setEventsApiStatus(apiStatusConstants.pending)
        const response = await fetch(`https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&page=${pageNo}&type=upcoming`)

        if (response.status === 200){
            const data = await response.json()
            console.log('eventsData', data)

            setEvents(prevData => [...prevData, ...data.events])
            setEventsApiStatus(apiStatusConstants.success)
        } else {
            setEventsApiStatus(apiStatusConstants.failure)
        }
    }

    useEffect(() => {
        getEventsData()
    }, [pageNo])

    const renderShowsSuccessView = () => (
        <ul className="recommended-shows-ul">
            {shows.map((eachShow, index) => (
                <RecommendedShows key={index} show={eachShow} />
            ))}
        </ul>
    )

    const updatePageNo = () => {
        setPageNo(prevNo => prevNo + 1)
    }

    const hasMore = pageNo < 5;

    const renderEventsSuccessView = () => (
        <InfiniteScroll
            dataLength={events.length}
            next={updatePageNo}
            hasMore={hasMore}
            loader={renderLoadingView}
            scrollableTarget="scrollableDiv"
        >
            <ul className="upcoming-events-ul">
                {events.map((eachEvent, index) => (
                    <UpcomingEvents key={index} event={eachEvent} style={{ border: "1px solid black", margin: "10px", padding: "20px" }} />
                ))}
            </ul>
        </InfiniteScroll>
    );

    const renderLoadingView = () => (
        <div className="loader-container">
          <BarLoader color="#3498db" size={100} />
        </div>
      )

    const renderFailureView = () => (
        <div>Failure</div>
    )

    const renderRecommendedShows = () => {
        switch (showsApiStatus) {
          case apiStatusConstants.success:
            return renderShowsSuccessView();
          case apiStatusConstants.failure:
            return renderFailureView();
          case apiStatusConstants.pending:
            return renderLoadingView();
          default:
            return null;
        }
    };

    const renderUpcomingEvents = () => {
        switch (eventsApiStatus) {
          case apiStatusConstants.success:
            return renderEventsSuccessView();
          case apiStatusConstants.failure:
            return renderFailureView();
          case apiStatusConstants.pending:
            return renderLoadingView();
          default:
            return null;
        }
    };

    return(
        <div>
            <header>
                <div className="header-top-container">
                    <div>
                        <h2 className="header-heading">BookUsNow</h2>
                        <div className="location-container-sm">
                            <FaLocationDot color="#B0BABF" />
                            <p className="location-para">Mumbai, India &gt;</p>
                        </div>
                    </div>
                    <div className="icons-container-sm">
                        <IoMdSearch color="#B0BABF" size="23" />
                        <FaHeart color="#B0BABF" size="23" />
                        <FaUser color="#B0BABF" size="23" />
                    </div>
                    <div className="icons-container-lg">
                        <div className="categories-search-container-lg">
                            <button className="category-button"><GiHamburgerMenu />Categories</button>
                            <div className="search-container-lg">
                                <input type='search' placeholder="DJI phantom" className="search-input-lg" />
                                <IoMdSearch color="#B0BABF" size="23" />
                            </div>
                        </div>
                        
                        <div  className="heart-sign-in-container-lg">
                            <div className="heart-container-lg">
                                <FaHeart color="#B0BABF" size="23" />
                                <p>Favorites</p>
                            </div>
                            <button className="sign-in-button">Sign In</button>
                        </div>
                    </div>
                </div>
                <nav>
                    <div className="location-container-lg">
                        <FaLocationDot color="#B0BABF" />
                        <p className="location-para">Mumbai, India &gt;</p>
                    </div>
                    <ul className="home-ul">
                        <li className="home-li">Live Shows</li>
                        <li className="home-li">Streams</li>
                        <li className="home-li">Movies</li>
                        <li className="home-li">Plays</li>
                        <li className="home-li">Events</li>
                        <li className="home-li">Sports</li>
                        <li className="home-li">Activities</li>
                    </ul>
                </nav>
            </header>
                <div className="temp-div">
                    <div className="main-container">
                        <h1 className="main-container-heading">
                            Discover Exciting Events Happening Near You - Stay Tuned for Updates!
                        </h1>
                        <p className="main-container-para">
                            Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero at velit indterdum, ac <span>aliquest odio mattis. Class aptent taciti sociosqu ad titora torquent per conubia nostra, per</span>
                        </p>

                        <div className="recommended-shows-container">
                            <div  className="recommended-shows-heading-container">
                                <div className="recommended-shows-para-arrow-container">
                                    <p className="recommended-shows-para">Recommended shows</p>
                                    <FaLongArrowAltRight />
                                </div>
                                <p className="see-all-para">See all</p>
                            </div>
                            {renderRecommendedShows()}
                        </div>
                    </div>
                </div>
                
                <div className="upcoming-events-heading-container">
                    <div className="upcoming-events-para-arrow-container">
                        <p className="upcoming-events-para">Upcoming events</p>
                        <FaLongArrowAltRight />
                    </div>
                    <p className="events-see-all-para">See all</p>
                </div>
                    {renderUpcomingEvents()}
        </div>
    )
}

export default Home