const express = require("express");
const app = express();
var fs = require("fs");

app.get("/", async (req, res) => {
  var arr = fs.readFileSync("./file.txt").toString().split("\n"); // chats converted to array

  // FIND FREQUENCY OF A PARTICULAR WORD
  var x = 0;
  const word = "you";
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].toString().toLowerCase().includes(word)) x++;
  }

  // FIND FREQUENCY OF AN EMOJI ALONG WITH TOTAL MESSAGES AND CHARACTERS EXCHANGED
  let t = 0;
  t += arr.length;
  arr = arr.toString();

  var count = (toUni(arr.toString()).match(/1f60d/g) || []).length;

  return res.json({
    totalMessagesExchanged: t,
    totalCharactersExchanged: arr.length - t,
    emoji: "eyes heart",
    count,
    specificWord: word,
    specificWordCount: x,
  });
});

// Convert strings to unicode
const toUni = function (str) {
  let s = "";
  for (var i = 0; i < str.length - 1; i++) {
    s = s + str.codePointAt(i).toString(16) + "-";
  }
  return s;
};

// start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
