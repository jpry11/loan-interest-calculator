import * as fs from "fs";

const cacheFile = "cache.json";

export const writeToCache = (newData: { [key: string]: any }): void => {
  const existingData = readFromCache();
  const dataToInsert = { ...existingData, ...newData };

  fs.writeFile(cacheFile, JSON.stringify(dataToInsert), (error) => {
    if (error) {
      console.error("Error writing to file:", error);
    }
  });
};

export const readFromCache = (): { [key: string]: any } => {
  try {
    const data = fs.readFileSync(cacheFile, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    fs.writeFileSync(cacheFile, JSON.stringify({}));
    return {};
  }
};

export const getLoanFromCache = (id: string) => {
  const cacheData = readFromCache();

  if (Object.keys(cacheData).length === 0) {
    console.log("Loan not found");
    return;
  }
  return cacheData[id];
};
