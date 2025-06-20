import Country from "@/utils/Country/Country";
import { useEffect, useState } from "react";

function getSavedValue<T>(key: string, initialValue: any): T {
  const item = localStorage.getItem(key);
  if (item === null) return initialValue;

  const savedValue = JSON.parse(item);

  if (key === "favoriteList" && Array.isArray(savedValue)) {
    return savedValue.map((obj) => Country.fromJSON(obj)) as T;
  }

  return savedValue ? savedValue : initialValue;
}

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    return getSavedValue<T>(key, initialValue);
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
