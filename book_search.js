/**
 * RECOMMENDATION
 *
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 *
 * The Developer Tools in Chrome are available under the "..." menu,
 * futher hidden under the option "More Tools." In Firefox, they are
 * under the hamburger (three horizontal lines), also hidden under "More Tools."
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for.
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */
function findSearchTermInBooks(searchTerm, scannedTextObj) {
  var result = {
    SearchTerm: searchTerm,
    Results: [],
  };

  scannedTextObj.forEach((book) => {
    book.Content.forEach((line) => {
      if (line.Text.includes(searchTerm)) {
        result.Results.push({
          ISBN: book.ISBN,
          Page: line.Page,
          Line: line.Line,
        });
      }
    });
  });

  return result;
}

/** Example input object. */
const twentyLeaguesIn = [
  {
    Title: "Twenty Thousand Leagues Under the Sea",
    ISBN: "9780000528531",
    Content: [
      {
        Page: 31,
        Line: 8,
        Text: "now simply went on by her own momentum.  The dark-",
      },
      {
        Page: 31,
        Line: 9,
        Text: "ness was then profound; and however good the Canadian's",
      },
      {
        Page: 31,
        Line: 10,
        Text: "eyes were, I asked myself how he had managed to see, and",
      },
    ],
  },
];

/** Example output object */
const twentyLeaguesOut = {
  SearchTerm: "the",
  Results: [
    {
      ISBN: "9780000528531",
      Page: 31,
      Line: 9,
    },
  ],
};

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that
 * output to the console. We've provided two tests as examples, and
 * they should pass with a correct implementation of `findSearchTermInBooks`.
 *
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
  console.log("PASS: Test 1");
} else {
  console.log("FAIL: Test 1");
  console.log("Expected:", twentyLeaguesOut);
  console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn);
if (test2result.Results.length == 1) {
  console.log("PASS: Test 2");
} else {
  console.log("FAIL: Test 2");
  console.log("Expected:", twentyLeaguesOut.Results.length);
  console.log("Received:", test2result.Results.length);
}

/** Test Case 3: Case-Sensitive Test - "The" vs "the" */
const test3result = findSearchTermInBooks("The", twentyLeaguesIn);
if (JSON.stringify(test3result) !== JSON.stringify(twentyLeaguesOut)) {
  console.log("PASS: Test 3 (Case-Sensitive Test)");
} else {
  console.log("FAIL: Test 3 (Case-Sensitive Test)");
  console.log("Expected different results for 'The'");
  console.log("Received:", test3result);
}

/** Test Case 4: Negative Test - Word "xyz" does not exist */
const test4result = findSearchTermInBooks("xyz", twentyLeaguesIn);
if (test4result.Results.length === 0) {
  console.log("PASS: Test 4 (Negative Test)");
} else {
  console.log("FAIL: Test 4 (Negative Test)");
  console.log("Expected 0 results for 'xyz'");
  console.log("Received:", test4result.Results.length, "results");
}

/** Test Case 5: Empty String Test - Searching with empty string */
const test5result = findSearchTermInBooks("", twentyLeaguesIn);
if (test5result.Results.length === 0) {
  console.log("PASS: Test 5 (Empty String Test)");
} else {
  console.log("FAIL: Test 5 (Empty String Test)");
  console.log("Expected 0 results for empty string");
  console.log("Received:", test5result.Results.length, "results");
}

/** Test Case 6: Special Characters Test - Searching "Canadian's" */
const test6result = findSearchTermInBooks("Canadian's", twentyLeaguesIn);
if (test6result.Results.length > 0) {
  console.log("PASS: Test 6 (Special Characters Test)");
} else {
  console.log("FAIL: Test 6 (Special Characters Test)");
  console.log("Expected results for 'Canadian's'");
  console.log("Received:", test6result.Results.length, "results");
}

/** Test Case 7: Full Text Match Test - Searching a complete line of text */
const fullText = "now simply went on by her own momentum.  The dark-";
const test7result = findSearchTermInBooks(fullText, twentyLeaguesIn);
if (test7result.Results.length === 1) {
  console.log("PASS: Test 7 (Full Text Match Test)");
} else {
  console.log("FAIL: Test 7 (Full Text Match Test)");
  console.log("Expected 1 result for the full text search");
  console.log("Received:", test7result.Results.length, "results");
}

/** Test Case 8: No Content Test - Book with empty content */
const emptyContentBook = [{
  "Title": "Empty Book",
  "ISBN": "0000000000",
  "Content": []
}];
const test8result = findSearchTermInBooks("any", emptyContentBook);
if (test8result.Results.length === 0) {
  console.log("PASS: Test 8 (No Content Test)");
} else {
  console.log("FAIL: Test 8 (No Content Test)");
  console.log("Expected 0 results for a book with no content");
  console.log("Received:", test8result.Results.length, "results");
}

/** Test Case 9: Multiple Matches Test */
// Note: This test requires 'twentyLeaguesIn' to contain a term that appears on multiple lines.
const test9result = findSearchTermInBooks("multiple", twentyLeaguesIn); 
if (test9result.Results.length > 1) {
  console.log("PASS: Test 9 (Multiple Matches Test)");
} else {
  console.log("FAIL: Test 9 (Multiple Matches Test)");
  console.log("Expected multiple results for 'multiple'");
  console.log("Received:", test9result.Results.length, "results");
}

/** Test Case 10: No Books Test - Empty books array */
const test10result = findSearchTermInBooks("any", []);
if (test10result.Results.length === 0) {
  console.log("PASS: Test 10 (No Books Test)");
} else {
  console.log("FAIL: Test 10 (No Books Test)");
  console.log("Expected 0 results for empty book array");
  console.log("Received:", test10result.Results.length, "results");
}