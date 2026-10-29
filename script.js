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

    // Strip optional dollar signs ($) and commas (,) so inputs like "$1,001.21" or "1,000" are accepted
    // Equivalent to Python's: raw_amount.replace("$", "").replace(",", "").strip()
    const cleanedAmount = rawAmount.replace(/[$,]/g, "").trim();

    // Convert cleaned amount string to a floating-point number (like Python's float())
    const parsedAmount = Number(cleanedAmount);
    const roundedAmount = roundToTwoDecimals(parsedAmount);

    // Check if the amount field is blank, not a valid finite number, zero, or negative
    // (Also catches tiny values like 0.001 that round down to 0, or inputs that only contained "$" or ",")
    if (cleanedAmount === "" || Number.isNaN(parsedAmount) || !Number.isFinite(parsedAmount) || roundedAmount <= 0) {
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
        parsedAmount: roundedAmount,
        errorMessage: ""
    };
}

// ==========================================
// Step 4: Number Formatting & Rounding Logic
// ==========================================

/**
 * Rounds a number to two decimal places to prevent floating-point issues
 * (similar to Python's round(value, 2)).
 *
 * @param {number} value - The numeric value to round.
 * @returns {number} The value rounded to at most two decimal places.
 */
function roundToTwoDecimals(value) {
    return Math.round((value + Number.EPSILON) * 100) / 100;
}

/**
 * Formats a number for display with a leading dollar sign ($) and thousands commas:
 * - Rounds to two decimal places.
 * - Displays whole numbers without trailing zeroes (e.g., 100 -> "$100", 1000 -> "$1,000").
 * - Displays decimal numbers rounded to two decimal places (e.g., 50.02 -> "$50.02", 1001.21 -> "$1,001.21").
 * Equivalent to Python's: f"${rounded:,}" if rounded.is_integer() else f"${rounded:,.2f}"
 *
 * @param {number} value - The numeric amount to format.
 * @returns {string} The formatted currency string.
 */
function formatAmount(value) {
    const rounded = roundToTwoDecimals(value);

    // If the rounded number is a whole number (like 100 or 1000), format with commas and no decimals
    if (Number.isInteger(rounded)) {
        return `$${rounded.toLocaleString("en-US")}`;
    }

    // Otherwise, format with commas and two decimal places (e.g., 1001.21 -> "$1,001.21")
    return `$${rounded.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
}

// ==========================================
// Step 5: Add, Render, and Calculate Total
// ==========================================

/**
 * Normalizes a category string so category matching is case-insensitive
 * and displayed consistently (e.g., "food", "FOOD", "Food" -> "Food").
 * Equivalent to Python's: category.strip().title()
 *
 * @param {string} category - The trimmed category string.
 * @returns {string} The normalized category in Title Case.
 */
function normalizeCategory(category) {
    return category
        .toLowerCase()
        .split(/\s+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

/**
 * Calculates the sum of all expense amounts and updates the Total display.
 * Equivalent to Python's: sum(expense["amount"] for expense in expenses)
 */
function updateTotal() {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalAmountElement.textContent = formatAmount(total);
}

/**
 * Renders the current list of expenses into the <ul id="expense-list"> element,
 * grouping expenses of the same category (case-insensitive) together.
 */
function renderExpenses() {
    // Clear existing list items before re-rendering
    expenseListElement.innerHTML = "";

    // Show a helpful empty-state message when there are no expenses
    if (expenses.length === 0) {
        const emptyItem = document.createElement("li");
        emptyItem.className = "empty-message";
        emptyItem.textContent = "No expenses added yet.";
        expenseListElement.appendChild(emptyItem);
        return;
    }

    // Group expenses by lowercase category key (similar to Python's defaultdict(list))
    // Preserves the order in which categories were first entered
    const groupedByCategory = new Map();
    for (const expense of expenses) {
        const categoryKey = expense.category.toLowerCase();
        if (!groupedByCategory.has(categoryKey)) {
            groupedByCategory.set(categoryKey, []);
        }
        groupedByCategory.get(categoryKey).push(expense);
    }

    // Flatten the grouped buckets into a single list where matching categories stay together
    const groupedExpenses = [];
    for (const categoryGroup of groupedByCategory.values()) {
        groupedExpenses.push(...categoryGroup);
    }

    // Loop through each grouped expense object and render its <li> row
    for (const expense of groupedExpenses) {
        const listItem = document.createElement("li");
        listItem.className = "expense-item";

        // Format text as: Expense: <name>, Amount: <amount>, Category: <category>
        const expenseDetails = document.createElement("span");
        expenseDetails.textContent = `Expense: ${expense.name}, Amount: ${formatAmount(expense.amount)}, Category: ${expense.category}`;

        // Create the Delete button for this item (Step 6 will connect its click action)
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";
        deleteButton.dataset.id = String(expense.id);

        listItem.appendChild(expenseDetails);
        listItem.appendChild(deleteButton);
        expenseListElement.appendChild(listItem);
    }
}

/**
 * Handles the form submission when the user clicks "Add Expense" or presses Enter.
 * @param {Event} event - The form submit event.
 */
function handleAddExpense(event) {
    // Prevent the browser's default behavior of refreshing the page on form submit
    event.preventDefault();

    const name = expenseNameInput.value.trim();
    const rawAmount = expenseAmountInput.value.trim();
    const rawCategory = expenseCategoryInput.value.trim();

    // Validate the user's inputs
    const validation = validateExpenseInputs(name, rawAmount, rawCategory);

    if (!validation.isValid) {
        showError(validation.errorMessage);
        return;
    }

    // Clear any previous error messages once valid input is provided
    clearError();

    // Normalize category so "food", "FOOD", and "Food" are stored consistently as "Food"
    const normalizedCategory = normalizeCategory(rawCategory);

    // Create a new expense object and append it to the array (like expenses.append({...}) in Python)
    const newExpense = {
        id: nextExpenseId++,
        name: name,
        amount: validation.parsedAmount,
        category: normalizedCategory
    };
    expenses.push(newExpense);

    // Clear the form inputs for the next entry
    expenseForm.reset();

    // Update the displayed list and running total
    renderExpenses();
    updateTotal();
}

// Listen for form submission
expenseForm.addEventListener("submit", handleAddExpense);

// ==========================================
// Step 6: Implement Delete Functionality
// ==========================================

/**
 * Removes an expense with the matching ID from the state array and refreshes the UI.
 * Equivalent to a Python list comprehension:
 * expenses = [expense for expense in expenses if expense["id"] != expense_id]
 *
 * @param {number} expenseId - The unique ID of the expense to remove.
 */
function deleteExpense(expenseId) {
    expenses = expenses.filter(expense => expense.id !== expenseId);
    renderExpenses();
    updateTotal();
}

/**
 * Handles clicks inside the expense list (Event Delegation).
 * Checks if a "Delete" button was clicked, reads its data-id attribute, and deletes that expense.
 *
 * @param {MouseEvent} event - The click event inside <ul id="expense-list">.
 */
function handleExpenseListClick(event) {
    if (event.target.classList.contains("delete-btn")) {
        const expenseId = Number(event.target.dataset.id);
        deleteExpense(expenseId);
    }
}

// Listen for clicks on any Delete button inside the expense list
expenseListElement.addEventListener("click", handleExpenseListClick);

// Render initial empty state when the page first loads
renderExpenses();


