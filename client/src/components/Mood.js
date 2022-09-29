import moment from "moment";
import { FaLocationArrow, FaSun, FaCalendarAlt } from "react-icons/fa";
import { GiNightSleep } from "react-icons/gi";
import { MdPhoneInTalk } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Mood";
import MoodInfo from "./MoodInfo";

const Mood = ({
  _id,
  moodLocation,
  social,
  weather,
  sleep,
  notes,
  currentMood,
  createdAt,
}) => {
  const { setEditMood, deleteMood } = useAppContext();

  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{currentMood.charAt(0)}</div>
        <div className="info">
          <h5>{currentMood}</h5>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <MoodInfo icon={<FaLocationArrow />} text={moodLocation} />
          <MoodInfo icon={<FaCalendarAlt />} text={date} />
          <MoodInfo icon={<FaSun />} text={weather} />
          <MoodInfo icon={<GiNightSleep />} text={sleep} />
          <MoodInfo icon={<MdPhoneInTalk />} text={social} />
          <div className={`notes ${notes}`}>{notes}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/add-mood"
              className="btn edit-btn"
              onClick={() => setEditMood(_id)}
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => deleteMood(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Mood;
