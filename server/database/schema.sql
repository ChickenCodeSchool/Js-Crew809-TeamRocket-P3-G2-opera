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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Land-Dweller 40','L\'alliance parfaite entre élégance et fonctionnalité. Dotée d\'un boîtier Oystersteel de 40mm, cette montre combine un affichage GMT et un calendrier annuel dans un format raffiné. Sa lunette Cerachrom bidirectionnelle permet un réglage intuitif des fuseaux horaires, idéale pour les voyageurs exigeants. Mouvement manufacture calibre 7002, étanchéité 100m.',1,15950.00,'Argent',NULL,NULL,NULL,NULL,NULL),(2,'Land_Dweller 36','Un concentré de raffinement au poignet. Ce modèle Oyster de 36mm en platine sublimé de diamants incarne l\'excellence horlogère. Alliant prestige des matériaux nobles et complications pratiques, il offre un affichage GMT et un calendrier annuel dans un écrin d\'exception.',1,99300.00,'Argent',NULL,NULL,NULL,NULL,NULL),(3,'Le 5 A 7 Bea En Suede','Cabas souple décliné en suède. Léger et entièrement doublé de suède ton sur ton, il est muni d\'une patte de cuir ornée du cassandre et d\'une poche intérieure zippée. Spacieux et fonctionnel grâce à son format east/west, des lacets permettent de resserrer les côtés offrant ainsi différentes silhouettes. Bijouterie en laiton bronze. Dimensions : 50 x 28 x 18 cm. Hauteur anse : 28 cm. Cuir de veau. Style id 763435008IW3645. Pays de fabrication : Italie',5,3200.00,'Marron',NULL,NULL,NULL,NULL,NULL),(4,'Calypso Large En Cuir D\'agneau Grainé','Le nouveau sac enveloppe signature de Saint Laurent. Souple, confectionné dans un cuir finement grainé à matelassage effet coussin. Cette version maxi est rehaussée d\'une chaîne gourmette coulissante. Souple et spacieux, son volume est idéal pour un usage quotidien. Doublure en gros-grain. Bijouterie en laiton light bronze. Fermoir aimanté. Poche interne zippée. Dimensions : 38 x 21 x 10 cm. Longueur de la chaîne : de 27 à 49 cm. Cuir d\'agneau, laiton. Style id 777399AACYT3212. Pays de fabrication : Italie',5,2950.00,'Marron',NULL,NULL,NULL,NULL,NULL),(5,'Niki Medium En Cuir Vintage','Sac souple en cuir de veau vintage, surpiqué en chevrons et orné du cassandre. Spacieux, il dispose de deux compartiments et d\'une grande poche plaquée à l\'arrière. Sa bandoulière chaîne coulissante permet un porté épaule ou croisé. Cuir tanné sans chrome ni métal. Doublure en coton certifié. Bijouterie en laiton light bronze. Une poche extérieure à l\'arrière. Fermoir pression aimanté. Deux poches intérieures. Dimensions: 28 x 20 x 8,5 cm. Longueur de la chaîne: de 30 à 53 cm. Veau, laiton. Style id 6331840EN071000. Pays de fabrication : Italie',5,2700.00,'Noir',NULL,NULL,NULL,NULL,NULL),(6,'Large Gaby Vanity Bag En Cuir D\'agneau','Large sac vanity orné de surpiqûres matelassées et du cassandre. Entièrement doublé de cuir, il offre de multiples portés. Sa bandoulière amovible est ajustable. Doublure en cuir. Bijouterie en laiton light bronze. Fermeture zippée. Une fente à carte. Dimensions: 22 x 15,5 x 8 cm. Longueur de la bandoulière: 53 cm. Hauteur de la poignée : 5,5 cm. Agneau laiton. Style id 8515721EL076195. Pays de fabrication : Italie',5,2200.00,'Rouge',NULL,NULL,NULL,NULL,NULL),(7,'Voltaire Top Handle En Box Saint Laurent','Sac top handle en cuir box Saint Laurent orné du cassandre. Moderne et structuré, sa anse ajustable permet un porté à l\'épaule ou à la main. Doublure en suède. Bijouterie en laiton light bronze. Fermoir pression aimanté. Une poche plaquée. Dimensions : 24 x 19 x 5 cm. Hauteur anse : 16/28 cm. Cuir de veau laiton. Style id 8443410SX0W1997. Pays de fabrication : Italie',5,2100.00,'Gris',NULL,NULL,NULL,NULL,NULL),(8,'Icarino En Cuir Nappa Matelassé','La version baby de l\'iconique icare en cuir d\'agneau nappa surpiqué et orné du cassandre. Moderne et léger, il se porte à la main. Doublure en cuir. Bijouterie en laiton light bronze. Fermeture zippée. Dimensions : 17/26 x 13 x 3 cm. Hauteur de la anse : 13,5 cm. Cuir d\'agneau, laiton. Style id 851689AAANG3775. Pays de fabrication : Italie',5,2490.00,'Vert',NULL,NULL,NULL,NULL,NULL),(9,'Icarino En Cuir Nappa Matelassé','La version baby de l\'iconique icare en cuir d\'agneau nappa surpiqué et orné du cassandre. Moderne et léger, il se porte à la main. Doublure en cuir. Bijouterie en laiton light bronze. Fermeture zippée. Dimensions : 17/26 x 13 x 3 cm. Hauteur de la anse : 13,5 cm. Cuir d\'agneau, laiton. Style id 851689AAANG3775. Pays de fabrication : Italie',5,2490.00,'Rose',NULL,NULL,NULL,NULL,NULL),(10,'Cassandre Large Pochette À Chaine En Cuir D\'agneau','Large pochette à chaine en cuir, ornée du cassandre. Moderne et versatile, sa chaîne maillon permet un porté épaule ou en pochette à la main. Doublure en cuir. Bijouterie en laiton light bronze. Fermeture par bouton-pression. Poche interne zippée. Dimensions : 29.5 x 18 x 5 cm. Longueur de la chaîne : 25 cm. Agneau, laiton. Style id 853610AACYT1000. Pays de fabrication : Italie',5,1500.00,'Noir',NULL,NULL,NULL,NULL,NULL),(11,'Mini Evening Bag En Strass','Minaudière ornée du cassandre et brodée de strass. Sophistiqué et féminin, il se porte à la main pour une silhouette du soir. Bijouterie en laiton light bronze. Fermeture aimantée. Dimensions : 18,5 x 7,5 x 2,5 cm. Strass, laiton. Style id 819638JBO7W8472. Pays de fabrication : Italie',5,2900.00,'Or',NULL,NULL,NULL,NULL,NULL),(12,'Jamie Mini Pochon Porté Épaule En Suède','La version mini du pochon porté épaule jamie en suède, orné de surpiqûres cassandre et carré rive gauche. Léger et compact, ce sac est muni d\'une bandoulière cuir et chaîne permettant un porté à l\'épaule ou en travers de la poitrine. Des cordons de serrage permettent de resserrer ou d\'élargir les côtés pour créer différentes silhouettes. Doublure en cuir. Détails en métal bronze. Fermeture par bouton-pression et cordon de serrage. Dimensions : 14,5 x 15,5 x 8 cm. Hauteur de la bandoulière : 50 cm. Cuir de veau métal. Style id 8591741U8P72916. Pays de fabrication : Italie',5,1950.00,'Marron',NULL,NULL,NULL,NULL,NULL),(13,'Jeanne Slingbacks En Cuir Lisse','Escarpins à bout pointu carré en métal ornés du cassandre martelé, munis d\'une empeigne carrée et d\'un talon aiguille. Semelle en cuir. Bride cheville élastique. Hauteur totale du talon : 11 cm. Cassandre en métal doré. Cuir d\'agneau, laiton. Style id 800164AADX21000. Pays de fabrication : Italie',5,1350.00,'Noir',NULL,NULL,NULL,NULL,NULL),(14,'Tribute Sandales À Plateforme En Cuir Verni','Sandales à talon aiguille mi-haut recouvert munies de brides entrecroisées, d\'une plateforme biseautée et d\'une bride cheville ajustable gravée Saint Laurent Paris. Deux hauteurs de talons disponibles. Hauteur totale du talon : 10,5 cm. Cambrure : 7,5 cm. Hauteur de la plateforme : 3 cm. Semelle en cuir. Bride cheville ajustable. Cuir de veau. Style id 535227B8I006031. Pays de fabrication : Italie',5,950.00,'Rose',NULL,NULL,NULL,NULL,NULL),(15,'Tribute Mules En Cuir Lisse','Mules saint laurent en cuir tanné sans métal, agrémentées de brides entrecroisées. Nous vous conseillons de choisir une demi-pointure au-dessus de votre pointure habituelle. Cuir tanné sans chrome ni métal. Hauteur totale du talon : 0,5 cm. Semelle en cuir. Cuir de veau. Style id 571952BDA002206. Pays de fabrication : Italie',5,675.00,'Marron',NULL,NULL,NULL,NULL,NULL),(16,'Mon Chéri Sandales En Suède À Strass','Sandales à strass et bout en amande à brides croisées, munies d\'un talon aiguille en métal recouvert de satin, de brides cheville à lacets et d\'un charm cerise. Semelle en cuir. Plaque ronde en métal gravé Saint Laurent sur la semelle intérieure. Bride cheville réglable. Hauteur du talon : 11 cm. Cuir de chèvre, cristal, résine, laiton. Style id 863530AAF555787. Pays de fabrication : Italie',5,3900.00,'Rose',NULL,NULL,NULL,NULL,NULL),(17,'Opyum Sandales En Cuir Verni','Sandales à talon cassandre, munies d\'une bride ajustable à la cheville. Deux hauteurs de talons disponibles. Hauteur totale du talon : 11 cm. Semelle en cuir. Talon cassandre en métal doré vieilli. Ce produit peut également être livré sous le code 5576620NPKK1000. Cuir de veau. Style id 5576621TV1A1000. Pays de fabrication : Italie',5,1300.00,'Noir',NULL,NULL,NULL,NULL,NULL),(18,'Opyum Mules En Crêpe Satin','Mules dotées d\'un talon cassandre, d\'un bout carré et de brides croisées. Soie certifiée et viscose certifiée. Semelle en cuir. Plaque ronde en métal gravé Saint Laurent sur la semelle intérieure. Hauteur du talon : 8,5 cm. Cassandre en métal bronze. Viscose, soie. Style id 8189319QAB15518. Pays de fabrication : Italie',5,1150.00,'Rose',NULL,NULL,NULL,NULL,NULL),(19,'Opyum Escarpins En Cuir Verni','Escarpins à talon structuré cassandre dotés d\'une empeigne décolletée. Deux hauteurs de talons disponibles. Hauteur totale du talon : 11 cm. Semelle en cuir. Talon cassandre en métal doré vieilli. Ce produit peut également être livré sous le code 4720111TV1A1000. Cuir de veau. Style id 4720110NPKK1000. Pays de fabrication : Italie',5,1250.00,'Noir',NULL,NULL,NULL,NULL,NULL),(20,'Loulou Slingbacks En Cuir Verni','Escarpins à bride arrière munis d\'un talon aiguille incurvé en métal massif doré et d\'un bout pointu en métal orné d\'un cabochon en résine. Semelle en cuir. Plaque ronde en métal gravé Saint Laurent sur la semelle intérieure. Bride arrière élastique. Hauteur du talon : 11 cm. Cuir de veau, cuir d\'agneau, acier, résine époxy. Style id 8272501TVA66231. Pays de fabrication : Italie',5,5700.00,'Rouge',NULL,NULL,NULL,NULL,NULL),(21,'Diane Bottes En Cuir Grainé','Bottes à talon aiguille et bout en amande, munies d\'une bride cheville avec une boucle guillochée ornée du cassandre en métal. Semelle en cuir. Hauteur totale du talon : 10 cm. Cuir de veau. Style id 74379725V001000. Pays de fabrication : Italie',5,1850.00,'Noir',NULL,NULL,NULL,NULL,NULL),(22,'Le Loafer Mules En Suède','Mules souples ornées du cassandre, munies d\'un bout moc-toe cousu main. Semelle en cuir. Hauteur du talon : 0,5 cm. Cassandre en métal doré. Cuir de veau, laiton. Style id 85239227DTT2319. Pays de fabrication : Italie',5,990.00,'Marron',NULL,NULL,NULL,NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_image`
--

LOCK TABLES `product_image` WRITE;
/*!40000 ALTER TABLE `product_image` DISABLE KEYS */;
INSERT INTO `product_image` VALUES (1,1,'/assets/images/ProductImage/rolex/land-dweller-36/02-Land-Dweller 36_1.png',1),(2,1,'/assets/images/ProductImage/rolex/land-dweller-36/02-Land-Dweller 36_2.png',0),(3,1,'/assets/images/ProductImage/rolex/land-dweller-36/02-Land-Dweller 36_3.png',0),(4,2,'/assets/images/ProductImage/rolex/land-dweller-40/01-Land-Dweller 40_1.png',1),(5,2,'/assets/images/ProductImage/rolex/land-dweller-40/01-Land-Dweller 40_2.png',0),(6,2,'/assets/images/ProductImage/rolex/land-dweller-40/01-Land-Dweller 40_3.jpg',0),(7,3,'/assets/images/ProductImage/ysl/bags/YSL_1_1.avif',1),(8,3,'/assets/images/ProductImage/ysl/bags/YSL_1_2.avif',0),(9,3,'/assets/images/ProductImage/ysl/bags/YSL_1_3.avif',0),(10,3,'/assets/images/ProductImage/ysl/bags/YSL_1_4.avif',0),(11,3,'/assets/images/ProductImage/ysl/bags/YSL_1_5.avif',0),(12,3,'/assets/images/ProductImage/ysl/bags/YSL_1_6.avif',0),(13,4,'/assets/images/ProductImage/ysl/bags/YSL_2_1.avif',1),(14,4,'/assets/images/ProductImage/ysl/bags/YSL_2_2.avif',0),(15,4,'/assets/images/ProductImage/ysl/bags/YSL_2_3.avif',0),(16,4,'/assets/images/ProductImage/ysl/bags/YSL_2_4.avif',0),(17,4,'/assets/images/ProductImage/ysl/bags/YSL_2_5.avif',0),(18,4,'/assets/images/ProductImage/ysl/bags/YSL_2_6.avif',0),(19,4,'/assets/images/ProductImage/ysl/bags/YSL_2_7.avif',0),(20,5,'/assets/images/ProductImage/ysl/bags/YSL_3_1.avif',1),(21,5,'/assets/images/ProductImage/ysl/bags/YSL_3_2.avif',0),(22,5,'/assets/images/ProductImage/ysl/bags/YSL_3_3.avif',0),(23,5,'/assets/images/ProductImage/ysl/bags/YSL_3_4.avif',0),(24,5,'/assets/images/ProductImage/ysl/bags/YSL_3_5.avif',0),(25,5,'/assets/images/ProductImage/ysl/bags/YSL_3_6.avif',0),(26,6,'/assets/images/ProductImage/ysl/bags/YSL_4_1.avif',1),(27,6,'/assets/images/ProductImage/ysl/bags/YSL_4_2.avif',0),(28,6,'/assets/images/ProductImage/ysl/bags/YSL_4_3.avif',0),(29,6,'/assets/images/ProductImage/ysl/bags/YSL_4_4.avif',0),(30,6,'/assets/images/ProductImage/ysl/bags/YSL_4_5.avif',0),(31,7,'/assets/images/ProductImage/ysl/bags/YSL_5_1.avif',1),(32,7,'/assets/images/ProductImage/ysl/bags/YSL_5_2.avif',0),(33,7,'/assets/images/ProductImage/ysl/bags/YSL_5_3.avif',0),(34,7,'/assets/images/ProductImage/ysl/bags/YSL_5_4.avif',0),(35,7,'/assets/images/ProductImage/ysl/bags/YSL_5_5.avif',0),(36,7,'/assets/images/ProductImage/ysl/bags/YSL_5_6.avif',0),(37,8,'/assets/images/ProductImage/ysl/bags/YSL_6_1.avif',1),(38,8,'/assets/images/ProductImage/ysl/bags/YSL_6_2.avif',0),(39,8,'/assets/images/ProductImage/ysl/bags/YSL_6_3.avif',0),(40,8,'/assets/images/ProductImage/ysl/bags/YSL_6_4.avif',0),(41,8,'/assets/images/ProductImage/ysl/bags/YSL_6_5.avif',0),(42,8,'/assets/images/ProductImage/ysl/bags/YSL_6_6.avif',0),(43,9,'/assets/images/ProductImage/ysl/bags/YSL_7_1.avif',1),(44,9,'/assets/images/ProductImage/ysl/bags/YSL_7_2.avif',0),(45,9,'/assets/images/ProductImage/ysl/bags/YSL_7_3.avif',0),(46,9,'/assets/images/ProductImage/ysl/bags/YSL_7_4.avif',0),(47,9,'/assets/images/ProductImage/ysl/bags/YSL_7_5.avif',0),(48,10,'/assets/images/ProductImage/ysl/bags/YSL_8_1.avif',1),(49,10,'/assets/images/ProductImage/ysl/bags/YSL_8_2.avif',0),(50,10,'/assets/images/ProductImage/ysl/bags/YSL_8_3.avif',0),(51,10,'/assets/images/ProductImage/ysl/bags/YSL_8_4.avif',0),(52,10,'/assets/images/ProductImage/ysl/bags/YSL_8_5.avif',0),(53,11,'/assets/images/ProductImage/ysl/bags/YSL_9_1.avif',1),(54,11,'/assets/images/ProductImage/ysl/bags/YSL_9_2.avif',0),(55,12,'/assets/images/ProductImage/ysl/bags/YSL_10_1.avif',1),(56,12,'/assets/images/ProductImage/ysl/bags/YSL_10_2.avif',0),(57,12,'/assets/images/ProductImage/ysl/bags/YSL_10_3.avif',0),(58,12,'/assets/images/ProductImage/ysl/bags/YSL_10_4.avif',0),(59,12,'/assets/images/ProductImage/ysl/bags/YSL_10_5.avif',0),(60,12,'/assets/images/ProductImage/ysl/bags/YSL_10_6.avif',0),(61,13,'/assets/images/ProductImage/ysl/shoes/YSL_11_1.avif',1),(62,13,'/assets/images/ProductImage/ysl/shoes/YSL_11_1.jpg',0),(63,13,'/assets/images/ProductImage/ysl/shoes/YSL_11_2.avif',0),(64,13,'/assets/images/ProductImage/ysl/shoes/YSL_11_3.avif',0),(65,14,'/assets/images/ProductImage/ysl/shoes/YSL_12_1.avif',1),(66,14,'/assets/images/ProductImage/ysl/shoes/YSL_12_2.avif',0),(67,15,'/assets/images/ProductImage/ysl/shoes/YSL_13_1.avif',1),(68,15,'/assets/images/ProductImage/ysl/shoes/YSL_13_2.avif',0),(69,16,'/assets/images/ProductImage/ysl/shoes/YSL_14_1.avif',1),(70,16,'/assets/images/ProductImage/ysl/shoes/YSL_14_2.avif',0),(71,16,'/assets/images/ProductImage/ysl/shoes/YSL_14_3.avif',0),(72,17,'/assets/images/ProductImage/ysl/shoes/YSL_15_1.avif',1),(73,17,'/assets/images/ProductImage/ysl/shoes/YSL_15_2.avif',0),(74,17,'/assets/images/ProductImage/ysl/shoes/YSL_15_3.avif',0),(75,17,'/assets/images/ProductImage/ysl/shoes/YSL_15_4.avif',0),(76,18,'/assets/images/ProductImage/ysl/shoes/YSL_16_1.avif',1),(77,18,'/assets/images/ProductImage/ysl/shoes/YSL_16_2.avif',0),(78,18,'/assets/images/ProductImage/ysl/shoes/YSL_16_3.avif',0),(79,19,'/assets/images/ProductImage/ysl/shoes/YSL_17_1.avif',1),(80,19,'/assets/images/ProductImage/ysl/shoes/YSL_17_2.avif',0),(81,19,'/assets/images/ProductImage/ysl/shoes/YSL_17_3.avif',0),(82,19,'/assets/images/ProductImage/ysl/shoes/YSL_17_4.avif',0),(83,20,'/assets/images/ProductImage/ysl/shoes/YSL_18_1.avif',1),(84,20,'/assets/images/ProductImage/ysl/shoes/YSL_18_2.avif',0),(85,20,'/assets/images/ProductImage/ysl/shoes/YSL_18_3.avif',0),(86,21,'/assets/images/ProductImage/ysl/shoes/YSL_19_1.avif',1),(87,21,'/assets/images/ProductImage/ysl/shoes/YSL_19_2.avif',0),(88,21,'/assets/images/ProductImage/ysl/shoes/YSL_19_3.avif',0),(89,21,'/assets/images/ProductImage/ysl/shoes/YSL_19_4.avif',0),(90,21,'/assets/images/ProductImage/ysl/shoes/YSL_19_5.avif',0);
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

-- Dump completed on 2026-01-05 14:19:59
