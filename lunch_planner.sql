-- phpMyAdmin SQL Dump
--
-- Host: localhost
-- Erstellungszeit: 16. Jun 2018 um 12:00
-- Server-Version: 5.7.22-0ubuntu0.16.04.1
-- PHP-Version: 7.0.30-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `lunch_planner`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Activity`
--

CREATE TABLE `Activity` (
  `Activity_Id` int(11) NOT NULL,
  `Description` varchar(250) DEFAULT NULL,
  `Activityname` varchar(45) NOT NULL,
  `Place` varchar(45) NOT NULL,
  `Time` datetime NOT NULL,
  `Eventtag` tinyint(1) NOT NULL,
  `Private` tinyint(1) NOT NULL,
  `Host` int(1) DEFAULT NULL,
  `Banner` varchar(45) NOT NULL,
  `MaxParticipants` int(11) NOT NULL,
  `Organization` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `Activity`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `LunchRestaurant`
--

CREATE TABLE `LunchRestaurant` (
  `LunchRestaurant_Id` int(11) NOT NULL,
  `Host` int(11) NOT NULL,
  `TimeFrom` date NOT NULL,
  `TimeTo` date NOT NULL,
  `LunchImage` varchar(100) DEFAULT NULL,
  `LunchText` varchar(3000) DEFAULT NULL,
  `Price` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `LunchRestaurant`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `member_of`
--

CREATE TABLE `member_of` (
  `User_Id` int(11) NOT NULL,
  `Team_Id` int(11) NOT NULL,
  `Accepted` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `member_of`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Message`
--

CREATE TABLE `Message` (
  `Message_Id` int(11) NOT NULL,
  `Date` datetime NOT NULL,
  `Messagecontent` varchar(250) NOT NULL,
  `Activity_Id` int(11) NOT NULL,
  `User_Id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `Message`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Notification`
--

CREATE TABLE `Notification` (
  `Notification_Id` int(11) NOT NULL,
  `Type` varchar(50) NOT NULL,
  `Title` varchar(100) NOT NULL,
  `Message` varchar(100) NOT NULL,
  `Time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Seen` tinyint(1) NOT NULL DEFAULT '0',
  `Target_Id` int(11) DEFAULT NULL,
  `User_Id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `Notification`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Organization`
--

CREATE TABLE `Organization` (
  `Organization_Id` int(11) NOT NULL,
  `Organizationname` varchar(50) NOT NULL,
  `Organizationpassword` varchar(100) NOT NULL,
  `Description` varchar(200) NOT NULL,
  `Admin` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `Organization`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `participates`
--

CREATE TABLE `participates` (
  `Participates_Id` int(11) NOT NULL,
  `User_Id` int(11) NOT NULL,
  `Activity_Id` int(11) NOT NULL,
  `Accepted` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `participates`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `part_of`
--

CREATE TABLE `part_of` (
  `User_Id` int(11) NOT NULL,
  `Organization_Id` int(11) NOT NULL,
  `Active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `part_of`
--

INSERT INTO `part_of` (`User_Id`, `Organization_Id`, `Active`) VALUES
(1, 1, 1),
(1, 2, 0),
(10, 1, 1),
(666, 1, 1),
(901, 1, 1),
(904, 1, 1),
(910, 1, 1),
(1000, 1, 1),
(1011, 2, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Restaurant`
--

CREATE TABLE `Restaurant` (
  `Restaurant_Id` int(11) NOT NULL,
  `GooglePlaces_Id` varchar(100) DEFAULT NULL,
  `Name` varchar(50) NOT NULL,
  `Email` varchar(30) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Place` varchar(30) NOT NULL,
  `Zipcode` int(10) NOT NULL,
  `Street` varchar(30) NOT NULL,
  `StreetNumber` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `Restaurant`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `subscribed`
--

CREATE TABLE `subscribed` (
  `Subscriber_Id` int(11) NOT NULL,
  `Subscribed_Id` int(11) NOT NULL COMMENT '(passiv)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='shows the connection (subscribing) between two users ';

--
-- Daten für Tabelle `subscribed`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Team`
--

CREATE TABLE `Team` (
  `Team_Id` int(11) NOT NULL,
  `Teamname` varchar(30) NOT NULL,
  `Teammanager` int(11) DEFAULT NULL,
  `Description` varchar(80) DEFAULT NULL,
  `Group_Icon` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `Team`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `teamParticipates`
--

CREATE TABLE `teamParticipates` (
  `TeamParticipates_Id` int(11) NOT NULL,
  `Team_Id` int(11) NOT NULL,
  `Activity_Id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `teamParticipates`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `User`
--

CREATE TABLE `User` (
  `User_Id` int(11) NOT NULL,
  `Firstname` varchar(45) DEFAULT NULL,
  `Name` varchar(45) DEFAULT NULL,
  `Email` varchar(45) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `User`
--


--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `Activity`
--
ALTER TABLE `Activity`
  ADD PRIMARY KEY (`Activity_Id`),
  ADD KEY `Host` (`Host`),
  ADD KEY `Organization` (`Organization`);

--
-- Indizes für die Tabelle `LunchRestaurant`
--
ALTER TABLE `LunchRestaurant`
  ADD PRIMARY KEY (`LunchRestaurant_Id`),
  ADD KEY `Host` (`Host`);

--
-- Indizes für die Tabelle `member_of`
--
ALTER TABLE `member_of`
  ADD PRIMARY KEY (`User_Id`,`Team_Id`),
  ADD KEY `member_of_ibfk_2` (`Team_Id`);

--
-- Indizes für die Tabelle `Message`
--
ALTER TABLE `Message`
  ADD PRIMARY KEY (`Message_Id`),
  ADD KEY `Activity_Id` (`Activity_Id`),
  ADD KEY `User_Id` (`User_Id`);

--
-- Indizes für die Tabelle `Notification`
--
ALTER TABLE `Notification`
  ADD PRIMARY KEY (`Notification_Id`),
  ADD KEY `User_Id` (`User_Id`);

--
-- Indizes für die Tabelle `Organization`
--
ALTER TABLE `Organization`
  ADD PRIMARY KEY (`Organization_Id`),
  ADD KEY `Admin` (`Admin`);

--
-- Indizes für die Tabelle `participates`
--
ALTER TABLE `participates`
  ADD PRIMARY KEY (`Participates_Id`),
  ADD KEY `User_Id` (`User_Id`),
  ADD KEY `Activity_Id` (`Activity_Id`);

--
-- Indizes für die Tabelle `part_of`
--
ALTER TABLE `part_of`
  ADD PRIMARY KEY (`User_Id`,`Organization_Id`),
  ADD KEY `User_Id` (`User_Id`),
  ADD KEY `Organization_Id` (`Organization_Id`);

--
-- Indizes für die Tabelle `Restaurant`
--
ALTER TABLE `Restaurant`
  ADD PRIMARY KEY (`Restaurant_Id`);

--
-- Indizes für die Tabelle `subscribed`
--
ALTER TABLE `subscribed`
  ADD PRIMARY KEY (`Subscriber_Id`,`Subscribed_Id`),
  ADD KEY `subscribed_ibfk_2` (`Subscribed_Id`);

--
-- Indizes für die Tabelle `Team`
--
ALTER TABLE `Team`
  ADD PRIMARY KEY (`Team_Id`),
  ADD KEY `Teammanager` (`Teammanager`);

--
-- Indizes für die Tabelle `teamParticipates`
--
ALTER TABLE `teamParticipates`
  ADD PRIMARY KEY (`TeamParticipates_Id`),
  ADD KEY `Team_Id` (`Team_Id`),
  ADD KEY `Activity_Id` (`Activity_Id`);

--
-- Indizes für die Tabelle `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`User_Id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `Activity`
--
ALTER TABLE `Activity`
  MODIFY `Activity_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT für Tabelle `LunchRestaurant`
--
ALTER TABLE `LunchRestaurant`
  MODIFY `LunchRestaurant_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT für Tabelle `Message`
--
ALTER TABLE `Message`
  MODIFY `Message_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT für Tabelle `Notification`
--
ALTER TABLE `Notification`
  MODIFY `Notification_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT für Tabelle `Organization`
--
ALTER TABLE `Organization`
  MODIFY `Organization_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT für Tabelle `participates`
--
ALTER TABLE `participates`
  MODIFY `Participates_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT für Tabelle `Restaurant`
--
ALTER TABLE `Restaurant`
  MODIFY `Restaurant_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT für Tabelle `Team`
--
ALTER TABLE `Team`
  MODIFY `Team_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT für Tabelle `teamParticipates`
--
ALTER TABLE `teamParticipates`
  MODIFY `TeamParticipates_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT für Tabelle `User`
--
ALTER TABLE `User`
  MODIFY `User_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `Activity`
--
ALTER TABLE `Activity`
  ADD CONSTRAINT `Activity_ibfk_1` FOREIGN KEY (`Host`) REFERENCES `User` (`User_Id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `Activity_ibfk_2` FOREIGN KEY (`Organization`) REFERENCES `Organization` (`Organization_Id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints der Tabelle `LunchRestaurant`
--
ALTER TABLE `LunchRestaurant`
  ADD CONSTRAINT `LunchRestaurant_ibfk_1` FOREIGN KEY (`Host`) REFERENCES `Restaurant` (`Restaurant_Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `member_of`
--
ALTER TABLE `member_of`
  ADD CONSTRAINT `member_of_ibfk_1` FOREIGN KEY (`User_Id`) REFERENCES `User` (`User_Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `member_of_ibfk_2` FOREIGN KEY (`Team_Id`) REFERENCES `Team` (`Team_Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `Message`
--
ALTER TABLE `Message`
  ADD CONSTRAINT `Message_ibfk_1` FOREIGN KEY (`Activity_Id`) REFERENCES `Activity` (`Activity_Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Message_ibfk_2` FOREIGN KEY (`User_Id`) REFERENCES `User` (`User_Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `Notification`
--
ALTER TABLE `Notification`
  ADD CONSTRAINT `Notification_ibfk_1` FOREIGN KEY (`User_Id`) REFERENCES `User` (`User_Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `Organization`
--
ALTER TABLE `Organization`
  ADD CONSTRAINT `Organization_ibfk_1` FOREIGN KEY (`Admin`) REFERENCES `User` (`User_Id`);

--
-- Constraints der Tabelle `participates`
--
ALTER TABLE `participates`
  ADD CONSTRAINT `participates_ibfk_1` FOREIGN KEY (`User_Id`) REFERENCES `User` (`User_Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `participates_ibfk_2` FOREIGN KEY (`Activity_Id`) REFERENCES `Activity` (`Activity_Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `part_of`
--
ALTER TABLE `part_of`
  ADD CONSTRAINT `part_of_ibfk_1` FOREIGN KEY (`User_Id`) REFERENCES `User` (`User_Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `part_of_ibfk_2` FOREIGN KEY (`Organization_Id`) REFERENCES `Organization` (`Organization_Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `subscribed`
--
ALTER TABLE `subscribed`
  ADD CONSTRAINT `subscribed_ibfk_1` FOREIGN KEY (`Subscriber_Id`) REFERENCES `User` (`User_Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `subscribed_ibfk_2` FOREIGN KEY (`Subscribed_Id`) REFERENCES `User` (`User_Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `Team`
--
ALTER TABLE `Team`
  ADD CONSTRAINT `Team_ibfk_1` FOREIGN KEY (`Teammanager`) REFERENCES `User` (`User_Id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints der Tabelle `teamParticipates`
--
ALTER TABLE `teamParticipates`
  ADD CONSTRAINT `teamParticipates_ibfk_1` FOREIGN KEY (`Activity_Id`) REFERENCES `Activity` (`Activity_Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `teamParticipates_ibfk_2` FOREIGN KEY (`Team_Id`) REFERENCES `Team` (`Team_Id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
