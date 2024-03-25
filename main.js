// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]

// functions

// function to validate credit card numbers using Luhn algo
function validateCred(arr) {
  let sum = 0; // total of all iteration calcs
  let isEven = false; // used as toggle for odd/even - must start false so last digit isn't doubled according to Luhn's algo

  // Iterate through the digits from right to left
  for (let i = arr.length - 1; i >= 0; i--) {
      let digit = arr[i];
      // Double every second digit
      if (isEven) {
          digit *= 2;
          if (digit > 9) {
              digit -= 9;
          }
      }
      sum += digit; // adds to total
      isEven = !isEven; // Toggle for next iteration
  }
  // The number is valid if the sum is a multiple of 10
  return sum % 10 === 0;
}

let invalidArr = [];
function findInvalidCards(nestArr) {
  for (let i = 0; i < nestArr.length; i++){
    if (validateCred(nestArr[i]) === false) {
      invalidArr.push(nestArr[i]);
    }
  }
  return invalidArr;
}

let invalidCompanies = [];
function idInvalidCardCompanies(nestInvArr) {
  for (let i = 0; i < nestInvArr.length; i++) {
    if (nestInvArr[i][0] === 3 && invalidCompanies.indexOf("Amex (American Express)") === -1) {
      invalidCompanies.push("Amex (American Express)");
    }
    else if (nestInvArr[i][0] === 4 && invalidCompanies.indexOf("Visa") === -1) {
      invalidCompanies.push("Visa");
    }
    else if (nestInvArr[i][0] === 5 && invalidCompanies.indexOf("Mastercard") === -1) {
      invalidCompanies.push("Mastercard");
    }
    else if (nestInvArr[i][0] === 6 && invalidCompanies.indexOf("Discover") === -1) {
      invalidCompanies.push("Discover");
    }
  }
  return invalidCompanies;
}

// saves invalid cards to array "invalidArr"
findInvalidCards(batch);

// logs array of invalidCompanies that have issued an invalid card
console.log(idInvalidCardCompanies(invalidArr)); // logs ['Visa', 'Mastercard', 'Amex (American Express)', 'Discover']
let listInvCompanies = idInvalidCardCompanies(invalidArr).join(", "); // join to make them easier to read

console.log("These companies have issued invalid cards: " + listInvCompanies); // logs "These companies have issued invalid cards: Visa, Mastercard, Amex (American Express), Discover"














