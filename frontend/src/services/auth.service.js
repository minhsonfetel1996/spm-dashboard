import { post } from "./http.service";

const API_AUTH_EP = "/auth";

function login(username, password) {
  return new Promise(async (resolve) => {
    const { status, data: response } = await post(API_AUTH_EP + "/login", {
      username,
      password,
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
  return new Promise(async (resolve) => {
    const { status, data: response } = await post(
      API_AUTH_EP + "/keep-alive",
      null
    );
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
  });
}

export { login, logout, keepAlive };
