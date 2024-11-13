"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const AccountType = {
    Normal: "Brukskonto",
    Saving: "Sparekonto",
    Credit: "Kreditkonto",
    Pension: "Pensionskonto"
};

// Print the account types as a comma-separated line
printOut(`${AccountType.Normal}, ${AccountType.Saving}, ${AccountType.Credit}, ${AccountType.Pension}`);
printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
class TAccount {
    #type;

    constructor(aType) {
        this.#type = aType;
    }

    toString() {
        return this.#type;
    }

    setType(aType) {
        const oldType = this.#type;
        this.#type = aType;
        printOut(`Account is changed from ${oldType} to ${this.#type}`);
    }
}

// Create an instance of the TAccount class
const myAccount = new TAccount(AccountType.Normal);
printOut(`myAccount = ${myAccount.toString()}`);

// Change the account type
myAccount.setType(AccountType.Saving);
printOut(`myAccount = ${myAccount.toString()}`);
printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
// Extend the TAccount class
class TAccountWithBalance extends TAccount {
    #balance;

    constructor(aType, balance = 0) {
        super(aType);
        this.#balance = balance;
    }

    getBalance() {
        return this.#balance;
    }

    deposit(aAmount) {
        this.#balance += aAmount;
        printOut(`Deposit of ${aAmount}, new balance is ${this.#balance}`);
    }

    withdraw(aAmount) {
        if (aAmount <= this.#balance) {
            this.#balance -= aAmount;
            printOut(`Withdrawal of ${aAmount}, new balance is ${this.#balance}`);
        } else {
            printOut("Insufficient funds!");
        }
    }
}

// Create an account and perform transactions
const myAccountWithBalance = new TAccountWithBalance(AccountType.Normal);
myAccountWithBalance.deposit(100);
myAccountWithBalance.withdraw(25);
printOut(`My account balance is ${myAccountWithBalance.getBalance()}`);
printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
class TAccountWithLimits extends TAccountWithBalance {
    #withdrawCount;

    constructor(aType, balance = 0) {
        super(aType, balance);
        this.#withdrawCount = 0;
    }

    withdraw(aAmount) {
        switch (this.toString()) {
            case AccountType.Pension:
                printOut("You can't withdraw from a Pensionskonto!");
                return;
            case AccountType.Saving:
                if (this.#withdrawCount >= 3) {
                    printOut("You can't Withdraw from a Sparekonto more than three times!");
                    return;
                }
                break;
        }

        super.withdraw(aAmount);
        this.#withdrawCount++;
    }

    setType(aType) {
        super.setType(aType);
        this.#withdrawCount = 0;  // Reset withdrawal count on type change
    }
}

// Create account and perform transactions with limits
const accountWithLimits = new TAccountWithLimits(AccountType.Saving, 100);
accountWithLimits.deposit(25);
accountWithLimits.withdraw(30);
accountWithLimits.withdraw(30);
accountWithLimits.withdraw(30); // This will trigger the limit message
accountWithLimits.setType(AccountType.Pension);
accountWithLimits.withdraw(10); // This will trigger the pension withdrawal message
accountWithLimits.setType(AccountType.Saving);
accountWithLimits.withdraw(10); // Should work fine now
printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const CurrencyTypes = {
    NOK: { value: 1.0080, name: "Norske kroner" },
    EUR: { value: 0.0985, name: "Europeiske euro" },
    USD: { value: 9.1991, name: "United States dollar" },
    GBP: { value: 0.0847, name: "Pound sterling" },
    INR: { value: 7.8309, name: "Indiske rupee" },
    AUD: { value: 6.1581, name: "Australienske dollar" },
    PHP: { value: 6.5189, name: "Filippinske peso" },
    SEK: { value: 1.0580, name: "Svenske kroner" },
    CAD: { value: 0.1435, name: "Canadiske dollar" },
    THB: { value: 3.3289, name: "Thai baht" }
};

class TAccountWithCurrency extends TAccountWithLimits {
    #currencyType;

    constructor(aType, balance = 0, currencyType = CurrencyTypes.NOK) {
        super(aType, balance);
        this.#currencyType = currencyType;
    }

    setCurrencyType(aCurrencyType) {
        if (this.#currencyType === aCurrencyType) {
            return;
        }
        printOut(`The account currency has changed from ${this.#currencyType.name} to ${aCurrencyType.name}`);
        this.#currencyType = aCurrencyType;
    }

    deposit(aAmount, currency = this.#currencyType) {
        super.deposit(aAmount * currency.value);
        printOut(`Deposit of ${aAmount} ${currency.name}, new balance is ${this.getBalance()} ${this.#currencyType.name}`);
    }

    withdraw(aAmount, currency = this.#currencyType) {
        super.withdraw(aAmount * currency.value);
        printOut(`Withdrawal of ${aAmount} ${currency.name}, new balance is ${this.getBalance()} ${this.#currencyType.name}`);
    }
}


const accountWithCurrency = new TAccountWithCurrency(AccountType.Normal, 0);
accountWithCurrency.deposit(150);
accountWithCurrency.setCurrencyType(CurrencyTypes.USD);
accountWithCurrency.withdraw(10, CurrencyTypes.GBP);
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
const currencyTestAccount = new TAccountWithCurrency(AccountType.Normal, 150, CurrencyTypes.NOK);


currencyTestAccount.setCurrencyType(CurrencyTypes.SEK);
printOut(`New balance is ${(currencyTestAccount.getBalance() * CurrencyTypes.SEK.value).toFixed(2)}kr`);


currencyTestAccount.setCurrencyType(CurrencyTypes.USD);
printOut(`New balance is ${(currencyTestAccount.getBalance() * CurrencyTypes.USD.value).toFixed(3)}`);


currencyTestAccount.setCurrencyType(CurrencyTypes.NOK);
printOut(`New balance is ${(currencyTestAccount.getBalance()).toFixed(2)}kr`);
printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
class TAccountWithMultiCurrency extends TAccountWithCurrency {
    #currencyType;

    constructor(aType, balance = 0, currencyType = CurrencyTypes.NOK) {
        super(aType, balance, currencyType);
        this.#currencyType = currencyType;
    }

   
    formatCurrency(value) {
        return value.toFixed(2); 
    }


    deposit(aAmount, currency = this.#currencyType) {
        const amountInAccountCurrency = aAmount * currency.value;
        super.deposit(amountInAccountCurrency);

        
        printOut(`Deposit of ${aAmount.toFixed(2)} ${currency.name}, new balance is ${this.formatCurrency(this.getBalance())}kr`);
    }


    withdraw(aAmount, currency = this.#currencyType) {
        const amountInAccountCurrency = aAmount * currency.value;
        super.withdraw(amountInAccountCurrency);

        
        printOut(`Withdrawal of ${aAmount.toFixed(2)} ${currency.name}, new balance is ${this.formatCurrency(this.getBalance())}kr`);
    }

  
    setCurrencyType(aCurrencyType) {
        if (this.#currencyType === aCurrencyType) return;

        printOut(`The account currency has changed from ${this.#currencyType.name} to ${aCurrencyType.name}`);

        const conversionRate = aCurrencyType.value / this.#currencyType.value;
        this.setBalance(this.getBalance() * conversionRate);

        this.#currencyType = aCurrencyType;

        printOut(`New balance is ${this.formatCurrency(this.getBalance())}${this.getCurrencySymbol()}`);
    }


    getCurrencySymbol() {
        switch (this.#currencyType.name) {
            case 'Norske kroner': return 'kr';
            case 'United States dollar': return '$';
            case 'Pound sterling': return '£';
            case 'Canadiske dollar': return 'C$';
            case 'Indiske rupee': return '₹';
            case 'Svenske kroner': return 'kr';
            default: return ''; // Empty if unknown
        }
    }
}


const accountWithMultiCurrency = new TAccountWithMultiCurrency(AccountType.Normal, 0, CurrencyTypes.NOK);

accountWithMultiCurrency.deposit(12, CurrencyTypes.USD);  // Deposit 12 USD
accountWithMultiCurrency.withdraw(10, CurrencyTypes.GBP);  // Withdraw 10 GBP

accountWithMultiCurrency.setCurrencyType(CurrencyTypes.CAD); // Change to CAD
accountWithMultiCurrency.setCurrencyType(CurrencyTypes.INR); // Change to INR

accountWithMultiCurrency.withdraw(150.11, CurrencyTypes.SEK);  // Withdraw 150.11 SEK
printOut(newLine);

printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
function modifyString(text, maxSize, char, insertBefore) {
    // If the string is smaller than the maximum size, calculate the number of characters to add
    let textLength = text.length;
    if (textLength < maxSize) {
        let charCount = maxSize - textLength;
        
        // Create a string of the specified character to fill the gap
        let charString = char.repeat(charCount);

        // Add the characters before or after the original text based on the boolean flag
        if (insertBefore) {
            text = charString + text; // Insert characters before
        } else {
            text = text + charString; // Insert characters after
        }
    }

    // Return the modified string and print it out
    printOut(text);
    return text;
}

// Test the function
let result = modifyString("Hello", 10, "*", true);  // Inserting '*' before
let result2 = modifyString("Hello", 10, "*", false); // Inserting '*' after



