import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Menu } from 'antd';

import { updateUserProfile } from 'actions/user';
import {
  StyledTitle, StyledText, StyledInput, StyledButton,
} from 'styles/app';
import colors from 'styles/colors';

const Root = styled.div`
  padding: 30px 90px;
  display: grid;
  grid-template-columns: 250px 1fr;
`;

const StyledMenu = styled(Menu)`
  background-color: transparent;
  &.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    border-color: ${colors.blue};
    background-color: transparent;
    font-weight: bold;
    color: ${colors.blue};
  }
  .ant-menu-item {
    border-left: 1px solid transparent;
    height: 24px;
    height: 1.5rem;
    line-height: 24px;
    line-height: 1.5rem;
    padding: 0 8px;
    padding: 0 0.5rem;
    margin: 10px 0;
    margin: 0.625rem 0;
    font-weight: 500;
    color: ${colors.gray80};
    &:hover {
      color: ${colors.blue};
    }
    &:first-of-type {
      margin-top: 0;
    } 
  }
`;

const StyledForm = styled.form`
  display: grid;
  grid-gap: 16px;
  grid-gap: 1rem;
  button {
    margin-top: 32px;
    margin-top: 2rem;
  }
  input {
    width: 432px;
  }
`;

const Settings = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const profile = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    if (profile) {
      if (profile.email) setEmail(profile.email);
      if (profile.first_name) setFirstName(profile.first_name);
      if (profile.last_name) setLastName(profile.last_name);
    }
  }, [profile]);

  if (!profile) return null;

  const onUpdateProfileClicked = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(profile.uuid, email, firstName, lastName));
  };

  const onEmailChanged = (e) => {
    setEmail(e.target.value);
  };

  const onFirstNameChanged = (e) => {
    setFirstName(e.target.value);
  };
  const onLastNameChanged = (e) => {
    setLastName(e.target.value);
  };

  return (
    <>
      <StyledTitle>
        <h1>Settings</h1>
      </StyledTitle>
      <Root>
        <StyledMenu selectedKeys={['Edit Profile']}>
          <Menu.Item key="Edit Profile">
            <StyledText size="xlarge">Edit Profile</StyledText>
          </Menu.Item>
          <Menu.Item key="Change Password">
            <StyledText size="xlarge">Change Password</StyledText>
          </Menu.Item>
          <Menu.Item key="Edit Organization">
            <StyledText size="xlarge">Edit Organization</StyledText>
          </Menu.Item>
        </StyledMenu>
        <StyledForm>
          <label htmlFor="first_name">
            <StyledText display="block" color="darkText">First Name</StyledText>
            <StyledInput
              type="text"
              bgcolor="white"
              size="large"
              name="first_name"
              id="first_name"
              value={firstName}
              onChange={onFirstNameChanged}
            />
          </label>
          <label htmlFor="last_name">
            <StyledText display="block" color="darkText">Last Name</StyledText>
            <StyledInput
              type="text"
              bgcolor="white"
              size="large"
              name="last_name"
              id="last_name"
              value={lastName}
              onChange={onLastNameChanged}
            />
          </label>
          <label htmlFor="email">
            <StyledText display="block" color="darkText">Email</StyledText>
            <StyledInput
              type="text"
              bgcolor="white"
              size="large"
              name="email"
              id="email"
              value={email}
              onChange={onEmailChanged}
            />
          </label>
          <StyledButton
            htmlType="submit"
            color="blue"
            width={128}
            role="button"
            tabIndex={0}
            onClick={onUpdateProfileClicked}
          >
            Update Profile
          </StyledButton>
        </StyledForm>
      </Root>
    </>
  );
};

export default Settings;
