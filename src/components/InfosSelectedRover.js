import React, { useContext } from 'react';
import MainContext from '../context/MainContext';
import '../css/infosSelectedRover.css';

function InfosSelectedRover() {
  const { dataRover, rover, page, day } = useContext(MainContext);
  const { photos } = dataRover;
  if (photos && page === 1 && day === 1) {
    const imagesIndDayOne = photos.length;
    const maxPage = 25;
    return (
      <section className="preInfos">
        <p>
          {`O rover ${rover} chegou em Marte por volta de ${photos[0].earth_date}.`}
        </p>
        <p>{`Seu status de atividade é ${photos[0].rover.status}!`}</p>
        <p>
          {`Ele capturou ${
            imagesIndDayOne < maxPage ? '' : 'mais de'} ${imagesIndDayOne}
          imagens em seu primeiro dia no planeta vermelho!!`}
        </p>
      </section>
    );
  } return null;
}

export default InfosSelectedRover;
