import { api } from '../api';

const getAll = async (endpoint) => {
  let response = null;

  try {
    response = (await api.get(endpoint)).data;
  } catch (error) {
    console.log(error);
  }

  return response;
};

const getByQuery = async (endpoint, query) => {
  let response = null;

  try {
    response = (await api.get(`${endpoint}?${query}`)).data;
  } catch (error) {
    console.log(error);
  }

  return response;
};

export const request = {
  getAll: getAll,
  getByQuery: getByQuery
};
