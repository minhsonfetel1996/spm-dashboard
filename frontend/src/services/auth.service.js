import { post } from "./http.service";

const API_AUTH_EP = "/auth";

function login(body) {
  return new Promise((resolve) => {
    post(API_AUTH_EP + "/login", {
      ...body,
    })
      .then(({ status, data: response }) => {
        resolve({
          status,
          user: response.user || null,
          message: response.message,
        });
      })
      .catch((error) => {
        resolve({
          status: 500,
          message: error.message,
        });
      });
  });
}

function register(body) {
  return new Promise((resolve) => {
    post(API_AUTH_EP + "/register", {
      ...body,
    })
      .then(({ status, data: response }) => {
        resolve({
          status: status,
          user: response.user || null,
          message: response.message,
        });
      })
      .catch((error) => {
        resolve({
          status: 500,
          message: error.message,
        });
      });
  });
}

function logout() {
  return new Promise((resolve) => {
    post(API_AUTH_EP + "/logout", null)
      .then(({ status, message }) => {
        resolve({
          status: status,
          message: message,
        });
      })
      .catch((error) => {
        resolve({
          status: 500,
          message: error.message,
        });
      });
  });
}

function keepAlive() {
  return new Promise((resolve) => {
    post(API_AUTH_EP + "/keep-alive", null)
      .then(({ status, data: response }) => {
        resolve({
          status: status,
          user: response.user,
        });
      })
      .catch((error) => {
        resolve({
          status: 500,
          message: error.message,
        });
      });
  });
}

export { login, logout, keepAlive, register };
