import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faTwitter, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";

const Section = styled.section`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const SignForms = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  left: ${(props) => (props.clicked ? "25%" : "75%")};
  width: 50%;
  transition: 1s 0.3s ease-in-out;
  display: grid;
  grid-template-columns: 1fr;
  z-index: 5;
  @media (max-width: 870px) {
    width: 100%;
    top: ${(props) => (props.clicked ? "5%" : "95%")};
    left: 50%;
    transform: ${(props) => (props.clicked ? "translate(-50%, 0)" : "translate(-50%, -100%)")};
    transition: 1s 0.8s ease-in-out;
  }
  @media (max-width: 570px) {
    width: 100%;
    top: ${(props) => (props.clicked ? "35%" : "95%")};
  }
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 5rem;
  transition: all 0.2s 0.7s;
  overflow: hidden;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  @media (max-width: 570px) {
    padding: 0 1.5rem;
  }
`;

const SignUpForm = styled(Form)`
  z-index: ${(props) => (props.clicked ? "1" : "2")};
  opacity: ${(props) => (props.clicked ? "0" : "1")};
`;

const SignInForm = styled(Form)`
  z-index: ${(props) => (props.clicked ? "2" : "1")};
  opacity: ${(props) => (props.clicked ? "1" : "0")};
`;

const Title = styled.h2`
  font-size: 3rem;
  margin-bottom: 10px;
`;

const InputField = styled.div`
  max-width: 380px;
  width: 100%;
  background-color: #f5f7fa;
  margin: 10px 0;
  height: 50px;
  border-radius: 30px;
  display: grid;
  grid-template-columns: 15% 85%;
  padding: 0 2rem;
  position: relative;
  align-items: center;
  border: 1px solid #97accc;
`;

const InputIcon = styled(FontAwesomeIcon)`
  text-align: center;
  font-size: 2rem;
  color: #0b4d78;
`;

const Input = styled.input`
  background: none;
  outline: none;
  border: none;
  line-height: 1;
  font-size: 1.8rem;

  &::placeholder {
    color: #97accc;
    letter-spacing: 0.1rem;
  }
`;

const Button = styled.button`
  width: 150px;
  background-color: #062b46;
  border: none;
  outline: none;
  height: 40px;
  border-radius: 30px;
  color: #fff;
  font-weight: 600;
  margin: 10px 0;
  cursor: pointer;
  transition: 0.5s;
  letter-spacing: 0.05rem;
  font-size: 1.5rem;
  &:hover {
    background-color: #39a1ff;
  }
`;

const Text = styled.p`
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: 0.2rem;
  margin: 10px 0;
`;

const SocialMedia = styled.div`
  display: flex;
  justify-content: center;
`;

const SocialIcon = styled(FontAwesomeIcon)`
  height: 2.2rem;
  width: 2.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 1rem;
  padding: 1rem;
  border-radius: 50%;
  border: 1px solid #062b46;
  color: #062b46;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    color: #4481eb;
    border-color: #4481eb;
  }
`;

const FormsContainer = ({ isActive }) => {
  const [formData, setFormData] = useState({ email: "", username: "", password: "" });
  const [loginformData, setLoginFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
   const location = useLocation();

  // Grab redirectTo from URL query params if exists
  const queryParams = new URLSearchParams(location.search);
  const redirectTo = queryParams.get("redirectTo");

  const changeHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const formChangeHandler = (e) => {
    setLoginFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://travel-tally-3mf9.onrender.com/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const data = await res.json();
        console.log("register response", data);
        toast.success("Registration Successful");
        setFormData({ email: "", username: "", password: "" });
         navigate(redirectTo || "/dashboard");
      } else {
        toast.error("User already exist");
      }
    } catch (err) {
      console.log("register error", err);
    }
  };

  const loginsubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://travel-tally-3mf9.onrender.com/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginformData),
      });

      if (response.ok) {
        const res_data = await response.json();
        console.log("login response", res_data);

        sessionStorage.setItem("email", res_data.email || loginformData.email);
        sessionStorage.setItem("token", res_data.token);

        toast.success("Login Successful");
        setLoginFormData({ email: "", password: "" });
         navigate(redirectTo || "/dashboard");
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (err) {
      console.log("login error", err);
    }
  };

  return (
    <Section>
      <SignForms clicked={isActive}>
        <SignUpForm clicked={isActive} onSubmit={submitHandler}>
          <Title>Create Account</Title>
          <InputField>
            <InputIcon icon={faEnvelope} />
            <Input type="email" name="email" placeholder="Email" onChange={changeHandler} value={formData.email} />
          </InputField>
          <InputField>
            <InputIcon icon={faUser} />
            <Input type="text" name="username" placeholder="Username" onChange={changeHandler} value={formData.username} />
          </InputField>
          <InputField>
            <InputIcon icon={faLock} />
            <Input type="password" name="password" placeholder="Password" onChange={changeHandler} value={formData.password} />
          </InputField>
          <Button>Sign up</Button>
          <Text>Or sign up with a social media account</Text>
          <SocialMedia>
            <SocialIcon icon={faFacebookF} />
            <SocialIcon icon={faTwitter} />
            <SocialIcon icon={faLinkedinIn} />
          </SocialMedia>
        </SignUpForm>

        <SignInForm clicked={isActive} onSubmit={loginsubmitHandler}>
          <Title>Sign in</Title>
          <InputField>
            <InputIcon icon={faUser} />
            <Input type="text" name="email" placeholder="Email" value={loginformData.email} onChange={formChangeHandler} />
          </InputField>
          <InputField>
            <InputIcon icon={faLock} />
            <Input type="password" name="password" placeholder="Password" value={loginformData.password} onChange={formChangeHandler} />
          </InputField>
          <Button>Sign in</Button>
          <Text>Or sign in with</Text>
          <SocialMedia>
            <SocialIcon icon={faFacebookF} />
            <SocialIcon icon={faTwitter} />
            <SocialIcon icon={faLinkedinIn} />
          </SocialMedia>
        </SignInForm>
      </SignForms>
    </Section>
  );
};

export default FormsContainer;