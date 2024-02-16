/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 100428 (10.4.28-MariaDB)
 Source Host           : localhost:3306
 Source Schema         : fauconnectapp

 Target Server Type    : MySQL
 Target Server Version : 100428 (10.4.28-MariaDB)
 File Encoding         : 65001

 Date: 15/11/2023 19:14:26
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for users_profile
-- ----------------------------
DROP TABLE IF EXISTS `users_profile`;
CREATE TABLE `users_profile` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `first_name` varchar(200) NOT NULL,
  `last_name` varchar(200) NOT NULL,
  `dob` date NOT NULL,
  `department` int(11) NOT NULL COMMENT 'example:\n1. Management\n2. Math\n3. Computer',
  `current_position` int(11) NOT NULL COMMENT '1. sudent\n2. Professor\n3. Lab assistent',
  `userphoto` varchar(200) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `last_ip` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of users_profile
-- ----------------------------
BEGIN;
INSERT INTO `users_profile` (`id`, `user_id`, `first_name`, `last_name`, `dob`, `department`, `current_position`, `userphoto`, `created_at`, `updated_at`, `created_id`, `updated_id`, `last_ip`) VALUES (1, 1, 'MD FIROZUR', 'test Rahman', '2005-01-07', 2, 2, 'userphoto_1699999982413.jpg', '2023-11-08 19:15:00', NULL, NULL, 1, '::1');
INSERT INTO `users_profile` (`id`, `user_id`, `first_name`, `last_name`, `dob`, `department`, `current_position`, `userphoto`, `created_at`, `updated_at`, `created_id`, `updated_id`, `last_ip`) VALUES (2, 2, 'Jua jua', 'Miki', '2005-05-05', 1, 1, 'userphoto_1699742769477.png', '2023-11-11 22:55:00', NULL, NULL, NULL, '::1');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
