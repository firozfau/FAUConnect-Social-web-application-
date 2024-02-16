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

 Date: 15/11/2023 19:13:40
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user_conversation
-- ----------------------------
DROP TABLE IF EXISTS `user_conversation`;
CREATE TABLE `user_conversation` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `type` int(11) NOT NULL DEFAULT 1 COMMENT '1). individual conversation\n2) Group conversation',
  `friend_group_id` int(11) NOT NULL COMMENT 'messanger gorup id or single friend id',
  `message_type` int(11) DEFAULT NULL COMMENT '1. text\n2. like symbol\n3. files\n',
  `message` longtext DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `last_ip` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of user_conversation
-- ----------------------------
BEGIN;
INSERT INTO `user_conversation` (`id`, `user_id`, `type`, `friend_group_id`, `message_type`, `message`, `created_at`, `created_id`, `updated_at`, `updated_id`, `last_ip`) VALUES (1, 1, 2, 2, 1, 'hello juya juya', '2023-11-15 18:05:00', 1, NULL, NULL, 'undefined');
INSERT INTO `user_conversation` (`id`, `user_id`, `type`, `friend_group_id`, `message_type`, `message`, `created_at`, `created_id`, `updated_at`, `updated_id`, `last_ip`) VALUES (2, 2, 1, 1, 1, 'yes firoz', '2023-11-15 18:05:00', 2, NULL, NULL, 'undefined');
INSERT INTO `user_conversation` (`id`, `user_id`, `type`, `friend_group_id`, `message_type`, `message`, `created_at`, `created_id`, `updated_at`, `updated_id`, `last_ip`) VALUES (3, 1, 2, 2, 1, 'how are you', '2023-11-15 18:05:00', 1, NULL, NULL, 'undefined');
INSERT INTO `user_conversation` (`id`, `user_id`, `type`, `friend_group_id`, `message_type`, `message`, `created_at`, `created_id`, `updated_at`, `updated_id`, `last_ip`) VALUES (4, 2, 1, 1, 1, 'I am good and you', '2023-11-15 18:05:00', 2, NULL, NULL, 'undefined');
INSERT INTO `user_conversation` (`id`, `user_id`, `type`, `friend_group_id`, `message_type`, `message`, `created_at`, `created_id`, `updated_at`, `updated_id`, `last_ip`) VALUES (5, 1, 2, 2, 2, '2', '2023-11-15 18:05:00', 1, NULL, NULL, 'undefined');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
