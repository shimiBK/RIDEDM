import { useRef, useState } from "react";
import Searchbar from "../searchbar/Searchbar";
import "./addevent.css";
import axios from "axios";
import { toast } from "react-toastify";
import { addDash } from "../../utils/utils";

const AddEvent = ({ handleEventModal }) => {
  const [city, setCity] = useState("");

  const eventName = useRef();
  const eventVenue = useRef();
  const eventDate = useRef();

  const getCity = (cityFromChild) => {
    setCity(cityFromChild);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const { value: eventNameValue } = eventName.current;
    const { value: eventVenueValue } = eventVenue.current;
    const { value: eventDateValue } = eventDate.current;

    const event = {
      eventName: eventNameValue,
      eventTitle: addDash(eventNameValue),
      eventLocation: city,
      eventVenue: eventVenueValue,
      eventDate: eventDateValue,
    };

    try {
      await axios.post("/events", event);
      handleEventModal(false);
      toast.success("Event was successfully uploaded");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while uploading the event");
    }
  };

  return (
      <div className="eventModal">
        <h1 className="eventModalTitle">EVENT INFORMATION</h1>
        <form className="addEventForm" onSubmit={handleClick}>
          <div className="eventInputContainer">
            <input
              type="text"
              ref={eventName}
              placeholder="Artist / Event Name"
              className="addEventInput"
              required="true"
            />
            <Searchbar
              placeholder="Event Location"
              getCity={getCity}
              required={true}
            />
            <input
              type="text"
              ref={eventVenue}
              placeholder="Event Venue"
              className="addEventInput"
              required="true"
            />
            <input
              type="text"
              ref={eventDate}
              placeholder="Event Date"
              className="addEventInput"
              required="true"
            />
          </div>
          <button className="eventButton" type="submit">
            Add Ride
          </button>
        </form>
        <span className="close" onClick={() => handleEventModal(false)}>
          X
        </span>
      </div>
  );
};

export default AddEvent;
