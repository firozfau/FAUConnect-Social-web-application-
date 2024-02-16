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

 Date: 15/11/2023 19:12:37
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for contact_information
-- ----------------------------
DROP TABLE IF EXISTS `contact_information`;
CREATE TABLE `contact_information` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `second_email` varchar(50) DEFAULT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `office_phone` varchar(20) DEFAULT NULL,
  `comments` varchar(200) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `last_ip` varchar(50) DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of contact_information
-- ----------------------------
BEGIN;
INSERT INTO `contact_information` (`id`, `user_id`, `mobile`, `second_email`, `telephone`, `office_phone`, `comments`, `created_at`, `updated_at`, `updated_id`, `last_ip`, `created_id`) VALUES (1, 1, '017658574913', 'firozfau@gmail.com', NULL, '333333', NULL, '2023-11-14 23:55:00', NULL, 1, '::1', 1);
INSERT INTO `contact_information` (`id`, `user_id`, `mobile`, `second_email`, `telephone`, `office_phone`, `comments`, `created_at`, `updated_at`, `updated_id`, `last_ip`, `created_id`) VALUES (2, 2, '324312413', '', NULL, '', NULL, '2023-11-15 18:05:00', NULL, 2, '::ffff:127.0.0.1', 2);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
