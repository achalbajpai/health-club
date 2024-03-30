import { API_ROUTES } from "@/utils/constants";

const BACKEND_URL: string = process.env.BACKEND_URL || "http://localhost:8000";

const makePostFormRequest = async (
  url: string,
  data: FormData,
  signal?: AbortSignal
) => {
  const response = await fetch(BACKEND_URL + url, {
    method: "POST",
    // headers: {
    //   "Content-Type": "multipart/form-data",
    // },
    credentials: "include",
    body: data,
    signal: signal,
  });
  const json = await response.json();
  return {
    status: response.status,
    res: { ...json },
  };
};

const makePostRequest = async (
  url: string,
  data?: object,
  signal?: AbortSignal
) => {
  const response = await fetch(BACKEND_URL + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : null,
    credentials: "include",
    signal: signal,
  });

  const json = await response.json();
  return {
    status: response.status,
    res: { ...json },
  };
};

const makeGetRequest = async (url: string, signal?: AbortSignal) => {
  const response = await fetch(BACKEND_URL + url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    signal: signal,
  });

  const json = await response.json();

  return {
    status: response.status,
    res: { ...json },
  };
};

export class Service {
  static async signUp(data: FormData, signal?: AbortSignal) {
    return await makePostFormRequest(API_ROUTES.SignUp, data, signal);
  }
  static async login(data: object, signal?: AbortSignal) {
    return await makePostRequest(API_ROUTES.Login, data, signal);
  }
  static async logout(signal?: AbortSignal) {
    return await makeGetRequest(API_ROUTES.Logout, signal);
  }
  static async verify(signal?: AbortSignal) {
    return await makeGetRequest(API_ROUTES.VerifyToken, signal);
  }
  static async getAllPosts(signal?: AbortSignal) {
    return await makeGetRequest(API_ROUTES.GetAllPosts, signal);
  }
  static async upVotePost(postId: string, signal?: AbortSignal) {
    return await makePostRequest(API_ROUTES.UpVote + `/${postId}`, signal);
  }
  static async unVotePost(postId: string, signal?: AbortSignal) {
    return await makePostRequest(API_ROUTES.UnVote + `/${postId}`, signal);
  }
}
