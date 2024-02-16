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

 Date: 15/11/2023 19:14:20
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for users_block_list
-- ----------------------------
DROP TABLE IF EXISTS `users_block_list`;
CREATE TABLE `users_block_list` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `ignore_user_id` int(11) NOT NULL COMMENT 'who are not able to get this user',
  `status` int(11) NOT NULL COMMENT 'example:\n1. Not prefar for match profile\n2. Not allow friend request\n3. Not allow message request\n4. All restriction ',
  `reason` varchar(200) NOT NULL,
  `created_at` datetime NOT NULL,
  `created_id` int(11) NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `last_ip` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of users_block_list
-- ----------------------------
BEGIN;
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
