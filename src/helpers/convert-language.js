import { langToLang } from "language-name-to-language-name";

export const convertLanguage = (code) => {
  const language = code;
  return langToLang(language);
};
