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

 Date: 15/11/2023 19:14:13
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'auto increment ID',
  `email` varchar(50) DEFAULT NULL,
  `username` varchar(50) NOT NULL COMMENT 'length min 5, max 50\nuse only alphabet and number',
  `password` varchar(200) DEFAULT NULL,
  `gender` int(11) NOT NULL DEFAULT 1,
  `account_type` int(11) NOT NULL DEFAULT 1 COMMENT '1. Normal user\n2. Admin user\n\n',
  `token_number` varchar(200) NOT NULL DEFAULT '0' COMMENT 'when client registered that time use this token for valid user',
  `status` int(11) NOT NULL DEFAULT 0 COMMENT '0. Pending\n1. Active\n3. Deactive\n4. Banned',
  `comments` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  `created_id` int(11) DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `last_ip` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` (`id`, `email`, `username`, `password`, `gender`, `account_type`, `token_number`, `status`, `comments`, `created_at`, `updated_at`, `created_id`, `updated_id`, `last_ip`) VALUES (1, 'firozfau@gmail.com', 'firozurit', '$2b$10$r8LMG.gaCEmdJVd0.tzZvOVxgJ6YD8SV1zjk6r64DFlVv5l5VDzwa', 1, 1, 'd9b5db90-8ea3-4ecf-8202-bb721eefe4cf', 0, NULL, '2023-11-08 19:15:00', '2023-11-15 18:53:57', NULL, 1, '::1');
INSERT INTO `users` (`id`, `email`, `username`, `password`, `gender`, `account_type`, `token_number`, `status`, `comments`, `created_at`, `updated_at`, `created_id`, `updated_id`, `last_ip`) VALUES (2, 'f.7.live.co@gmail.com', 'firozfau', '$2b$10$wO5M1BQzXy0ZWJ2TPkwpI.dVdKlEk9Z0xo8OAouMhP/XprJ45an5C', 1, 1, '4a706fdc-4e3e-42af-9899-388a0f528228', 0, NULL, '2023-11-11 22:55:00', '0000-00-00 00:00:00', NULL, NULL, '::1');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
