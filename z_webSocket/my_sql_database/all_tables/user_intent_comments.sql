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

 Date: 15/11/2023 19:14:07
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user_intent_comments
-- ----------------------------
DROP TABLE IF EXISTS `user_intent_comments`;
CREATE TABLE `user_intent_comments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_intent_id` int(11) DEFAULT NULL COMMENT 'this id come form user_intent table',
  `user_id` int(11) DEFAULT NULL,
  `comments_parent_id` int(11) NOT NULL DEFAULT 0 COMMENT 'if it is first entry this id should be 0',
  `type` int(11) DEFAULT NULL COMMENT '1= like/dislike/\n2= comments',
  `comments` longtext DEFAULT NULL,
  `creared_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `last_ip` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of user_intent_comments
-- ----------------------------
BEGIN;
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
