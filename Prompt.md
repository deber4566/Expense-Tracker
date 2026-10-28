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

Follow up prompts:
