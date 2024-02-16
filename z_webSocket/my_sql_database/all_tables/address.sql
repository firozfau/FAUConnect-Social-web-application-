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

 Date: 15/11/2023 19:12:28
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `house` int(11) DEFAULT NULL,
  `road_name` varchar(200) DEFAULT NULL,
  `area_code` int(11) NOT NULL,
  `area_name` varchar(200) DEFAULT NULL,
  `city` int(11) NOT NULL,
  `state` int(11) NOT NULL,
  `country` varchar(20) DEFAULT NULL,
  `alternate_address` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `last_ip` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of address
-- ----------------------------
BEGIN;
INSERT INTO `address` (`id`, `user_id`, `house`, `road_name`, `area_code`, `area_name`, `city`, `state`, `country`, `alternate_address`, `created_at`, `updated_at`, `created_id`, `updated_id`, `last_ip`) VALUES (1, 1, NULL, NULL, 4444, NULL, 0, 3, 'DE', NULL, '2023-11-15 07:50:00', NULL, 1, 1, '::1');
INSERT INTO `address` (`id`, `user_id`, `house`, `road_name`, `area_code`, `area_name`, `city`, `state`, `country`, `alternate_address`, `created_at`, `updated_at`, `created_id`, `updated_id`, `last_ip`) VALUES (2, 2, NULL, NULL, 55555, NULL, 0, 6, 'DE', NULL, '2023-11-15 18:05:00', NULL, 2, 2, '::ffff:127.0.0.1');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
