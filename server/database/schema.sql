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
INSERT INTO `brand_picture` VALUES (1,4,'/assets/images/landingImage/cartier/cartierLogoBlanc.png',0,'logo_white'),(2,4,'/assets/images/landingImage/cartier/cartierLogoNoir.png',0,'logo_black'),(3,4,'/assets/images/landingImage/cartier/landing_collection_cartier.jpg',1,'collection'),(4,3,'/assets/images/landingImage/chanel/chanelLogoBlanc.png',0,'logo_white'),(5,3,'/assets/images/landingImage/chanel/chanelLogoNoir.png',0,'logo_black'),(6,3,'/assets/images/landingImage/chanel/landing_collection_chanel.jpg',1,'collection'),(7,7,'/assets/images/landingImage/dior/diorLogoBlanc.png',0,'logo_white'),(8,7,'/assets/images/landingImage/dior/diorLogoNoir.png',0,'logo_black'),(9,7,'/assets/images/landingImage/dior/landing_collection_dior.jpg',1,'collection'),(10,10,'/assets/images/landingImage/gucci/gucciLogoBlanc.png',0,'logo_white'),(11,10,'/assets/images/landingImage/gucci/gucciLogoNoir.webp',0,'logo_black'),(12,10,'/assets/images/landingImage/gucci/landing_caroussel_gucci.jpeg',0,'landing_carousel'),(13,10,'/assets/images/landingImage/gucci/landing_collection_gucci.jpg',1,'collection'),(14,5,'/assets/images/landingImage/guerlain/guerlainLogoBlanc.png',0,'logo_white'),(15,5,'/assets/images/landingImage/guerlain/guerlainLogoNoir.jpg',0,'logo_black'),(17,5,'/assets/images/landingImage/guerlain/landing_collection_guerlain.jpg',1,'collection'),(18,2,'/assets/images/landingImage/hermes/hermesLogoBlanc.webp',0,'logo_white'),(19,2,'/assets/images/landingImage/hermes/hermesLogoNoir.webp',0,'logo_black'),(20,2,'/assets/images/landingImage/hermes/landing_collection_hermes.jpg',1,'collection'),(21,9,'/assets/images/landingImage/louisvuitton/landing_bg_2.jpeg',0,'background'),(22,9,'/assets/images/landingImage/louisvuitton/landing_collection_louisvuitton.jpg',1,'collection'),(23,9,'/assets/images/landingImage/louisvuitton/lvLogoBlanc.jpg',0,'logo_white'),(24,9,'/assets/images/landingImage/louisvuitton/lvLogoNoir.png',0,'logo_black'),(25,8,'/assets/images/landingImage/prada/landing_bg_4.mp4',0,'background'),(26,8,'/assets/images/landingImage/prada/landing_collection_prada.jpg',1,'collection'),(27,8,'/assets/images/landingImage/prada/pradaLogoBlanc.webp',0,'logo_white'),(28,8,'/assets/images/landingImage/prada/pradaLogoNoir.png',0,'logo_black'),(29,1,'/assets/images/landingImage/rolex/landing_bg_3.jpeg',0,'background'),(30,1,'/assets/images/landingImage/rolex/landing_caroussel_rolex.jpeg',0,'landing_carousel'),(31,1,'/assets/images/landingImage/rolex/landing_collection_rolex.jpg',1,'collection'),(32,1,'/assets/images/landingImage/rolex/rolexLogoBlanc.webp',0,'logo_white'),(33,1,'/assets/images/landingImage/rolex/rolexLogoColor.jpg',0,'slide'),(34,1,'/assets/images/landingImage/rolex/rolexLogoNoir.png',0,'logo_black'),(35,6,'/assets/images/landingImage/ysl/landing_bg_1.jpeg',0,'background'),(36,6,'/assets/images/landingImage/ysl/landing_collection_ysl.jpg',1,'collection'),(37,6,'/assets/images/landingImage/ysl/yslLogoBlanc.jpg',0,'logo_white'),(38,6,'/assets/images/landingImage/ysl/yslLogoNoir.jpg',0,'logo_black'),(39,3,'/assets/images/LandingImage/chanel/landing_caroussel_chanel.jpg',0,'landing_carousel'),(40,4,'/assets/images/LandingImage/cartier/landing_caroussel_cartier.jpeg',0,'landing_carousel'),(41,7,'/assets/images/LandingImage/dior/landing_caroussel_dior.jpg',0,'landing_carousel'),(42,5,'/assets/images/LandingImage/guerlain/landing_caroussel_guerlain.jpg',0,'landing_carousel'),(43,2,'/assets/images/LandingImage/hermes/landing_caroussel_hermes.jpg',0,'landing_carousel'),(44,9,'/assets/images/LandingImage/louisvuitton/landing_caroussel_louisvuiton.jpg',0,'landing_carousel'),(45,8,'/assets/images/LandingImage/prada/landing_caroussel_prada.jpg',0,'landing_carousel'),(46,6,'/assets/images/LandingImage/ysl/landing_caroussel_ysl.jpg',0,'landing_carousel');
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
  `description` text,
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
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (3,'Le 5 A 7 Bea En Suede','Cabas souple décliné en suède. Léger et entièrement doublé de suède ton sur ton, il est muni d\'une patte de cuir ornée du cassandre et d\'une poche intérieure zippée. Spacieux et fonctionnel grâce à son format east/west, des lacets permettent de resserrer les côtés offrant ainsi différentes silhouettes. Bijouterie en laiton bronze. Dimensions : 50 x 28 x 18 cm. Hauteur anse : 28 cm. Cuir de veau. Style id 763435008IW3645. Pays de fabrication : Italie',5,3200.00,'Marron',NULL,NULL,NULL,NULL,NULL),(4,'Calypso Large En Cuir D\'agneau Grainé','Le nouveau sac enveloppe signature de Saint Laurent. Souple, confectionné dans un cuir finement grainé à matelassage effet coussin. Cette version maxi est rehaussée d\'une chaîne gourmette coulissante. Souple et spacieux, son volume est idéal pour un usage quotidien. Doublure en gros-grain. Bijouterie en laiton light bronze. Fermoir aimanté. Poche interne zippée. Dimensions : 38 x 21 x 10 cm. Longueur de la chaîne : de 27 à 49 cm. Cuir d\'agneau, laiton. Style id 777399AACYT3212. Pays de fabrication : Italie',5,2950.00,'Marron',NULL,NULL,NULL,NULL,NULL),(5,'Niki Medium En Cuir Vintage','Sac souple en cuir de veau vintage, surpiqué en chevrons et orné du cassandre. Spacieux, il dispose de deux compartiments et d\'une grande poche plaquée à l\'arrière. Sa bandoulière chaîne coulissante permet un porté épaule ou croisé. Cuir tanné sans chrome ni métal. Doublure en coton certifié. Bijouterie en laiton light bronze. Une poche extérieure à l\'arrière. Fermoir pression aimanté. Deux poches intérieures. Dimensions: 28 x 20 x 8,5 cm. Longueur de la chaîne: de 30 à 53 cm. Veau, laiton. Style id 6331840EN071000. Pays de fabrication : Italie',5,2700.00,'Noir',NULL,NULL,NULL,NULL,NULL),(6,'Large Gaby Vanity Bag En Cuir D\'agneau','Large sac vanity orné de surpiqûres matelassées et du cassandre. Entièrement doublé de cuir, il offre de multiples portés. Sa bandoulière amovible est ajustable. Doublure en cuir. Bijouterie en laiton light bronze. Fermeture zippée. Une fente à carte. Dimensions: 22 x 15,5 x 8 cm. Longueur de la bandoulière: 53 cm. Hauteur de la poignée : 5,5 cm. Agneau laiton. Style id 8515721EL076195. Pays de fabrication : Italie',5,2200.00,'Rouge',NULL,NULL,NULL,NULL,NULL),(7,'Voltaire Top Handle En Box Saint Laurent','Sac top handle en cuir box Saint Laurent orné du cassandre. Moderne et structuré, sa anse ajustable permet un porté à l\'épaule ou à la main. Doublure en suède. Bijouterie en laiton light bronze. Fermoir pression aimanté. Une poche plaquée. Dimensions : 24 x 19 x 5 cm. Hauteur anse : 16/28 cm. Cuir de veau laiton. Style id 8443410SX0W1997. Pays de fabrication : Italie',5,2100.00,'Gris',NULL,NULL,NULL,NULL,NULL),(8,'Icarino En Cuir Nappa Matelassé','La version baby de l\'iconique icare en cuir d\'agneau nappa surpiqué et orné du cassandre. Moderne et léger, il se porte à la main. Doublure en cuir. Bijouterie en laiton light bronze. Fermeture zippée. Dimensions : 17/26 x 13 x 3 cm. Hauteur de la anse : 13,5 cm. Cuir d\'agneau, laiton. Style id 851689AAANG3775. Pays de fabrication : Italie',5,2490.00,'Vert',NULL,NULL,NULL,NULL,NULL),(9,'Icarino En Cuir Nappa Matelassé','La version baby de l\'iconique icare en cuir d\'agneau nappa surpiqué et orné du cassandre. Moderne et léger, il se porte à la main. Doublure en cuir. Bijouterie en laiton light bronze. Fermeture zippée. Dimensions : 17/26 x 13 x 3 cm. Hauteur de la anse : 13,5 cm. Cuir d\'agneau, laiton. Style id 851689AAANG3775. Pays de fabrication : Italie',5,2490.00,'Rose',NULL,NULL,NULL,NULL,NULL),(10,'Cassandre Large Pochette À Chaine En Cuir D\'agneau','Large pochette à chaine en cuir, ornée du cassandre. Moderne et versatile, sa chaîne maillon permet un porté épaule ou en pochette à la main. Doublure en cuir. Bijouterie en laiton light bronze. Fermeture par bouton-pression. Poche interne zippée. Dimensions : 29.5 x 18 x 5 cm. Longueur de la chaîne : 25 cm. Agneau, laiton. Style id 853610AACYT1000. Pays de fabrication : Italie',5,1500.00,'Noir',NULL,NULL,NULL,NULL,NULL),(11,'Mini Evening Bag En Strass','Minaudière ornée du cassandre et brodée de strass. Sophistiqué et féminin, il se porte à la main pour une silhouette du soir. Bijouterie en laiton light bronze. Fermeture aimantée. Dimensions : 18,5 x 7,5 x 2,5 cm. Strass, laiton. Style id 819638JBO7W8472. Pays de fabrication : Italie',5,2900.00,'Or',NULL,NULL,NULL,NULL,NULL),(12,'Jamie Mini Pochon Porté Épaule En Suède','La version mini du pochon porté épaule jamie en suède, orné de surpiqûres cassandre et carré rive gauche. Léger et compact, ce sac est muni d\'une bandoulière cuir et chaîne permettant un porté à l\'épaule ou en travers de la poitrine. Des cordons de serrage permettent de resserrer ou d\'élargir les côtés pour créer différentes silhouettes. Doublure en cuir. Détails en métal bronze. Fermeture par bouton-pression et cordon de serrage. Dimensions : 14,5 x 15,5 x 8 cm. Hauteur de la bandoulière : 50 cm. Cuir de veau métal. Style id 8591741U8P72916. Pays de fabrication : Italie',5,1950.00,'Marron',NULL,NULL,NULL,NULL,NULL),(13,'Jeanne Slingbacks En Cuir Lisse','Escarpins à bout pointu carré en métal ornés du cassandre martelé, munis d\'une empeigne carrée et d\'un talon aiguille. Semelle en cuir. Bride cheville élastique. Hauteur totale du talon : 11 cm. Cassandre en métal doré. Cuir d\'agneau, laiton. Style id 800164AADX21000. Pays de fabrication : Italie',5,1350.00,'Noir',NULL,NULL,NULL,NULL,NULL),(14,'Tribute Sandales À Plateforme En Cuir Verni','Sandales à talon aiguille mi-haut recouvert munies de brides entrecroisées, d\'une plateforme biseautée et d\'une bride cheville ajustable gravée Saint Laurent Paris. Deux hauteurs de talons disponibles. Hauteur totale du talon : 10,5 cm. Cambrure : 7,5 cm. Hauteur de la plateforme : 3 cm. Semelle en cuir. Bride cheville ajustable. Cuir de veau. Style id 535227B8I006031. Pays de fabrication : Italie',5,950.00,'Rose',NULL,NULL,NULL,NULL,NULL),(15,'Tribute Mules En Cuir Lisse','Mules saint laurent en cuir tanné sans métal, agrémentées de brides entrecroisées. Nous vous conseillons de choisir une demi-pointure au-dessus de votre pointure habituelle. Cuir tanné sans chrome ni métal. Hauteur totale du talon : 0,5 cm. Semelle en cuir. Cuir de veau. Style id 571952BDA002206. Pays de fabrication : Italie',5,675.00,'Marron',NULL,NULL,NULL,NULL,NULL),(16,'Mon Chéri Sandales En Suède À Strass','Sandales à strass et bout en amande à brides croisées, munies d\'un talon aiguille en métal recouvert de satin, de brides cheville à lacets et d\'un charm cerise. Semelle en cuir. Plaque ronde en métal gravé Saint Laurent sur la semelle intérieure. Bride cheville réglable. Hauteur du talon : 11 cm. Cuir de chèvre, cristal, résine, laiton. Style id 863530AAF555787. Pays de fabrication : Italie',5,3900.00,'Rose',NULL,NULL,NULL,NULL,NULL),(17,'Opyum Sandales En Cuir Verni','Sandales à talon cassandre, munies d\'une bride ajustable à la cheville. Deux hauteurs de talons disponibles. Hauteur totale du talon : 11 cm. Semelle en cuir. Talon cassandre en métal doré vieilli. Ce produit peut également être livré sous le code 5576620NPKK1000. Cuir de veau. Style id 5576621TV1A1000. Pays de fabrication : Italie',5,1300.00,'Noir',NULL,NULL,NULL,NULL,NULL),(18,'Opyum Mules En Crêpe Satin','Mules dotées d\'un talon cassandre, d\'un bout carré et de brides croisées. Soie certifiée et viscose certifiée. Semelle en cuir. Plaque ronde en métal gravé Saint Laurent sur la semelle intérieure. Hauteur du talon : 8,5 cm. Cassandre en métal bronze. Viscose, soie. Style id 8189319QAB15518. Pays de fabrication : Italie',5,1150.00,'Rose',NULL,NULL,NULL,NULL,NULL),(19,'Opyum Escarpins En Cuir Verni','Escarpins à talon structuré cassandre dotés d\'une empeigne décolletée. Deux hauteurs de talons disponibles. Hauteur totale du talon : 11 cm. Semelle en cuir. Talon cassandre en métal doré vieilli. Ce produit peut également être livré sous le code 4720111TV1A1000. Cuir de veau. Style id 4720110NPKK1000. Pays de fabrication : Italie',5,1250.00,'Noir',NULL,NULL,NULL,NULL,NULL),(20,'Loulou Slingbacks En Cuir Verni','Escarpins à bride arrière munis d\'un talon aiguille incurvé en métal massif doré et d\'un bout pointu en métal orné d\'un cabochon en résine. Semelle en cuir. Plaque ronde en métal gravé Saint Laurent sur la semelle intérieure. Bride arrière élastique. Hauteur du talon : 11 cm. Cuir de veau, cuir d\'agneau, acier, résine époxy. Style id 8272501TVA66231. Pays de fabrication : Italie',5,5700.00,'Rouge',NULL,NULL,NULL,NULL,NULL),(21,'Diane Bottes En Cuir Grainé','Bottes à talon aiguille et bout en amande, munies d\'une bride cheville avec une boucle guillochée ornée du cassandre en métal. Semelle en cuir. Hauteur totale du talon : 10 cm. Cuir de veau. Style id 74379725V001000. Pays de fabrication : Italie',5,1850.00,'Noir',NULL,NULL,NULL,NULL,NULL),(22,'Le Loafer Mules En Suède','Mules souples ornées du cassandre, munies d\'un bout moc-toe cousu main. Semelle en cuir. Hauteur du talon : 0,5 cm. Cassandre en métal doré. Cuir de veau, laiton. Style id 85239227DTT2319. Pays de fabrication : Italie',5,990.00,'Marron',NULL,NULL,NULL,NULL,NULL),(23,'Nœud papillon H Gourmette','Nœud papillon 100 % soie',2,260.00,'Rouge',NULL,NULL,NULL,NULL,NULL),(24,'Cravate','Pensée pour une allure élégante, cette cravate en grenadine de soie est tissée en jacquard sur un métier traditionnel. Ce tissage complexe lui apporte un effet texturé.',2,300.00,'Rouge et blanc',NULL,NULL,NULL,NULL,NULL),(25,'Cravate','Pensée pour une allure élégante, cette cravate en grenadine de soie est tissée en jacquard sur un métier traditionnel. Ce tissage complexe lui apporte un effet texturé.',2,300.00,'Noir/gris',NULL,NULL,NULL,NULL,NULL),(26,'Nœud papillon H Gourmette','Nœud papillon 100 % soie',2,260.00,'Noir/gris/blanc',NULL,NULL,NULL,NULL,NULL),(27,'Cravate','Objet d\'allure et lieu de narration, la cravate Hermès dessine toutes les libertés. Avec elle une seule règle, le plaisir de la porter !',2,255.00,'Multicolore',NULL,NULL,NULL,NULL,NULL),(28,'Nœud papillon H Gourmette','Nœud papillon 100 % soie',2,260.00,'Gris clair / gris foncé',NULL,NULL,NULL,NULL,NULL),(29,'Nœud papillon H Gourmette','Nœud papillon 100 % soie',2,260.00,'Marine / bleu clair',NULL,NULL,NULL,NULL,NULL),(30,'Cravate','Objet d\'allure et lieu de narration, la cravate Hermès dessine toutes les libertés. Avec elle une seule règle, le plaisir de la porter !',2,255.00,'Anthracite',NULL,NULL,NULL,NULL,NULL),(31,'Cravate','Objet d\'allure et lieu de narration, la cravate Hermès dessine toutes les libertés. Avec elle une seule règle, le plaisir de la porter !',2,255.00,'Bleu ciel',NULL,NULL,NULL,NULL,NULL),(32,'Nœud papillon H Gourmette','Nœud papillon 100 % soie',2,260.00,'Gris clair',NULL,NULL,NULL,NULL,NULL),(33,'Barénia Eau de parfum','Le parfumeur Christine Nagel crée son premier chypre pour Hermès, une fragrance sensuelle aux notes boisées à l\'inoubliable élégance. Barénia est un parfum de peau révélant une dualité : la force et la douceur.',2,168.00,'Ambre',NULL,NULL,NULL,NULL,NULL),(34,'24, Faubourg Eau délicate','Roman composé par Maurice Roucel en 1995, 24 Faubourg est une invitation à un voyage dont le soleil serait la destination. Éclat des fleurs blanches en tête, rayonnement du cœur floral enveloppé d\'iris, de bois et de mystère.',2,153.00,'Doré',NULL,NULL,NULL,NULL,NULL),(35,'Elixir des Merveilles Eau de parfum','Le parfumeur Jean-Claude Ellena intensifie la magie douce des Merveilles en composant l\'Élixir des Merveilles. Une nouvelle étoile joyeuse, un concentré de merveilleux.',2,287.00,'Ambre doré',NULL,NULL,NULL,NULL,NULL),(36,'Eau des Merveilles Bleue Eau de toilette','En 2017, le parfumeur d\'Hermès Christine Nagel crée Eau des Merveilles Bleue. Un nouveau regard sur la constellation des Merveilles, qui unit la magie de l\'océan à la couleur azurée du ciel.',2,270.00,'Bleu',NULL,NULL,NULL,NULL,NULL),(37,'Twilly d\'Hermès Eau Ginger Eau de parfum','Avec l\'eau de parfum Twilly d\'Hermès Eau Ginger, les filles d\'Hermès expriment un bonheur contagieux. Créée par le parfumeur d\'Hermès Christine Nagel, cette autre facette de Twilly d\'Hermès s\'impose par son esprit joyeux et solaire.',2,273.00,'Rose',NULL,NULL,NULL,NULL,NULL),(38,'Terre d\'Hermès Eau de toilette','En 2006, Jean-Claude Ellena crée Terre d\'Hermès, une eau reliant l\'homme à ses origines, aux sources de sa puissance créatrice. Terre d\'Hermès raconte la relation de l\'homme à la terre, son dialogue humble et harmonieux avec la nature et les éléments.',2,128.00,'Orange',NULL,NULL,NULL,NULL,NULL),(39,'Terre d\'Hermès Parfum','Terre d\'Hermès raconte la relation de l\'homme à la terre, son dialogue humble et harmonieux avec la nature et les éléments. En 2009, Jean-Claude Ellena donne une nouvelle densité à Terre d\'Hermès, en créant Terre d\'Hermès Parfum.',2,211.00,'Ambre',NULL,NULL,NULL,NULL,NULL),(40,'Un Jardin sur le Nil Eau de toilette','Créé en 2005, l\'eau de toilette Un Jardin sur le Nil évoque un voyage olfactif dans les îles-jardins à Assouan en Égypte. Le parfumeur Jean-Claude Ellena raconte dans cette composition ce fleuve synonyme de vie et de générosité.',2,145.00,'Vert',NULL,NULL,NULL,NULL,NULL),(41,'Eau d\'orange verte Eau de cologne','La toute première cologne de la maison Hermès est signée Françoise Caron en 1979. Devenue emblématique, elle se distingue par sa fraîcheur vive et verte.',2,186.00,'Vert',NULL,NULL,NULL,NULL,NULL),(42,'Voyage d\'Hermès Eau de toilette','Créée en 2010 par le parfumeur Jean-Claude Ellena, Voyage d\'Hermès est une invitation à la découverte, à la rencontre et au partage. La composition, aussi à l\'aise au masculin qu\'au féminin, raconte la relation profonde et originale que la Maison entretient avec le voyage.',2,134.00,'Ambre',NULL,NULL,NULL,NULL,NULL),(43,'Sneakers Leader','Sneakers emblématiques en sergé technique, veau et chèvre velours sur une semelle légère graphique, pour une silhouette urbaine et contemporaine.',2,1070.00,'Multicolore blanc',NULL,NULL,NULL,NULL,NULL),(44,'Sneakers Master','Sneakers en veau souple sur une semelle ultra fine, pour un style vintage et minimaliste.',2,90.00,'Blanc',NULL,NULL,NULL,NULL,NULL),(45,'Sneakers Trail','Sneakers emblématiques en veau et chèvre velours sur une semelle graphique contrastée, pour une silhouette urbaine et contemporaine.',2,950.00,'Multicolore blanc',NULL,NULL,NULL,NULL,NULL),(46,'Sneakers Kid','Sneakers en veau et chèvre velours aux lignes épurées. Détail « H » signature discret pour une allure urbaine et contemporaine au quotidien.',2,810.00,'Noir',NULL,NULL,NULL,NULL,NULL),(47,'Sneakers Jet','Sneakers en chèvre velours, jeu de contrastes et « H » signature, pour un look audacieux et néo-vintage.',2,960.00,'Gris et blanc',NULL,NULL,NULL,NULL,NULL),(48,'Sneakers Day','Sneakers en chèvre velours sublimées par une boucle Kelly fonctionnelle, pour une silhouette urbaine et contemporaine. Vendues avec une deuxième paire de lacets.',2,1180.00,'Beige',NULL,NULL,NULL,NULL,NULL),(49,'Sneakers Kid','Sneakers en chèvre velours aux lignes épurées. Détail « H » signature discret pour une allure urbaine et contemporaine au quotidien.',2,810.00,'Rose',NULL,NULL,NULL,NULL,NULL),(50,'Sneakers Bouncing','Sneakers en veau et chèvre velours. Semelle graphique ultra légère pour une silhouette dynamique et contemporaine. Vendues avec une deuxième paire de lacets.',2,895.00,'Noir',NULL,NULL,NULL,NULL,NULL),(51,'Sneakers Match','Sneakers en chèvre sport et veau aux lignes épurées sublimées par un « H en Biais » perforé, pour une allure urbaine et néo-vintage.',2,870.00,'Blanc',NULL,NULL,NULL,NULL,NULL),(52,'Sneakers Jet','Sneakers en chèvre velours, jeu de contrastes et « H » signature, pour un look audacieux et néo-vintage. Vendues avec une deuxième paire de lacets.',2,960.00,'Rouge sépia',NULL,NULL,NULL,NULL,NULL),(53,'Blouson à capuche Casaque','Blouson à capuche zippé « Casaque » en ripstop crispé. Capuche avec cordon de serrage, poignets côtelés, zip double curseur, poches zippées sur les côtés.',2,4900.00,'Vert chrome',NULL,NULL,NULL,NULL,NULL),(54,'Blouson à capuche','Blouson à capuche zippé en double crêpe de coton et soie. Capuche avec cordon de serrage, col montant avec boutons-pression gravés « Hermès Paris », jeu de surpiqûres avec détail « H » au dos.',2,3500.00,'Marine',NULL,NULL,NULL,NULL,NULL),(55,'Blouson droit','Blouson boutonné en serge suédée déperlante, doublure amovible tissée jacquard en laine vierge. Coupe droite, poches à rabat boutonnées sur les côtés.',2,6500.00,'Marine',NULL,NULL,NULL,NULL,NULL),(56,'Blouson à capuche détails cuir','Blouson à capuche en super Toilovent imperméable. Capuche avec cordon de serrage, zip double curseur, patte de boutonnage en cuir d\'agneau gomme.',2,5400.00,'Café',NULL,NULL,NULL,NULL,NULL),(57,'Blouson à capuche','Blouson à capuche zippé en double crêpe de coton et soie. Capuche avec cordon de serrage, col montant avec boutons-pression gravés « Hermès Paris », jeu de surpiqûres avec détail « H » au dos.',2,3500.00,'Marine',NULL,NULL,NULL,NULL,NULL),(58,'Surchemise','Surchemise zippée « techno papier ». Col montant avec mentonnière et bouton-pression gravé « Hermès Paris », poches poitrine à rabat.',2,2800.00,'Menthe',NULL,NULL,NULL,NULL,NULL),(59,'Blouson droit détail cuir','Blouson boutonné en serge de laine et cachemire. Coupe droite, col montant boutonné, poches à rabat boutonnées, fonds de poches en cuir d\'agneau lavable.',2,3900.00,'Taupe',NULL,NULL,NULL,NULL,NULL),(60,'Blouson bord-côte réversible Cavalcadour métallisé','Blouson bord-côte zippé imprimé « Cavalcadour métallisé » en nylon et élasthanne, réversible super Toilovent imperméable. Col, poignets et bas de blouson côtelés.',2,4500.00,'Ardoise',NULL,NULL,NULL,NULL,NULL),(61,'Pantalon de jogging Capsule Sport','Pantalon de jogging Capsule Sport en super Toilovent imperméable. Cordon de serrage à la taille, poches zippées sur les côtés, passepoil en Toilovent réfléchissante.',2,1800.00,'Ardoise',NULL,NULL,NULL,NULL,NULL),(62,'Surchemise à capuche amovible','Surchemise à capuche boutonnée « rayures de laine et papier » en laine vierge et papier. Capuche zippée amovible en Toilovent avec cordon de serrage.',2,3600.00,'Marine',NULL,NULL,NULL,NULL,NULL),(63,'Boutons de manchette Cannelé','Boutons de manchette Rolex en or Everose 18 ct dotés du cannelé Rolex, du disque Cerachrom et de la couronne Rolex, signatures de la marque.',1,5900.00,'Cuivre',NULL,NULL,NULL,NULL,NULL),(64,'Boutons de manchette Aiguille','Boutons de manchette Rolex en or gris 18 ct qui rappellent l\'aiguille des heures des montres Professionnelles Rolex, dotées de l\'affichage Chromalight.',1,5900.00,'Or gris',NULL,NULL,NULL,NULL,NULL),(65,'Boutons de manchette Cannelé','Boutons de manchette Rolex en or jaune 18 ct dotés du cannelé Rolex, du disque Cerachrom et de la couronne Rolex, signatures de la marque.',1,5900.00,'Or',NULL,NULL,NULL,NULL,NULL),(66,'Pendulette de table Submariner Date','La pendulette de table Submariner en acier inoxydable, dotée d\'un disque de lunette Cerachrom et d\'un affichage Chromalight, intègre un calendrier perpétuel.',1,10620.00,'Acier',NULL,NULL,NULL,NULL,NULL),(67,'Boutons de manchette Couronne','Boutons de manchette Rolex en or gris 18 ct en forme de couronne Rolex.',1,5900.00,'Or gris',NULL,NULL,NULL,NULL,NULL),(68,'Boutons de manchette Aiguille','Boutons de manchette Rolex en or Everose 18 ct qui rappellent l\'aiguille des heures des montres Professionnelles Rolex, dotées de l\'affichage Chromalight.',1,5900.00,'Or Everose',NULL,NULL,NULL,NULL,NULL),(69,'Boutons de manchette Cannelé','Boutons de manchette Rolex en or jaune 18 ct dotés du cannelé Rolex, du disque Cerachrom et de la couronne Rolex, signatures de la marque.',1,5900.00,'Or',NULL,NULL,NULL,NULL,NULL),(70,'Boutons de manchette Couronne','Boutons de manchette Rolex en or Everose 18 ct en forme de couronne Rolex.',1,5900.00,'Or Everose',NULL,NULL,NULL,NULL,NULL),(71,'Boutons de manchette Aiguille','Boutons de manchette Rolex en or jaune 18 ct qui rappellent l\'aiguille des heures des montres Professionnelles Rolex, dotées de l\'affichage Chromalight.',1,5900.00,'Or',NULL,NULL,NULL,NULL,NULL),(72,'Boutons de manchette Couronne','Boutons de manchette Rolex en or jaune 18 ct en forme de couronne Rolex.',1,5900.00,'Or',NULL,NULL,NULL,NULL,NULL),(73,'Cosmograph Daytona','Cette Oyster Perpetual Cosmograph Daytona en or jaune 18 ct est assortie d\'un cadran vert vif et doré et d\'un bracelet Oyster. Elle est dotée d\'une lunette en or jaune 18 ct et d\'une échelle tachymétrique moulée en creux.',1,51100.00,'Or',NULL,NULL,NULL,NULL,NULL),(74,'Cosmograph Daytona','L\'Oyster Perpetual Cosmograph Daytona en acier Oystersteel et or jaune est dotée d\'un cadran noir et d\'anneaux des compteurs contrastés. Elle est équipée d\'un bracelet Oyster et d\'une lunette en or jaune avec une échelle tachymétrique moulée en creux.',1,23300.00,'Or',NULL,NULL,NULL,NULL,NULL),(75,'Cosmograph Daytona','Cette Oyster Perpetual Cosmograph Daytona en or jaune 18 ct est assortie d\'un cadran doré, serti de diamants et d\'un bracelet Oyster. Elle est dotée d\'une lunette sertie de diamants et de cornes serties de diamants.',1,145000.00,'Or',NULL,NULL,NULL,NULL,NULL),(76,'Cosmograph Daytona','Cette Oyster Perpetual Cosmograph Daytona en or Everose 18 ct est assortie d\'un cadran noir vif et Sundust et d\'un bracelet Oyster. Elle est dotée d\'une lunette en or Everose 18 ct et d\'une échelle tachymétrique moulée en creux.',1,54700.00,'Cuivre',NULL,NULL,NULL,NULL,NULL),(77,'Cosmograph Daytona','Cette Oyster Perpetual Cosmograph Daytona en or gris 18 ct est assortie d\'un cadran en nacre blanche et noire, serti de diamants et d\'un bracelet Oysterflex. Elle est dotée d\'une lunette serti de diamants.',1,74450.00,'Argent',NULL,NULL,NULL,NULL,NULL),(78,'Cosmograph Daytona','Cette Oyster Perpetual Cosmograph Daytona en or jaune 18 ct assortie d\'un cadran bleu turquoise et noir et d\'un bracelet Oysterflex est dotée d\'une lunette Cerachrom noire et d\'une échelle tachymétrique.',1,39550.00,'Or',NULL,NULL,NULL,NULL,NULL),(79,'Cosmograph Daytona','Cette Oyster Perpetual Cosmograph Daytona en or Everose 18 ct assortie d\'un cadran noir vif et Sundust et d\'un bracelet Oysterflex est dotée d\'une lunette Cerachrom noire et d\'une échelle tachymétrique.',1,138650.00,'Cuivre',NULL,NULL,NULL,NULL,NULL),(80,'Cosmograph Daytona','L\'Oyster Perpetual Cosmograph Daytona en platine est dotée d\'un cadran bleu glacier, serti de diamants et d\'anneaux des compteurs contrastés. Elle est équipée d\'un bracelet Oyster et d\'une lunette Cerachrom marron avec une échelle tachymétrique.',1,82100.00,'Argent',NULL,NULL,NULL,NULL,NULL),(81,'Cosmograph Daytona','Cette Oyster Perpetual Cosmograph Daytona en or jaune 18 ct est assortie d\'un cadran doré, serti de diamants, d\'anneaux des compteurs contrastés et d\'un bracelet Oysterflex. Elle est dotée d\'une lunette sertie de diamants et de cornes serties de diamants.',1,136050.00,'Or',NULL,NULL,NULL,NULL,NULL),(82,'Cosmograph Daytona','Cette Oyster Perpetual Cosmograph Daytona en or gris 18 ct est assortie d\'un cadran en acier, serti de diamants, d\'anneaux des compteurs contrastés et d\'un bracelet Oysterflex. Elle est dotée d\'une lunette serti de diamants et de cornes serties de diamants.',1,138650.00,'Argent',NULL,NULL,NULL,NULL,NULL),(83,'Day-Date 40','L\'Oyster Perpetual Day-Date 40 en or Everose 18 ct dotée d\'un cadran ardoise ombré, d\'une lunette cannelée et d\'un bracelet President.',1,45900.00,'Or brun',NULL,NULL,NULL,NULL,NULL),(84,'Day-Date 36','L\'Oyster Perpetual Day-Date 36 en or gris 18 ct dotée d\'un cadran argenté, d\'une lunette cannelée et d\'un bracelet President.',1,45900.00,'Argent',NULL,NULL,NULL,NULL,NULL),(85,'Day-Date 40','L\'Oyster Perpetual Day-Date 40 en or gris 18 ct dotée d\'un cadran vert olive, d\'une lunette cannelée et d\'un bracelet President.',1,50200.00,'Argent',NULL,NULL,NULL,NULL,NULL),(86,'Day-Date 40','L\'Oyster Perpetual Day-Date 40 en or jaune 18 ct dotée d\'un cadran blanc, d\'une lunette cannelée et d\'un bracelet President.',1,46700.00,'Or',NULL,NULL,NULL,NULL,NULL),(87,'Day-Date 40','L\'Oyster Perpetual Day-Date 40 en or jaune 18 ct dotée d\'un cadran vert ombré, d\'une lunette cannelée et d\'un bracelet President.',1,46700.00,'Or',NULL,NULL,NULL,NULL,NULL),(88,'Day-Date 36','L\'Oyster Perpetual Day-Date 36 en or Everose 18 ct dotée d\'un cadran couleur rosé, serti de diamants, d\'une lunette cannelée et d\'un bracelet President.',1,49000.00,'Or Everose',NULL,NULL,NULL,NULL,NULL),(89,'Day-Date 40','L\'Oyster Perpetual Day-Date 40 en or jaune 18 ct est dotée d\'un cadran couleur champagne serti de diamants, d\'une lunette sertie de diamants et d\'un bracelet President.',1,72200.00,'Or',NULL,NULL,NULL,NULL,NULL),(90,'Day-Date 36','L\'Oyster Perpetual Day-Date 36 en or gris 18 ct est dotée d\'un cadran rose, serti de diamants, d\'une lunette serti de diamants et d\'un bracelet President.',1,95900.00,'Argent',NULL,NULL,NULL,NULL,NULL),(91,'Day-Date 36','L\'Oyster Perpetual Day-Date 36 en or Everose 18 ct est dotée d\'un cadran bleu-vert, serti de diamants, d\'une lunette sertie de diamants et d\'un bracelet President.',1,95900.00,'Or Everose',NULL,NULL,NULL,NULL,NULL),(92,'Day-Date 40','L\'Oyster Perpetual Day-Date 40 en or jaune 18 ct dotée d\'un cadran vert ombré, d\'une lunette sertie de diamants et d\'un bracelet President.',1,103800.00,'Or',NULL,NULL,NULL,NULL,NULL),(93,'Land-Dweller 40','L\'alliance parfaite entre élégance et fonctionnalité. Dotée d\'un boîtier Oystersteel de 40mm, cette montre combine un affichage GMT et un calendrier annuel dans un format raffiné. Sa lunette Cerachrom bidirectionnelle permet un réglage intuitif des fuseaux horaires, idéale pour les voyageurs exigeants. Mouvement manufacture calibre 7002, étanchéité 100m.',1,15950.00,'Argent',NULL,NULL,NULL,NULL,NULL),(94,'Land-Dweller 36','Un concentré de raffinement au poignet. Ce modèle Oyster de 36mm en platine sublimé de diamants incarne l\'excellence horlogère. Alliant prestige des matériaux nobles et complications pratiques, il offre un affichage GMT et un calendrier annuel dans un écrin d\'exception.',1,99300.00,'Argent',NULL,NULL,NULL,NULL,NULL),(95,'Land-Dweller 40','Le modèle Land-Dweller 40 en or Everose 18 ct avec un cadran blanc intense, décor nid d\'abeille et un bracelet Flat Jubilee.',1,50100.00,'Rose',NULL,NULL,NULL,NULL,NULL),(96,'Land-Dweller 36','Le modèle Land-Dweller 36 en acier Oystersteel et or gris avec un cadran blanc intense, décor nid d\'abeille et un bracelet Flat Jubilee.',1,14950.00,'Argent',NULL,NULL,NULL,NULL,NULL),(97,'Land-Dweller 40','Le modèle Land-Dweller 40 en platine avec un cadran bleu glacier, décor nid d\'abeille et un bracelet Flat Jubilee.',1,66400.00,'Argent',NULL,NULL,NULL,NULL,NULL),(98,'Land-Dweller 40','Le modèle Land-Dweller 40 en platine avec un cadran bleu glacier, décor nid d\'abeille, serti de diamants et un bracelet Flat Jubilee.',1,122300.00,'Argent',NULL,NULL,NULL,NULL,NULL),(99,'Land-Dweller 36','Le modèle Land-Dweller 36 en or Everose 18 ct avec un cadran blanc intense, décor nid d\'abeille, serti de diamants et un bracelet Flat Jubilee.',1,95900.00,'Argent',NULL,NULL,NULL,NULL,NULL),(100,'Land-Dweller 36','Le modèle Land-Dweller 36 en or Everose 18 ct avec un cadran blanc intense, décor nid d\'abeille et un bracelet Flat Jubilee.',1,45600.00,'Rose',NULL,NULL,NULL,NULL,NULL),(101,'Land-Dweller 40','Le modèle Land-Dweller 40 en or Everose 18 ct avec un cadran blanc intense, décor nid d\'abeille, serti de diamants et un bracelet Flat Jubilee.',1,112200.00,'Rose',NULL,NULL,NULL,NULL,NULL),(102,'Land-Dweller 36','Le modèle Land-Dweller 36 en platine avec un cadran bleu glacier, décor nid d\'abeille et un bracelet Flat Jubilee.',1,61800.00,'Argent',NULL,NULL,NULL,NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=325 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_image`
--

LOCK TABLES `product_image` WRITE;
/*!40000 ALTER TABLE `product_image` DISABLE KEYS */;
INSERT INTO `product_image` VALUES (7,3,'/assets/images/ProductImage/ysl/bags/YSL_1_1.avif',1),(8,3,'/assets/images/ProductImage/ysl/bags/YSL_1_2.avif',0),(9,3,'/assets/images/ProductImage/ysl/bags/YSL_1_3.avif',0),(10,3,'/assets/images/ProductImage/ysl/bags/YSL_1_4.avif',0),(11,3,'/assets/images/ProductImage/ysl/bags/YSL_1_5.avif',0),(12,3,'/assets/images/ProductImage/ysl/bags/YSL_1_6.avif',0),(13,4,'/assets/images/ProductImage/ysl/bags/YSL_2_1.avif',1),(14,4,'/assets/images/ProductImage/ysl/bags/YSL_2_2.avif',0),(15,4,'/assets/images/ProductImage/ysl/bags/YSL_2_3.avif',0),(16,4,'/assets/images/ProductImage/ysl/bags/YSL_2_4.avif',0),(17,4,'/assets/images/ProductImage/ysl/bags/YSL_2_5.avif',0),(18,4,'/assets/images/ProductImage/ysl/bags/YSL_2_6.avif',0),(19,4,'/assets/images/ProductImage/ysl/bags/YSL_2_7.avif',0),(20,5,'/assets/images/ProductImage/ysl/bags/YSL_3_1.avif',1),(21,5,'/assets/images/ProductImage/ysl/bags/YSL_3_2.avif',0),(22,5,'/assets/images/ProductImage/ysl/bags/YSL_3_3.avif',0),(23,5,'/assets/images/ProductImage/ysl/bags/YSL_3_4.avif',0),(24,5,'/assets/images/ProductImage/ysl/bags/YSL_3_5.avif',0),(25,5,'/assets/images/ProductImage/ysl/bags/YSL_3_6.avif',0),(26,6,'/assets/images/ProductImage/ysl/bags/YSL_4_1.avif',1),(27,6,'/assets/images/ProductImage/ysl/bags/YSL_4_2.avif',0),(28,6,'/assets/images/ProductImage/ysl/bags/YSL_4_3.avif',0),(29,6,'/assets/images/ProductImage/ysl/bags/YSL_4_4.avif',0),(30,6,'/assets/images/ProductImage/ysl/bags/YSL_4_5.avif',0),(31,7,'/assets/images/ProductImage/ysl/bags/YSL_5_1.avif',1),(32,7,'/assets/images/ProductImage/ysl/bags/YSL_5_2.avif',0),(33,7,'/assets/images/ProductImage/ysl/bags/YSL_5_3.avif',0),(34,7,'/assets/images/ProductImage/ysl/bags/YSL_5_4.avif',0),(35,7,'/assets/images/ProductImage/ysl/bags/YSL_5_5.avif',0),(36,7,'/assets/images/ProductImage/ysl/bags/YSL_5_6.avif',0),(37,8,'/assets/images/ProductImage/ysl/bags/YSL_6_1.avif',1),(38,8,'/assets/images/ProductImage/ysl/bags/YSL_6_2.avif',0),(39,8,'/assets/images/ProductImage/ysl/bags/YSL_6_3.avif',0),(40,8,'/assets/images/ProductImage/ysl/bags/YSL_6_4.avif',0),(41,8,'/assets/images/ProductImage/ysl/bags/YSL_6_5.avif',0),(42,8,'/assets/images/ProductImage/ysl/bags/YSL_6_6.avif',0),(43,9,'/assets/images/ProductImage/ysl/bags/YSL_7_1.avif',1),(44,9,'/assets/images/ProductImage/ysl/bags/YSL_7_2.avif',0),(45,9,'/assets/images/ProductImage/ysl/bags/YSL_7_3.avif',0),(46,9,'/assets/images/ProductImage/ysl/bags/YSL_7_4.avif',0),(47,9,'/assets/images/ProductImage/ysl/bags/YSL_7_5.avif',0),(48,10,'/assets/images/ProductImage/ysl/bags/YSL_8_1.avif',1),(49,10,'/assets/images/ProductImage/ysl/bags/YSL_8_2.avif',0),(50,10,'/assets/images/ProductImage/ysl/bags/YSL_8_3.avif',0),(51,10,'/assets/images/ProductImage/ysl/bags/YSL_8_4.avif',0),(52,10,'/assets/images/ProductImage/ysl/bags/YSL_8_5.avif',0),(53,11,'/assets/images/ProductImage/ysl/bags/YSL_9_1.avif',1),(54,11,'/assets/images/ProductImage/ysl/bags/YSL_9_2.avif',0),(55,12,'/assets/images/ProductImage/ysl/bags/YSL_10_1.avif',1),(56,12,'/assets/images/ProductImage/ysl/bags/YSL_10_2.avif',0),(57,12,'/assets/images/ProductImage/ysl/bags/YSL_10_3.avif',0),(58,12,'/assets/images/ProductImage/ysl/bags/YSL_10_4.avif',0),(59,12,'/assets/images/ProductImage/ysl/bags/YSL_10_5.avif',0),(60,12,'/assets/images/ProductImage/ysl/bags/YSL_10_6.avif',0),(61,13,'/assets/images/ProductImage/ysl/shoes/YSL_11_1.avif',1),(62,13,'/assets/images/ProductImage/ysl/shoes/YSL_11_1.jpg',0),(63,13,'/assets/images/ProductImage/ysl/shoes/YSL_11_2.avif',0),(64,13,'/assets/images/ProductImage/ysl/shoes/YSL_11_3.avif',0),(65,14,'/assets/images/ProductImage/ysl/shoes/YSL_12_1.avif',1),(66,14,'/assets/images/ProductImage/ysl/shoes/YSL_12_2.avif',0),(67,15,'/assets/images/ProductImage/ysl/shoes/YSL_13_1.avif',1),(68,15,'/assets/images/ProductImage/ysl/shoes/YSL_13_2.avif',0),(69,16,'/assets/images/ProductImage/ysl/shoes/YSL_14_1.avif',1),(70,16,'/assets/images/ProductImage/ysl/shoes/YSL_14_2.avif',0),(71,16,'/assets/images/ProductImage/ysl/shoes/YSL_14_3.avif',0),(72,17,'/assets/images/ProductImage/ysl/shoes/YSL_15_1.avif',1),(73,17,'/assets/images/ProductImage/ysl/shoes/YSL_15_2.avif',0),(74,17,'/assets/images/ProductImage/ysl/shoes/YSL_15_3.avif',0),(75,17,'/assets/images/ProductImage/ysl/shoes/YSL_15_4.avif',0),(76,18,'/assets/images/ProductImage/ysl/shoes/YSL_16_1.avif',1),(77,18,'/assets/images/ProductImage/ysl/shoes/YSL_16_2.avif',0),(78,18,'/assets/images/ProductImage/ysl/shoes/YSL_16_3.avif',0),(79,19,'/assets/images/ProductImage/ysl/shoes/YSL_17_1.avif',1),(80,19,'/assets/images/ProductImage/ysl/shoes/YSL_17_2.avif',0),(81,19,'/assets/images/ProductImage/ysl/shoes/YSL_17_3.avif',0),(82,19,'/assets/images/ProductImage/ysl/shoes/YSL_17_4.avif',0),(83,20,'/assets/images/ProductImage/ysl/shoes/YSL_18_1.avif',1),(84,20,'/assets/images/ProductImage/ysl/shoes/YSL_18_2.avif',0),(85,20,'/assets/images/ProductImage/ysl/shoes/YSL_18_3.avif',0),(86,21,'/assets/images/ProductImage/ysl/shoes/YSL_19_1.avif',1),(87,21,'/assets/images/ProductImage/ysl/shoes/YSL_19_2.avif',0),(88,21,'/assets/images/ProductImage/ysl/shoes/YSL_19_3.avif',0),(89,21,'/assets/images/ProductImage/ysl/shoes/YSL_19_4.avif',0),(90,21,'/assets/images/ProductImage/ysl/shoes/YSL_19_5.avif',0),(91,23,'/assets/images/ProductImage/hermes/01-Noeud-Papillion/01-Noeud_papillon_1.webp',1),(92,23,'/assets/images/ProductImage/hermes/01-Noeud-Papillion/01-Noeud_papillon_2.webp',0),(93,24,'/assets/images/ProductImage/hermes/02-cravate/02-cravate_1.webp',1),(94,24,'/assets/images/ProductImage/hermes/02-cravate/02-cravate_2.webp',0),(95,25,'/assets/images/ProductImage/hermes/03-cravate/02-cravate_1.webp',1),(96,25,'/assets/images/ProductImage/hermes/03-cravate/03-cravate_2.webp',0),(97,26,'/assets/images/ProductImage/hermes/04-Noeud-Papillion/04-Noeud_papillon_1.webp',1),(98,26,'/assets/images/ProductImage/hermes/04-Noeud-Papillion/04-Noeud_papillon_2.webp',0),(99,27,'/assets/images/ProductImage/hermes/05-cravate/05-cravate_1.webp',1),(100,28,'/assets/images/ProductImage/hermes/06-Noeud-Papillion/06-noeudpapillon_1.jpg',1),(101,28,'/assets/images/ProductImage/hermes/06-Noeud-Papillion/06-noeudpapillon_2.webp',0),(102,29,'/assets/images/ProductImage/hermes/07-Noeud-Papillion/07-noeudpapillon_1.webp',1),(103,29,'/assets/images/ProductImage/hermes/07-Noeud-Papillion/07-noeudpapillon_2.webp',0),(104,30,'/assets/images/ProductImage/hermes/08-cravate/08-cravate_1.webp',1),(105,30,'/assets/images/ProductImage/hermes/08-cravate/08-cravate_2.webp',0),(106,31,'/assets/images/ProductImage/hermes/09-cravate/09-cravate_1.webp',1),(107,31,'/assets/images/ProductImage/hermes/09-cravate/09-cravate_2.webp',0),(108,32,'/assets/images/ProductImage/hermes/10-Noeud-Papillion/10-noeudpapillon_1.webp',1),(109,32,'/assets/images/ProductImage/hermes/10-Noeud-Papillion/10-noeudpapillon_2.webp',0),(110,33,'/assets/images/ProductImage/hermes/01-Barenia/01-Barenia-f_1.webp',1),(111,33,'/assets/images/ProductImage/hermes/01-Barenia/01-Barenia-f_3.webp',0),(112,33,'/assets/images/ProductImage/hermes/01-Barenia/01-Barenia-f_4.webp',0),(113,34,'/assets/images/ProductImage/hermes/02-faubourg-eau-delicate/02-24-faubourg-eau-delicate_1.webp',1),(114,35,'/assets/images/ProductImage/hermes/03-elixir-des-merveilles-eau-de-parfum/03-elixir-des-merveilles-eau-de-parfum_1.webp',1),(115,35,'/assets/images/ProductImage/hermes/03-elixir-des-merveilles-eau-de-parfum/03-elixir-des-merveilles-eau-de-parfum_2.webp',0),(116,35,'/assets/images/ProductImage/hermes/03-elixir-des-merveilles-eau-de-parfum/03-elixir-des-merveilles-eau-de-parfum_3.webp',0),(117,36,'/assets/images/ProductImage/hermes/04-eau-des-merveilles-bleue-eau-de-toilette/04-eau-des-merveilles-bleue-eau-de-toilette_1.webp',1),(118,36,'/assets/images/ProductImage/hermes/04-eau-des-merveilles-bleue-eau-de-toilette/04-eau-des-merveilles-bleue-eau-de-toilette_2.webp',0),(119,36,'/assets/images/ProductImage/hermes/04-eau-des-merveilles-bleue-eau-de-toilette/04-eau-des-merveilles-bleue-eau-de-toilette_3.jpg',0),(120,37,'/assets/images/ProductImage/hermes/05-twilly-d-hermes-eau-ginger-eau-de-parfum/05-twilly-d-hermes-eau-ginger-eau-de-parfum_1.webp',1),(121,37,'/assets/images/ProductImage/hermes/05-twilly-d-hermes-eau-ginger-eau-de-parfum/05-twilly-d-hermes-eau-ginger-eau-de-parfum_2.webp',0),(122,37,'/assets/images/ProductImage/hermes/05-twilly-d-hermes-eau-ginger-eau-de-parfum/05-twilly-d-hermes-eau-ginger-eau-de-parfum_3.webp',0),(123,38,'/assets/images/ProductImage/hermes/06-terre-d-hermes-eau-de-toilette/06-terre-d-hermes-eau-de-toilette_1.webp',1),(124,38,'/assets/images/ProductImage/hermes/06-terre-d-hermes-eau-de-toilette/06-terre-d-hermes-eau-de-toilette_2.webp',0),(125,38,'/assets/images/ProductImage/hermes/06-terre-d-hermes-eau-de-toilette/06-terre-d-hermes-eau-de-toilette_3.webp',0),(126,39,'/assets/images/ProductImage/hermes/07-terre-d-hermes-parfum_1/07-terre-d-hermes-parfum_1.webp',1),(127,39,'/assets/images/ProductImage/hermes/07-terre-d-hermes-parfum_1/07-terre-d-hermes-parfum_2.webp',0),(128,39,'/assets/images/ProductImage/hermes/07-terre-d-hermes-parfum_1/07-terre-d-hermes-parfum_3.webp',0),(129,40,'/assets/images/ProductImage/hermes/08-un-jardin-sur-le-nil-eau-de-toilette/08-un-jardin-sur-le-nil-eau-de-toilette_1.webp',1),(130,40,'/assets/images/ProductImage/hermes/08-un-jardin-sur-le-nil-eau-de-toilette/08-un-jardin-sur-le-nil-eau-de-toilette_2.webp',0),(131,40,'/assets/images/ProductImage/hermes/08-un-jardin-sur-le-nil-eau-de-toilette/08-un-jardin-sur-le-nil-eau-de-toilette_3.webp',0),(132,41,'/assets/images/ProductImage/hermes/09-eau-d-orange-verte-eau-de-cologne/09-eau-d-orange-verte-eau-de-cologne_1.webp',1),(133,41,'/assets/images/ProductImage/hermes/09-eau-d-orange-verte-eau-de-cologne/09-eau-d-orange-verte-eau-de-cologne_2.webp',0),(134,41,'/assets/images/ProductImage/hermes/09-eau-d-orange-verte-eau-de-cologne/09-eau-d-orange-verte-eau-de-cologne_3.webp',0),(135,42,'/assets/images/ProductImage/hermes/10-voyage-d-hermes-eau-de-toilette/10-voyage-d-hermes-eau-de-toilette_1.webp',1),(136,42,'/assets/images/ProductImage/hermes/10-voyage-d-hermes-eau-de-toilette/10-voyage-d-hermes-eau-de-toilette_2.webp',0),(137,42,'/assets/images/ProductImage/hermes/10-voyage-d-hermes-eau-de-toilette/10-voyage-d-hermes-eau-de-toilette_3.webp',0),(138,43,'/assets/images/ProductImage/hermes/01-sneakers-leader/01-sneakers-leader_1.webp',1),(139,43,'/assets/images/ProductImage/hermes/01-sneakers-leader/01-sneakers-leader_2.webp',0),(140,43,'/assets/images/ProductImage/hermes/01-sneakers-leader/01-sneakers-leader_3.webp',0),(141,44,'/assets/images/ProductImage/hermes/02-sneakers-master/02-sneakers-master_1.webp',1),(142,44,'/assets/images/ProductImage/hermes/02-sneakers-master/02-sneakers-master_2.webp',0),(143,44,'/assets/images/ProductImage/hermes/02-sneakers-master/02-sneakers-master_3.webp',0),(144,44,'/assets/images/ProductImage/hermes/02-sneakers-master/02-sneakers-master_4.webp',0),(145,45,'/assets/images/ProductImage/hermes/03-sneakers-trail/03-sneakers-trail_1.webp',1),(146,45,'/assets/images/ProductImage/hermes/03-sneakers-trail/03-sneakers-trail_2.webp',0),(147,45,'/assets/images/ProductImage/hermes/03-sneakers-trail/03-sneakers-trail_3.webp',0),(148,45,'/assets/images/ProductImage/hermes/03-sneakers-trail/03-sneakers-trail_4.webp',0),(149,46,'/assets/images/ProductImage/hermes/04-sneakers-kid/04-sneakers-kid_1.webp',1),(150,46,'/assets/images/ProductImage/hermes/04-sneakers-kid/04-sneakers-kid_2.webp',0),(151,46,'/assets/images/ProductImage/hermes/04-sneakers-kid/04-sneakers-kid_3.webp',0),(152,46,'/assets/images/ProductImage/hermes/04-sneakers-kid/04-sneakers-kid_4.webp',0),(153,47,'/assets/images/ProductImage/hermes/05-sneakers-jet/05-sneakers-jet_1.webp',1),(154,47,'/assets/images/ProductImage/hermes/05-sneakers-jet/05-sneakers-jet_2.webp',0),(155,47,'/assets/images/ProductImage/hermes/05-sneakers-jet/05-sneakers-jet_3.webp',0),(156,47,'/assets/images/ProductImage/hermes/05-sneakers-jet/05-sneakers-jet_4.webp',0),(157,48,'/assets/images/ProductImage/hermes/06-sneakers-day/06-sneakers-day_1.webp',1),(158,48,'/assets/images/ProductImage/hermes/06-sneakers-day/06-sneakers-day_2.webp',0),(159,48,'/assets/images/ProductImage/hermes/06-sneakers-day/06-sneakers-day_3.webp',0),(160,48,'/assets/images/ProductImage/hermes/06-sneakers-day/06-sneakers-day_4.webp',0),(161,49,'/assets/images/ProductImage/hermes/07-sneakers-kid/07-sneakers-kid_1.webp',1),(162,49,'/assets/images/ProductImage/hermes/07-sneakers-kid/07-sneakers-kid_2.webp',0),(163,49,'/assets/images/ProductImage/hermes/07-sneakers-kid/07-sneakers-kid_3.webp',0),(164,49,'/assets/images/ProductImage/hermes/07-sneakers-kid/07-sneakers-kid_4.webp',0),(165,50,'/assets/images/ProductImage/hermes/08-sneakers-bouncing/08-sneakers-bouncing_1.webp',1),(166,50,'/assets/images/ProductImage/hermes/08-sneakers-bouncing/08-sneakers-bouncing_2.webp',0),(167,50,'/assets/images/ProductImage/hermes/08-sneakers-bouncing/08-sneakers-bouncing_3.webp',0),(168,50,'/assets/images/ProductImage/hermes/08-sneakers-bouncing/08-sneakers-bouncing_4.webp',0),(169,51,'/assets/images/ProductImage/hermes/09-sneakers-match/09-sneakers-match_1.webp',1),(170,51,'/assets/images/ProductImage/hermes/09-sneakers-match/09-sneakers-match_2.webp',0),(171,51,'/assets/images/ProductImage/hermes/09-sneakers-match/09-sneakers-match_3.webp',0),(172,51,'/assets/images/ProductImage/hermes/09-sneakers-match/09-sneakers-match_4.webp',0),(173,52,'/assets/images/ProductImage/hermes/10-sneakers-jet/10-sneakers-jet_1.webp',1),(174,52,'/assets/images/ProductImage/hermes/10-sneakers-jet/10-sneakers-jet_2.webp',0),(175,52,'/assets/images/ProductImage/hermes/10-sneakers-jet/10-sneakers-jet_3.webp',0),(176,52,'/assets/images/ProductImage/hermes/10-sneakers-jet/10-sneakers-jet_4.webp',0),(177,53,'/assets/images/ProductImage/hermes/01-blouson-a-capuche-casaque/01-blouson-a-capuche-casaque_1.webp',1),(178,53,'/assets/images/ProductImage/hermes/01-blouson-a-capuche-casaque/01-blouson-a-capuche-casaque_2.webp',0),(179,53,'/assets/images/ProductImage/hermes/01-blouson-a-capuche-casaque/01-blouson-a-capuche-casaque_3.webp',0),(180,53,'/assets/images/ProductImage/hermes/01-blouson-a-capuche-casaque/01-blouson-a-capuche-casaque_4.webp',0),(181,54,'/assets/images/ProductImage/hermes/02-blouson-a-capuche/02-blouson-a-capuche_1.webp',1),(182,54,'/assets/images/ProductImage/hermes/02-blouson-a-capuche/02-blouson-a-capuche_2.webp',0),(183,54,'/assets/images/ProductImage/hermes/02-blouson-a-capuche/02-blouson-a-capuche_3.webp',0),(184,54,'/assets/images/ProductImage/hermes/02-blouson-a-capuche/02-blouson-a-capuche_4.webp',0),(185,55,'/assets/images/ProductImage/hermes/03-blouson-droit/03-blouson-droit_1.webp',1),(186,55,'/assets/images/ProductImage/hermes/03-blouson-droit/03-blouson-droit_2.webp',0),(187,55,'/assets/images/ProductImage/hermes/03-blouson-droit/03-blouson-droit_3.webp',0),(188,55,'/assets/images/ProductImage/hermes/03-blouson-droit/03-blouson-droit_4.webp',0),(189,56,'/assets/images/ProductImage/hermes/04-blouson-a-capuche-details-cuir/04-blouson-a-capuche-details-cuir_1.webp',1),(190,56,'/assets/images/ProductImage/hermes/04-blouson-a-capuche-details-cuir/04-blouson-a-capuche-details-cuir_2.webp',0),(191,56,'/assets/images/ProductImage/hermes/04-blouson-a-capuche-details-cuir/04-blouson-a-capuche-details-cuir_3.webp',0),(192,56,'/assets/images/ProductImage/hermes/04-blouson-a-capuche-details-cuir/04-blouson-a-capuche-details-cuir_4.webp',0),(193,57,'/assets/images/ProductImage/hermes/05-blouson-a-capuche/05-blouson-a-capuche_1.webp',1),(194,57,'/assets/images/ProductImage/hermes/05-blouson-a-capuche/05-blouson-a-capuche_2.webp',0),(195,57,'/assets/images/ProductImage/hermes/05-blouson-a-capuche/05-blouson-a-capuche_3.webp',0),(196,57,'/assets/images/ProductImage/hermes/05-blouson-a-capuche/05-blouson-a-capuche_4.webp',0),(197,58,'/assets/images/ProductImage/hermes/06-surchemise/06-surchemise-1.webp',1),(198,58,'/assets/images/ProductImage/hermes/06-surchemise/06-surchemise-2.webp',0),(199,58,'/assets/images/ProductImage/hermes/06-surchemise/06-surchemise-3.webp',0),(200,58,'/assets/images/ProductImage/hermes/06-surchemise/06-surchemise-4.webp',0),(201,59,'/assets/images/ProductImage/hermes/07-blouson-droit-detail-cuir/07-blouson-droit-detail-cuir_1.webp',1),(202,59,'/assets/images/ProductImage/hermes/07-blouson-droit-detail-cuir/07-blouson-droit-detail-cuir_2.webp',0),(203,59,'/assets/images/ProductImage/hermes/07-blouson-droit-detail-cuir/07-blouson-droit-detail-cuir_3.webp',0),(204,59,'/assets/images/ProductImage/hermes/07-blouson-droit-detail-cuir/07-blouson-droit-detail-cuir_4.webp',0),(205,60,'/assets/images/ProductImage/hermes/08-blouson-bord-cote-reversible-cavalcadour-metallise/08-blouson-bord-cote-reversible-cavalcadour-metallise_1.webp',1),(206,60,'/assets/images/ProductImage/hermes/08-blouson-bord-cote-reversible-cavalcadour-metallise/08-blouson-bord-cote-reversible-cavalcadour-metallise_2.webp',0),(207,60,'/assets/images/ProductImage/hermes/08-blouson-bord-cote-reversible-cavalcadour-metallise/08-blouson-bord-cote-reversible-cavalcadour-metallise_3.webp',0),(208,60,'/assets/images/ProductImage/hermes/08-blouson-bord-cote-reversible-cavalcadour-metallise/08-blouson-bord-cote-reversible-cavalcadour-metallise_4.webp',0),(209,61,'/assets/images/ProductImage/hermes/09-pantalon-de-jogging-capsule-sport/09-pantalon-de-jogging-capsule-sport_1.webp',1),(210,61,'/assets/images/ProductImage/hermes/09-pantalon-de-jogging-capsule-sport/09-pantalon-de-jogging-capsule-sport_2.webp',0),(211,61,'/assets/images/ProductImage/hermes/09-pantalon-de-jogging-capsule-sport/09-pantalon-de-jogging-capsule-sport_3.webp',0),(212,61,'/assets/images/ProductImage/hermes/09-pantalon-de-jogging-capsule-sport/09-pantalon-de-jogging-capsule-sport_4.webp',0),(213,62,'/assets/images/ProductImage/hermes/10-surchemise-a-capuche-amovible-rayures-de-laine-et-papier/10-surchemise-a-capuche-amovible-rayures-de-laine-et-papier_1.webp',1),(214,62,'/assets/images/ProductImage/hermes/10-surchemise-a-capuche-amovible-rayures-de-laine-et-papier/10-surchemise-a-capuche-amovible-rayures-de-laine-et-papier_2.webp',0),(215,62,'/assets/images/ProductImage/hermes/10-surchemise-a-capuche-amovible-rayures-de-laine-et-papier/10-surchemise-a-capuche-amovible-rayures-de-laine-et-papier_3.webp',0),(216,62,'/assets/images/ProductImage/hermes/10-surchemise-a-capuche-amovible-rayures-de-laine-et-papier/10-surchemise-a-capuche-amovible-rayures-de-laine-et-papier_4.webp',0),(217,63,'/assets/images/ProductImage/rolex/01-Boutons_manchette_Cannele/01-Boutons_manchette_Cannele_1.png',1),(218,63,'/assets/images/ProductImage/rolex/01-Boutons_manchette_Cannele/01-Boutons_manchette_Cannele_2.jpg',0),(219,64,'/assets/images/ProductImage/rolex/02-Boutons_manchette_Aiguille/02-Boutons_manchette_Aiguille_1.png',1),(220,64,'/assets/images/ProductImage/rolex/02-Boutons_manchette_Aiguille/02-Boutons_manchette_Aiguille_2.jpg',0),(221,65,'/assets/images/ProductImage/rolex/03-Boutons_manchette_Cannele/03-Boutons_manchette_Cannele_1.png',1),(222,65,'/assets/images/ProductImage/rolex/03-Boutons_manchette_Cannele/03-Boutons_manchette_Cannele_2.jpg',0),(223,66,'/assets/images/ProductImage/rolex/04-Pendulette_table_Submariner_Date/04-Pendulette_table_Submariner_Date_1.png',1),(224,66,'/assets/images/ProductImage/rolex/04-Pendulette_table_Submariner_Date/04-Pendulette_table_Submariner_Date_2.jpg',0),(225,67,'/assets/images/ProductImage/rolex/05-Boutons_manchette_couronne/05-Boutons_manchette_couronne_1.jpg',1),(226,67,'/assets/images/ProductImage/rolex/05-Boutons_manchette_couronne/05-Boutons_manchette_couronne_2.png',0),(227,68,'/assets/images/ProductImage/rolex/06-Boutons_manchette_Aiguille/06-Boutons_manchette_Aiguille_1.png',1),(228,68,'/assets/images/ProductImage/rolex/06-Boutons_manchette_Aiguille/06-Boutons_manchette_Aiguille_2.jpg',0),(229,69,'/assets/images/ProductImage/rolex/07-Boutons_manchette_Cannele/07-Boutons_manchette_Cannele_1.jpg',1),(230,69,'/assets/images/ProductImage/rolex/07-Boutons_manchette_Cannele/07-Boutons_manchette_Cannele_2.png',0),(231,70,'/assets/images/ProductImage/rolex/08-Boutons_manchette_couronne/08-Boutons_manchette_couronne_1.jpg',1),(232,70,'/assets/images/ProductImage/rolex/08-Boutons_manchette_couronne/08-Boutons_manchette_couronne_2.png',0),(233,71,'/assets/images/ProductImage/rolex/09-Boutons_manchette_Aiguille/09-Boutons_manchette_Aiguille_1.png',1),(234,71,'/assets/images/ProductImage/rolex/09-Boutons_manchette_Aiguille/09-Boutons_manchette_Aiguille_2.jpg',0),(235,72,'/assets/images/ProductImage/rolex/10-Boutons_manchette_couronne/10-Boutons_manchette_couronne_1.png',1),(236,72,'/assets/images/ProductImage/rolex/10-Boutons_manchette_couronne/10-Boutons_manchette_couronne_2.jpg',0),(237,73,'/assets/images/ProductImage/rolex/01-Cosmograph Daytona/01-Cosmograph Daytona_1.png',1),(238,73,'/assets/images/ProductImage/rolex/01-Cosmograph Daytona/01-Cosmograph Daytona_2.png',0),(239,73,'/assets/images/ProductImage/rolex/01-Cosmograph Daytona/01-Cosmograph Daytona_3.png',0),(240,74,'/assets/images/ProductImage/rolex/02-Cosmograph Daytona/02-Cosmograph Daytona_1.png',1),(241,74,'/assets/images/ProductImage/rolex/02-Cosmograph Daytona/02-Cosmograph Daytona_2.png',0),(242,74,'/assets/images/ProductImage/rolex/02-Cosmograph Daytona/02-Cosmograph Daytona_3.png',0),(243,75,'/assets/images/ProductImage/rolex/03-Cosmograph Daytona/03-Cosmograph Daytona_1.png',1),(244,75,'/assets/images/ProductImage/rolex/03-Cosmograph Daytona/03-Cosmograph Daytona_2.png',0),(245,75,'/assets/images/ProductImage/rolex/03-Cosmograph Daytona/03-Cosmograph Daytona_3.png',0),(246,76,'/assets/images/ProductImage/rolex/04-Cosmograph Daytona/04-Cosmograph Daytona_1.png',1),(247,76,'/assets/images/ProductImage/rolex/04-Cosmograph Daytona/04-Cosmograph Daytona_2.png',0),(248,76,'/assets/images/ProductImage/rolex/04-Cosmograph Daytona/04-Cosmograph Daytona_3.png',0),(249,77,'/assets/images/ProductImage/rolex/05-Cosmograph Daytona/05-Cosmograph Daytona_1.png',1),(250,77,'/assets/images/ProductImage/rolex/05-Cosmograph Daytona/05-Cosmograph Daytona_2.jpg',0),(251,77,'/assets/images/ProductImage/rolex/05-Cosmograph Daytona/05-Cosmograph Daytona_3.png',0),(252,78,'/assets/images/ProductImage/rolex/06-Cosmograph Daytona/06-Cosmograph Daytona_1.png',1),(253,78,'/assets/images/ProductImage/rolex/06-Cosmograph Daytona/06-Cosmograph Daytona_2.png',0),(254,79,'/assets/images/ProductImage/rolex/07-Cosmograph Daytona/07-Cosmograph Daytona_1.png',1),(255,79,'/assets/images/ProductImage/rolex/07-Cosmograph Daytona/07-Cosmograph Daytona_2.png',0),(256,80,'/assets/images/ProductImage/rolex/08-Cosmograph Daytona/08-Cosmograph Daytona_1.png',1),(257,80,'/assets/images/ProductImage/rolex/08-Cosmograph Daytona/08-Cosmograph Daytona_2.png',0),(258,80,'/assets/images/ProductImage/rolex/08-Cosmograph Daytona/08-Cosmograph Daytona_3.png',0),(259,81,'/assets/images/ProductImage/rolex/09-Cosmograph Daytona/09-Cosmograph Daytona_1.png',1),(260,81,'/assets/images/ProductImage/rolex/09-Cosmograph Daytona/09-Cosmograph Daytona_2.png',0),(261,81,'/assets/images/ProductImage/rolex/09-Cosmograph Daytona/09-Cosmograph Daytona_3.jpg',0),(262,82,'/assets/images/ProductImage/rolex/10-Cosmograph Daytona/10-Cosmograph Daytona_1.png',1),(263,82,'/assets/images/ProductImage/rolex/10-Cosmograph Daytona/10-Cosmograph Daytona_2.png',0),(264,82,'/assets/images/ProductImage/rolex/10-Cosmograph Daytona/10-Cosmograph Daytona_3.jpg',0),(265,83,'/assets/images/ProductImage/rolex/01-Day-date-40/01-Day-Date 40_1.png',1),(266,83,'/assets/images/ProductImage/rolex/01-Day-date-40/01-Day-Date 40_2.png',0),(267,83,'/assets/images/ProductImage/rolex/01-Day-date-40/01-Day-Date 40_3.png',0),(268,84,'/assets/images/ProductImage/rolex/02-Day-date-36/02-Day-Date 36_1.png',1),(269,84,'/assets/images/ProductImage/rolex/02-Day-date-36/02-Day-Date 36_2.png',0),(270,84,'/assets/images/ProductImage/rolex/02-Day-date-36/02-Day-Date 36_3.png',0),(271,85,'/assets/images/ProductImage/rolex/03-Day-date-40/03-Day-Date 40_1.png',1),(272,85,'/assets/images/ProductImage/rolex/03-Day-date-40/03-Day-Date 40_2.png',0),(273,85,'/assets/images/ProductImage/rolex/03-Day-date-40/03-Day-Date 40_3.png',0),(274,86,'/assets/images/ProductImage/rolex/04-Day-date-40/04-Day-Date 40_1.png',1),(275,86,'/assets/images/ProductImage/rolex/04-Day-date-40/04-Day-Date 40_2.png',0),(276,86,'/assets/images/ProductImage/rolex/04-Day-date-40/04-Day-Date 40_3.png',0),(277,87,'/assets/images/ProductImage/rolex/05-Day-date-40/05-Day-Date 40_1.png',1),(278,87,'/assets/images/ProductImage/rolex/05-Day-date-40/05-Day-Date 40_2.png',0),(279,87,'/assets/images/ProductImage/rolex/05-Day-date-40/05-Day-Date 40_3.png',0),(280,88,'/assets/images/ProductImage/rolex/06-Day-date-36/06-Day-Date 36_1.png',1),(281,88,'/assets/images/ProductImage/rolex/06-Day-date-36/06-Day-Date 36_2.png',0),(282,88,'/assets/images/ProductImage/rolex/06-Day-date-36/06-Day-Date 36_3.png',0),(283,89,'/assets/images/ProductImage/rolex/07-Day-date-40/07-Day-Date 40_1.png',1),(284,89,'/assets/images/ProductImage/rolex/07-Day-date-40/07-Day-Date 40_2.png',0),(285,89,'/assets/images/ProductImage/rolex/07-Day-date-40/07-Day-Date 40_3.png',0),(286,90,'/assets/images/ProductImage/rolex/08-Day-date-36/08-Day-Date 36_1.png',1),(287,90,'/assets/images/ProductImage/rolex/08-Day-date-36/08-Day-Date 36_2.png',0),(288,90,'/assets/images/ProductImage/rolex/08-Day-date-36/08-Day-Date 36_3.png',0),(289,91,'/assets/images/ProductImage/rolex/09-Day-date-36/09-Day-Date 36_1.png',1),(290,91,'/assets/images/ProductImage/rolex/09-Day-date-36/09-Day-Date 36_2.png',0),(291,91,'/assets/images/ProductImage/rolex/09-Day-date-36/09-Day-Date 36_3.png',0),(292,92,'/assets/images/ProductImage/rolex/10-Day-date-40/10-Day-Date 40_1.png',1),(293,92,'/assets/images/ProductImage/rolex/10-Day-date-40/10-Day-Date 40_2.png',0),(294,92,'/assets/images/ProductImage/rolex/10-Day-date-40/10-Day-Date 40_3.png',0),(295,93,'/assets/images/ProductImage/rolex/01-land-dweller-40/01-Land-Dweller 40_1.png',1),(296,93,'/assets/images/ProductImage/rolex/01-land-dweller-40/01-Land-Dweller 40_2.png',0),(297,93,'/assets/images/ProductImage/rolex/01-land-dweller-40/01-Land-Dweller 40_3.jpg',0),(298,94,'/assets/images/ProductImage/rolex/02-land-dweller-36/02-Land-Dweller 36_1.png',1),(299,94,'/assets/images/ProductImage/rolex/02-land-dweller-36/02-Land-Dweller 36_2.png',0),(300,94,'/assets/images/ProductImage/rolex/02-land-dweller-36/02-Land-Dweller 36_3.png',0),(301,95,'/assets/images/ProductImage/rolex/03-land-dweller-40/03-Land-Dweller 40_1.png',1),(302,95,'/assets/images/ProductImage/rolex/03-land-dweller-40/03-Land-Dweller 40_2.png',0),(303,95,'/assets/images/ProductImage/rolex/03-land-dweller-40/03- Land-Dweller 40_3.jpg',0),(304,96,'/assets/images/ProductImage/rolex/04-land-dweller-36/04-Land-Dweller 36_1.png',1),(305,96,'/assets/images/ProductImage/rolex/04-land-dweller-36/04-Land-Dweller 36_2.png',0),(306,96,'/assets/images/ProductImage/rolex/04-land-dweller-36/04-Land-Dweller 36_3.png',0),(307,97,'/assets/images/ProductImage/rolex/05-land-dweller-40/05-Land-Dweller 40_1.png',1),(308,97,'/assets/images/ProductImage/rolex/05-land-dweller-40/05-Land-Dweller 40_2.png',0),(309,97,'/assets/images/ProductImage/rolex/05-land-dweller-40/05-Land-Dweller 40_3.png',0),(310,98,'/assets/images/ProductImage/rolex/06-land-dweller-40/06-Land-Dweller 40_1.png',1),(311,98,'/assets/images/ProductImage/rolex/06-land-dweller-40/06-Land-Dweller 40_2.png',0),(312,98,'/assets/images/ProductImage/rolex/06-land-dweller-40/06-Land-Dweller 40_3.png',0),(313,99,'/assets/images/ProductImage/rolex/07-land-dweller-36/Land-Dweller-36-1.png',1),(314,99,'/assets/images/ProductImage/rolex/07-land-dweller-36/Land-Dweller-36-2.png',0),(315,99,'/assets/images/ProductImage/rolex/07-land-dweller-36/Land-Dweller-36-3.png',0),(316,100,'/assets/images/ProductImage/rolex/08-land-dweller-36/08-Land-Dweller 36_1.png',1),(317,100,'/assets/images/ProductImage/rolex/08-land-dweller-36/08-Land-Dweller 36_2.jpg',0),(318,100,'/assets/images/ProductImage/rolex/08-land-dweller-36/08-Land-Dweller 36_3.png',0),(319,101,'/assets/images/ProductImage/rolex/09-land-dweller-40/09- Land-Dweller 40_1.png',1),(320,101,'/assets/images/ProductImage/rolex/09-land-dweller-40/09- Land-Dweller 40_2.png',0),(321,101,'/assets/images/ProductImage/rolex/09-land-dweller-40/09- Land-Dweller 40_3.jpg',0),(322,102,'/assets/images/ProductImage/rolex/10-land-dweller-40/10-Land-Dweller 40_1.png',1),(323,102,'/assets/images/ProductImage/rolex/10-land-dweller-40/10-Land-Dweller 40_2.png',0),(324,102,'/assets/images/ProductImage/rolex/10-land-dweller-40/10-Land-Dweller 40_3.png',0);
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

-- Dump completed on 2026-01-06 11:42:07
