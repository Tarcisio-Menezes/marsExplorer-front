/* eslint-disable no-alert */
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import MainContext from '../context/MainContext';
import '../css/addUser.css';

require('dotenv').config();

const host = process.env.HOST || 'https://mars-api-01.herokuapp.com';

function AddUser() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPass, setUserPass] = useState('');
  const { setToken } = useContext(MainContext);

  const createUser = (name, email, password) => {
    const body = {
      name,
      email,
      password,
    };

    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    };

    axios.post(`http://${host}/user`, body, { headers })
      .then((response) => {
        if (response.data.token) {
          setToken(response.data.token);
          return alert(`O usuário ${userEmail} foi cadastrado com sucesso!`);
        }
      })
      .catch((errorOrResponse) => alert(
        `O usuário ${userEmail} já está cadastrado. ${errorOrResponse}`,
      ));
  };

  return (
    <div>
      <section className="createTitle">
        <h1>Mars Explorer</h1>
        <h4>Cadastrar nova pessoa exploradora</h4>
      </section>
      <section className="createData">
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Seu nome deve ter ao menos oito caracteres."
            onChange={ ({ target }) => setUserName(target.value) }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o seu melhor email."
            onChange={ ({ target }) => setUserEmail(target.value) }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Sua senha deve ter seis caracteres."
            onChange={ ({ target }) => setUserPass(target.value) }
          />
        </Form.Group>
        <button
          variant="light"
          type="submit"
          onClick={ () => createUser(userName, userEmail, userPass) }
          disabled={ !userName || !userEmail || !userPass }
        >
          Cadastrar
        </button>
        <Link to="/">
          Voltar para Login
        </Link>
      </section>
    </div>
  );
}

export default AddUser;
