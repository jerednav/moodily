import { FormRow, Alert, FormRowSelect } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const AddMood = () => {
  const {
    isEditing,
    showAlert,
    displayAlert,
    currentMood,
    social,
    socialOptions,
    weather,
    weatherOptions,
    sleep,
    notes,
    moodLocation,
    handleChange,
    clearValues,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentMood || !moodLocation) {
      displayAlert();
      return;
    }
  };

  const handleMoodInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "Edit Mood" : "Add Mood"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          {/* current mood */}
          <FormRow
            type="text"
            labelText="current mood"
            name="currentMood"
            value={currentMood}
            handleChange={handleMoodInput}
          />
          {/* mood location */}
          <FormRow
            type="text"
            labelText="mood location"
            name="moodLocation"
            value={moodLocation}
            handleChange={handleMoodInput}
          />
          {/* social */}
          <FormRowSelect
            name="social"
            labelText="social"
            value={social}
            handleChange={handleMoodInput}
            list={socialOptions}
          />

          {/* weather */}
          <FormRowSelect
            name="weather"
            labelText="weather"
            value={weather}
            handleChange={handleMoodInput}
            list={weatherOptions}
          />
          {/* sleep */}
          <FormRow
            type="text"
            name="sleep"
            value={sleep}
            handleChange={handleMoodInput}
          />
          {/* notes */}
          <FormRow
            type="text"
            name="notes"
            value={notes}
            handleChange={handleMoodInput}
          />

          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
            >
              submit
            </button>
            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddMood;
