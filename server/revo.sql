-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 13, 2018 at 02:07 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `revo`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `id` int(11) NOT NULL,
  `reg_no` int(7) NOT NULL,
  `offense` text NOT NULL,
  `snr_report` text NOT NULL,
  `member_report` varchar(250) NOT NULL,
  `category` char(1) NOT NULL,
  `status` char(20) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`id`, `reg_no`, `offense`, `snr_report`, `member_report`, `category`, `status`, `created`, `updated`) VALUES
(1, 1600172, 'Drug Abuse', 'Proceed sdc!!!!', 'He was abusing drugs', 'A', 'Processed', '2018-12-13 01:38:33', '0000-00-00 00:00:00'),
(2, 1700172, 'Stealing', 'Yes he was steal pure water', 'I caught red handed', 'A', 'Processed', '2018-12-13 09:50:37', '0000-00-00 00:00:00'),
(3, 1700172, 'Dress Code Voliation', 'fsdffsdfggsdfgfsdgd', 'Okay he was wearing pinjames', 'C', 'Processed', '2018-12-13 09:52:39', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `loggedin`
--

CREATE TABLE `loggedin` (
  `id` int(11) NOT NULL,
  `user_id` varchar(100) NOT NULL,
  `token` varchar(200) NOT NULL,
  `loggedin` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `reg_no` int(7) NOT NULL,
  `webmail` varchar(255) NOT NULL,
  `matric` varchar(10) NOT NULL,
  `face` varchar(255) NOT NULL,
  `dept` varchar(65) NOT NULL,
  `hall` varchar(65) NOT NULL,
  `room` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `name`, `reg_no`, `webmail`, `matric`, `face`, `dept`, `hall`, `room`) VALUES
(1, 'Ugbeshe Abraham Ntem-Ishor', 1700172, 'ugbeshe.abraham@lmu.edu.ng', '17BB004963', '', 'Computer Science', 'Abraham Hall', 'F307'),
(2, 'Owolabi Joshua Oluwasegun', 1600172, 'owolabi.oluwasegun@lmu.edu.ng', '16CD005322', '', 'Computer Science', 'Abraham Hall', 'B303');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user_id` varchar(100) NOT NULL,
  `username` varchar(25) NOT NULL,
  `position` varchar(65) NOT NULL,
  `name` varchar(100) NOT NULL,
  `webmail` text NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_id`, `username`, `position`, `name`, `webmail`, `password`) VALUES
(6, 'ca5163e0c0d9abc17526680b9b7f383b9b0cdd4a7cd5d73aa9549c5ba91849780c4103022888be7c25301c6d337df46ae5c6', 'admin', 'Admin', '', '', '$2y$10$CLcgUajeO3b23zP.ZOxyruv51yXX6LwD631O6swyRr.Z6lwD2S9oa'),
(7, '6dd6a8392d0e3284015fc74d4cf1a2439b773c41bd2bf97ceffc508566a8db1fbb12a2867b22d87bbbacea4260d81f08fc72', 'revo01', 'Commander', 'Morison', 'morison@lmu.edu.ng', '$2y$10$Sv5j4/B5SfCf.0JbArqMVeSm4jOPrZ7NERUwr1TkpWTBE0P3OFTj2');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `loggedin`
--
ALTER TABLE `loggedin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `reg_no` (`reg_no`),
  ADD UNIQUE KEY `webmail` (`webmail`),
  ADD UNIQUE KEY `matric` (`matric`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `loggedin`
--
ALTER TABLE `loggedin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
