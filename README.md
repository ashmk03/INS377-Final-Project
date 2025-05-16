# Ashley and Claire’s Aviation For Noobs Web Application

Ashley and Claire’s Aviation For Noobs is a beginner-friendly web application designed to help users locate real-time flight information and explore other flights happening in the world. In addition to an about page that details the main motivations for the application, which is to provide users with an easy-to-understand interface for looking up aviation data, the platform features a user-friendly help form where visitors can ask questions, submit feedback, or report technical issues with the application. All submissions are securely stored in a Supabase database and displayed for easy review by the development team.

The target browsers for the application are:
- Desktop Chrome
- Firefox
- Edge
- iOS Safaris
- Android Search Engines

Link to Developer Manual

## Installation Guide

To gain a copy of the repository, in your terminal, make sure to input:

`git clone git@github.com:ashmk03/INS377-Final-Project.git`

Then, cd into the correct folder. 

`cd INS377-Final-Project`

To execute JavaScript outside of the web browser, install Node.js using the following command (to be written in the terminal):

`nvm install node`

Once that is done, the dependencies that need to be installed are included below, if not already included in the standard packages: 

`npm install express`
`npm install dotenv`
`npm install body-parser`
`npm install email-validator`
`npm install @supabase/supabase-js`

Lastly, download nodemon for convenience in seeing updates to the application:

`npm install -g nodemon`

To access the supadatabase, you will need access to the link and key in the .gitignore file. Reach out to the developers to gain access to this information and receive the information below:

`SUPABASE_URL=https://your-project.supabase.co`
`SUPABASE_KEY=your-anon-key`

### Starting the Application

To start the application: 

You can access the working application using the Vercel link provided below:

ins-377-final-project-git-main-ashleyks-projects.vercel.app

Or to work on the application in a local server, once all the dependencies are installed, run the following command to access it in developer mode:

`npm run dev`

### How to Run Tests

Currently, there is no automated testing in the code provided, but for future consideration, adding testing can ensure the efficiency of the api usage and read/write speed of Supabase.  

API’s Used

POST /customers

Purpose: Accepts a new help form submission, adds to the database upon correct completion ( that is, if the email input is a valid email due to the validator package) 
Used in the CreateCustomer() function in the help.js file

```
Request:

{
  "firstName": "Ashley",
  "lastName": "Kharbanda",
  "email": "ash@gmail.com",
  "message": "I need help accessing flight details!"
}

Response:
{
  "id": 1,
  "created_at": "2025-05-15T22:19:39.967316+00:00",
  "cust_fname": "Ashley",
  "cust_lname": "Kharbanda",
  "cust_email": "ash@gmail.com",
  "cust_message": "I need help accessing flight details!"
}

GET /customers
Purpose: Retrieves all submitted form entries from the database.
```

Used in the `loadCustomerData()` function

Note: For users' privacy concerns, only the user’s first name and message are viewable through the front-end, as the developers would not want private information such as last name and email to be viewable. 

## Example JSON format:

```
[
	{
		"id": 1,
		"created_at": "2025-05-15T22:19:39.967316+00:00",
		"cust_fname": "Ashley",
		"cust_lname": "Kharbanda",
		"cust_email": "ash@gmail.com",
		"cust_message": "I need help accessing flight details!"
	},
	{
		"id": 2,
		"created_at": "2025-05-15T22:40:24.339963+00:00",
		"cust_fname": "Claire",
		"cust_lname": "Knorr",
		"cust_email": "cknorr22@gmail.com",
		"cust_message": "I cannot see pictures of planes"
	},
	{
		"id": 3,
		"created_at": "2025-05-16T00:18:01.027106+00:00",
		"cust_fname": "Sara",
		"cust_lname": "Linds",
		"cust_email": "sh@gmail.com",
		"cust_message": null
	}
]
```

Potential Considerations

