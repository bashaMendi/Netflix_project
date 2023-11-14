import axios from "axios";
import { TOKEN_KEY } from "../constant/url";

export const apiGet = async (_url) => {
  console.log(_url);
  try {
    const resp = await axios.get(_url, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": localStorage[TOKEN_KEY],
      },
    });
    return resp;
  } catch (err) {
    throw err;
  }
};

export const apiPost = async (_url, _bodyData) => {
  try {
    const resp = await axios({
      url: _url,
      data: JSON.stringify(_bodyData),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": localStorage[TOKEN_KEY],
      },
    });
    console.log(resp);
    return resp;
  } catch (err) {
    throw err;
  }
};

// בקשות ל POST,PUT,DELETE,PATCH
export const apiMethod = async (_url, _method, _bodyData) => {
  try {
    // console.log(_bodyData);
    const { data } = await axios({
      url: _url,
      method: _method,
      data: _bodyData,
      headers: {
        "x-api-key": localStorage[TOKEN_KEY],
      },
    });
    // console.log(data);
    // פונקציה שהיא אסיכורנית תמיד
    // תחזיר את המידע כפרומיס
    // console.log(data);
    // console.log(data);
    return data;
  } catch (err) {
    // throw -> כמו רטרן אבל מיוצג כשגיאה
    // שניתן לתפוס בקץ
    throw err;
  }
};
