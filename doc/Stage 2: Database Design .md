# DollarIQ: Database Design

<img src="https://github.com/cs411-alawini/sp24-cs411-team100-CS411Group100/blob/main/images/schema.png" alt="Alt text" width="900">

## Entities Explanation

We chose 14 entities for our relational database. The following is an explanation of these entities, their attributes, and the rationale behind their choice.

#### 1. User
It is fairly obvious that the User’s data needs to be a separate entity. It cannot be merged into any of the other entities like Loan, District, Transactions, etc. It needs to be a separate entity because it contains the user passwords for both the customers and administrators which is sensitive information. The other attributes it contains are UserId, Date of Birth, and Gender. This table has a child entity, which is the Employee table, to which is one-to-one related. This is because each User ID can have 0 or 1 employees ID associated with it. The User has a one-to-many relationship with the Account entity because each user will be able to open multiple accounts at DollarIQ but every account will be associated with only one user.

#### 2. Employee
This entity exists because our web app will have a separate employee login page and different  permissions for each employee. The Employee table consists of Employee ID (Primary Key), User ID, and Role ID. It has a another entity associated with it which is the Role table. 

#### 3. Role
The Role table exits so that we can define and review the role that each employee is assigned. Role here could be delete access, modification access, etc. Keeping this as a separate table allows us to add, remove, review roles easily. This entity has a one-to-many relationship with the Employee table because each role can be associated with 0 or multiple employees. The attributes this table contains are Role ID, Role Name, and Access Type.

#### 4. Credit Score
The Credit Score table needs to be a separate entity because the credit score will be updated once monthly based on the User’s transactions. Therefore, since the credit score has an attribute Date Last Updated, it cannot be an attribute to another entity. The Credit Score entity uses User ID as the primary key and has the credit score value and date last updated as the other attributes. Credit Score has a one-to-one relationship with the User entity because each user can have only one credit score value and each credit score value can be related to only one user.


#### 5. Account

Account is one of the most important entities of DollarIQ since we need to store the account number as our Primary Key and other IDs as our Foreign Key. It is important for Account to be a separate entity because only maintaining the Account number in other tables would make us lose valuable information like number of accounts per district and date the account was created. These attributes of the Account entity can then be used for further analysis by the bank, for example, the best and the worst performing districts, which part of the year most accounts were opened, etc. 
We can see the importance of the account entity by its relations to other tables. All the relations with the Account entity are composition rather than aggregation. Composition shows us that the child cannot exist independently of the parent. So in our UML diagram, we can see that the account (child) cannot exist without User (parent). We also note that transactions (child), cannot exist without an account (parent).
The relationship between User and Account shows us that each User can have multiple accounts but each account can only be related to one User. The explanation also applies for the relation between Account and District, Account and Transactions, Account and Loan.

NOTE: The district_id in Accounts shows the district in which the account was opened. 

#### 6. District
The District entity contains essential attributes crucial for DollarIQ's analytical functionality. These attributes, including DistrictID, District Name and  Region. This table can be thought of as a main entity to the secondary District Stats and ternary District Metric Type entity which includes the actual statistical values. To avoid insertion, deletion anomalies and to also normalize the database, the district’s information is split into 3 different tables. The District table is tied to the Accounts entity via a one-to-many relation since each district can be associated with multiple accounts. 

#### 7. District Stats
District Stats entity, as mentioned before, can be thought of a sub-entity to the main District table. It has another entity linked to it which is the District Metric Type table. The District Stats table has a one-to-one relation with the District Metric table since each statistic value can be based on only one type. This table holds attributes like Stat ID, District ID, Metric ID, and Values. These metric values can be used for individuals to compare their spending patterns with those of individuals from different demographics and backgrounds. These allow for introspection, aiding users in gaining deeper insights into their financial habits. Through the DistrictID tied to each user's AccountID, the app provides tailored analyses based on demographics, empowering users to refine their understanding of their financial behaviors through experimentation with various filters and comparisons.Each of the attributes within the district table serves as a basis for comparisons, whether used independently or in combination, thereby functioning as essential metrics for analyzing and contrasting different users.

#### 8. District Metric Type
To give us an opportunity to use more data in the future, we have decided to record each type of metric in a separate table called District Metric Type. The advantage of doing this is that, if DollarIQ is able to get hold some new user data which was not collected before, it can be used for further analysis without having to modify the District Stats table by adding another column. This entity has a one-to-many relationship with the District Stats entity since each metric type is related to multiple District Stats. It holds attributes like Metric ID (Primary Key) and Type which can be No. of inhabitants in an area, average age of people in the area, etc. 

#### 9. Transaction
The transaction table contains comprehensive details of all transactions. It records essential information such as the sender, receiver, transaction date, type, amount, and mode of transaction. This entity has 2 other entities linked to it which are Transaction Mode and Transaction Type to which is it is one-to-one related. Each transaction is uniquely identified by a TransactionID, while an AccountID serves as a foreign key linking transactions to specific accounts. The AccountID is present in the sender and receiver columns, directly linked from the account table. These connect the account details linked in a transaction to their users. The amount column contains numerical values of the amount transferred between the sender and receiver and the mode of transaction indicates whether it occurred via credit or savings.

#### 10. Transaction Mode
Transaction Mode for our bank would be card, cheque, bank transfer, etc. We have separated this entity from the main transactions table because it will prevent deletion anomalies in the database. We will also be able to add any new mode of transaction here without adding a new column to the Transactions entity. So the attributes of this table are Mode ID (Primary Key) and Mode Type. 

#### 11. Transaction Type
This entity also exists to prevent any deletion anomalies in our Transaction table. As the name suggests, this table will allow us to maintain the purpose for each transaction e.g. groceries, leisure activities, etc. The attributes of this entity are Transaction ID and Type. It has a one-to-many relation with the Transactions table because each type of transaction can be related to multiple transactions.

##### 12. Loan
Since loan request is an add-on feature on our website we have decided to keep it as a separate entity. Each Account can be linked to 0 or more loans but each loan can be related to only one account. Hence, the relationship between Loan and Account is one-to-one. It consists of multiple attributes like Loan ID (which is the Primary Key), Date, Amount, Duration, Payments and loan status.

##### 13. Loan Repayment
This table is separated because it allows us to easily track the number of repayments each user has made for each loan they have taken. So the unique Primary Key for this table is the Repayment ID and the attributes are Loan ID and Transaction ID. This entity is related to two other tables. It is related to the transactions table via a one-to-one relation since each loan repayment is also a transaction. It is also related to the Loan entity via a one-to-one relation since each loan repayment is only related to one loan.

##### 14. Loan Type
We have separated the loan type into a different entity because it prevents any deletion anomalies and it also allows us to maintain all different types of loan types like mortgage, car loan, credit card loan, etc. in a single table. It has a one-to-many relation since each type can be related to multiple loans. This entity contains the Loan Type ID, Type, and Interest Rate as the attributes. 

## Cardinality
- Employee to User: one-to-one (Each employee is associated with exactly one user)
- Employee to Role: one-to-one (Each employee is associated with exactly one role)
- User to Account: one-to-many (One user can have many accounts)
- User to Credit Score: one-to-one (Each user has one credit score)
- Account to Transactions: one-to-many (One account can have many transactions)
- Account to district: one-to-one (One account is made in one district)
- Loan to Account: one-to-many (One loan is associated with one account, but an account can have many loans)
- District to District Stats: one-to-many (One district can have many stats records)
- District stats to District Metric type: one-to-one (Each district has one metric type)
- Transaction to Transaction Mode: many-to-one (Many transactions can be made using one transaction mode)
- Transaction to Transaction Type: many-to-one (Many transactions can be of one transaction type)
- Loan to Loan Repayment: one-to-many (One loan can have many loan repayments)
- Loan to Loan Type: one-to-many (One loan can be of one loan type, but a loan type can apply to many loans)
- Transactions to Loan Repayment: many-to-one (Many transactions can be loan repayments, where each repayment transaction reduces the loan balance)

## Assumptions
- Singular User-Account Relationship: Each user can have multiple accounts, but each account is linked to only one user.
- Exclusive Employee Roles: Employees are mapped to a single role.
- Direct Credit Score Association: Users are assumed to have a one-to-one relationship with their credit scores, implying that credit history is not shared.
- Comprehensive Transaction Tracking: The system is designed to classify transactions both by type and mode.
- Account-Centric Loan Management: Loans are issued to and associated with individual accounts.
- Geographical Data Integration: Accounts are tied to districts, and districts have associated statistics.
- Unified Ledger Concept: Financial activities, including loan repayments, are recorded as transactions.

## Normalization
Our database is in BCNF because for each functional dependency X → Y in our schema, X is a Super Key and the entire schema is also in 3NF because every non-key attribute in a table is functionally dependent on the primary key.
We have chosen BCNF over 3NF for our Database design because BCNF eliminates all anomalies resulting from functional dependencies by ensuring that every determinant is a candidate key. This leads to a much better guarantee against insertion, update, and deletion anomalies that could occur when updating multiple tables in our database. Also since BCNF requires that all functional dependencies are on keys, it will ensure a higher level of data integrity.


## Relational Schema
- User: UserID (Primary Key) (INT), Password (VARCHAR), DateOfBirth (DATE), Gender (VARCHAR)

- Employee: EmployeeID (Primary Key) (INT), UserID (Foreign Key) (INT), RoleID (Foreign Key) (INT)

- Role: RoleID (Primary Key) (INT), RoleName (VARCHAR), AccessType (VARCHAR)

- Credit Score: UserID (Primary Key) (INT), CreditScore (INT), DateLastUpdated (DATE)

- Account: AccountID (Primary Key) (INT), UserID (Foreign Key) (INT), DistrictID (Foreign Key) (INT), DateCreated (DATE)

- District: DistrictID (Primary Key) (INT), DistrictName (VARCHAR), Region (VARCHAR)

- District Stats: StatID (Primary Key) (INT), DistrictID (Foreign Key) (INT), MetricID (Foreign Key) (INT), Values (DECIMAL)

- District Metric Type: MetricID (Primary Key) (INT), Type (VARCHAR)

- Transactions: TransactionID (Primary Key) (INT), SenderAccountID (INT), ReceiverAccountID (INT), Date (DATE), TransactionTypeID (Foreign Key) (INT),TransactionModeID (Foreign Key) (INT), Amount (DECIMAL)

- Transaction Mode: ModeID (Primary Key) (INT), ModeType (VARCHAR)

- Transaction Type: TransactionTypeID (Primary Key) (INT), Type (VARCHAR)

- Loan: LoanID (Primary Key) (INT), AccountID (Foreign Key) (INT), Date (DATE), Amount (DECIMAL), LoanTypeID (Foreign Key) (INT), Duration (INT)

- Loan Repayment: RepaymentID (Primary Key) (INT), LoanID (Foreign Key) (INT), TransactionID (Foreign Key) (INT)

- Loan Type: LoanTypeID (Primary Key) (INT), Type (VARCHAR)
