/** @format */

import { ToWords } from "to-words";
import convertor from "number-to-words";

const WordConvertor = (value, userData) => {
  // const word = new ToWords({
  //   localeCode: "en-IN",

  //   converterOptions: {
  //     currency: true,
  //     ignoreDecimal: false,
  //     ignoreZeroCurrency: false,
  //     doNotAddOnly: false,
  //   },
  // });
  // let words = word.convert(value);

  return convertor.toWords(value);
};

export default WordConvertor;
