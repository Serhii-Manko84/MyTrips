import { useEffect, useState } from "react";

import cityData from "../../assets/city.json";

import css from "./AddTrip.module.css";

const AddTrip = ({ addTrip, closeModal }) => {
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [startData, setStartData] = useState("");
  const [endData, setEndData] = useState("");

  useEffect(() => {
    const citiesWithImage = cityData.map((city) => {
      const cityName = city.name.toLowerCase();
      const image = require(`../../assets/img/${cityName}.png`);
      return { name: city.name, image };
    });

    setCityOptions(citiesWithImage);
  }, []);

  const handleAddTrip = (event) => {
    event.preventDefault();
    const cityName = selectedCity.toLowerCase();
    const image = require(`../../assets/img/${cityName}.png`);
    const newTrip = {
      id: Date.now(),
      city: selectedCity,
      startDate: startData,
      endDate: endData,
      image: image,
    };
    addTrip(newTrip);
    closeModal();
    console.log("newTrip", newTrip);
  };

  const handleCancel = () => {
    setSelectedCity("");
    setStartData("");
    setEndData("");
  };

  return (
    <>
      <h2 className={css.titleCity}>Create trip</h2>
      {selectedCity && (
        <img
          className={css.imgCity}
          src={cityOptions.find((city) => city.name === selectedCity).image}
          alt={`${selectedCity} image`}
        />
      )}

      <form className={css.modalForm} onSubmit={handleAddTrip}>
        <label className={css.modalForLabel}>
          <span className={css.modalFormFieldFesc}>* City</span>
          <select
            className={css.modalFormInput}
            name="City "
            value={selectedCity}
            onChange={(event) => setSelectedCity(event.target.value)}
            required
          >
            <option value="" disabled>
              Select a city
            </option>
            {cityOptions.map((cityOption, index) => (
              <option key={index} value={cityOption.name}>
                {cityOption.name}
              </option>
            ))}
          </select>
        </label>
        <label className={css.modalForLabel}>
          <span className={css.modalFormFieldFesc}>* Start date</span>
          <input
            className={css.modalFormInput}
            type="date"
            value={startData}
            onChange={(event) => setStartData(event.target.value)}
            required
          ></input>
        </label>
        <label className={css.modalForLabel}>
          <span className={css.modalFormFieldFesc}>* End date</span>
          <input
            className={css.modalFormInput}
            type="date"
            value={endData}
            onChange={(event) => setEndData(event.target.value)}
            required
          ></input>
        </label>
        <div className={css.btnContainer}>
          <button className={css.modalFormBtn} onClick={handleCancel}>
            Cancel
          </button>
          <button className={css.modalFormBtn} type="submit">
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default AddTrip;
