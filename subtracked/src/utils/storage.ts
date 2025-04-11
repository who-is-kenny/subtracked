// src/utils/storage.ts
import { Subscription } from "../types/types";

// helper functions to save and load data from local storage
const saveToLocalStorage = (data: Subscription[]) => {
  localStorage.setItem("subscriptions", JSON.stringify(data));
};
const loadFromLocalStorage = (): Subscription[] => {
  try {
    const data = localStorage.getItem("subscriptions");
    if (!data) return [];

    const parsed = JSON.parse(data) as Subscription[];

    // Convert startDate and endDate back to Date object or else doesnt work
    // when loading from local storage
    return parsed.map((sub) => ({
      ...sub,
      startDate: new Date(sub.startDate),
      endDate: new Date(sub.endDate),
    }));
  } catch (error) {
    console.error("Failed to parse subscriptions from localStorage:", error);
    return [];
  }
};

export { saveToLocalStorage, loadFromLocalStorage };
