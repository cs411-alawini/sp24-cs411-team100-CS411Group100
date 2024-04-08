# Dollar IQ: Database Implementation & Indexing

## Part 1: DDL and Complex Queries

### Tables

#### Employee Table
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
#### Transaction Mode Table
```sql
CREATE TABLE TransactionMode (
    ModeID INT PRIMARY KEY,
    ModeType VARCHAR(255),
    IsDeleted BOOL DEFAULT FALSE,
    DateDeleted DATE,
    DateModified DATE
);
```
#### Transaction Type Table
```sql
CREATE TABLE TransactionType (
    TransactionTypeID INT PRIMARY KEY,
    Type VARCHAR(255),
    IsDeleted BOOL DEFAULT FALSE,
    DateDeleted DATE,
    DateModified DATE
);
```
#### Transactions Table
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

### Advanced Queries

#### Query 1
This query returns the average monthly expenditure of males aged 18-35, grouped by the transaction type:

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

## Part 2: Indexing