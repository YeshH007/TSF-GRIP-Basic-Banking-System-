# TSF-GRIP-Basic-Banking-System-
This is a simple dynamic website that allows you to view customer information, transfer money between customers, and view transaction history. The website is built using HTML, CSS, JavaScript and Firebase for the database.

Getting Started
To get started, follow these steps:

Clone the repository to your local machine.
Open the project directory in your preferred code editor.
In the Firebase console, create a new project and add a Realtime Database to it.
Update the Firebase configuration in the index.html file with your own Firebase project credentials.
Add some dummy data to the Firebase Realtime Database. For example, you can add up to 10 customers with basic fields such as name, email, current balance, etc. You can also add a transfers table to record all transfers that have happened.
Usage
The website follows a simple flow that allows you to view all customers, select and view one customer, transfer money to another customer, and view all customers again.

Home Page - The homepage displays a welcome message and an option to view all customers.
View all Customers - This page displays a table with all the customer information available in the Firebase database. You can click on a customer's name to view more details about that customer.
View One Customer - This page displays detailed information about a selected customer, including their name, email, current balance, and transaction history. You can also select this customer to transfer money to another customer.
Transfer Money - This page allows you to transfer money from the selected customer to another customer. You can select the customer to transfer to from a dropdown list and enter the amount to be transferred.
View all Customers - After a successful transfer, you will be redirected to the View all Customers page to see updated customer balances and transaction history.
Credits
This website was built as part of a project assignment and was created by [your name]. Feel free to modify and use it as per your requirements.

License
This project is licensed under the MIT License.




