import os from "os";

export const showUsername = () => {
  console.log(os.userInfo().username);
};
