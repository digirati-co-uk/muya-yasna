// const baseUrl = 'https://muya.ch.digtest.co.uk/api/yasna';
const baseUrl = 'http://localhost:8000/api/yasna';

const endpoints = {
  annotations: `${baseUrl}/annotation/range/`,
  navigation: `${baseUrl}/navigation/`,
  object: `${baseUrl}/object/`,
  objectsInFrame: `${baseUrl}/framerange/`,
};

export default endpoints;
