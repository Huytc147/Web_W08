import fs from "fs/promises";
import path from "path";
//path JSON data file
const dbFilePath = path.join(process.cwd(),"assets", "data.json");

//read data from JSON
const readData = async () => {
    const jsonData = await fs.readFile(dbFilePath);
    return JSON.parse(jsonData);
};

//write data to JSON 
const writeData = async (data) => {
    await fs.writeFile(dbFilePath, JSON.stringify(data, null, 2));
};

//Export the functions for use in other modules
export {readData, writeData};