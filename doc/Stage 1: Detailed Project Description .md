# DollarIQ
A smart way to efficiently introspect personal finance

## Project Summary

DollarIQ is a financial web app designed to enhance personal finance management by offering detailed insights into users' spending habits. It provides analytics on purchase categories, transaction frequency, and demographic trends, alongside comparisons to average user profiles and their spending habits based on personalized filters. This proactive approach not only helps in better managing expenses but also in identifying potential savings opportunities, making WiseWallet a versatile companion in the journey towards financial independence and security.

The webapp also aids users in achieving their financial goals, supports money transfers, and seamlessly connects users to their centralized bank accounts for a comprehensive banking experience.

## Application Description

Our web application is designed to be more than just a transactional platform; it aims to engage users with attractive, interactive visualizations for tracking their spending. Alongside standard FinTech functionalities like loan approvals—where loans are granted or denied based on credit scores—we offer distinctive, filter-based visualizations and data description. These allow users to compare their spending habits across various categories with those of others. 

Key components include:
- A Login Page for both employees and users, ensuring secure access.
- The SpendAnalyzer, a dedicated page for users to explore and understand their spending.
- A Loan Request Page, where decisions on loan approvals are made based on credit assessments.
- A Transactions Page, facilitating easy money transfers.

Our aim is to empower customers with tools for better financial management in a user-friendly environment.

## Creative Components

1) The web app features an AI-powered search analytics tool, enabling users to delve into their data through a search bar where inputs can be delivered through natural language. Queries entered are automatically converted into SQL, allowing for in-depth analysis directly from the database. The tool also displays liveaboards and visualizations of data for a comprehensive analytics experience.

    We aim to integrate Thoughtspot, an AI-driven Business Intelligence tool, into our platform. Thoughtspot offers advanced querying capabilities through natural language and generates visualizations by analyzing data types. This tool will be directly connected to our system's backend database, enabling seamless data display on our website for enhanced user experience.

2) The platform also offers a feature that lets users compare their spending with that of average users, with customizable filters for age group, demographics, income level, occupation, etc. .This allows users to explore and experiment with various data combinations to gain insights tailored to their interests.

    Our approach involves crafting dynamic SQL queries tailored to user-selected filters, utilizing cursors and subqueries to organize data by various preferences. We'll develop code to dynamically adjust these queries in response to user choices, ensuring a flexible and seamless experience. This process will incorporate the use of Python scripts, enabling real-time query modification based on user inputs, to deliver a personalized and efficient data interaction.

## Usefulness

The web application contains some simple functionality that enables users to create/delete accounts, deposit money, or send money to other users. It also enables admins to add/remove other admins and view user statistics. Some complex functionality on the user end will be part of the spend analyzer that allows users to view and compare their spending activity to other people in the same location over a specified period of time.

Our platform sets itself apart by offering a unique edge through AI-driven visualizations and live statistics. This AI-powered approach to analyzing spending patterns offers a level of insight and customization not found in existing banking applications. 

In addition to our visualizations, users can experiment with different filters to understand the spending habits of individuals across different walks of life and work on their budget goals accordingly.

## Realness

We plan to use a real and anonymized [1999 Czech financial transactions dataset](https://data.world/lpetrocelli/czech-financial-dataset-real-anonymized-transactions/workspace/project-summary?agentid=lpetrocelli&datasetid=czech-financial-dataset-real-anonymized-transactions) which consists of multiple tables. We found this CSV dataset on the Data World website. It captures multiple aspects of a financial transaction like a customer’s loan amount, credit card information, account and transaction details. Multiple attributes are being stored, and some of them are account_id, district_id, card_id, type of credit card, etc. The dataset contains multiple tables ranging from 100 to 1 million records, containing a wide variety of information on users and transactions.

Even though this is the primary dataset we wish to use for the project, we have also identified other datasets on Kaggle (such as [this](https://www.kaggle.com/datasets/shivamb/bank-customer-segmentation), [this](https://www.kaggle.com/datasets/radistaleks/synthetic-bank-transactions), and [this](https://www.kaggle.com/datasets/ealaxi/paysim1)) that provide us with real and synthetic data as well. Since we need to use a combination of two or more datasets, we plan to synthetically create some data entries to complement our primary dataset.

## Functionality

1) Web application Login Page:
A page that provides a user with 2 options, Login as Admin and Login as User. Upon clicking on any of these options, another page opens up that allows the admin/user to enter their username and password and access their accounts. This page would also have an option to create a new user/admin (for an admin, another admin’s credentials will be needed to register a new admin).

2) Home Page – User:
The User page would have options to change account information, perform transactions, deposit money to their account, and access the spend analyzer:

- Change account information: A user can change their details such as their Name, Address, Phone Number, etc. They can also delete their account, and will be prompted to retype their password for this. Users can only access their own information.

- Perform transactions: A user can either send money to another user, or a store/restaurant, etc. The accounts will be updated in the backend accordingly. If the user has a lower bank balance than the amount of money they wish to transfer, then the transaction request will be denied.

- Deposit money to account: A user can deposit money to their account. We will let users deposit an amount within a specific range.

- Access spend analyzer: Users can access a spend analyzer that can perform the following functions:
    - Generate a report on the net income of a user and their spending over a given period of time (we may just fix it to the last 1 month). The spending can be broken down into different categories such as restaurants, grocery stores, pharmaceuticals, online retail, streaming services, transfers to other users, etc. (we will have to synthetically introduce these categories in the transactions for this feature to work since our datasets do not have this level of detail). We may also use an API to show visual insights into this data.
    - Compare the expenditures of the users to other users (note that this does not disclose any information of the other users, it just generates a statistic based on all users), and maybe narrow it down to their geographical location. This can further be broken down into the above mentioned categories. The purpose of this is to make the user aware of any extra costs they are incurring that others in their location are not, thereby providing incentives to reduce spending on a specific category of items and save money.

3) Home Page – Admin:
The Admin page would have some options to access statistics about users, add/remove admins, and change account information:

- User Statistics: Admins can access information on the user, such as the max/min/average bank balance, the max/min/average amount of transactions performed in a certain time period, the categories people are spending their money on (restaurants, groceries, etc.), and the geographical distribution of transactions.

- Add/Remove Admin: An admin would have access to add/remove other admins (we may add options to add/remove users too).

- Change account information: An admin can change their own account’s information, such as their First/Last Name, their address / phone number, their password, etc.

### UI Mockup

#### Login Screen 1
<img src="https://github.com/cs411-alawini/sp24-cs411-team100-CS411Group100/blob/main/images/login.png" alt="Alt text" width="600">

#### Login Screen 2
<img src="https://github.com/cs411-alawini/sp24-cs411-team100-CS411Group100/blob/main/images/login2.png" alt="Alt text" width="600">

#### Main User Dashboard
<img src="https://github.com/cs411-alawini/sp24-cs411-team100-CS411Group100/blob/main/images/user.png" alt="Alt text" width="600">

### Project Work Distribution:

- Back end - API management - Vimal, Karthik
- Databases - Vimal, Gopi, Huzaifa
- Frontend1 - Analytics - Karthik, Vimal
- Frontend2 - Designing UI/UX - Vimal, Gopi, Huzaifa
- ML for spend analytics - Karthik, Huzaifa



