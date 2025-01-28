import CheckStatusImg from "../../image/checkstatus.png";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/checkstatus.css";
import Header from "./Header";
import calendarIcon from "../../image/calendar.png";
import cancelIcon from "../../image/cancel.png";
import completedIcon from "../../image/completed.png";

const scheduleStatuses = [
  {
    scheduledTime: "26th January 2025",
    pickupAddress: "123 Green Street, Cityville, PIN - 543210",
    scrapType: "E-waste",
    estimatedValue: "₹500",
  },
  {
    scheduledTime: "27th January 2025",
    pickupAddress: "456 Blue Avenue, Cityville, PIN - 543211",
    scrapType: "Paper",
    estimatedValue: "₹300",
  },
  {
    scheduledTime: "28th January 2025",
    pickupAddress: "789 Yellow Road, Cityville, PIN - 543212",
    scrapType: "Glass",
    estimatedValue: "₹700",
  },
];

const cancelStatuses = [
  {
    scheduledTime: "26th January 2025",
    pickupAddress: "123 Green Street, Cityville, PIN - 543210",
    scrapType: "E-waste",
    estimatedValue: "₹500",
  },
  {
    scheduledTime: "27th January 2025",
    pickupAddress: "456 Blue Avenue, Cityville, PIN - 543211",
    scrapType: "Paper",
    estimatedValue: "₹300",
  },
  {
    scheduledTime: "28th January 2025",
    pickupAddress: "789 Yellow Road, Cityville, PIN - 543212",
    scrapType: "Glass",
    estimatedValue: "₹700",
  },
];

const completedStatuses = [
  {
    scheduledTime: "26th January 2025",
    pickupAddress: "123 Green Street, Cityville, PIN - 543210",
    scrapType: "E-waste",
    estimatedValue: "₹500",
  },
  {
    scheduledTime: "27th January 2025",
    pickupAddress: "456 Blue Avenue, Cityville, PIN - 543211",
    scrapType: "Paper",
    estimatedValue: "₹300",
  },
  {
    scheduledTime: "28th January 2025",
    pickupAddress: "789 Yellow Road, Cityville, PIN - 543212",
    scrapType: "Glass",
    estimatedValue: "₹700",
  },
];

function CheckStatus() {
  const navigate = useNavigate();
  const [clickSchedule, setClickSchedule] = useState([true, false, false]);
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
            onClick={() => {
              setClickSchedule([false, true, false]);
            }}
          >
            CANCELLED
          </button>
          <button
            className={!clickSchedule[2] ? "completed" : "completedactive"}
            onClick={() => {
              setClickSchedule([false, false, true]);
            }}
          >
            COMPLETED
          </button>
        </div>
        <div className="list">
          {clickSchedule[0] ? (
            scheduleStatuses.length > 0 ? (
              <ScheduleStatus />
            ) : (
              <p className="noschedulestatus">Nothing Scheduled Pickups!</p>
            )
          ) : null}
          {clickSchedule[1] ? (
            cancelStatuses.length > 0 ? (
              <CancelStatus />
            ) : (
              <p className="nocancelstatus">
                There is no Cancelled Pickup at this moment
              </p>
            )
          ) : null}
          {clickSchedule[2] ? (
            completedStatuses.length > 0 ? (
              <CompletedStatus />
            ) : (
              <p className="nocompletedstatus">No Completed Pickups!</p>
            )
          ) : null}
        </div>

        <hr className="line" />
        <button className="schedulebutton" onClick={()=>{navigate("/schedule")}}>SCHEDULE ANOTHER PICKUP</button>
        <img
          src={CheckStatusImg}
          alt="checkstatusimg"
          className="checkstatusimg"
        />
      </div>
    </div>
  );
}

function ScheduleStatus() {
  return (
    <div>
      <ul>
        {scheduleStatuses.map((item) => {
          return (
            <li className="schedulelist">
              <div className="schedulelistheader">
                <img src={calendarIcon} alt="icon" />
                <div>
                  <p className="scheduleaddress">{item.pickupAddress}</p>
                  <div className="category">
                    <p>Category : {item.scrapType}</p>
                    <p className="price">Price : {item.estimatedValue}</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="scheduletime">{item.scheduledTime}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function CancelStatus() {
  return (
    <div>
      <ul>
        {cancelStatuses.map((item) => {
          return (
            <li className="cancellist">
              <div className="cancellistheader">
                <img src={cancelIcon} alt="icon" />
                <div>
                  <p className="canceladdress">{item.pickupAddress}</p>
                  <div className="cancelcategory">
                    <p>Category : {item.scrapType}</p>
                    <p className="cancelprice">Price : {item.estimatedValue}</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="canceltime">{item.scheduledTime}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function CompletedStatus() {
  return (
    <div>
      <ul>
        {completedStatuses.map((item) => {
          return (
            <li className="completedlist">
              <div className="completedlistheader">
                <img src={completedIcon} alt="icon" />
                <div>
                  <p className="completedaddress">{item.pickupAddress}</p>
                  <div className="completedcategory">
                    <p>Category : {item.scrapType}</p>
                    <p className="completedprice">
                      Price : {item.estimatedValue}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <p className="completedtime">{item.scheduledTime}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CheckStatus;
