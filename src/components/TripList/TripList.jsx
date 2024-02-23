import React, { useEffect, useState } from "react";

import AddTrip from "../AddTrip/AddTrip";
import Modal from "../Modal/Modal";

import css from "./TripList.module.css";

import tokyoImage from "../../assets/img/tokyo.png";
import barcelonaImage from "../../assets/img/barcelona.png";
import londonImage from "../../assets/img/london.png";

const TripList = ({ setSelectedTrip }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [trips, setTrips] = useState([]);
  const [searchTrip, setSearchTrip] = useState("");
  const [visibleTrips, setVisibleTrips] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [showRightBtn, setShowRightBtn] = useState(true);

  useEffect(() => {
    const initialTrips = [
      {
        id: 1,
        city: "Barcelona",
        startDate: "2024-03-01",
        endDate: "2024-03-20",
        image: barcelonaImage,
      },
      {
        id: 2,
        city: "Tokyo",
        startDate: "2024-03-01",
        endDate: "2024-03-10",
        image: tokyoImage,
      },
      {
        id: 3,
        city: "London",
        startDate: "2024-03-01",
        endDate: "2024-03-10",
        image: londonImage,
      },
    ];

    const savedTrips =
      JSON.parse(localStorage.getItem("trips")) || initialTrips;
    setTrips(savedTrips);

    const searchTrips = localStorage.getItem("searchTrip") || "";
    setSearchTrip(searchTrips);
  }, []);

  useEffect(() => {
    const filteredTrips = searchTrip
      ? trips.filter((trip) =>
          trip.city.toLowerCase().includes(searchTrip.toLowerCase())
        )
      : trips;
    setVisibleTrips(filteredTrips.slice(startIndex, startIndex + 3));
  }, [trips, searchTrip, startIndex]);

  useEffect(() => {
    setShowRightBtn(startIndex < trips.length - 3);
  }, [startIndex, trips]);

  const handleArrowClick = (direction) => {
    const increment = direction === "right" ? 1 : -1;
    const newIndex = Math.max(
      0,
      Math.min(trips.length - 3, startIndex + increment)
    );
    setStartIndex(newIndex);
    setShowRightBtn(newIndex < trips.length - 3);
  };

  // додати нову поїзду

  const addTrip = (newTrip) => {
    setTrips([newTrip, ...trips]);
    localStorage.setItem("trips", JSON.stringify([newTrip, ...trips]));
    localStorage.setItem("searchTrip", searchTrip);

    setModalOpen(false);
  };

  return (
    <div className={css.wrapper}>
      <h2 className={css.titleText}>Weather Forecast </h2>
      <input
        className={css.inputTrip}
        type="text"
        placeholder="Search your trip"
        value={searchTrip}
        onChange={(event) => setSearchTrip(event.target.value)}
      />
      <ul className={css.listItem}>
        {visibleTrips.map((trip) => (
          <li key={trip.id} onClick={() => setSelectedTrip(trip)}>
            <img src={trip.image} alt={`${trip.city} image`} />
            <div className={css.headingContent}>
              <h3>{trip.city}</h3>
              <p className={css.text}>
                {trip.startDate} - {trip.endDate}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className={css.wrapperBtn}>
        {startIndex > 0 && (
          <div className={css.btnLeft}>
            <button
              className={css.btnClick}
              onClick={() => handleArrowClick("left")}
            >
              {"<"}
            </button>
          </div>
        )}
        <div className={css.btnRight}>
          {showRightBtn ? (
            <button
              className={css.btnClick}
              onClick={() => handleArrowClick("right")}
            >
              {">"}
            </button>
          ) : null}
        </div>
      </div>
      <div className={css.wrapperAddTrip}>
        <button className={css.btnAddTrip} onClick={() => setModalOpen(true)}>
          Add Trip
        </button>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <AddTrip addTrip={addTrip} closeModal={() => setModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default TripList;
