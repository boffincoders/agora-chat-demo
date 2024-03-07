import { Config, adjectives, colors } from "unique-names-generator";

export const customNameGeneratorConfig: Config = {
  dictionaries: [adjectives, colors],
  separator: "-",
  length: 2,
};
