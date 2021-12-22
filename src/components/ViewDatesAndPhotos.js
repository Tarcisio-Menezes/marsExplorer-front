/* eslint-disable no-alert */
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Form, Card, Button } from 'react-bootstrap';
import MainContext from '../context/MainContext';
import '../css/viewDatesAndPhotos.css';

require('dotenv').config();

const host = process.env.HOST || 'localhost';

function ViewDatesAndPhotos() {
  const { setDay, setPage, dataRover, token } = useContext(MainContext);
  const [imagePath, setImagePath] = useState('');
  const [rover, setRover] = useState('');
  const [camera, setCamera] = useState('');
  const [landing, setLanding] = useState('');
  const [launch, setLaunch] = useState('');

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    authorization: token,
  };

  const addToFavorites = () => {
    const body = {
      imagePath,
      rover,
      camera,
      landing,
      launch,
    };

    axios.post(`http://${host}:3003/favorite`, body, { headers })
      .then((response) => {
        if (response.data) {
          return alert(`Foto de ${rover} adicionada aos favoritos`);
        }
      })
      .catch((errorOrResponse) => console.log(errorOrResponse));
  };

  const addInformationsToFavorites = async (
    imgSrc,
    roverName,
    cameraFullName,
    roverLandingDate,
    roverLaunchDate,
  // eslint-disable-next-line max-params
  ) => {
    setImagePath(imgSrc);
    setRover(roverName);
    setCamera(cameraFullName);
    setLanding(roverLandingDate);
    setLaunch(roverLaunchDate);
    return addToFavorites();
  };

  if (dataRover) {
    const { photos } = dataRover;
    return (
      <div className="searchHome">
        <h3>Agora vamos explorar ainda mais!</h3>
        <p>
          Utilize os campos abaixo para fazer uma pesquisa combinada.
          Digite um número inteiro que representará o dia em
          que deseja ver algumas imagens, contando a partir da data
          em que o rover chegou em marte. Dica: 1 representa o
          primeiro dia do rover no planeta, 2 representa o segundo, e assim por diante.
          As imagens podem demorar cerca de 6 segundos para serem renderizadas no card,
          devido a alta resolução de captura da maioria delas! :)
        </p>
        <Form.Group className="mb-3 formData" controlId="formBasicPassword">
          <Form.Label>Dia marciano:</Form.Label>
          <Form.Control
            type="number"
            min="1"
            step="1"
            placeholder="Digite o dia."
            onChange={ ({ target }) => setDay(target.value) }
          />
          <Form.Label>Navegue pelas páginas:</Form.Label>
          <Form.Control
            type="number"
            min="1"
            max="4"
            step="1"
            placeholder="Página."
            onChange={ ({ target }) => setPage(target.value) }
          />
        </Form.Group>
        <section className="homePhotos">
          { photos && photos.map((photo, index) => (
            <Card
              className="homeCard"
              style={ { width: '18rem' } }
              key={ index }
            >
              <a
                href={ photo.img_src }
                target="_blank"
                rel="noreferrer"
              >
                <Card.Img variant="top" src={ photo.img_src } />
              </a>
              <Card.Body>
                <Card.Title>
                  { photo.rover.name }
                </Card.Title>
                <Card.Subtitle
                  className="mb-2 text-muted"
                >
                  { photo.camera.full_name }
                </Card.Subtitle>
                <Card.Subtitle
                  className="mb-2 text-muted"
                >
                  Data da captura:
                  {' '}
                  { photo.earth_date }
                </Card.Subtitle>
                <Card.Text>
                  Status do rover:
                  {' '}
                  { photo.rover.status }
                </Card.Text>
              </Card.Body>
              <Button
                variant="outline-secondary"
                onClick={ () => addInformationsToFavorites(
                  photo.img_src,
                  photo.rover.name,
                  photo.camera.full_name,
                  photo.rover.landing_date,
                  photo.rover.launch_date,
                ) }
              >
                Adicionar aos favoritos
              </Button>
            </Card>
          ))}
        </section>
      </div>
    );
  } return rover && !dataRover ? <p>Carregando...</p> : null;
}

export default ViewDatesAndPhotos;
