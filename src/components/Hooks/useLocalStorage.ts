import { useEffect, useState } from "react";

function getSavedValue(key: string, initialValue: any) {
  const item = localStorage.getItem(key);
  if (item === null) return initialValue;

  const savedValue = JSON.parse(item);
  return savedValue ? savedValue : initialValue;
}

export default function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState(() => {
    return getSavedValue(key, initialValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}

export function clearLocalStorage() {
  localStorage.clear();
  location.reload();
}
