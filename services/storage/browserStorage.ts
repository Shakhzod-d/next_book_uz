"use client";

class ApiStorage {
  public get<T>(key: string): T | undefined | string {
    if (typeof window === "undefined") return undefined;
    if (!(key in window.localStorage)) return undefined;
    let savedData = window.localStorage.getItem(key) as string;
    if (typeof savedData === "object") return JSON.parse(savedData);
    return savedData;
  }

  public set<T, K extends string>(
    key: K,
    savingData: T | string
  ): void | undefined {
    if (!savingData) return undefined;

    if (typeof savingData === "object") savingData = JSON.stringify(savingData);

    localStorage.setItem(key, savingData as string);
  }

  public update<T extends string, K extends string>(
    key: K,
    newData: T
  ): string {
    if (!(key in localStorage)) return "key_not_available";
    localStorage.setItem(key, newData as string);

    return "update_success";
  }

  public remove(key: string) {
    if (key in localStorage) {
      localStorage.removeItem(key);
    }
  }
}

const browserStorage = new ApiStorage();

export default browserStorage;
