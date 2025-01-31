import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../style/checkstatus.css";
import Header from "./Header";
import CheckStatusImg from "../../image/checkstatus.png";
import calendarIcon from "../../image/calendar.png";
import cancelIcon from "../../image/cancel.png";
import completedIcon from "../../image/completed.png";

// Status states (Empty for now, will be updated once API call is successful)
const CheckStatus = () => {
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [clickSchedule, setClickSchedule] = useState([true, false, false]);

  useEffect(() => {
    // Fetch the user email from localStorage
    const userEmail = localStorage.getItem("userEmail");

    // Check if email exists in localStorage (if not, user needs to log in)
    if (!userEmail) {
      setError("You need to be logged in to check the schedule.");
      setLoading(false);
      return;
    }

    // Fetch the schedule data based on the user's email
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/schedule/${userEmail}`);
        // Update the schedule state with the fetched data
        setSchedule(response.data.scheduledStatus);
      } catch (err) {
        setError(err.response ? err.response.data.message : "Server error. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []); // Empty dependency array to run once on component mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="checkstatuspage">
      <Header />
      <button className="backbutton" onClick={() => navigate("/home")}>
        ←
      </button>
      <div className="checkstatus">
        <div className="statusbutton">
          <button
            className={!clickSchedule[0] ? "schedule" : "scheduleactive"}
            onClick={() => setClickSchedule([true, false, false])}
          >
            SCHEDULED
          </button>
          <button
            className={!clickSchedule[1] ? "cancel" : "cancelactive"}
            onClick={() => setClickSchedule([false, true, false])}
          >
            CANCELLED
          </button>
          <button
            className={!clickSchedule[2] ? "completed" : "completedactive"}
            onClick={() => setClickSchedule([false, false, true])}
          >
            COMPLETED
          </button>
        </div>
        <div className="list">
          {clickSchedule[0] ? (
            schedule.length > 0 ? (
              <ScheduleStatus schedule={schedule} />
            ) : (
              <p className="noschedulestatus">No Scheduled Pickups!</p>
            )
          ) : null}
          {clickSchedule[1] ? (
            <p className="nocancelstatus">
              No Cancelled Pickups at this moment.
            </p>
          ) : null}
          {clickSchedule[2] ? (
            <p className="nocompletedstatus">No Completed Pickups!</p>
          ) : null}
        </div>

        <hr className="line" />
        <button className="schedulebutton" onClick={() => { navigate("/schedule"); }}>
          SCHEDULE ANOTHER PICKUP
        </button>
        <img
          src={CheckStatusImg}
          alt="checkstatusimg"
          className="checkstatusimg"
        />
      </div>
    </div>
  );
};

// Schedule Status Component to render each scheduled pickup
function ScheduleStatus({ schedule }) {
  return (
    <div>
      <ul>
        {schedule.map((item, index) => {
          return (
            <li className="schedulelist" key={index}>
              <div className="schedulelistheader">
                <img src={calendarIcon} alt="icon" />
                <div>
                  <p className="scheduleaddress">{item.address}</p>
                  <div className="category">
                    <p>Category: {item.remarks ? item.remarks : 'No remarks'}</p>
                    <p className="price">Weight: {item.weight}</p>
                    <p className="price">Price: {item.price}</p>

                  </div>
                </div>
              </div>
              <div>
                <p className="scheduletime">{item.date}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CheckStatus;
