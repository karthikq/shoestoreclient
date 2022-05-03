/** @format */

import React from "react";
import { ToWords } from "to-words";
const WordConvertor = (value) => {
  const word = new ToWords({
    localeCode: "en-IN",
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: false,
    },
  });
  let words = word.convert(value);
  console.log(words);
  return words;
};

export default WordConvertor;
