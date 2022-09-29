import moment from "moment";

const Mood = ({ currentMood, createdAt }) => {
  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");
  return (
    <div>
      <h5>{currentMood}</h5>
      <h5>{date}</h5>
    </div>
  );
};

export default Mood;
