-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 14, 2018 at 12:46 AM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.2.11

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
  `punishment` text NOT NULL,
  `category` char(1) NOT NULL,
  `status` char(20) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `loggedin`
--

CREATE TABLE `loggedin` (
  `id` int(11) NOT NULL,
  `user_id` varchar(100) NOT NULL,
  `loggedin` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `loggedin`
--

INSERT INTO `loggedin` (`id`, `user_id`, `loggedin`, `time`) VALUES
(1, '8f1e01667c177486cab475b38e6fbe59992bee4d86ce2965ed5416f9aa9deab317fd1c2f5701f0d03a7b3137701c6814556a', 1, '2018-11-08 23:53:59'),
(2, '44acf950479fa33c5548cd99c9080502a6b538308a14227c2f6df0b3b05b4d0faaa734263fe51f896f27f51fe82971269959', 1, '2018-11-09 00:40:25');

-- --------------------------------------------------------

--
-- Table structure for table `punishment`
--

CREATE TABLE `punishment` (
  `id` int(11) NOT NULL,
  `reg_no` int(7) NOT NULL,
  `punishment` text NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
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
(1, 'Ugbeshe Abraham Ntem-Ishor', 1700172, 'ugbeshe.abraham@lmu.edu.ng', '17BB004963', '', 'Computer Science', 'Abraham Hall', 'F307');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user_id` varchar(100) NOT NULL,
  `username` varchar(25) NOT NULL,
  `password` varchar(100) NOT NULL,
  `position` varchar(65) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_id`, `username`, `password`, `position`) VALUES
(1, '44acf950479fa33c5548cd99c9080502a6b538308a14227c2f6df0b3b05b4d0faaa734263fe51f896f27f51fe82971269959', 'revo', '$2y$10$eQDEUiR5tTK1vnSLamn4Dep5w/uLun.E4DByP/X65l7ORk/R2IQEW', 'Commander');

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
-- Indexes for table `punishment`
--
ALTER TABLE `punishment`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `loggedin`
--
ALTER TABLE `loggedin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `punishment`
--
ALTER TABLE `punishment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
