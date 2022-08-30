import logo from "../assets/images/logo.svg";
import main from "../assets/images/main.svg";
import styled from "styled-components";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <img src={logo} alt="moodily" className="logo" />
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

const Wrapper = styled.main`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }

  .page {
    min-height: calc(100vh- var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }

  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
  }
  p {
    color: var(--grey-600);
  }
  .main-img {
    display: none;
  }

  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`;

export default Landing;
