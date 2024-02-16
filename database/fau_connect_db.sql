/*
 Navicat Premium Data Transfer

 Source Server         : www.frzf7.com
 Source Server Type    : MySQL
 Source Server Version : 80035 (8.0.35-0ubuntu0.22.04.1)
 Source Host           : 104.251.216.221:3306
 Source Schema         : fau_connect_db

 Target Server Type    : MySQL
 Target Server Version : 80035 (8.0.35-0ubuntu0.22.04.1)
 File Encoding         : 65001

 Date: 16/02/2024 21:25:58
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for README
-- ----------------------------
DROP TABLE IF EXISTS `README`;
CREATE TABLE `README` (
  `id` int NOT NULL,
  `Message` text,
  `Bitcoin_Address` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Table structure for block_list
-- ----------------------------
DROP TABLE IF EXISTS `block_list`;
CREATE TABLE `block_list` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `block_id` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `status` int DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Table structure for conversation
-- ----------------------------
DROP TABLE IF EXISTS `conversation`;
CREATE TABLE `conversation` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `sender_id` int DEFAULT NULL,
  `receiver_id` int DEFAULT NULL,
  `message_type` int DEFAULT NULL,
  `message` longtext,
  `status` int DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Table structure for feedback_list
-- ----------------------------
DROP TABLE IF EXISTS `feedback_list`;
CREATE TABLE `feedback_list` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Table structure for friend_list
-- ----------------------------
DROP TABLE IF EXISTS `friend_list`;
CREATE TABLE `friend_list` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `friend_id` int NOT NULL,
  `account_mode` int NOT NULL,
  `matching_start` datetime NOT NULL,
  `who_send_request` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `status` int DEFAULT NULL,
  `feedback_date` datetime DEFAULT NULL,
  `feedback` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Table structure for login_session
-- ----------------------------
DROP TABLE IF EXISTS `login_session`;
CREATE TABLE `login_session` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `login_session_id` varchar(255) NOT NULL,
  `log_data` longtext,
  `status` int DEFAULT '1',
  `login_session_start` datetime DEFAULT CURRENT_TIMESTAMP,
  `login_session_end` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `comments` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Table structure for notification
-- ----------------------------
DROP TABLE IF EXISTS `notification`;
CREATE TABLE `notification` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `notification_type` int NOT NULL DEFAULT '1' COMMENT '1=> Send\r\n2=> Replied',
  `replied_notification_id` int DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `details` longtext NOT NULL,
  `attached` varchar(255) DEFAULT NULL,
  `sender_id` int NOT NULL,
  `receiver_id` int DEFAULT NULL,
  `receiver_type` int NOT NULL COMMENT '1=> Specific user\n2=> All users\n3=> Admin\n',
  `status` int DEFAULT NULL COMMENT '0=> Failed\r\n1=> Unread\r\n2=> Read\r\n3=> Replied\r\n4=> Delete\r\n',
  `is_favorite` int DEFAULT '0',
  `send_time` datetime DEFAULT NULL,
  `read_time` datetime DEFAULT NULL,
  `delete_time` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `udpated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `comments` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Table structure for personal_information
-- ----------------------------
DROP TABLE IF EXISTS `personal_information`;
CREATE TABLE `personal_information` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `objective` longtext,
  `languages_list` varchar(255) DEFAULT NULL,
  `interest_list` varchar(255) DEFAULT NULL,
  `matching_list` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `city_list` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `search_gender` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `search_profession` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Table structure for super_logs
-- ----------------------------
DROP TABLE IF EXISTS `super_logs`;
CREATE TABLE `super_logs` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `reason` varchar(255) NOT NULL,
  `data` longtext,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `last_ip` varchar(100) DEFAULT NULL,
  `comments` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Table structure for terms_conditions
-- ----------------------------
DROP TABLE IF EXISTS `terms_conditions`;
CREATE TABLE `terms_conditions` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `file_name` longtext,
  `details` longtext,
  `created_at` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `account_mode` int DEFAULT '1',
  `account_type` int unsigned NOT NULL DEFAULT '2',
  `email` varchar(50) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `gender` int DEFAULT NULL,
  `user_photo` varchar(100) DEFAULT NULL,
  `department` int DEFAULT '1',
  `profession` int DEFAULT NULL,
  `terms_condition` int DEFAULT NULL,
  `account_status` int DEFAULT '0',
  `last_ip` varchar(50) DEFAULT NULL,
  `email_send_status` int DEFAULT '0',
  `is_email_verify_status` int DEFAULT '0',
  `verify_token` varchar(200) DEFAULT NULL,
  `block_reason` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3;

SET FOREIGN_KEY_CHECKS = 1;
