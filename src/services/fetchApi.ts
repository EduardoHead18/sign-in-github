import { IData } from "../interface/appInterface";

let globalToken = "ok";

export const getUserToken = async (data: IData) => {
  if (data.code === "test") return console.log("invalid code");
  console.log("getUserToken", data);
  try {
    const response = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const responseJson = await response.json();
    console.log("token response", responseJson);
    globalToken = responseJson.access_token;
    return globalToken;
  } catch (error) {
    console.log(error);
  }
};

export const getUserInformation = async () => {
  if (globalToken === "ok") return console.log("the token is null or invalid");
  console.log("getUserInformation global token", globalToken);
  const response = await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${globalToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const responseJson = await response.json();
  return responseJson;
};
