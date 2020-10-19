CREATE TABLE IF NOT EXISTS users
(
    officernumber VARCHAR(20) NOT NULL PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE KEY,
    nationalid BIGINT NOT NULL UNIQUE KEY,
    phonenumber VARCHAR(15) NOT NULL,
    admin BOOLEAN NOT NULL DEFAULT 0,
    password VARCHAR(50) NOT NULL
 );

CREATE TABLE  IF NOT EXISTS cases (
    casenumber VARCHAR (20) NOT NULL PRIMARY KEY ,
    serial VARCHAR(10) NOT NULL ,
    description TEXT NOT  NULL ,
    level INT NOT NULL ,
    status ENUM('In-Process','Complete') NOT NULL DEFAULT 'In-Process',
    date DATETIME NOT NULL ,
    route VARCHAR (255),
    officernumber VARCHAR (20) NOT NULL ,
    FOREIGN KEY (officernumber)  REFERENCES users(officernumber),
    FOREIGN KEY (serial) REFERENCES vehicles(serial)
);

CREATE TABLE IF NOT EXISTS drivers (
    nationalid BIGINT PRIMARY KEY NOT NULL ,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE KEY,
    phonenumber VARCHAR(15) NOT NULL
);

CREATE TABLE IF NOT EXISTS vehicles (
    serial VARCHAR (10) PRIMARY KEY NOT NULL ,
    color VARCHAR (100) NOT NULL ,
    seatertype INT NOT NULL ,
    sacconame VARCHAR (50) NOT NULL ,
    driverid BIGINT NULL,
    FOREIGN KEY (driverid) REFERENCES drivers(nationalid)
);

CREATE TABLE IF NOT EXISTS notifications (
  id BIGINT AUTO_INCREMENT PRIMARY KEY NOT NULL ,
  officernumber VARCHAR(20) NOT NULL ,
  message TEXT NOT NULL ,
  date DATETIME NOT NULL ,
  route VARCHAR(100) NOT NULL ,
  approved BOOLEAN DEFAULT 0 NOT NULL
);