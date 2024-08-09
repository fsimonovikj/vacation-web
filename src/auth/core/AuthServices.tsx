const USER_LOCAL_STORAGE_KEY = "user";

const getUser = () => {
  return JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_KEY) || "{}");
};

export { getUser, USER_LOCAL_STORAGE_KEY };
