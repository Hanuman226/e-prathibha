import api from "../axios.config";

export function postData(url, headers, method = "post", body = "") {
  const { Id, Token } = headers;
  const serverKey = process.env.REACT_APP_SERVER_KEY;
  console.log("called me");
  return api({
    url: url,
    method: method,
    data: body,
    headers: {
      id: Id,
      tokenu: Token,
      server_key: serverKey,
    },
  });
}
