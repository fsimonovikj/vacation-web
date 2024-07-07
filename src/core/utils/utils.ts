export function setLocalStorageWithExpiry(key: any, value: any) {
  const now = new Date().toISOString().slice(0, 10);

  const item = {
    value: value,
    expiry: now,
  };

  localStorage.setItem(key, JSON.stringify(item));
}

export function getLocalStorageWithExpiry(key: any) {
  const itemStr = localStorage.getItem(key);

  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  const now = new Date().toISOString().slice(0, 10);

  if (now > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
}

export function removeLocalStorage(key: any) {
  const itemStr = localStorage.getItem(key);

  if (!itemStr) {
    return null;
  }

  localStorage.removeItem(key);

  return `Successfully removed ${key} from storage..`;
}

export const getLocalizedMessage = (messages: any) => {
  const localisation = process.env.REACT_APP_LOCALISATION || "en"; // This should be dynamic and based on user's locale
  return messages[localisation] || messages["en"]; // Default to 'en' if locale not found
};
