import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MainContext from './MainContext';

const Provider = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPass, setUserPass] = useState('');
  const [token, setToken] = useState('');
  const [rover, setRover] = useState('');
  const [dataRover, setDataRover] = useState('');
  const [day, setDay] = useState(1);
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState('');

  const context = {
    userName,
    setUserName,
    userPass,
    setUserPass,
    token,
    setToken,
    favorites,
    setFavorites,
    userEmail,
    setUserEmail,
    rover,
    setRover,
    dataRover,
    setDataRover,
    day,
    setDay,
    page,
    setPage,
  };

  return (
    <MainContext.Provider value={ context }>
      {children}
    </MainContext.Provider>
  );
};

export default Provider;

Provider.propTypes = {
  children: PropTypes.array,
}.isRequired;
