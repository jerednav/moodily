import { Outlet, Link } from "react-router-dom";
import Wrapper from "../../assets/wrappers/SharedLayout";

const SharedLayout = () => {
  return (
    <Wrapper>
      <div>
        <Link to="add-mood">add mood</Link>
        <Link to="all-moods">all moods</Link>
      </div>
      <Outlet />
    </Wrapper>
  );
};

export default SharedLayout;
