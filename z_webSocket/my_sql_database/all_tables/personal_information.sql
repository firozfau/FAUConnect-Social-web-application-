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

 Date: 15/11/2023 19:13:23
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for personal_information
-- ----------------------------
DROP TABLE IF EXISTS `personal_information`;
CREATE TABLE `personal_information` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `user_languages` longtext NOT NULL COMMENT 'exmaple\n{ 1,2,3,4}\n\n1= German. (it is primary languagte)\n2= Englsih \n3= Bangla\n4= Hindi\n',
  `research_details` longtext DEFAULT NULL,
  `user_interest` longtext DEFAULT NULL COMMENT 'exmple:\n{1,2,3,4}\n\n1= Footbale\n2= travel\n3= etc\n\nRemember this interest can math to find your partner',
  `user_hobbies` longtext DEFAULT NULL COMMENT 'exmple:\n{1,2,3,,4}\n1= play\n2= riding\n3= wlking\n4 =drawing',
  `user_objective` longtext DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `last_ip` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of personal_information
-- ----------------------------
BEGIN;
INSERT INTO `personal_information` (`id`, `user_id`, `user_languages`, `research_details`, `user_interest`, `user_hobbies`, `user_objective`, `created_at`, `updated_at`, `created_id`, `updated_id`, `last_ip`) VALUES (1, 1, '[\"1\",\"2\",\"7\",\"9\"]', 'testsf sdfsdf', '[\"12\"]', '[\"5\"]', 'wafasd fasd fasfasd', '2023-11-15 00:05:00', NULL, 1, 1, '::1');
INSERT INTO `personal_information` (`id`, `user_id`, `user_languages`, `research_details`, `user_interest`, `user_hobbies`, `user_objective`, `created_at`, `updated_at`, `created_id`, `updated_id`, `last_ip`) VALUES (2, 2, '[\"2\"]', 'hey', '[\"2\",\"3\"]', '[\"1\"]', 'hey', '2023-11-15 18:05:00', NULL, 2, 2, '::ffff:127.0.0.1');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
