/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80023
 Source Host           : localhost:3306
 Source Schema         : react_cake

 Target Server Type    : MySQL
 Target Server Version : 80023
 File Encoding         : 65001

 Date: 12/08/2021 10:59:27
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article_t
-- ----------------------------
DROP TABLE IF EXISTS `article_t`;
CREATE TABLE `article_t` (
  `article_id` int NOT NULL AUTO_INCREMENT,
  `m_id` int DEFAULT NULL,
  `atilcle_title` varchar(30) DEFAULT NULL,
  `atilcle_content` varchar(500) DEFAULT NULL,
  `atilcle_title2` varchar(30) DEFAULT NULL,
  `atilcle_content2` varchar(500) DEFAULT NULL,
  `atilcle_title3` varchar(30) DEFAULT NULL,
  `atilcle_content3` varchar(500) DEFAULT NULL,
  `atilcle_date` varchar(30) DEFAULT NULL,
  `atilcle_type` int DEFAULT NULL,
  `atilcle_state` int DEFAULT NULL,
  PRIMARY KEY (`article_id`),
  KEY `FK_Reference_1` (`m_id`),
  CONSTRAINT `FK_Reference_1` FOREIGN KEY (`m_id`) REFERENCES `manager_t` (`m_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='???²??ͱ';

-- ----------------------------
-- Records of article_t
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for cart_t
-- ----------------------------
DROP TABLE IF EXISTS `cart_t`;
CREATE TABLE `cart_t` (
  `shoppingCart_id` int NOT NULL AUTO_INCREMENT,
  `userorder_id` int DEFAULT NULL,
  `total_price` float DEFAULT NULL,
  `shoppingCart_status` int DEFAULT NULL,
  PRIMARY KEY (`shoppingCart_id`),
  KEY `FK_Reference_10` (`userorder_id`),
  CONSTRAINT `FK_Reference_10` FOREIGN KEY (`userorder_id`) REFERENCES `userorder_t` (`userorder_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='???ﳵ?';

-- ----------------------------
-- Records of cart_t
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for coupon_t
-- ----------------------------
DROP TABLE IF EXISTS `coupon_t`;
CREATE TABLE `coupon_t` (
  `coupon_id` int NOT NULL AUTO_INCREMENT,
  `coupon_name` varchar(50) DEFAULT NULL,
  `coupon_circulation` varchar(50) DEFAULT NULL,
  `coupon_validity` varchar(50) DEFAULT NULL,
  `coupon_callableUser` varchar(50) DEFAULT NULL,
  `coupon_restrictGet` varchar(50) DEFAULT NULL,
  `coupon_restrictUse` varchar(50) DEFAULT NULL,
  `coupon_faceValue` int DEFAULT NULL,
  `coupon_canUse` varchar(50) DEFAULT NULL,
  `coupon_bornDate` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`coupon_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='?Żݾ??';

-- ----------------------------
-- Records of coupon_t
-- ----------------------------
BEGIN;
INSERT INTO `coupon_t` VALUES (1, '测试优惠券', '50', '2021-08-14 17:07:04&2021-08-14 20:00:00&', '全体用户', '1', '无限制', 300, 'ice_cream/', NULL);
COMMIT;

-- ----------------------------
-- Table structure for enterprise_t
-- ----------------------------
DROP TABLE IF EXISTS `enterprise_t`;
CREATE TABLE `enterprise_t` (
  `EnterpriseId` int NOT NULL AUTO_INCREMENT,
  `EnterpriseName` varchar(50) DEFAULT NULL,
  `EnterpriseAdress` varchar(50) DEFAULT NULL,
  `EnterpriseTel` varchar(50) DEFAULT NULL,
  `EnterpriseEamil` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`EnterpriseId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='??ҵ?';

-- ----------------------------
-- Records of enterprise_t
-- ----------------------------
BEGIN;
INSERT INTO `enterprise_t` VALUES (1, 'w256软件技术公司', '芸桦路333号', '0838-123456', 'w256@163.com');
INSERT INTO `enterprise_t` VALUES (2, 'w257软件技术公司', '芸桦路334号', '0838-123456', 'w257@163.com');
COMMIT;

-- ----------------------------
-- Table structure for enterprisecommont_t
-- ----------------------------
DROP TABLE IF EXISTS `enterprisecommont_t`;
CREATE TABLE `enterprisecommont_t` (
  `EnterpriseProductId` int NOT NULL AUTO_INCREMENT,
  `EnterpriseId` int DEFAULT NULL,
  `ProductId` int DEFAULT NULL,
  `EnterpriseTime` varchar(50) DEFAULT NULL,
  `EnterPriseContent` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`EnterpriseProductId`),
  KEY `FK_Reference_18` (`EnterpriseId`),
  KEY `FK_Reference_19` (`ProductId`),
  CONSTRAINT `FK_Reference_18` FOREIGN KEY (`EnterpriseId`) REFERENCES `enterprise_t` (`EnterpriseId`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_Reference_19` FOREIGN KEY (`ProductId`) REFERENCES `product_t` (`ProductId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='??ҵ???۲?Ʒ?';

-- ----------------------------
-- Records of enterprisecommont_t
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for fruitcoin_t
-- ----------------------------
DROP TABLE IF EXISTS `fruitcoin_t`;
CREATE TABLE `fruitcoin_t` (
  `FruitCoinId` int NOT NULL AUTO_INCREMENT,
  `CionNum` float DEFAULT NULL,
  PRIMARY KEY (`FruitCoinId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='??ʳ?ұ';

-- ----------------------------
-- Records of fruitcoin_t
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for indexbanner_t
-- ----------------------------
DROP TABLE IF EXISTS `indexbanner_t`;
CREATE TABLE `indexbanner_t` (
  `RotationId` int NOT NULL AUTO_INCREMENT,
  `RotationDes` varchar(500) DEFAULT NULL,
  `RotationText` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`RotationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='??ҳ?ֲ??';

-- ----------------------------
-- Records of indexbanner_t
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for leave_words
-- ----------------------------
DROP TABLE IF EXISTS `leave_words`;
CREATE TABLE `leave_words` (
  `l_id` int NOT NULL AUTO_INCREMENT,
  `companyName` varchar(50) DEFAULT NULL,
  `contacts` varchar(50) DEFAULT NULL,
  `phoneNum` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `content` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`l_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of leave_words
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for logisticsinfo_t
-- ----------------------------
DROP TABLE IF EXISTS `logisticsinfo_t`;
CREATE TABLE `logisticsinfo_t` (
  `LogisticsId` int NOT NULL AUTO_INCREMENT,
  `u_id` int DEFAULT NULL,
  `userorder_id` int DEFAULT NULL,
  `EnterpriseId` int DEFAULT NULL,
  `Logisticsname` varchar(50) DEFAULT NULL,
  `LogisticsOderNum` varchar(50) DEFAULT NULL,
  `LogisticsTime` varchar(50) DEFAULT NULL,
  `consignor` varchar(50) DEFAULT NULL,
  `ContactTel` varchar(50) DEFAULT NULL,
  `LogisticsAdress` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`LogisticsId`),
  KEY `FK_Reference_20` (`u_id`),
  KEY `FK_Reference_21` (`userorder_id`),
  KEY `FK_Reference_22` (`EnterpriseId`),
  CONSTRAINT `FK_Reference_20` FOREIGN KEY (`u_id`) REFERENCES `userinfo_t` (`u_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_Reference_21` FOREIGN KEY (`userorder_id`) REFERENCES `userorder_t` (`userorder_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_Reference_22` FOREIGN KEY (`EnterpriseId`) REFERENCES `enterprise_t` (`EnterpriseId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='??????Ϣ?';

-- ----------------------------
-- Records of logisticsinfo_t
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for manager_t
-- ----------------------------
DROP TABLE IF EXISTS `manager_t`;
CREATE TABLE `manager_t` (
  `m_id` int NOT NULL AUTO_INCREMENT,
  `m_name` varchar(30) DEFAULT NULL,
  `m_account` varchar(30) DEFAULT NULL,
  `m_password` varchar(30) DEFAULT NULL,
  `m_routes` varchar(300) DEFAULT NULL,
  `m_age` varchar(255) DEFAULT NULL,
  `m_tel` varchar(255) DEFAULT NULL,
  `m_address` varchar(255) DEFAULT NULL,
  `m_state` varchar(255) DEFAULT NULL,
  `m_remarks` varchar(255) DEFAULT NULL,
  `m_nikname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`m_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='????Ա??Ϣ?';

-- ----------------------------
-- Records of manager_t
-- ----------------------------
BEGIN;
INSERT INTO `manager_t` VALUES (1, 'admin', 'w2560001', '123', '4,1,2,3,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31', '32', '13978921265', '四川成都高新区', '在职', '我是一颗红豆', '张三');
INSERT INTO `manager_t` VALUES (2, 'user1', 'w2560002', '123', '2,3,5,1,15,16,18,14,23,24,22', '23', '13982834567', '四川成都青羊区', '在职', '我是一颗绿豆', '李四');
INSERT INTO `manager_t` VALUES (3, 'user2', 'w2560003', '123', '2,3,5,1,19,15,16,14,24,22', '25', '18048538438', '四川成都金牛区', '在职', '我是一颗玉米', '王五');
INSERT INTO `manager_t` VALUES (4, 'user3', 'w2560004', '123', '3,5,1,13,11,9,15,17,14,24,23,22', '21', '13434527801', '四川成都武侯区', '在职', '我是一颗白菜', '赵六');
INSERT INTO `manager_t` VALUES (5, 'user4', 'w2560005', '123', '1,2,3,5,6,8', '21', '18045623451', '四川成都青白江', '在职', '我是一颗韭菜', '小明');
INSERT INTO `manager_t` VALUES (6, 'user5', 'w2560006', '123', '1,2,3,5,6,8', '24', '13627893452', '四川成都锦江区', '在职', '我是一个苹果', '李华');
INSERT INTO `manager_t` VALUES (7, 'user6', 'w2560007', '123', '1,2,3,5,6,8', '23', '17823456712', '四川成都成华区', '在职', '我是一枚邮票', '小红');
INSERT INTO `manager_t` VALUES (8, 'user7', 'w2560008', '123', '1,2,3,5,6,8', '24', '18945672563', '四处成都新都区', '在职', '我是一颗洋葱', '小张');
INSERT INTO `manager_t` VALUES (9, 'user8', 'w2560009', '123', '1,2,3,5,6,8', '27', '18923451671', '四川成都九眼桥', '在职', '我是一个桃子', '小刚');
INSERT INTO `manager_t` VALUES (10, 'user9', 'w2560009', '123', '1,2,3,5,6,8', '26', '17823456523', '四川成都郫县区', '在职', '我是一个西瓜', '小李');
INSERT INTO `manager_t` VALUES (11, 'user10', 'w2560010', '123', '1,2,3,5,6,8', '34', '13456723456', '四川成都华阳', '在职', '我是一颗葡萄', '小赵');
INSERT INTO `manager_t` VALUES (12, 'user11', 'w2560011', '123', '1,2,3,5,6,8', '31', '1236781231', '四川成都', '在职', '保持乐观', '小王');
INSERT INTO `manager_t` VALUES (23, 'zhangsan', 'w2569527', '123', '2,3,5,1,10,9,15,14', '12', '1111111111111', '芸桦路333号', '在职', '要相信光！！！', 'zhangsan');
COMMIT;

-- ----------------------------
-- Table structure for notice_id
-- ----------------------------
DROP TABLE IF EXISTS `notice_id`;
CREATE TABLE `notice_id` (
  `notice_id` int NOT NULL AUTO_INCREMENT,
  `m_id` int DEFAULT NULL,
  `notice_title` varchar(50) DEFAULT NULL,
  `notice_content` varchar(500) DEFAULT NULL,
  `notice_date` varchar(50) DEFAULT NULL,
  `notice_type` int DEFAULT NULL,
  `notice_state` int DEFAULT NULL,
  PRIMARY KEY (`notice_id`),
  KEY `FK_Reference_2` (`m_id`),
  CONSTRAINT `FK_Reference_2` FOREIGN KEY (`m_id`) REFERENCES `manager_t` (`m_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='?????';

-- ----------------------------
-- Records of notice_id
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for product_t
-- ----------------------------
DROP TABLE IF EXISTS `product_t`;
CREATE TABLE `product_t` (
  `ProductId` int NOT NULL AUTO_INCREMENT,
  `RotationId` int DEFAULT NULL,
  `ProductName` varchar(50) DEFAULT NULL,
  `MemberPrice` float DEFAULT NULL,
  `OriginalPrice` float DEFAULT NULL,
  `ProductSrc` varchar(500) DEFAULT NULL,
  `ProductDes` varchar(500) DEFAULT NULL,
  `ShelfTime` varchar(50) DEFAULT NULL,
  `kouwei` varchar(20) NOT NULL,
  `baozhiqi` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ProductId`),
  KEY `FK_Reference_11` (`RotationId`),
  CONSTRAINT `FK_Reference_11` FOREIGN KEY (`RotationId`) REFERENCES `indexbanner_t` (`RotationId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='??Ʒ?';

-- ----------------------------
-- Records of product_t
-- ----------------------------
BEGIN;
INSERT INTO `product_t` VALUES (1, NULL, 'qweq', 12, 13, '', 'qweqedsq', '2021-08-24', '乳脂奶油', '一个星期');
INSERT INTO `product_t` VALUES (2, NULL, 'qweq', 12, 12, '', 'qweq', '2021-08-25', '慕斯', '一个星期');
INSERT INTO `product_t` VALUES (3, NULL, 'qweq', 12, 12, '', 'wedasfdc', '2021-08-17', '慕斯', '一个星期');
COMMIT;

-- ----------------------------
-- Table structure for productall_t
-- ----------------------------
DROP TABLE IF EXISTS `productall_t`;
CREATE TABLE `productall_t` (
  `ProductOtherId` int NOT NULL AUTO_INCREMENT,
  `ProductId` int DEFAULT NULL,
  `SpecificationsId` int DEFAULT NULL,
  `ProductCategoryId` int DEFAULT NULL,
  PRIMARY KEY (`ProductOtherId`),
  KEY `FK_Reference_12` (`ProductId`),
  KEY `FK_Reference_13` (`SpecificationsId`),
  KEY `FK_Reference_14` (`ProductCategoryId`),
  CONSTRAINT `FK_Reference_12` FOREIGN KEY (`ProductId`) REFERENCES `product_t` (`ProductId`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_Reference_13` FOREIGN KEY (`SpecificationsId`) REFERENCES `specifications_t` (`SpecificationsId`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_Reference_14` FOREIGN KEY (`ProductCategoryId`) REFERENCES `producttype_t` (`ProductCategoryId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='??Ʒ?????????';

-- ----------------------------
-- Records of productall_t
-- ----------------------------
BEGIN;
INSERT INTO `productall_t` VALUES (3, 3, 3, 1);
COMMIT;

-- ----------------------------
-- Table structure for producttype_t
-- ----------------------------
DROP TABLE IF EXISTS `producttype_t`;
CREATE TABLE `producttype_t` (
  `ProductCategoryId` int NOT NULL AUTO_INCREMENT,
  `ProductCategory` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ProductCategoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='??Ʒ?????';

-- ----------------------------
-- Records of producttype_t
-- ----------------------------
BEGIN;
INSERT INTO `producttype_t` VALUES (1, '蛋糕');
INSERT INTO `producttype_t` VALUES (2, '冰淇淋');
INSERT INTO `producttype_t` VALUES (3, '咖啡下午茶');
INSERT INTO `producttype_t` VALUES (4, '冻与焗/轻蛋糕');
INSERT INTO `producttype_t` VALUES (5, '设计师礼品');
COMMIT;

-- ----------------------------
-- Table structure for routes_t
-- ----------------------------
DROP TABLE IF EXISTS `routes_t`;
CREATE TABLE `routes_t` (
  `menuId` int NOT NULL AUTO_INCREMENT,
  `menuName` varchar(50) DEFAULT NULL,
  `menuUrl` varchar(100) DEFAULT NULL,
  `pathname` varchar(50) DEFAULT NULL,
  `componentPath` varchar(50) DEFAULT NULL,
  `menuImgClass` varchar(50) DEFAULT NULL,
  `menuState` int DEFAULT NULL,
  `pId` int DEFAULT NULL,
  `isContainChildren` varchar(50) DEFAULT NULL,
  `menuChilds` varchar(500) DEFAULT NULL,
  `menuIsShow` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`menuId`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='·?????ñ';

-- ----------------------------
-- Records of routes_t
-- ----------------------------
BEGIN;
INSERT INTO `routes_t` VALUES (1, '员工管理', '/index/Staff', 'Staff', 'user/Staff', 'TeamOutlined', 0, 0, 'false', '', 'true');
INSERT INTO `routes_t` VALUES (2, '查询员工', '/index/SearchStaff', 'SearchStaff', 'user/SearchStaff', 'ZoomInOutlined', 0, 1, 'false', '', 'true');
INSERT INTO `routes_t` VALUES (3, '员工信息列表', '/index/ModifyInfo', 'ModifyInfo', 'user/ModifyInfo', 'BarsOutlined', 0, 1, 'false', '', 'true');
INSERT INTO `routes_t` VALUES (4, '权限管理', '/index/AuthorityManagement', 'AuthorityManagement', 'user/AuthorityManagement', 'KeyOutlined', 0, 0, 'false', '', 'true');
INSERT INTO `routes_t` VALUES (5, '员工详情', '/index/StaffInfo', 'StaffInfo', 'staff/StaffInfo', 'MoreOutlined', 0, 1, 'false', '', 'false');
INSERT INTO `routes_t` VALUES (6, '编辑员工信息', '/index/StaffEdit', 'StaffEdit', 'staff/StaffEdit', 'TeamOutlined', 0, 1, 'false', '', 'false');
INSERT INTO `routes_t` VALUES (7, '添加员工', '/index/StaffAdd', 'StaffAdd', 'staff/StaffAdd', 'UsergroupAddOutlined', 0, 1, 'false', NULL, 'true');
INSERT INTO `routes_t` VALUES (8, '登陆员工详情', '/index/userInfo', 'userInfo', 'staff/userInfo', 'TeamOutlined', 0, 1, 'false', NULL, 'false');
INSERT INTO `routes_t` VALUES (9, '优惠券管理', '/index/coupon', 'coupon', 'user/coupon', 'TransactionOutlined', 0, 0, 'false', NULL, 'true');
INSERT INTO `routes_t` VALUES (10, '新增优惠券', '/index/coupon/addCoupon', 'addCoupon', 'user/addCoupon', 'PlusCircleOutlined', 0, 9, 'false', NULL, 'true');
INSERT INTO `routes_t` VALUES (11, '预发优惠券', '/index/coupon/pretestCoupon', 'pretestCoupon', 'user/pretestCoupon', 'IssuesCloseOutlined', 0, 9, 'false', NULL, 'true');
INSERT INTO `routes_t` VALUES (12, '现行优惠券', '/index/coupon/activeCoupon', 'activeCoupon', 'user/activeCoupon', 'CheckCircleOutlined', 0, 9, 'false', NULL, 'true');
INSERT INTO `routes_t` VALUES (13, '失效优惠券', '/index/coupon/staleCoupon', 'staleCoupon', 'user/staleCoupon', 'StopOutlined', 0, 9, 'false', NULL, 'true');
INSERT INTO `routes_t` VALUES (14, '企业管理', '/index/firm', 'firmlist', 'firm/EnterpriseInformation', 'HomeOutlined', 0, 0, 'false', NULL, 'true');
INSERT INTO `routes_t` VALUES (15, '企业信息', '/index/firm/EnterpriseInformation', 'EnterpriseInformation', 'firm/EnterpriseInformation', 'BankOutlined', 0, 14, 'false', NULL, 'true');
INSERT INTO `routes_t` VALUES (16, '企业留言', '/index/firm/LeaveWords', 'LeaveWords', 'firm/LeaveWords', 'MailOutlined', 0, 14, 'false', NULL, 'true');
INSERT INTO `routes_t` VALUES (17, '新增企业', '/index/firm/AddEnterprise', 'AddEnterprise', 'firm/AddEnterprise', 'StarOutlined', 0, 14, 'false', NULL, 'false');
INSERT INTO `routes_t` VALUES (18, '留言详情', 'index/firm/LeaveWordsDetail', 'LeaveWordsDetail', 'firm/LeaveWordsDetail', 'StarOutlined', 0, 14, 'false', NULL, 'false');
INSERT INTO `routes_t` VALUES (19, '订单管理', '/index/Order', 'Order', 'user/Order', 'FileDoneOutlined', 0, 0, 'true', NULL, 'true');
INSERT INTO `routes_t` VALUES (20, '订单列表', '/index/Order/OrderList', 'OrderList', 'user/OrderList', 'FileTextOutlined', 0, 19, 'false', NULL, 'true');
INSERT INTO `routes_t` VALUES (21, '订单详情', '/index/Order/OrderDetails', 'OrderDetails', 'user/OrderDetails', 'FileSearchOutlined', 0, 19, 'false', NULL, 'true');
INSERT INTO `routes_t` VALUES (22, '产品种类管理', '/index/ProductType', 'ProductType', 'product/ProductType', 'ProfileOutlined', 0, 0, 'false', NULL, 'true');
INSERT INTO `routes_t` VALUES (23, '添加产品', '/index/productAdd', 'productAdd', 'product/productAdd', 'PlusSquareOutlined', 0, 22, 'false', NULL, 'true');
INSERT INTO `routes_t` VALUES (24, '产品种类', '/index/productKind', 'productKind', 'product/productKind', 'BarsOutlined', 0, 22, 'false', NULL, 'true');
INSERT INTO `routes_t` VALUES (25, '编辑产品', '/index/productEdit', 'productEdit', 'product/productEdit', 'VideoCameraAddOutlined', 0, 22, 'false', NULL, 'false');
INSERT INTO `routes_t` VALUES (26, '用户管理', '/index/Users', 'Users', 'user/User', 'WhatsAppOutlined', 0, 0, 'false', NULL, 'true');
INSERT INTO `routes_t` VALUES (27, '用户列表', '/index/Users/AllUsers', 'AllUsers', 'user/AllUsers', 'TeamOutlined', 0, 26, 'false', NULL, 'true');
INSERT INTO `routes_t` VALUES (28, '用户订单', '/index/Users/UserOrder', 'UserOrder', 'user/UserOrder', 'ShoppingCartOutlined', 0, 26, 'false', NULL, 'true');
INSERT INTO `routes_t` VALUES (29, '用户评论', '/index/Users/UserComments', 'UserComments', 'user/UserComments', 'MessageOutlined', 0, 26, 'false', NULL, 'true');
INSERT INTO `routes_t` VALUES (30, '用户优惠券', '/index/Users/UserCoupons', 'UserCoupons', 'user/UserCoupons', 'RedEnvelopeOutlined', 0, 26, 'false', NULL, 'true');
INSERT INTO `routes_t` VALUES (31, '用户地址管理', '/index/Users/UserAddress', 'UserAddress', 'user/UserAddress', 'CarOutlined', 0, 26, 'false', NULL, 'true');
COMMIT;

-- ----------------------------
-- Table structure for specialday_t
-- ----------------------------
DROP TABLE IF EXISTS `specialday_t`;
CREATE TABLE `specialday_t` (
  `SpecialDayId` int NOT NULL AUTO_INCREMENT,
  `u_id` int DEFAULT NULL,
  `SpecialDayName` varchar(50) DEFAULT NULL,
  `SpecialDate` varchar(50) DEFAULT NULL,
  `SpecialContent` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`SpecialDayId`),
  KEY `FK_Reference_17` (`u_id`),
  CONSTRAINT `FK_Reference_17` FOREIGN KEY (`u_id`) REFERENCES `userinfo_t` (`u_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='?????ձ';

-- ----------------------------
-- Records of specialday_t
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for specifications_t
-- ----------------------------
DROP TABLE IF EXISTS `specifications_t`;
CREATE TABLE `specifications_t` (
  `SpecificationsId` int NOT NULL AUTO_INCREMENT,
  `ProductSize` varchar(50) DEFAULT NULL,
  `ProductNum` int DEFAULT NULL,
  PRIMARY KEY (`SpecificationsId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='??Ʒ???';

-- ----------------------------
-- Records of specifications_t
-- ----------------------------
BEGIN;
INSERT INTO `specifications_t` VALUES (1, '12g', 23);
INSERT INTO `specifications_t` VALUES (2, '12g', 1);
INSERT INTO `specifications_t` VALUES (3, '12g', 1);
COMMIT;

-- ----------------------------
-- Table structure for useradress_t
-- ----------------------------
DROP TABLE IF EXISTS `useradress_t`;
CREATE TABLE `useradress_t` (
  `a_id` int NOT NULL AUTO_INCREMENT,
  `u_id` int DEFAULT NULL,
  `a_country` varchar(50) DEFAULT NULL,
  `a_province` varchar(50) DEFAULT NULL,
  `a_city` varchar(50) DEFAULT NULL,
  `a_area` varchar(50) DEFAULT NULL,
  `a_detail` varchar(50) DEFAULT NULL,
  `a_note` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`a_id`),
  KEY `FK_Reference_6` (`u_id`),
  CONSTRAINT `FK_Reference_6` FOREIGN KEY (`u_id`) REFERENCES `userinfo_t` (`u_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='?û???ַ?';

-- ----------------------------
-- Records of useradress_t
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for usercomment_t
-- ----------------------------
DROP TABLE IF EXISTS `usercomment_t`;
CREATE TABLE `usercomment_t` (
  `c_id` int NOT NULL AUTO_INCREMENT,
  `u_id` int DEFAULT NULL,
  `ProductId` int DEFAULT NULL,
  `c_content` varchar(500) DEFAULT NULL,
  `c_time` varchar(50) DEFAULT NULL,
  `c_img` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`c_id`),
  KEY `FK_Reference_15` (`u_id`),
  KEY `FK_Reference_16` (`ProductId`),
  CONSTRAINT `FK_Reference_15` FOREIGN KEY (`u_id`) REFERENCES `userinfo_t` (`u_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_Reference_16` FOREIGN KEY (`ProductId`) REFERENCES `product_t` (`ProductId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='?û????۱';

-- ----------------------------
-- Records of usercomment_t
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for userinfo_t
-- ----------------------------
DROP TABLE IF EXISTS `userinfo_t`;
CREATE TABLE `userinfo_t` (
  `u_id` int NOT NULL AUTO_INCREMENT,
  `coupon_id` int DEFAULT NULL,
  `shoppingCart_id` int DEFAULT NULL,
  `FruitCoinId` int DEFAULT NULL,
  `u_nickname` varchar(50) DEFAULT NULL,
  `u_name` varchar(50) DEFAULT NULL,
  `u_pwd` varchar(50) DEFAULT NULL,
  `u_count` int DEFAULT NULL,
  `u_tel` varchar(50) DEFAULT NULL,
  `u_email` varchar(50) DEFAULT NULL,
  `u_date` varchar(50) DEFAULT NULL,
  `u_time` varchar(50) DEFAULT NULL,
  `u_type` int DEFAULT NULL,
  PRIMARY KEY (`u_id`),
  KEY `FK_Reference_3` (`coupon_id`),
  KEY `FK_Reference_4` (`shoppingCart_id`),
  KEY `FK_Reference_5` (`FruitCoinId`),
  CONSTRAINT `FK_Reference_3` FOREIGN KEY (`coupon_id`) REFERENCES `coupon_t` (`coupon_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_Reference_4` FOREIGN KEY (`shoppingCart_id`) REFERENCES `cart_t` (`shoppingCart_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_Reference_5` FOREIGN KEY (`FruitCoinId`) REFERENCES `fruitcoin_t` (`FruitCoinId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='?û???Ϣ?';

-- ----------------------------
-- Records of userinfo_t
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for userorder_t
-- ----------------------------
DROP TABLE IF EXISTS `userorder_t`;
CREATE TABLE `userorder_t` (
  `userorder_id` int NOT NULL AUTO_INCREMENT,
  `ProductId` int DEFAULT NULL,
  `EnterpriseId` int DEFAULT NULL,
  `u_id` int DEFAULT NULL,
  `userorder_num` varchar(50) DEFAULT NULL,
  `userorder_date` varchar(50) DEFAULT NULL,
  `userorder_status` int DEFAULT NULL,
  `userorder_sum` int DEFAULT NULL,
  `key` int DEFAULT NULL,
  PRIMARY KEY (`userorder_id`),
  KEY `FK_Reference_7` (`ProductId`),
  KEY `FK_Reference_8` (`EnterpriseId`),
  KEY `FK_Reference_9` (`u_id`),
  CONSTRAINT `FK_Reference_7` FOREIGN KEY (`ProductId`) REFERENCES `product_t` (`ProductId`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_Reference_8` FOREIGN KEY (`EnterpriseId`) REFERENCES `enterprise_t` (`EnterpriseId`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_Reference_9` FOREIGN KEY (`u_id`) REFERENCES `userinfo_t` (`u_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=10002 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='?????';

-- ----------------------------
-- Records of userorder_t
-- ----------------------------
BEGIN;
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
