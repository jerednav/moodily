import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import Mood from "./Mood";
import Wrapper from "../assets/wrappers/MoodsContainer";

const MoodsContainer = () => {
  const { getMoods, moods, isLoading, page, totalMoods } = useAppContext();

  useEffect(() => {
    getMoods();
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  if (moods.length === 0) {
    return (
      <Wrapper>
        <h2>No moods found ...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalMoods} mood {moods.length > 1 && "s"} found
      </h5>
      <div className="moods">
        {moods.map((mood) => {
          return <Mood key={mood._id} {...mood} />;
        })}
      </div>
      {/* pagination buttons  */}
    </Wrapper>
  );
};

export default MoodsContainer;
