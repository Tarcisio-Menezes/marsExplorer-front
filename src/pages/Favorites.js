/* eslint-disable no-alert */
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import MainContext from '../context/MainContext';
import Nav from '../components/Nav';
import '../css/favorites.css';

require('dotenv').config();

const host = process.env.HOST || 'https://mars-api-01.herokuapp.com';

function Favorites() {
  const { token, setFavorites, userEmail, favorites } = useContext(MainContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getFavorites() {
      const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        authorization: token,
      };
      axios.get(`http://${host}/favorite`, { headers })
        .then((response) => {
          if (response.data) return setFavorites(response.data);
        })
        .catch((errorOrResponse) => console.log(errorOrResponse));
    }
    getFavorites();
    setLoading(false);
  }, [setFavorites, token, favorites]);

  const removeFromFavorites = (id) => {
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      authorization: token,
    };
    axios.delete(`http://${host}/favorite/${id}`, { headers })
      .then((response) => response)
      .catch((errorOrResponse) => alert(`Você pode remover apenas os seus favoritos!
        ${errorOrResponse}`));
  };

  const listOfFavorites = () => {
    if (loading || !favorites) return <h4>Carregando...</h4>;
    return (
      <div>
        <Nav />
        <section className="favoritePageText">
          <h1>Observatório</h1>
          <h3>
            Olá! Que bom que você veio ao nosso observatório, ele é
            dedicado a você! Aqui podemos ver as melhores
            imagens, de acordo com os olhos das pessoas colaboradoras.
            Bora aumentar esta coleção!
          </h3>
          <p>
            explorador conectado:
            {' '}
            {userEmail}
          </p>
        </section>
        <section className="homePhotos">
          { favorites && favorites.map((favorite, index) => (
            <Card
              className="homeCard"
              style={ { width: '18rem' } }
              key={ index }
            >
              <a
                href={ favorite.imagePath }
                target="_blank"
                rel="noreferrer"
              >
                <Card.Img variant="top" src={ favorite.imagePath } />
              </a>
              <Card.Body>
                <Card.Title>
                  { favorite.rover }
                </Card.Title>
                <Card.Subtitle
                  className="mb-2 text-muted"
                >
                  Câmera:
                  { favorite.camera }
                </Card.Subtitle>
                <Card.Text>
                  Pelos olhos de:
                  {' '}
                  { favorite.user.name }
                </Card.Text>
                <Card.Text>
                  Contato:
                  {' '}
                  { favorite.user.email }
                </Card.Text>
              </Card.Body>
              <Button
                variant="outline-secondary"
                onClick={ () => removeFromFavorites(favorite.id) }
              >
                Remover dos favoritos
              </Button>
            </Card>
          ))}
        </section>
      </div>
    );
  };

  return (
    <div>
      { token ? listOfFavorites() : <h3>Explorador não autenticado</h3> }
    </div>
  );
}

export default Favorites;
