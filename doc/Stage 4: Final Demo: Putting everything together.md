# Dollar IQ: Project Report

## Changes in direction of project

### Project Overview

Initially, we intended to create a financial web application aimed at enhancing personal finance management to provide users with insights into their spending habits and compare their spending to the average spending in their district or salary category. However, due to privacy concerns and the potential discomfort among users about sharing sensitive data, We shifted the focus of the application to deliver these insights exclusively to admins, thus preserving user privacy while still enabling robust data analysis.

### Development and Features

We developed an application that enables seamless transactions between users and across their accounts. We incorporated district-level analytics to allow administrators to evaluate the bank’s performance in various regions. A search functionality was also integrated, providing admins with the ability to swiftly access information about users, accounts, and transactions using specific keywords. Additionally, we introduced a generativeAI based data analytics tool called ThoughtSpot to enhance the administrative interface. This feature enables us to interact with our database hosted on the Google Cloud by using inputs in natural language. The AI  driven algorithm then converts the natural inputs into SQL queries and consequently creates individualized data visualizations and descriptive statistics for each input, thus facilitating information retrieval through intuitive natural language searches.

Currently, DollarIQ primarily tools to analyze user data effectively. This enables the bank to better target suitable customer segments. Key features allow to:
- Identify users with the highest credit scores in a specific district.

- Monitor unusually large transactions.
Assess which gender maintains higher total balances and credit scores.

- Calculate the total number of transactions, categorized by type and mode, within each district.

These features enhance the bank’s operational insights and strategic planning, ensuring more focused and effective customer engagement.

## What application achieved and failed to achieve

Our application comprised of two primary portal, one for the administrators of the bank and another for the users, each had the following components:

### User Portal

- Login Page: We introduced a secure login interface for both employees and users to ensure protected access.

- Transactions Page: We created a platform that simplifies money transfers, making the process user-friendly and efficient.

- Loan Management: While initially planning a Loan Request Page that assessed loans based on credit scores, we adapted this feature. Users can still apply for loans, but instead of automated credit-based decisions, the bank now manually reviews each application. Additionally, we introduced a loan repayment schedule feature, allowing users to view their payment deadlines for existing loans.

### Admin Portal
- Keyword Search Bar: We integrated a search bar that enables admins to efficiently search through users, transactions, and account data.

- ThoughtSpot Integration: We incorporated ThoughtSpot to provide AI-driven data analytics and user-level insights, enhancing decision-making capabilities.

- District-Level Visualizations: We added visualizations of transactions and amounts at the district level to facilitate comparative performance analysis across all districts.

In addition to these functional integrations, we made certain changes to our application. Originally, we planned to include a SpendAnalyzer for users to monitor and analyze their spending habits. However, to prioritize user privacy and data security we shifted this functionality to be accessible only to employees. Additionally, for the approval of loans, we moved away from an automated credit score-based approval system to a manual verification process. This adjustment ensures a higher degree of security and allows for more personalized assessment of loan applications. These modifications have been crucial in adapting DollarIQ to better meet operational demands while upholding privacy standards.

## Changes to schema or data sources

Our original dataset consisted of real and anonymized Czech financial transactions from 1999 and we have used this dataset throughout the course of the project. Though the dataset has several entities and attributes that are relevant to our project, we had to standardize all rows and columns, filter out missing values and make a few synthetic columns to add functionality and during normalization. We found this CSV dataset on the Data World website. It captures multiple aspects of a financial transaction like a customer’s loan amount, credit card information, account and transaction details. Multiple attributes are being stored, and some of them are `account_id`, `district_id`, `card_id`, type of credit card, etc. The dataset contains multiple tables ranging from 100 to 1 million records, containing a wide variety of information on users and transactions.

## Changes to ER diagram and table implementations

We did not add balance as an attribute during our stage 2 database design submission, but we had to add it later to maintain the account balance. Similarly, we added attributes to keep track of data modification and deletion instead of removing entries entirely from the database. As mentioned later in the report, we also added some components to the ER diagram and final database design before stage 1 submission: we created new tables like Transaction Mode, Transaction Type, and Loan Type to normalize and avoid deletion and updation errors.

The final database design is better suited for the application because from the perspective of the bank, it is more modular and allows the bank to retain all data for analytical purposes. By this updated implementation, we also avoid any accidental updation or deletion errors.

## Functionalities removed & added

### Functionalities Removed

- **Email and Text Notifications Using Queueing Service or RabbitMQ:** This feature was removed due to its complexity and the additional overhead it introduced in maintaining message queues. We decided that the benefit of real-time notifications did not justify the complexity for the current scale of our application.

- **Automatic Loan Provision:** We opted to remove this functionality because automating this process posed significant risks, including the potential for errors in judgment without human oversight. This could in turn lead to financial discrepancies.

- **Calculation of Credit Score:** This was removed due to the complexities involved in accurately assessing credit scores based on dynamic financial data and constantly updating it based on multiple dependent factors. It was determined that external credit scoring services would provide more reliable and updated information.

## Functionalities Added

- **Keyword Search for Admins:** This feature was added to enable administrators to efficiently browse through past users. The keyword search functionality allows for quick retrieval of user records, enhancing administrative efficiency and responsiveness in handling user inquiries or issues.

- **District Level Statistics:** We incorporated this feature to track the performance of the bank across different districts. This functionality supports strategic decision-making by providing granular insights into regional performance, identifying trends, and allocating resources effectively based on geographic data.

- **Fraudulent Transaction Tracking:** We implemented this feature by checking if the transaction amount is significantly higher than the previous average. 

- **Tracking High-Value Customers:** Our definition of “high-value” customers is those who have credit scores higher than the district average. We track them by checking their credit score when they perform a transaction. This will help the bank know the specific customers which they need to market or advertise their loan schemes.

These changes were made to streamline operations, enhance system usability, and ensure the application's scalability and security.

## How advanced queries complement application

Our application uses 4 main advanced database programs written within stored procedures. They add more functionality to our banking application, allowing employees to view the spending patterns in various districts, and identify possible fraudulent transactions and a valuable customer base.

The advanced database programs complement our application quite well since it offers various analytics options to the bank employees. We enable the employees to view the total balance and average credit score by gender in the district. This will help the bank to target the right district and the right people for their schemes.

The employees of our bank also have the option to view the total transaction volume and count by transaction type and mode in a district. This will help the bank to understand the exact type of expenditure (restaurant, groceries, etc.) most popular and the mode (card, bank transfer, etc.) most popular in each district. These statistics are important for a bank so that they can analyze which mode and type of transaction should give a customer more incentive in the form of cashbacks or reward offers.

## Technical Challenges

Vimalnath Achuthan

1) **Backend Development:** During the development of the backend, one significant challenge arose with the transaction summary statement stored procedure, which experienced significant delays due to the need to query hundreds of thousands of records. To overcome this challenge, I proposed and implemented pagination and filter-based queries at both the API and query level. This optimization significantly enhanced the performance of the transaction summary functionality, reducing query times and improving overall system efficiency.

2) **Thoughtspot Integration:** I encountered challenges in integrating the appropriate ThoughtSpot component, a software-as-a-service (SaaS) solution for visualization, into the frontend. Ensuring seamless integration and compatibility with the frontend posed difficulties initially. However, through thorough troubleshooting and collaboration with team members, I successfully addressed the integration issues and ensured the effective utilization of the visualization component.

3) **Data Inconsistencies:** Discrepancies in date attributes across various tables, including User, Account, and Transaction tables, posed another technical challenge. To resolve this inconsistency, I devised and implemented a query solution that randomly populated the date data within the specified constraints, ensuring uniformity and accuracy across the database tables.

4) **Cloud Hosting:** deploying the frontend and backend as separate services in Google Cloud Platform (GCP) presented challenges in coordinating the deployment process and ensuring smooth communication between the frontend and backend services. By devising a strategy to point the static build files from the frontend to the backend and deploying them as a single service, I successfully streamlined the deployment process and improved system cohesion.

Huzaifa Suri

1) **Modification of Dataset:** Among the changes we made to the dataset, one was to assign transactions to a specific type (restaurants, grocery, loan repayment, etc.). We assigned loan repayment to only those transactions that were performed by accounts who had a loan. However, the random nature of assignment led to much more transactions performed as repayment than the actual loan amount. Furthermore, most of the loans had been paid in the present day, which meant we could not showcase loan repayment schedule examples in which the user had any pending payments. To combat this challenge, we removed the transactions that we had labeled as loan repayments and we re-inserted them with a modified, smaller transaction amount and an appropriate date so that most loans have some pending repayments.

Karthik Vasisht

1) **Migration of SQL Dump to GCP:** Navigating through the various services of GCP to find the appropriate setup was initially challenging and time-consuming. After experimenting with different setups, a MySQL instance with single region availability which included 8GB of storage and 2GB of RAM was selected, for its cost-effectiveness at 14¢/hr and its built-in SQL studio, Additionally the SQL dump could be stored in a bucked and directly linked to the instance, this made the database conveniently accessible.

2) **Networking Issues with IP Address:** We also encountered issues with connecting our application to the database due to IP configuration errors. To resolve this, we listed the public IP of our GCP instance in our app and whitelisted the computer's IP address in the GCP instance, hence establishing a private connection with the instance. This process was similarly applied in configuring connections to ThoughtSpot which necessarily required a private connection with the Google Cloud database.

3) **Embedding ThoughtSpot API Connection:** Embedding ThoughtSpot analytics into our application required significant effort. Thoughtspot had two components, one a search bar and another a Liveboard, we had to create different connections for each component and call each component into our app. We developed a solution that involved creating secure, private connections and authenticating ThoughtSpot within our app, this ensured robust data interaction and display.
4) **Integrating Frontend with Backend:** We faced challenges with routing and API calls, which we addressed by utilizing Postman to test API connections and functionality. Once validated, these APIs were then integrated into our frontend.

Gopinath Balaji

1) **Data Normalization:** Primarily working with datasets and writing SQL queries, our team initially faced a technical challenge: incorrectly making our schema which could have resulted in updation or deletion errors. This mainly occurred because we did not normalize our data properly. We initially did not have the Transaction mode, Transaction type, or Loan Type tables. These tables were added later to store their respective data because, for example, if a row that has a loan type that occurs only once in the entire dataset is deleted or updated then we have completely lost a unique value in our dataset. To prevent this error it is important to think about how an attribute gets affected by updation or deletion.

2) **Advanced Queries:** Incorporating 2 advanced queries within each procedure and transaction proved challenging for our team. In a toy banking application like ours, transactions are particularly used to ensure the payment system works smoothly, but to satisfy the stage 4 criteria we had to think out of the box. This enabled us to add 2 new features to our banking application. We managed to add a basic fraudulent transaction check and also keep track of people with high credit scores.

## Future work for improvement

The application can incorporate live message and email notification functionality. Additionally a smart spend analyzer can be introduced into the user portal to display different user level statistics to each individual. Further, a time series analytics algorithm can be introduced to calculate credit scores on the go, this will enable the loan approval process to be automated and dynamically updated. In the future, we would like to add this functionality as it gives a more real-world feel to our application.

## Division of labour

While the project was a collaborative effort among all team members, we distributed the workload evenly based on individual interests and expertise. There were components that required collective effort, while others allowed us to distribute ourselves into smaller groups or individual work. Overall, we met one to two times a week for 1hr-3hr sessions from the beginning of the semester to troubleshoot challenges and discuss each other's progress. Below is a description of each person's main area of contribution and focus during the project.

- Data Collection: Huzaifa, Gopi, Vimalnath, Karthik
- Data Cleaning and Preprocessing: Huzaifa, Gopi
- SQL Advanced Queries: Huzaifa, Gopi
- DB Design:
    - ER/UML and Implementation: Huzaifa, Gopi, Vimalnath
    - Indexing: Karthik
- Frontend: Karthik, Huzaifa, Vimalnath
- Networking: Vimalnath, Karthik
- Backend: Vimalnath
- Cloud Integration: Vimalnath, Karthik
- Thoughtspot: Karthik, Vimalnath
- Testing: Vimalnath, Huzaifa, Gopi, Karthik
- Documentation: Huzaifa, Gopi, Karthik, Vimalnath
