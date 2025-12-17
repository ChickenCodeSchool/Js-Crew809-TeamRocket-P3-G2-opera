-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: operadb
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `brand`
--

DROP TABLE IF EXISTS `brand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brand` (
  `Brand_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  PRIMARY KEY (`Brand_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brand`
--

LOCK TABLES `brand` WRITE;
/*!40000 ALTER TABLE `brand` DISABLE KEYS */;
INSERT INTO `brand` VALUES (1,'Rolex','Rolex, maison horlogère suisse fondée en 1905, incarne l\'excellence et le prestige. Célèbre pour ses montres iconiques comme la Submariner et la Daytona, la marque allie innovation, précision et savoir-faire artisanal depuis plus d\'un siècle.'),(2,'Hermes','Hermès, maison française de luxe fondée en 1837, est synonyme d\'élégance et d\'artisanat d\'exception. Réputée pour ses carrés de soie, sacs Birkin et Kelly, la marque perpétue un savoir-faire unique alliant tradition et raffinement intemporel.'),(3,'Chanel','Chanel, emblème du luxe français, incarne l’élégance intemporelle et l’audace. Réputée pour ses parfums iconiques, sacs et haute couture, la maison allie sophistication, modernité et innovation depuis sa création par Coco Chanel en 1910.'),(4,'Cartier','Cartier, maison de luxe française fondée en 1847, est célèbre pour ses bijoux, montres et accessoires prestigieux. Synonyme d’élégance et de savoir-faire exceptionnel, elle allie tradition, innovation et design raffiné, symbole du luxe et du prestige à travers le monde.'),(5,'Guerlain','Guerlain, maison française de parfumerie fondée à Paris en 1828, incarne l\'excellence olfactive depuis près de deux siècles. Créatrice de fragrances mythiques comme Shalimar et L\'Heure Bleue, la marque perpétue un savoir-faire artisanal unique, mêlant ingrédients précieux et innovation pour sublimer l\'art du parfum.'),(6,'Yves Saint Laurent','Yves Saint Laurent, maison française fondée en 1961, a révolutionné la mode en démocratisant le prêt-à-porter de luxe. Pionnière du smoking féminin et du style androgyne, la marque incarne l\'audace parisienne et l\'élégance rebelle, alliant créativité avant-gardiste et sophistication intemporelle pour une clientèle moderne.'),(7,'Dior','Fondée en 1946 par Christian Dior, la Maison Dior est une icône mondiale de la haute couture. Célèbre pour avoir révolutionné la mode avec le \"New Look\", elle incarne l\'élégance française et un savoir-faire d\'exception. Des collections prêt-à-porter aux parfums, Dior symbolise le luxe intemporel.'),(8,'Prada','Fondée à Milan en 1913, Prada incarne le luxe italien d\'avant-garde. Sous l\'impulsion de Miuccia Prada, la marque a redéfini l\'élégance par une approche intellectuelle et l\'usage iconique du nylon. Mêlant artisanat traditionnel et design innovant, Prada est synonyme de sophistication moderne.'),(9,'Louis Vuitton','Louis Vuitton, maison française fondée à Paris en 1854, symbolise l\'art du voyage et du luxe raffiné. Reconnue pour ses malles légendaires et son monogramme LV emblématique, la marque allie tradition artisanale et innovation créative, s\'imposant comme référence mondiale de l\'élégance intemporelle et du prestige.'),(10,'Gucci','Gucci, maison italienne fondée à Florence en 1921, incarne l\'excellence du luxe avec son savoir-faire artisanal inégalé. Célèbre pour ses motifs iconiques GG et ses créations audacieuses, la marque fusionne héritage classique et modernité avant-gardiste pour séduire une clientèle exigeante à travers le monde.');
/*!40000 ALTER TABLE `brand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brand_picture`
--

DROP TABLE IF EXISTS `brand_picture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brand_picture` (
  `brand_picture_id` int NOT NULL AUTO_INCREMENT,
  `brand_id` int NOT NULL,
  `url` varchar(255) NOT NULL,
  `is_main` tinyint NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`brand_picture_id`),
  KEY `fk_Brand_picture_Brand1_idx` (`brand_id`),
  CONSTRAINT `fk_Brand_picture_Brand1` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`Brand_id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brand_picture`
--

LOCK TABLES `brand_picture` WRITE;
/*!40000 ALTER TABLE `brand_picture` DISABLE KEYS */;
INSERT INTO `brand_picture` VALUES (1,4,'/assets/images/landingImage/cartier/cartierLogoBlanc.png',0,'logo_white'),(2,4,'/assets/images/landingImage/cartier/cartierLogoNoir.png',0,'logo_black'),(3,4,'/assets/images/landingImage/cartier/landing_collection_cartier.jpg',1,'collection'),(4,3,'/assets/images/landingImage/chanel/chanelLogoBlanc.png',0,'logo_white'),(5,3,'/assets/images/landingImage/chanel/chanelLogoNoir.png',0,'logo_black'),(6,3,'/assets/images/landingImage/chanel/landing_collection_chanel.jpg',1,'collection'),(7,7,'/assets/images/landingImage/dior/diorLogoBlanc.png',0,'logo_white'),(8,7,'/assets/images/landingImage/dior/diorLogoNoir.png',0,'logo_black'),(9,7,'/assets/images/landingImage/dior/landing_collection_dior.jpg',1,'collection'),(10,10,'/assets/images/landingImage/gucci/gucciLogoBlanc.png',0,'logo_white'),(11,10,'/assets/images/landingImage/gucci/gucciLogoNoir.webp',0,'logo_black'),(12,10,'/assets/images/landingImage/gucci/landing_caroussel_gucci.jpeg',0,'landing_carousel'),(13,10,'/assets/images/landingImage/gucci/landing_collection_gucci.jpg',1,'collection'),(14,5,'/assets/images/landingImage/guerlain/guerlainLogoBlanc.png',0,'logo_white'),(15,5,'/assets/images/landingImage/guerlain/guerlainLogoNoir.jpg',0,'logo_black'),(16,5,'/assets/images/landingImage/guerlain/landing_caroussel_guerlain.jpeg',0,'landing_carousel'),(17,5,'/assets/images/landingImage/guerlain/landing_collection_guerlain.jpg',1,'collection'),(18,2,'/assets/images/landingImage/hermes/hermesLogoBlanc.webp',0,'logo_white'),(19,2,'/assets/images/landingImage/hermes/hermesLogoNoir.webp',0,'logo_black'),(20,2,'/assets/images/landingImage/hermes/landing_collection_hermes.jpg',1,'collection'),(21,9,'/assets/images/landingImage/louisvuitton/landing_bg_2.jpeg',0,'background'),(22,9,'/assets/images/landingImage/louisvuitton/landing_collection_louisvuitton.jpg',1,'collection'),(23,9,'/assets/images/landingImage/louisvuitton/lvLogoBlanc.jpg',0,'logo_white'),(24,9,'/assets/images/landingImage/louisvuitton/lvLogoNoir.png',0,'logo_black'),(25,8,'/assets/images/landingImage/prada/landing_bg_4.mp4',0,'background'),(26,8,'/assets/images/landingImage/prada/landing_collection_prada.jpg',1,'collection'),(27,8,'/assets/images/landingImage/prada/pradaLogoBlanc.webp',0,'logo_white'),(28,8,'/assets/images/landingImage/prada/pradaLogoNoir.png',0,'logo_black'),(29,1,'/assets/images/landingImage/rolex/landing_bg_3.jpeg',0,'background'),(30,1,'/assets/images/landingImage/rolex/landing_caroussel_rolex.jpeg',0,'landing_carousel'),(31,1,'/assets/images/landingImage/rolex/landing_collection_rolex.jpg',1,'collection'),(32,1,'/assets/images/landingImage/rolex/rolexLogoBlanc.webp',0,'logo_white'),(33,1,'/assets/images/landingImage/rolex/rolexLogoColor.jpg',0,'slide'),(34,1,'/assets/images/landingImage/rolex/rolexLogoNoir.png',0,'logo_black'),(35,6,'/assets/images/landingImage/ysl/landing_bg_1.jpeg',0,'background'),(36,6,'/assets/images/landingImage/ysl/landing_collection_ysl.jpg',1,'collection'),(37,6,'/assets/images/landingImage/ysl/yslLogoBlanc.jpg',0,'logo_white'),(38,6,'/assets/images/landingImage/ysl/yslLogoNoir.jpg',0,'logo_black'),(39,3,'/assets/images/LandingImage/chanel/landing_caroussel_chanel.jpg',0,'landing_carousel'),(40,4,'/assets/images/LandingImage/cartier/landing_caroussel_cartier.jpeg',0,'landing_carousel'),(41,7,'/assets/images/LandingImage/dior/landing_caroussel_dior.jpg',0,'landing_carousel'),(42,5,'/assets/images/LandingImage/guerlain/landing_caroussel_guerlain.jpg',0,'landing_carousel'),(43,2,'/assets/images/LandingImage/hermes/landing_caroussel_hermes.jpg',0,'landing_carousel'),(44,9,'/assets/images/LandingImage/louisvuitton/landing_caroussel_louisvuiton.jpg',0,'landing_carousel'),(45,8,'/assets/images/LandingImage/prada/landing_caroussel_prada.jpg',0,'landing_carousel'),(46,6,'/assets/images/LandingImage/ysl/landing_caroussel_ysl.jpg',0,'landing_carousel');
/*!40000 ALTER TABLE `brand_picture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `firstname` varchar(45) DEFAULT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `adress` varchar(255) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `uptaded_at` datetime DEFAULT NULL,
  PRIMARY KEY (`cart_id`),
  KEY `fk_Cart_Customers1_idx` (`customer_id`),
  CONSTRAINT `fk_Cart_Customers1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_item`
--

DROP TABLE IF EXISTS `cart_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_item` (
  `cart_item_id` int NOT NULL AUTO_INCREMENT,
  `cart_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `unit-price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`cart_item_id`),
  KEY `fk_Cart_item_product1_idx` (`product_id`),
  KEY `fk_Cart_item_Cart1_idx` (`cart_id`),
  CONSTRAINT `fk_Cart_item_Cart1` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`),
  CONSTRAINT `fk_Cart_item_product1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_item`
--

LOCK TABLES `cart_item` WRITE;
/*!40000 ALTER TABLE `cart_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `categorie_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `created_ad` datetime DEFAULT NULL,
  `UPDATED8AT` datetime DEFAULT NULL,
  PRIMARY KEY (`categorie_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `password` varchar(45) NOT NULL,
  `mail` varchar(100) NOT NULL,
  `birthday` date DEFAULT NULL,
  `adress` text,
  `country` varchar(100) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `uptaded_at` datetime DEFAULT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `cart_id` int NOT NULL,
  `price_total` decimal(10,2) NOT NULL,
  `customer_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `uptaded_at` datetime DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `fk_Order_Customers1_idx` (`customer_id`),
  CONSTRAINT `fk_Order_Customers1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_item`
--

DROP TABLE IF EXISTS `order_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_item` (
  `order_item_id` int NOT NULL AUTO_INCREMENT,
  `cart_item_id` int NOT NULL,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`order_item_id`),
  KEY `product_id_idx` (`product_id`),
  KEY `fk_Order_item_Order1_idx` (`order_id`),
  KEY `fk_Order_item_Cart_item1_idx` (`cart_item_id`),
  CONSTRAINT `fk_Order_item_Cart_item1` FOREIGN KEY (`cart_item_id`) REFERENCES `cart_item` (`cart_item_id`),
  CONSTRAINT `fk_Order_item_Order1` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`),
  CONSTRAINT `product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_item`
--

LOCK TABLES `order_item` WRITE;
/*!40000 ALTER TABLE `order_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `descrption` text NOT NULL,
  `brand_id` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `color` varchar(45) NOT NULL,
  `release_date` date DEFAULT NULL,
  `is_featured` tinyint DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `uptaded_at` datetime DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `fk_product_Brand1_idx` (`brand_id`),
  CONSTRAINT `fk_product_Brand1` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`Brand_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_categories`
--

DROP TABLE IF EXISTS `product_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_categories` (
  `product_id` int NOT NULL,
  `categorie_id` int NOT NULL,
  KEY `fk_Product_categories_Categories1_idx` (`categorie_id`),
  KEY `fk_Product_categories_product1_idx` (`product_id`),
  CONSTRAINT `fk_Product_categories_Categories1` FOREIGN KEY (`categorie_id`) REFERENCES `categories` (`categorie_id`),
  CONSTRAINT `fk_Product_categories_product1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_categories`
--

LOCK TABLES `product_categories` WRITE;
/*!40000 ALTER TABLE `product_categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_image`
--

DROP TABLE IF EXISTS `product_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_image` (
  `product_image_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `is_main` tinyint DEFAULT NULL,
  PRIMARY KEY (`product_image_id`),
  KEY `fk_Product_image_product1_idx` (`product_id`),
  CONSTRAINT `fk_Product_image_product1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_image`
--

LOCK TABLES `product_image` WRITE;
/*!40000 ALTER TABLE `product_image` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `size`
--

DROP TABLE IF EXISTS `size`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `size` (
  `size_id` int NOT NULL AUTO_INCREMENT,
  `stock_id` int NOT NULL,
  `product_id` int NOT NULL,
  `size_label` varchar(45) NOT NULL,
  PRIMARY KEY (`size_id`),
  KEY `fk_Size_product1_idx` (`product_id`),
  KEY `fk_Size_Stock1_idx` (`stock_id`),
  CONSTRAINT `fk_Size_product1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `fk_Size_Stock1` FOREIGN KEY (`stock_id`) REFERENCES `stock` (`stock_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `size`
--

LOCK TABLES `size` WRITE;
/*!40000 ALTER TABLE `size` DISABLE KEYS */;
/*!40000 ALTER TABLE `size` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock`
--

DROP TABLE IF EXISTS `stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stock` (
  `stock_id` int NOT NULL AUTO_INCREMENT,
  `quantity` varchar(45) NOT NULL,
  PRIMARY KEY (`stock_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock`
--

LOCK TABLES `stock` WRITE;
/*!40000 ALTER TABLE `stock` DISABLE KEYS */;
/*!40000 ALTER TABLE `stock` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-17 16:59:17
