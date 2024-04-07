import { useState } from "react";

function useLocalStorage(key:string, initialValue?:any) {
    const [storedValue, setStoredValue] = useState(() => {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.error('Error retrieving data from local storage:', error);
        return initialValue;
      }
    });
    const setValue = (value) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error('Error saving data to local storage:', error);
      }
    };
  
    return [storedValue, setValue];
  }
  
  export default useLocalStorage;