import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { loginUser } from 'actions/user';
import { ROUTE_PIPELINES, ROUTE_RESET_PASSWORD } from 'config/routes';

import {
  Root,
  StyledH1,
  StyledH2,
  StyledForm,
  StyledInput,
  FormMessage,
} from 'styles/login';
import { StyledButton, StyledText } from 'styles/app';

const Login = () => {
  const history = useHistory();
  const profile = useSelector((state) => state.user.profile);
  const authInProgress = useSelector((state) => state.user.authInProgress);
  const authError = useSelector((state) => state.user.authError);
  const dispatch = useDispatch();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    if (profile) {
      history.push(ROUTE_PIPELINES);
    }
  });

  const onEmailChanged = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChanged = (e) => {
    setPassword(e.target.value);
  };

  const onLoginClicked = (e) => {
    e.preventDefault();

    if (!authInProgress) {
      dispatch(loginUser(email, password));
    }
  };

  return (
    <Root>
      <StyledH1>
        Welcome to
        <br />
        OpenFIDO
      </StyledH1>
      <StyledForm onSubmit={onLoginClicked}>
        <StyledH2>SIGN IN</StyledH2>
        <StyledInput type="email" placeholder="email" onChange={onEmailChanged} />
        <StyledInput type="password" placeholder="password" onChange={onPasswordChanged} />
        <FormMessage size="large">
          <StyledText
            size="middle"
            color="pink"
            float="left"
          >
            {authError && 'Invalid credentials entered'}
          </StyledText>
          <StyledText
            size="middle"
            float="right"
          >
            <Link to={ROUTE_RESET_PASSWORD}>Forgot Password</Link>
          </StyledText>
        </FormMessage>
        <StyledButton
          htmlType="submit"
          color="blue"
          width="108"
          role="button"
          tabIndex={0}
          onClick={onLoginClicked}
          onKeyPress={onLoginClicked}
        >
          Sign In
        </StyledButton>
      </StyledForm>
    </Root>
  );
};

export default Login;
