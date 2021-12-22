import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MainContext from '../context/MainContext';

function SelectRover() {
  const { setRover, token } = useContext(MainContext);

  if (!token) {
    return (
      <div>
        <h3>Desculpe, você não está autenticado em nosso sistema :(</h3>
        <Link to="/">
          <p>Venha fazer login!</p>
        </Link>
      </div>
    );
  } return (
    <section className="selectRover">
      <h2>Selecione um rover para explorar:</h2>
      <div>
        <label htmlFor="curiosity">
          <input
            type="radio"
            id="curiosity"
            name="rover"
            value="curiosity"
            onChange={ ({ target }) => setRover(target.value) }
          />
          Curiosity
        </label>
      </div>
      <div>
        <label htmlFor="opportunity">
          <input
            type="radio"
            id="opportunity"
            name="rover"
            value="opportunity"
            onChange={ ({ target }) => setRover(target.value) }
          />
          Opportunity
        </label>
      </div>
      <div>
        <label htmlFor="spirit">
          <input
            type="radio"
            id="spirit"
            name="rover"
            value="spirit"
            onChange={ ({ target }) => setRover(target.value) }
          />
          Spirit
        </label>
      </div>
    </section>
  );
}

export default SelectRover;
