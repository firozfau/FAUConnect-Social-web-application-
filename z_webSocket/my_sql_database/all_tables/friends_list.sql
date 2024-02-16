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

 Date: 15/11/2023 19:12:45
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for friends_list
-- ----------------------------
DROP TABLE IF EXISTS `friends_list`;
CREATE TABLE `friends_list` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT 'who send  friend request',
  `friend_user_id` int(11) NOT NULL,
  `status` int(11) DEFAULT NULL COMMENT '0= pending\n1= accept ',
  `request_date` datetime NOT NULL,
  `accept_date` datetime DEFAULT NULL,
  `requested_ip` varchar(50) DEFAULT NULL,
  `accepted_ip` varchar(50) DEFAULT NULL,
  `comments` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of friends_list
-- ----------------------------
BEGIN;
INSERT INTO `friends_list` (`id`, `user_id`, `friend_user_id`, `status`, `request_date`, `accept_date`, `requested_ip`, `accepted_ip`, `comments`) VALUES (1, 1, 2, 1, '2023-11-08 19:15:00', '2023-11-08 19:15:00', NULL, NULL, 'tst');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
