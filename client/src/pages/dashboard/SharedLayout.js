import { Outlet, Link } from "react-router-dom";
import Wrapper from "../../assets/wrappers/SharedLayout";
import { Navbar, SmallSidebar, BigSidebar } from "../../components";

const SharedLayout = () => {
  return (
    <Wrapper>
      <main class="dashboard">
        <SmallSidebar />
        <BigSidebar />
        <div>
          <Navbar />
          <div class="dashobard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default SharedLayout;
