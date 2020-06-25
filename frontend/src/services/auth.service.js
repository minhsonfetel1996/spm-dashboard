import { post } from "./http.service";

const API_AUTH_EP = "/auth";

function login(body) {
  return new Promise((resolve) => {
    post(API_AUTH_EP + "/login", {
      ...body,
    })
      .then(({ status, data: response }) => {
        if (status === 200) {
          const user = response.user;
          if (!user) {
            resolve({
              status: 400,
              message: "Failed to generate token",
            });
          } else {
            resolve({
              status: status,
              user,
              message: response.message,
            });
          }
        } else {
          resolve({
            status: status,
            message: response.message,
          });
        }
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
  return new Promise(async (resolve) => {
    const { status, data: response } = await post(API_AUTH_EP + "/register", {
      ...body,
    });
    if (status === 200) {
      const user = response.user;
      if (!user) {
        resolve({
          status: 400,
          message: "Failed to generate token",
        });
      } else {
        resolve({
          status: status,
          user,
          message: response.message,
        });
      }
    } else {
      resolve({
        status: status,
        message: response.message,
      });
    }
  });
}

function logout() {
  return new Promise(async (resolve) => {
    const { status, data: response } = await post(
      API_AUTH_EP + "/logout",
      null
    );
    resolve({
      status: status,
      message: response.message,
    });
  });
}

function keepAlive() {
  return new Promise((resolve) => {
    post(API_AUTH_EP + "/keep-alive", null)
      .then(({ status, data: response }) => {
        if (status === 200) {
          resolve({
            status: status,
            user: response.user,
          });
        } else {
          resolve({
            status: status,
            message: response.message,
          });
        }
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
