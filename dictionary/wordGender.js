function wordGender(word, pronoun) {
    const dictionary = require("./dictionary.json");

    const wordPronouns = dictionary[word];

    if (!wordPronouns) throw "Word does not exist in dictionary";

    if (pronoun !== "A") return wordPronouns[pronoun];

    const randomPicker = Math.floor(Math.random() * 2) % 2 === 0;
    const alternated = randomPicker ? wordPronouns.M : wordPronouns.F;

    return alternated;
}

export default wordGender;
