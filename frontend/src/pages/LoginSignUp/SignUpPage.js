import React, { useState } from "react";
import styled from "styled-components";
import FormsContainer from "./FormsContainer";
import SwitchFormsContainer from "./SwitchFormsContainer";

const Container = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;

  @media (max-width: 870px) {
    min-height: 800px;
    height: 100vh;
  }

  @media (max-width: 570px) {
    padding: 1.5rem;
  }

  &:before {
    content: "";
    position: absolute;
    height: 2000px;
    width: 2000px;
    top: -10%;
    right: ${(props) => (props.clicked ? "-90%" : "54%")};
    transform: translateY(-50%);
    background-color: #39a1ff;
    transition: 1.2s ease-in-out;
    border-radius: 50%;
    z-index: 6;

    @media (max-width: 870px) {
      width: 1500px;
      height: 1500px;
      left: 30%;
      bottom: 68%;
      right: initial;
      top: initial;
      transform: ${(props) => (props.clicked ? "translateY(100%)" : "translateX(-50%)")};
      transition: 2s ease-in-out;
    }

    @media (max-width: 570px) {
      bottom: ${(props) => (props.clicked ? "38%" : "72%")};
      left: ${(props) => (props.clicked ? "-60%" : "50%")};
    }
  }
`;

const SignUpPage = () => {
  const [isActive, setActive] = useState(false);

  const handleClick = () => {
    setActive(!isActive);
  };

  return (
    <Container clicked={isActive}>
      <FormsContainer isActive={isActive} />
      <SwitchFormsContainer handleClick={handleClick} isActive={isActive} setActive={setActive} />
    </Container>
  );
};

export default SignUpPage;