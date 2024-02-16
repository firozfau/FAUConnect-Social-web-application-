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

 Date: 15/11/2023 19:13:09
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for logs_login_information
-- ----------------------------
DROP TABLE IF EXISTS `logs_login_information`;
CREATE TABLE `logs_login_information` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `data` longtext DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `session_start_time` datetime DEFAULT NULL,
  `session_end_time` datetime DEFAULT NULL,
  `comments` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of logs_login_information
-- ----------------------------
BEGIN;
INSERT INTO `logs_login_information` (`id`, `user_id`, `data`, `status`, `session_start_time`, `session_end_time`, `comments`) VALUES (1, 1, '{\"user_id\":1,\"userphoto\":\"userphoto_1699470597244.jpeg\",\"first_name\":\"MD FIROZUR\",\"email\":\"firozfau@gmail.com\",\"gender\":1,\"department\":1,\"current_position\":1,\"login_time\":\"2023-11-12 01:05:00\",\"session_from\":\"login\",\"browser_unique_id\":\"chrome_119.0.0.0_apple__macintosh\",\"session_token\":\"1_1699750612238\"}', 2, '2023-11-12 01:05:00', '2023-11-15 18:05:00', NULL);
INSERT INTO `logs_login_information` (`id`, `user_id`, `data`, `status`, `session_start_time`, `session_end_time`, `comments`) VALUES (2, 2, '{\"user_id\":2,\"userphoto\":\"userphoto_1699742769477.png\",\"first_name\":\"jiki\",\"email\":\"f.7.live.co@gmail.com\",\"gender\":1,\"department\":1,\"current_position\":1,\"login_time\":\"2023-11-12 01:05:00\",\"session_from\":\"login\",\"browser_unique_id\":\"firefox_119.0_apple__macintosh\",\"session_token\":\"2_1699750624837\"}', 2, '2023-11-12 01:05:00', '2023-11-15 18:05:00', NULL);
INSERT INTO `logs_login_information` (`id`, `user_id`, `data`, `status`, `session_start_time`, `session_end_time`, `comments`) VALUES (3, 1, '{\"user_id\":1,\"userphoto\":\"userphoto_1699470597244.jpeg\",\"first_name\":\"MD FIROZUR\",\"email\":\"firozfau@gmail.com\",\"gender\":1,\"department\":1,\"current_position\":1,\"login_time\":\"2023-11-12 14:30:00\",\"session_from\":\"login\",\"browser_unique_id\":\"chrome_119.0.0.0_apple__macintosh\",\"session_token\":\"1_1699798814684\"}', 2, '2023-11-12 14:30:00', '2023-11-15 18:05:00', NULL);
INSERT INTO `logs_login_information` (`id`, `user_id`, `data`, `status`, `session_start_time`, `session_end_time`, `comments`) VALUES (4, 2, '{\"user_id\":2,\"userphoto\":\"userphoto_1699742769477.png\",\"first_name\":\"jiki\",\"email\":\"f.7.live.co@gmail.com\",\"gender\":1,\"department\":1,\"current_position\":1,\"login_time\":\"2023-11-12 14:30:00\",\"session_from\":\"login\",\"browser_unique_id\":\"firefox_119.0_apple__macintosh\",\"session_token\":\"2_1699798818216\"}', 2, '2023-11-12 14:30:00', '2023-11-15 18:05:00', NULL);
INSERT INTO `logs_login_information` (`id`, `user_id`, `data`, `status`, `session_start_time`, `session_end_time`, `comments`) VALUES (5, 1, '{\"user_id\":1,\"userphoto\":\"userphoto_1699470597244.jpeg\",\"first_name\":\"MD FIROZUR\",\"last_name\":\"MD FIROZUR\",\"email\":\"firozfau@gmail.com\",\"gender\":1,\"department\":1,\"current_position\":1,\"login_time\":\"2023-11-12 20:30:00\",\"session_from\":\"login\",\"browser_unique_id\":\"chrome_119.0.0.0_apple__macintosh\",\"session_token\":\"1_1699820693360\"}', 2, '2023-11-12 20:30:00', '2023-11-15 18:05:00', NULL);
INSERT INTO `logs_login_information` (`id`, `user_id`, `data`, `status`, `session_start_time`, `session_end_time`, `comments`) VALUES (6, 2, '{\"user_id\":2,\"userphoto\":\"userphoto_1699742769477.png\",\"first_name\":\"jiki\",\"last_name\":\"jiki\",\"email\":\"f.7.live.co@gmail.com\",\"gender\":1,\"department\":1,\"current_position\":1,\"login_time\":\"2023-11-12 20:30:00\",\"session_from\":\"login\",\"browser_unique_id\":\"firefox_119.0_apple__macintosh\",\"session_token\":\"2_1699820697025\"}', 2, '2023-11-12 20:30:00', '2023-11-15 18:05:00', NULL);
INSERT INTO `logs_login_information` (`id`, `user_id`, `data`, `status`, `session_start_time`, `session_end_time`, `comments`) VALUES (7, 1, '{\"user_id\":1,\"userphoto\":\"userphoto_1699470597244.jpeg\",\"first_name\":\"MD FIROZUR\",\"last_name\":\"MD FIROZUR\",\"email\":\"firozfau@gmail.com\",\"gender\":1,\"department\":1,\"current_position\":1,\"login_time\":\"2023-11-13 19:50:00\",\"session_from\":\"login\",\"browser_unique_id\":\"chrome_119.0.0.0_apple__macintosh\",\"session_token\":\"1_1699904539110\"}', 2, '2023-11-13 19:50:00', '2023-11-15 18:05:00', NULL);
INSERT INTO `logs_login_information` (`id`, `user_id`, `data`, `status`, `session_start_time`, `session_end_time`, `comments`) VALUES (8, 1, '{\"user_id\":1,\"userphoto\":\"userphoto_1699470597244.jpeg\",\"first_name\":\"MD FIROZUR\",\"last_name\":\"MD FIROZUR\",\"email\":\"firozfau@gmail.com\",\"gender\":1,\"department\":1,\"current_position\":1,\"login_time\":\"2023-11-14 20:40:00\",\"session_from\":\"login\",\"browser_unique_id\":\"chrome_119.0.0.0_apple__macintosh\",\"session_token\":\"1_1699994045690\"}', 2, '2023-11-14 20:40:00', '2023-11-15 18:05:00', NULL);
INSERT INTO `logs_login_information` (`id`, `user_id`, `data`, `status`, `session_start_time`, `session_end_time`, `comments`) VALUES (9, 1, '{\"user_id\":1,\"userphoto\":\"userphoto_1699999982413.jpg\",\"first_name\":\"MD FIROZUR\",\"last_name\":\"RAHMAN\",\"email\":\"firozfau@gmail.com\",\"gender\":1,\"department\":1,\"current_position\":1,\"login_time\":\"2023-11-15 17:45:00\",\"session_from\":\"login\",\"browser_unique_id\":\"chrome_119.0.0.0_apple__macintosh\",\"session_token\":\"1_1700069752866\"}', 2, '2023-11-15 17:45:00', '2023-11-15 18:05:00', NULL);
INSERT INTO `logs_login_information` (`id`, `user_id`, `data`, `status`, `session_start_time`, `session_end_time`, `comments`) VALUES (10, 1, '{\"user_id\":1,\"userphoto\":\"userphoto_1699999982413.jpg\",\"first_name\":\"MD FIROZUR\",\"last_name\":\"RAHMAN\",\"email\":\"firozfau@gmail.com\",\"gender\":1,\"department\":1,\"current_position\":1,\"login_time\":\"2023-11-15 17:45:00\",\"session_from\":\"login\",\"browser_unique_id\":\"chrome_119.0.0.0_apple__macintosh\",\"session_token\":\"1_1700069779892\"}', 2, '2023-11-15 17:45:00', '2023-11-15 18:05:00', NULL);
INSERT INTO `logs_login_information` (`id`, `user_id`, `data`, `status`, `session_start_time`, `session_end_time`, `comments`) VALUES (11, 1, '{\"user_id\":1,\"userphoto\":\"userphoto_1699999982413.jpg\",\"first_name\":\"MD FIROZUR\",\"last_name\":\"RAHMAN\",\"email\":\"firozfau@gmail.com\",\"gender\":1,\"department\":1,\"current_position\":1,\"login_time\":\"2023-11-15 17:50:00\",\"session_from\":\"login\",\"browser_unique_id\":\"chrome_119.0.0.0_apple__macintosh\",\"session_token\":\"1_1700070053930\"}', 2, '2023-11-15 17:50:00', '2023-11-15 18:05:00', NULL);
INSERT INTO `logs_login_information` (`id`, `user_id`, `data`, `status`, `session_start_time`, `session_end_time`, `comments`) VALUES (12, 1, '{\"user_id\":1,\"userphoto\":\"userphoto_1699999982413.jpg\",\"first_name\":\"MD FIROZUR\",\"last_name\":\"RAHMAN\",\"email\":\"firozfau@gmail.com\",\"gender\":1,\"department\":1,\"current_position\":1,\"login_time\":\"2023-11-15 17:50:00\",\"session_from\":\"login\",\"browser_unique_id\":\"chrome_119.0.0.0_apple__macintosh\",\"session_token\":\"1_1700070076692\"}', 2, '2023-11-15 17:50:00', '2023-11-15 18:05:00', NULL);
INSERT INTO `logs_login_information` (`id`, `user_id`, `data`, `status`, `session_start_time`, `session_end_time`, `comments`) VALUES (13, 1, '{\"user_id\":1,\"userphoto\":\"userphoto_1699999982413.jpg\",\"first_name\":\"MD FIROZUR\",\"last_name\":\"RAHMAN\",\"email\":\"firozfau@gmail.com\",\"gender\":1,\"department\":1,\"current_position\":1,\"login_time\":\"2023-11-15 18:00:00\",\"session_from\":\"login\",\"browser_unique_id\":\"chrome_119.0.0.0_apple__macintosh\",\"session_token\":\"1_1700070632182\"}', 2, '2023-11-15 18:00:00', '2023-11-15 18:05:00', NULL);
INSERT INTO `logs_login_information` (`id`, `user_id`, `data`, `status`, `session_start_time`, `session_end_time`, `comments`) VALUES (14, 1, '{\"user_id\":1,\"userphoto\":\"userphoto_1699999982413.jpg\",\"first_name\":\"MD FIROZUR\",\"last_name\":\"RAHMAN\",\"email\":\"firozfau@gmail.com\",\"gender\":1,\"department\":1,\"current_position\":1,\"login_time\":\"2023-11-15 18:00:00\",\"session_from\":\"login\",\"browser_unique_id\":\"chrome_119.0.0.0_apple__macintosh\",\"session_token\":\"1_1700070742567\"}', 2, '2023-11-15 18:00:00', '2023-11-15 18:05:00', NULL);
INSERT INTO `logs_login_information` (`id`, `user_id`, `data`, `status`, `session_start_time`, `session_end_time`, `comments`) VALUES (15, 2, '{\"user_id\":2,\"userphoto\":\"userphoto_1699742769477.png\",\"first_name\":\"Jua jua\",\"last_name\":\"Miki\",\"email\":\"f.7.live.co@gmail.com\",\"gender\":1,\"department\":1,\"current_position\":1,\"login_time\":\"2023-11-15 18:00:00\",\"session_from\":\"login\",\"browser_unique_id\":\"firefox_119.0_apple__macintosh\",\"session_token\":\"2_1700070752319\"}', 2, '2023-11-15 18:00:00', '2023-11-15 18:05:00', NULL);
INSERT INTO `logs_login_information` (`id`, `user_id`, `data`, `status`, `session_start_time`, `session_end_time`, `comments`) VALUES (16, 2, '{\"user_id\":2,\"userphoto\":\"userphoto_1699742769477.png\",\"first_name\":\"Jua jua\",\"last_name\":\"Miki\",\"email\":\"f.7.live.co@gmail.com\",\"gender\":1,\"department\":1,\"current_position\":1,\"login_time\":\"2023-11-15 18:05:00\",\"session_from\":\"login\",\"browser_unique_id\":\"firefox_119.0_apple__macintosh\",\"session_token\":\"2_1700071064302\"}', 1, '2023-11-15 18:05:00', NULL, NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
