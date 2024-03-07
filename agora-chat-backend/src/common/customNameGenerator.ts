import { uniqueNamesGenerator } from "unique-names-generator";
import { customNameGeneratorConfig } from "../config/customNameGenerator";

export const generateName = () => {
  const randomName: string = uniqueNamesGenerator(customNameGeneratorConfig);
  return randomName;
};
