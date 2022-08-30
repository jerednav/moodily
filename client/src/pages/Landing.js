// import Logo from "../components/Logo";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <h1>Moodily</h1>
      </nav>
      <div class="container page">
        <div class="info">
          <h2>
            mood<span> tracking </span>app
          </h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum
            reiciendis eveniet consequuntur, delectus atque dicta nulla libero
            adipisci, sapiente, totam aperiam placeat et ipsam eaque incidunt
            dolore perferendis nostrum qui.
          </p>
          <button className="btn btn-hero">Login/Register</button>
        </div>
        <img src={main} alt="mood track" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
