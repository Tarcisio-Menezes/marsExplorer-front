/* eslint-disable import/prefer-default-export */
export const getDatesAndPhotos = (rover, day, page) => (
  fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${day}&page=${page}&api_key=DEMO_KEY`)
    .then((initial) => (
      initial
        .json()
        .then((json) => (initial.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);
