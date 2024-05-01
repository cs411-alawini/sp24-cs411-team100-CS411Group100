# Dollar IQ: Database Implementation & Indexing

## Part 1: Database Design and Structure
The database described through the Data Definition Language (DDL) statements consists of 14 tables, each representing a unique aspect of a financial system that includes user information, transactions, and administrative details.

### GCP Setup

GCP MYSQL Connection:

<img src="https://github.com/cs411-alawini/sp24-cs411-team100-CS411Group100/blob/main/images/gcp1.png" alt="Alt text" width="600">

<img src="https://github.com/cs411-alawini/sp24-cs411-team100-CS411Group100/blob/main/images/gcp2.png" alt="Alt text" width="600">


GCP Cloud SQL Studio Interface for Querying:

<img src="https://github.com/cs411-alawini/sp24-cs411-team100-CS411Group100/blob/main/images/gcp3.png" alt="Alt text" width="600">

### Tables

#### Employee Table
The Employee table keeps track of employees, including their unique ID, role within the organization (linked to the Role table), and information about whether the record is active or deleted.
```sql
CREATE TABLE Employee (
    EmployeeID INT PRIMARY KEY,
    UserID INT UNIQUE,
    RoleID INT,
    IsDeleted BOOL DEFAULT FALSE,
    DateDeleted DATE,
    DateModified DATE,
    FOREIGN KEY (UserID) REFERENCES User(UserID) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (RoleID) REFERENCES Role(RoleID) ON UPDATE CASCADE ON DELETE SET NULL
);
```
#### User Table
The User table stores details about users of the system, such as their unique ID, password, date of birth, gender, and deletion status. This table is fundamental as it links to many other tables to indicate user involvement.
```sql
CREATE TABLE User (
    UserID INT PRIMARY KEY,
    Password VARCHAR(255),
    DateOfBirth DATE,
    Gender VARCHAR(50),
    IsDeleted BOOL DEFAULT FALSE,
    DateDeleted DATE,
    DateModified DATE
);
```
#### Role Table
The Role table outlines different roles that can be assigned to employees, specifying each role's name and access type, ensuring that employees have the right permissions within the system.
```sql
CREATE TABLE Role (
    RoleID INT PRIMARY KEY,
    RoleName VARCHAR(255),
    AccessType VARCHAR(10),
    IsDeleted BOOL DEFAULT FALSE,
    DateDeleted DATE,
    DateModified DATE
);
```
#### District Metric Type Table
The DistrictMetricType table categorizes metrics used to evaluate districts, storing types of metrics and their statuses, which help in analyzing district performance.
```sql
CREATE TABLE DistrictMetricType (
    MetricID INT PRIMARY KEY,
    Type VARCHAR(255),
    IsDeleted BOOL DEFAULT FALSE,
    DateDeleted DATE,
    DateModified DATE
);
```
#### Account Table
The Account table is crucial for financial transactions, recording each account's ID, the user it belongs to, the district where the account is registered, and financial details like balance.
```sql
CREATE TABLE Account (
    AccountID INT PRIMARY KEY,
    UserID INT,
    DistrictID INT,
    Balance INT,
    DateCreated DATE,
    DateModified DATE,
    IsDeleted BOOL DEFAULT FALSE,
    DateDeleted DATE,
    FOREIGN KEY (UserID) REFERENCES User(UserID) ON UPDATE CASCADE,
    FOREIGN KEY (DistrictID) REFERENCES District(DistrictID) ON UPDATE CASCADE
);
```
#### District Table
The District table contains information about geographical districts, including their names and regions, enabling regional categorization and management within the system.
```sql
CREATE TABLE District (
    DistrictID INT PRIMARY KEY,
    DistrictName VARCHAR(255),
    Region VARCHAR(255),
    IsDeleted BOOL DEFAULT FALSE,
    DateDeleted DATE,
    DateModified DATE
);
```
#### District Stats Table
DistrictStats tracks statistical data for each district, using metrics defined in the DistrictMetricType table to provide a detailed analysis based on various indicators.
```sql
CREATE TABLE DistrictStats (
    DistrictID INT,
    MetricID INT,
    Value DECIMAL(10,2),
    IsDeleted BOOL DEFAULT FALSE,
    DateDeleted DATE,
    DateModified DATE,
    PRIMARY KEY (DistrictID, MetricID),
    FOREIGN KEY (DistrictID) REFERENCES District(DistrictID) ON UPDATE CASCADE,
    FOREIGN KEY (MetricID) REFERENCES DistrictMetricType(MetricID) ON UPDATE CASCADE
);
```
#### Credit Score Table
The CreditScore table is linked to users and stores their credit scores, a critical factor in financial services to determine users' creditworthiness.
```sql
CREATE TABLE CreditScore (
    UserID INT PRIMARY KEY,
    CreditScore INT,
    IsDeleted BOOL DEFAULT FALSE,
    DateDeleted DATE,
    DateModified DATE,
    FOREIGN KEY (UserID) REFERENCES User(UserID) ON UPDATE CASCADE
);
```
#### Transaction Mode / Type Tables
TransactionMode and TransactionType tables define how transactions are carried out and their nature, respectively. These classifications help in processing and categorizing transactions efficiently.
```sql
CREATE TABLE TransactionMode (
    ModeID INT PRIMARY KEY,
    ModeType VARCHAR(255),
    IsDeleted BOOL DEFAULT FALSE,
    DateDeleted DATE,
    DateModified DATE
);

CREATE TABLE TransactionType (
    TransactionTypeID INT PRIMARY KEY,
    Type VARCHAR(255),
    IsDeleted BOOL DEFAULT FALSE,
    DateDeleted DATE,
    DateModified DATE
);
```
#### Transactions Table
The Transactions table is a comprehensive record of all transactions, detailing the accounts involved, date, amount, and the type and mode of each transaction, ensuring a thorough transaction history is maintained.
```sql
CREATE TABLE Transactions (
    TransactionID INT PRIMARY KEY,
    SenderAccountID INT,
    ReceiverAccountID INT,
    Date DATE,
    TransactionTypeID INT,
    TransactionModeID INT,
    Amount DECIMAL(10, 2),
    IsDeleted BOOL DEFAULT FALSE,
    DateDeleted DATE,
    DateModified DATE,
    FOREIGN KEY (SenderAccountID) REFERENCES Account(AccountID) ON UPDATE CASCADE,
    FOREIGN KEY (ReceiverAccountID) REFERENCES Account(AccountID) ON UPDATE CASCADE,
    FOREIGN KEY (TransactionTypeID) REFERENCES TransactionType(TransactionTypeID) ON UPDATE CASCADE,
    FOREIGN KEY (TransactionModeID) REFERENCES TransactionMode(ModeID) ON UPDATE CASCADE
);
```
#### Loan Table
The Loan table records loan details, including the associated account, amount, type (linked to the LoanType table), and the loan's duration, essential for managing loans within the system.
```sql
CREATE TABLE Loan (
    LoanID INT PRIMARY KEY,
    AccountID INT,
    Date DATE,
    Amount DECIMAL(10, 2),
    LoanTypeID INT,
    DurationInMonths INT,
    IsDeleted BOOL DEFAULT FALSE,
    DateDeleted DATE,
    DateModified DATE,
    FOREIGN KEY (AccountID) REFERENCES Account(AccountID) ON UPDATE CASCADE,
    FOREIGN KEY (LoanTypeID) REFERENCES LoanType(LoanTypeID) ON UPDATE CASCADE
);
```
#### Loan Type Table
The LoanType table categorizes types of loans available, including details like interest rates, to offer various financial products to users based on their needs.
```sql
CREATE TABLE LoanType (
    LoanTypeID INT PRIMARY KEY,
    Type VARCHAR(255),
    InterestRate DECIMAL(5, 2),
    IsDeleted BOOL DEFAULT FALSE,
    DateDeleted DATE,
    DateModified DATE
);
```
#### Loan Repayment Table
LoanRepayment links loans to their repayments, ensuring each loan repayment is tracked against specific transactions for accurate financial management.
```sql
CREATE TABLE LoanRepayment (
    LoanID INT,
    TransactionID INT,
    IsDeleted BOOL DEFAULT FALSE,
    DateDeleted DATE,
    DateModified DATE,
    PRIMARY KEY (LoanID, TransactionID),
    FOREIGN KEY (LoanID) REFERENCES Loan(LoanID)
```

### Row Count For Tables

The following query was used to find the number of rows in each table:

```sql
SELECT 'Account' AS TableName, COUNT(*) AS NumberOfRows FROM Account
UNION ALL
SELECT 'CreditScore' AS TableName, COUNT(*) AS NumberOfRows FROM CreditScore
UNION ALL
SELECT 'District' AS TableName, COUNT(*) AS NumberOfRows FROM District
UNION ALL
SELECT 'DistrictMetricType' AS TableName, COUNT(*) AS NumberOfRows FROM DistrictMetricType
UNION ALL
SELECT 'DistrictStats' AS TableName, COUNT(*) AS NumberOfRows FROM DistrictStats
UNION ALL
SELECT 'Employee' AS TableName, COUNT(*) AS NumberOfRows FROM Employee
UNION ALL
SELECT 'Loan' AS TableName, COUNT(*) AS NumberOfRows FROM Loan
UNION ALL
SELECT 'LoanRepayment' AS TableName, COUNT(*) AS NumberOfRows FROM LoanRepayment
UNION ALL
SELECT 'LoanType' AS TableName, COUNT(*) AS NumberOfRows FROM LoanType
UNION ALL
SELECT 'Role' AS TableName, COUNT(*) AS NumberOfRows FROM Role
UNION ALL
SELECT 'TransactionMode' AS TableName, COUNT(*) AS NumberOfRows FROM TransactionMode
UNION ALL
SELECT 'TransactionType' AS TableName, COUNT(*) AS NumberOfRows FROM TransactionType
UNION ALL
SELECT 'Transactions' AS TableName, COUNT(*) AS NumberOfRows FROM Transactions
UNION ALL
SELECT 'User' AS TableName, COUNT(*) AS NumberOfRows FROM User;
```

<img src="https://github.com/cs411-alawini/sp24-cs411-team100-CS411Group100/blob/main/images/rows.png" alt="Alt text" width="600">

3 of the tables have atleast 1000 rows as required:
| Table         | Rows   |
|---------------|--------|
| User          | 3,025  |
| Account       | 4,479  |
| Transactions  | 1,038,830 |


### Advanced Queries

#### Query 1
This query is designed to analyze the average monthly spending habits of men aged 18 to 35, broken down by different types of transactions. It selects relevant data from `User`, `Account`, `Transactions`, and `TransactionType` tables, filters out inactive entries, and focuses solely on male users within the specified age range. Then, it groups the transactions by `Type` and calculates the average amount spent each month for each type. This provides insights into how young men distribute their expenditures across various transaction categories.

```sql
SELECT
  tt.Type AS TransactionType,
  AVG(t.Amount) AS AverageMonthlySpend
FROM
  User u JOIN
  Account a ON u.UserID = a.UserID
JOIN
  Transactions t ON a.AccountID = t.SenderAccountID
JOIN
  TransactionType tt ON t.TransactionTypeID = tt.TransactionTypeID
WHERE
  u.IsDeleted = FALSE
  AND a.IsDeleted = FALSE
  AND t.IsDeleted = FALSE
  AND tt.IsDeleted = FALSE
  AND TIMESTAMPDIFF(YEAR, u.DateOfBirth, CURDATE()) BETWEEN 18 AND 35
  AND u.Gender = 'M'
GROUP BY
tt.Type;
```

<img src="https://github.com/cs411-alawini/sp24-cs411-team100-CS411Group100/blob/main/images/query1.png" alt="Alt text" width="600">

#### Query 2
This query retrieves information about users and their accounts, focusing on balances and credit scores. It links `User` details with their `Accounts` and `CreditScores`, filtering accounts with balances higher than the average for their district and users with credit scores higher than the overall average. The query ensures only active accounts and Female users are considered. Essentially, it helps identify users with above-average financial standings, potentially useful for targeted analysis or decision-making.
```sql
SELECT
   U.UserID,
   A.DistrictID,
   A.Balance,
   C.CreditScore
FROM
   Account A
JOIN User U ON A.UserID = U.UserID
JOIN CreditScore C ON U.UserID = C.UserID
WHERE
   A.Balance > (
       SELECT AVG(A2.Balance)
       FROM Account A2
       WHERE A2.DistrictID = A.DistrictID AND A2.IsDeleted = FALSE
   )
AND C.CreditScore > (
       SELECT AVG(C2.CreditScore)
       FROM CreditScore C2
       WHERE C2.IsDeleted = FALSE
   )
AND U.Gender = 'F'
AND A.IsDeleted = FALSE
AND U.IsDeleted = FALSE;
```

<img src="https://github.com/cs411-alawini/sp24-cs411-team100-CS411Group100/blob/main/images/query2.png" alt="Alt text" width="600">

#### Query 3
This query provides a snapshot of how much money, on average, men and women have in their bank accounts across different areas. It looks at each area's name and how many people live there, then breaks down the average amount of money in accounts by whether the account holder is male or female. It makes sure to only consider accounts and people that are currently active (not deleted) and organizes the results by area, how big each area is, and whether the account holders are male or female. This way, we can for instance see if men in one area have more money on average in their accounts than women in the same area or compare these averages across different areas.

```sql
SELECT
   D.DistrictName,
   DS.Value AS Population,
   U.Gender,
   AVG(A.Balance) AS AverageBalance
FROM
   Account A
JOIN User U ON A.UserID = U.UserID
JOIN District D ON A.DistrictID = D.DistrictID
JOIN DistrictStats DS ON D.DistrictID = DS.DistrictID AND DS.MetricID = 1
WHERE
   A.IsDeleted = FALSE AND U.IsDeleted = FALSE AND DS.IsDeleted = FALSE
GROUP BY
   D.DistrictName, DS.Value, U.Gender
ORDER BY
   D.DistrictName, DS.Value DESC, U.Gender
LIMIT 15;
```

<img src="https://github.com/cs411-alawini/sp24-cs411-team100-CS411Group100/blob/main/images/query3.png" alt="Alt text" width="600">

#### Query 4
This query calculates the average time it takes for loans to start being repaid in each district. For each district, it lists the district name and population, and then finds the average number of months between when a loan was given out and the date of the first repayment. The results are grouped by district and sorted so that the districts where it takes the least time to start repaying loans come first.
```sql
SELECT
   D.DistrictName,
   DS.Value AS Population,
   AVG(TIMESTAMPDIFF(MONTH, L.Date, MinRepaymentDate)) AS AverageRepaymentDurationMonths
FROM
   Loan L
JOIN Account A ON L.AccountID = A.AccountID
JOIN User U ON A.UserID = U.UserID
JOIN District D ON A.DistrictID = D.DistrictID
JOIN DistrictStats DS ON D.DistrictID = DS.DistrictID AND DS.MetricID = 1
JOIN (
   SELECT
       LR.LoanID,
       MIN(T.Date) AS MinRepaymentDate
   FROM
       LoanRepayment LR
   JOIN Transactions T ON LR.TransactionID = T.TransactionID
   WHERE
       T.IsDeleted = FALSE
   GROUP BY
       LR.LoanID
) AS FirstRepayment ON L.LoanID = FirstRepayment.LoanID
WHERE
   L.IsDeleted = FALSE AND A.IsDeleted = FALSE AND U.IsDeleted = FALSE AND DS.IsDeleted = FALSE
GROUP BY
   D.DistrictName, DS.Value
ORDER BY
   AverageRepaymentDurationMonths ASC;
```

The negative results we get in the query are interesting as we expected the first payment date to be after the loan date. However, upon further inspection of the dataset, we found that the transaction dataset contains some discrepencies that result in this issue. We did not modify the data for now, and proceeded with the results that we get.

<img src="https://github.com/cs411-alawini/sp24-cs411-team100-CS411Group100/blob/main/images/query4.png" alt="Alt text" width="600">

**BONUS: We also implemented the following stored procedures which are a combination of several complex queries:**

#### Stored Procedure 1: Generate Loan Repayment Schedule

```sql
CREATE DEFINER=`root`@`%` PROCEDURE `GenerateRepaymentSchedule`(IN accountNumber INT)
BEGIN

   DECLARE my_loanID INT;
   DECLARE my_loanAmount DECIMAL(10,2);
   DECLARE my_loanDate DATE;
   DECLARE my_loanDuration INT;
   DECLARE my_interestRate DECIMAL(5,2);
   DECLARE my_paymentsDone DECIMAL(10,2);
   DECLARE my_monthsRemaining INT;
   DECLARE my_monthlyRepayment DECIMAL(10,2);
   DECLARE my_lastTransactionDate DATE;
   DECLARE my_currentDate DATE;
   DECLARE done INT DEFAULT FALSE;

   DECLARE loanCursor CURSOR FOR
       SELECT LoanID FROM Loan WHERE AccountID = accountNumber;
      
   DECLARE CONTINUE HANDLER FOR NOT FOUND
       SET done = TRUE;

   DROP TEMPORARY TABLE IF EXISTS RepaymentSchedule;

   CREATE TEMPORARY TABLE RepaymentSchedule (
       LoanID INT,
       LoanMonth DATE,
       Payment DECIMAL(10,2)
   );

   OPEN loanCursor;
  
   loanLoop: LOOP
       FETCH loanCursor INTO my_loanID;
      
       IF done THEN
           LEAVE loanLoop;
       END IF;

       SELECT l.Amount, l.Date, l.DurationInMonths, lt.InterestRate
       INTO my_loanAmount, my_loanDate, my_loanDuration, my_interestRate
       FROM Loan l
       JOIN LoanType lt ON l.LoanTypeID = lt.LoanTypeID
       WHERE l.LoanID = my_loanID;

       SELECT IFNULL(SUM(t.Amount), 0)
       INTO my_paymentsDone
       FROM LoanRepayment lr
       JOIN Transactions t ON lr.TransactionID = t.TransactionID
       WHERE lr.LoanID = my_loanID;

       SELECT MAX(t.Date)
       INTO my_lastTransactionDate
       FROM LoanRepayment lr
       JOIN Transactions t ON lr.TransactionID = t.TransactionID
       WHERE lr.LoanID = my_loanID;

       IF my_lastTransactionDate IS NOT NULL THEN
           SELECT TIMESTAMPDIFF(MONTH, my_loanDate, my_lastTransactionDate)
           INTO my_monthsRemaining;
       ELSE
           SET my_monthsRemaining = 0;
       END IF;

       SET my_monthsRemaining = my_loanDuration;
       SET my_monthlyRepayment = (my_loanAmount + (my_loanAmount * (my_interestRate / 100) * (my_monthsRemaining / 12))) / my_monthsRemaining;

       SET my_currentDate = COALESCE(my_lastTransactionDate, my_loanDate);


       WHILE my_monthsRemaining > 0 DO
           SET my_currentDate = ADDDATE(my_currentDate, INTERVAL 1 MONTH);


           INSERT INTO RepaymentSchedule (LoanID, LoanMonth, Payment)
           VALUES (my_loanID, my_currentDate, my_monthlyRepayment);


           SET my_monthsRemaining = my_monthsRemaining - 1;
       END WHILE;


   END LOOP;

   CLOSE loanCursor;

   SELECT * FROM RepaymentSchedule;
END
```

#### Stored Procedure 2: Get Transaction Summary
```sql
CREATE DEFINER=`root`@`%` PROCEDURE `GetTransactionSummary`(
   IN account_number INT,
   IN start_date DATE,
   IN end_date DATE,
   IN transaction_type VARCHAR(255)
)
BEGIN

   -- Set default start date if none provided
   IF start_date IS NULL THEN
       SET start_date = '1970-01-01';
   END IF;

   -- Set default end date if none provided
   IF end_date IS NULL THEN
       SET end_date = NOW();
   END IF;
```

#### Stored Procedure 3: Get User Accounts' Summary
```sql
CREATE DEFINER=`root`@`%` PROCEDURE `GetUserAccountsSummary`(
   IN user_id INT,
   IN start_date DATE,
   IN end_date DATE
)
BEGIN

   IF start_date IS NULL THEN
       SET start_date = '1970-01-01';  -- Default start date if not provided
   END IF;

   IF end_date IS NULL THEN
       SET end_date = NOW();  -- Default end date if not provided
   END IF;

   SELECT
       u.UserID,
       a.AccountID,
       SUM(CASE
           WHEN t.ReceiverAccountID = a.AccountID THEN t.Amount
           ELSE 0
       END) AS CreditSummary,
       SUM(CASE
           WHEN t.SenderAccountID = a.AccountID THEN t.Amount
           ELSE 0
       END) AS DebitSummary,
       a.Balance AS AccountBalance
   FROM
       User u
       INNER JOIN Account a ON u.UserID = a.UserID
       LEFT JOIN Transactions t ON a.AccountID = t.ReceiverAccountID OR a.AccountID = t.SenderAccountID
   WHERE
       u.UserID = user_id AND
       t.Date BETWEEN start_date AND end_date AND
       t.IsDeleted = FALSE AND
       a.IsDeleted = FALSE
   GROUP BY
       u.UserID, a.AccountID;

END;
```


## Part 2: Indexing

We have used the default BTree indexing for all the queries. To measure the performance difference, we chose different columns to index and describe them to reason about the best configuration. The following screenshot is an example of the cost we get for each run of `EXPLAIN ANALYZE` for our complex queries:

<img src="https://github.com/cs411-alawini/sp24-cs411-team100-CS411Group100/blob/main/images/index1.png" alt="Alt text" width="600">

### Query 1
For this query, the `DateOfBirth` and `Gender` attributes in the `User` table were indexed.

| Index Config | Join Cost | Gender Filter Cost | DOB Filter Cost |
|--------------|:------:|:------:|:----:|
| No Index           | 3906.68 | 306.73 | 306.08
| DOB Index          | 3906.68 | 306.73 | 306.08
| Gender Index       | 18120.01 | 0.25 | 0.25
| DOB + Gender Index | 18120.01 | 0.25 | 0.25

No Index:

<img src="https://github.com/cs411-alawini/sp24-cs411-team100-CS411Group100/blob/main/images/index1_1.png" alt="Alt text" width="600">

DOB Index:

<img src="https://github.com/cs411-alawini/sp24-cs411-team100-CS411Group100/blob/main/images/index1_2.png" alt="Alt text" width="600">

Gender Index:

<img src="https://github.com/cs411-alawini/sp24-cs411-team100-CS411Group100/blob/main/images/index1_3.png" alt="Alt text" width="600">

DOB + Gender Index:

<img src="https://github.com/cs411-alawini/sp24-cs411-team100-CS411Group100/blob/main/images/index1_4.png" alt="Alt text" width="600">

The initial analysis reveals that indexing the date of birth does not change the query cost, implying that data retrieval efficiency remains consistent, as the database executes the same number of operations. However, indexing gender leads to a significant increase in the estimated query cost, an effect that persists even with both gender and date of birth indexed. This suggests that gender indexing profoundly affects the database's cost estimation, possibly due to a more complex query execution path introduced by the index on a low-cardinality field like gender.

Indexing fields with low cardinality, such as gender, can result in unforeseen changes in query cost estimations. The significant cost increase observed upon indexing such fields underscores the necessity for careful planning and testing when implementing indexes. The impact of indexing varies greatly depending on the query and data structure involved. While indexes are essential for improving query execution times, their effect on cost estimations requires careful evaluation. This is to ensure that indexing provides the intended performance improvements without unduly complicating the execution plan or escalating resource requirements.

### Query 2
For this query, the `CreditScore` and `Gender` attributes were indexed.

| Index Config | Join Cost |
|--------------|:------:|
| No Index                    | 320.81 |
| CreditScore Index           | 322.25 |
| Gender Index                | 100.98 |
| CreditScore + Gender Index  | 108.11 |

No Index:

<img src="https://github.com/cs411-alawini/sp24-cs411-team100-CS411Group100/blob/main/images/index2_1.png" alt="Alt text" width="600">

CreditScore Index:

<img src="https://github.com/cs411-alawini/sp24-cs411-team100-CS411Group100/blob/main/images/index2_2.png" alt="Alt text" width="600">

Gender Index:

<img src="https://github.com/cs411-alawini/sp24-cs411-team100-CS411Group100/blob/main/images/index2_3.png" alt="Alt text" width="600">

CreditScore + Gender Index:

<img src="https://github.com/cs411-alawini/sp24-cs411-team100-CS411Group100/blob/main/images/index2_4.png" alt="Alt text" width="600">

The addition of indexing on both the Gender and CreditScore attributes has yielded a combined effect, further optimizing the query's execution plan. The nested loop join cost, when both attributes are indexed, has shown an increment compared to indexing Gender alone, suggesting a more complex interplay between indexes. This result emphasizes the comprehensive approach to indexing, considering not only individual column characteristics but also their combined impact on the query's performance.

### Query 3
For this query, the `Gender` attribute in the `User` table and the `DistrictName` attribute in the `District` table were indexed.
| Index Config | Cost |
|--------------|:------:|
| No Index           | 145.56 |
| Gender Index  | 145.56 | 
| DistrictName Index | 145.56 |
| Gender + DistrictName Index | 145.56 |

No Index:

<img src="https://github.com/cs411-alawini/sp24-cs411-team100-CS411Group100/blob/main/images/index3_1.png" alt="Alt text" width="600">

Gender Index:

<img src="https://github.com/cs411-alawini/sp24-cs411-team100-CS411Group100/blob/main/images/index3_2.png" alt="Alt text" width="600">

DistrictName Index:

<img src="https://github.com/cs411-alawini/sp24-cs411-team100-CS411Group100/blob/main/images/index3_3.png" alt="Alt text" width="600">

Gender + DistrictName Index:

<img src="https://github.com/cs411-alawini/sp24-cs411-team100-CS411Group100/blob/main/images/index3_4.png" alt="Alt text" width="600">

The outputs before and after implementing indexes on DistrictName, Gender and their combination reveals a nuanced effect on query performance. Despite the introduction of indexes, the overall cost metrics and execution times show minimal fluctuation, indicating a balanced optimization by the database's query planner. The steady performance, particularly in operations like index lookups and filters, highlights the indexes' role in ensuring consistent data access speeds despite the added complexity of sorting and aggregating large datasets.

The consistent query performance post-indexing on DistrictName, Gender and their combination underscores the strategic advantage of selective indexing in complex database queries. This scenario illustrates that proper indexing, even on columns with varied cardinality like DistrictName (high) and Gender (low), can effectively support the database in sustaining efficient query execution without significant cost penalties. 

### Query 4
For this query, the `DistrictName` attribute in the `District` table and the `Value` attribute in the `DistrictStats` table were indexed.
| Index Config | Cost |
|--------------|:------:|
| No Index           | 401.02 |
| DistrictName Index  | 401.02 | 
| Value Index | 401.02 |
| DistrictName + Value Index | 401.02 |

No Index:

<img src="https://github.com/cs411-alawini/sp24-cs411-team100-CS411Group100/blob/main/images/index4_1.png" alt="Alt text" width="600">

DistrictName Index:

<img src="https://github.com/cs411-alawini/sp24-cs411-team100-CS411Group100/blob/main/images/index4_2.png" alt="Alt text" width="600">

Value Index:

<img src="https://github.com/cs411-alawini/sp24-cs411-team100-CS411Group100/blob/main/images/index4_3.png" alt="Alt text" width="600">

DistrictName + Value Index:

<img src="https://github.com/cs411-alawini/sp24-cs411-team100-CS411Group100/blob/main/images/index4_4.png" alt="Alt text" width="600">

The estimated cost for processing the query remained unchanged at 401.02, regardless of whether indexes were added to the combination DistrictName or the Value attribute of DistrictStats. This consistency in cost estimates suggests that the indexing efforts didn't influence the database's internal predictions about how much work was needed to execute the query. Interestingly, even though indexes were applied, they didn't seem to sway the performance metrics according to the database's cost model. It's possible that the size of the data being queried was too small for the indexing to make a noticeable difference in performance from the database's perspective.

The fact that all cost estimates stayed the same at 401.02, even after indexing, indicates that the addition of indexes did not significantly impact the performance. This could imply that the datasets involved in the queries are relatively small, and therefore, the potential performance gains from indexing were not substantial enough to be detected by the cost estimation model. In scenarios where the data size is not large, the database's existing mechanisms for handling queries might already be so efficient that indexes don't offer a noticeable improvement within the scope of this specific analysis.


