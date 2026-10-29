# Prompts

## Initial Prompt

Role: Act as an intermediate Python developer with little web development experience.
Context: I am working on an expense tracker web page with assistance from AI. The web page will be simple, we will only need HTML, CSS and javascript.
The purpose of this is to help track expenses.
Task: Write code to implement this expense tracker. This application should have the following:

1. Add an expense with a name, amount, and category (e.g. Food, travel, shopping or other categories that user can input)
2. Display the expenses entered by the user. Round to two decimal places.
3. Show the total amount spent
4. Allow the user to delete an expense.
5. Show a simple message for invalid inputs, such as an empty name or an amount that is zero or negative

Constraints:
Use HTML, CSS and javascript
Follow standard coding practices and meaningful naming conventions.
Keep the code readable, maintainable, and appropriate for the project.
Handle relevant invalid inputs, exceptions, and edge cases.
Avoid unnecessary libraries, dependencies, or complexity.
Preserve existing functionality when modifying code.
Do not invent missing project components or requirements. Ask for clarification if essential information is missing.

Examples with expected behavior or format:
Expense: Dinner , Amount: 100 , Category: Food
Expense: Uber, Amount: 50.02, Category: Travel
Expense: Hammer, Amount: 5.09, Category: Tools
Total: 155.11

Invalid Input:
Expense: Lunch, Amount: -50, Category: Food -> "Invalid expense amount, amount must be greater than 0."

Output Format:

Follow the examples in the examples section.
Whole numbers are to be displayed without trailing zeroes.
User can type in any category.
Complete implementation with relevant file names.
Explanation of the important logic inside the codebase with proper comments.
Relevant testing and verification steps.

Success Criteria: The implementation should meet the stated requirements, produce the expected results, handle the identified edge cases, and work with the specified technology stack.
Review the code against these requirements and clearly mention anything that has not been tested or verified.

## Task Decomposition

Here is a step-by-step plan to build the Expense Tracker using your existing project files (index.html, style.css, and script.js). Since you have a Python background, I have mapped the web concepts to familiar Python equivalents where helpful. No code has been generated yet.

Step 1: Create the Page Structure (index.html)

Think of HTML as defining the layout and widgets of a GUI (similar to tkinter widgets), giving each interactive element a unique id so JavaScript can reference it:

Link Files: Connect style.css in the <head> and script.js at the bottom of the <body>.
Expense Input Form:
Text input for Expense Name (e.g., Dinner).
Number input for Amount (e.g., 100).
Dropdown (<select>) for Category (Food, Travel, Shopping, Other).
Submit button (Add Expense).
Validation Message Area: A dedicated text container to show error messages when invalid input is entered.
Expense List Container: An unordered list (<ul>) where each added expense will be rendered.
Total Display: A container showing Total: 0 initially.
Step 2: Style the Interface (style.css)

Keep styling clean, readable, and minimal:

Page Layout: Center the main container on the screen with a clean font, subtle border/shadow, and comfortable padding.
Form & Controls: Arrange the inputs and the Add Expense button neatly so they are easy to read and interact with.
Error Message Styling: Style the validation message in red so invalid input alerts stand out clearly.
Expense Items & Delete Button: Format each expense row so the text (Expense: Dinner, Amount: 100, Category: Food) aligns nicely with its Delete button on the right.
Step 3: Set Up State & Input Validation (script.js)

Write the core data management and validation logic (similar to maintaining a Python list of dicts):

In-Memory Data Store: Create an expenses array where each item is an object containing id, name, amount, and category.
Input Validation Function: Check user inputs before modifying the state:
Empty/Whitespace Name: If the trimmed name is empty, display an error message (e.g., "Invalid expense name, name cannot be empty.").
Invalid Amount: If the amount is missing, not a number (NaN), 0, or negative, display "Invalid expense amount, amount must be greater than 0." (matching your example).
Missing Category: Ensure a valid category is selected.
Clear Errors: Clear any existing error message once a valid expense is submitted.
Step 4: Add, Render, and Calculate Totals (script.js)

Connect the UI events to the expenses array:

Add Expense Handler: Listen for form submission, validate inputs, append the new expense object to the expenses array, and reset the form fields.
Render Expense List: Clear and rebuild the displayed list from the expenses array, formatting each item as: Expense: <name>, Amount: <amount>, Category: <category> alongside a Delete button.
Calculate Total: Sum all amount values in the expenses array (like Python's sum(item['amount'] for item in expenses)) and update the page to display Total: <sum>.
Step 5: Implement Expense Deletion (script.js)
Delete Handler: When a user clicks the Delete button next to an expense, filter out that expense from the expenses array using its unique id.
Refresh UI: Re-run the render and total calculation functions so both the list and Total update immediately.
Step 6: Code Walkthrough & Verification Checklist
Code Comments & Explanation: Provide clear comments inside the files and walk through how the HTML DOM events connect to the JavaScript functions.
Testing & Verification Steps: Provide a checklist to verify the examples (Dinner = 100, Uber = 50 -> Total: 150), deletion updates, and edge cases (-50, 0, empty name, decimal amounts), explicitly noting what has been tested vs. what requires manual browser testing.

## Prompt Chaining

1. Let's start with step 1 and implement the index.html code.
2. The html file looks fine. Let's proceed with step 2 and implement the style.css code. I want the background to be light grey in color.
3. There is a dropdown in the Amount category, remove this so it only allows plain text entry from the user. Only update the index.html file.
4. Next, let's move on to step 3 and implement the javascript code in script.js.
5. Proceed with step 4.
6. Step 4 looks great. Let's do step 5 now.
7. Let the category input be case insensitive. We also want to group the categories with each other.
8. For the total amount, can we display the dollar sign and relevant commas.
   E.G $1,001.21
9. I would like to have the individual expense amounts to also reflect the $ and commas.
10. Let's implement step 6.
11. Provide me with test cases to test and proceed with step 7.
12. I would like to have number 3 fixed so that it allows the user to input the dollar sign and comma.

Commas Typed Inside the Amount Input: If a user types a comma inside the Amount input box (e.g., typing 1,000 instead of 1000), JavaScript's Number("1,000") treats it as NaN and shows the invalid amount message. (If you want users to be able to type $ or , inside the input box itself, let me know and we can strip those before parsing!)

13. Review all the code and suggest one simple improvement.
14. Add this improvement of showing an empty-state message for when there are no expenses.
