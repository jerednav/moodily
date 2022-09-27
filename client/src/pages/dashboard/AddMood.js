import { FormRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const AddMood = () => {
  const {
    isEditing,
    showAlert,
    displayAlert,
    currentMood,
    social,
    weather,
    sleep,
    notes,
    moodLocation,
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
    console.log(`${name} : ${value}`);
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
          {/* mood status */}
          <div class="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddMood;
