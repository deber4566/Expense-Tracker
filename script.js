// ==========================================
// Step 3: Data Storage & Input Validation
// ==========================================

// 1. State Management (similar to a Python list of dictionaries: expenses = [])
// Each expense object will look like: { id: 1, name: "Dinner", amount: 100, category: "Food" }
let expenses = [];
let nextExpenseId = 1;

// 2. DOM Element References (grabbing HTML elements by their IDs so JS can read/update them)
const expenseForm = document.getElementById("expense-form");
const expenseNameInput = document.getElementById("expense-name");
const expenseAmountInput = document.getElementById("expense-amount");
const expenseCategoryInput = document.getElementById("expense-category");
const errorMessageElement = document.getElementById("error-message");
const expenseListElement = document.getElementById("expense-list");
const totalAmountElement = document.getElementById("total-amount");

/**
 * Displays a validation error message on the page.
 * @param {string} message - The error text to show to the user.
 */
function showError(message) {
    errorMessageElement.textContent = message;
}

/**
 * Clears any existing validation error message from the page.
 */
function clearError() {
    errorMessageElement.textContent = "";
}

/**
 * Validates the user's raw form inputs before adding an expense.
 * Equivalent to a Python validation helper returning (is_valid, error_message).
 *
 * @param {string} name - The trimmed expense name.
 * @param {string} rawAmount - The raw string from the amount input.
 * @param {string} category - The trimmed expense category.
 * @returns {{ isValid: boolean, parsedAmount: number | null, errorMessage: string }}
 */
function validateExpenseInputs(name, rawAmount, category) {
    // Check for empty name
    if (name === "") {
        return {
            isValid: false,
            parsedAmount: null,
            errorMessage: "Invalid expense name, name cannot be empty."
        };
    }

    // Convert raw amount string to a floating-point number (like Python's float())
    const parsedAmount = Number(rawAmount);

    // Check if the amount field is blank, not a valid finite number, zero, or negative
    if (rawAmount === "" || Number.isNaN(parsedAmount) || !Number.isFinite(parsedAmount) || parsedAmount <= 0) {
        return {
            isValid: false,
            parsedAmount: null,
            errorMessage: "Invalid expense amount, amount must be greater than 0."
        };
    }

    // Check for empty category
    if (category === "") {
        return {
            isValid: false,
            parsedAmount: null,
            errorMessage: "Invalid category, category cannot be empty."
        };
    }

    // All inputs are valid
    return {
        isValid: true,
        parsedAmount: parsedAmount,
        errorMessage: ""
    };
}

