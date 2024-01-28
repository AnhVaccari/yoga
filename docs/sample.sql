-- -------------------------------------------------------------
-- TablePlus 5.8.0(526)
--
-- https://tableplus.com/
--
-- Database: yoga
-- Generation Time: 2024-01-27 12:13:56.0490
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `Category`;
CREATE TABLE `Category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(50) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Difficulty`;
CREATE TABLE `Difficulty` (
  `id` int NOT NULL AUTO_INCREMENT,
  `difficulty_level` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Launched_Session`;
CREATE TABLE `Launched_Session` (
  `userId` int NOT NULL,
  `sessionId` int NOT NULL,
  `start_date` timestamp NOT NULL,
  `end_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`userId`,`sessionId`,`start_date`),
  KEY `sessionId` (`sessionId`),
  CONSTRAINT `Launched_Session_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`),
  CONSTRAINT `Launched_Session_ibfk_2` FOREIGN KEY (`sessionId`) REFERENCES `Session` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Pose`;
CREATE TABLE `Pose` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sanskrit_name` varchar(50) NOT NULL,
  `english_name` varchar(50) NOT NULL,
  `description` text,
  `benefits` varchar(100) DEFAULT NULL,
  `img_url_svg` varchar(255) DEFAULT NULL,
  `img_url_jpg` varchar(255) DEFAULT NULL,
  `img_url_svg_alt` varchar(255) DEFAULT NULL,
  `difficultyId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `difficultyId` (`difficultyId`),
  CONSTRAINT `Pose_ibfk_1` FOREIGN KEY (`difficultyId`) REFERENCES `Difficulty` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Pose_Category`;
CREATE TABLE `Pose_Category` (
  `poseId` int NOT NULL,
  `categoryId` int NOT NULL,
  PRIMARY KEY (`poseId`,`categoryId`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `Pose_Category_ibfk_1` FOREIGN KEY (`poseId`) REFERENCES `Pose` (`id`),
  CONSTRAINT `Pose_Category_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `Category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Session`;
CREATE TABLE `Session` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `duration` int NOT NULL,
  `difficultyId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `isCustom` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `difficultyId` (`difficultyId`),
  KEY `userId` (`userId`),
  CONSTRAINT `Session_ibfk_1` FOREIGN KEY (`difficultyId`) REFERENCES `Difficulty` (`id`),
  CONSTRAINT `Session_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `User` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Session_Pose`;
CREATE TABLE `Session_Pose` (
  `sessionId` int NOT NULL,
  `poseId` int NOT NULL,
  PRIMARY KEY (`sessionId`,`poseId`),
  KEY `poseId` (`poseId`),
  CONSTRAINT `Session_Pose_ibfk_1` FOREIGN KEY (`sessionId`) REFERENCES `Session` (`id`),
  CONSTRAINT `Session_Pose_ibfk_2` FOREIGN KEY (`poseId`) REFERENCES `Pose` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `User`;
CREATE TABLE `User` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `date_joined` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Category` (`id`, `category_name`, `description`) VALUES
(1, 'Yoga du Core', 'Renforcez vos muscles abdominaux avec des poses de yoga du core qui construisent un centre fort et stable comme la Pose du Bateau, la Pose du Dauphin et la Pose de la Planche Latérale.'),
(2, 'Yoga Assis', 'Pratiquez le yoga avec des poses assises qui vous aident à trouver une meilleure alignement, augmenter votre flexibilité, et soulager les douleurs et inconforts du bas du dos. Tonifiez le ventre, massez vos organes internes, et soulagez les douleurs du bas du dos avec ces poses de yoga assises.'),
(3, 'Yoga Renforçant', 'Travaillez et tonifiez votre corps entier avec des poses de yoga renforçantes comme la Pose de la Chaise, la Pose du Guerrier I et la Pose de l\'Angle Latéral Étendu.'),
(4, 'Yoga d\'Ouverture de la Poitrine', 'Ouvrez votre cœur et vos épaules dans des poses de yoga d\'ouverture de la poitrine comme la Pose du Chameau, la Pose du Poisson et la Pose Sauvage.'),
(5, 'Yoga de Cambrure', 'Découvrez les effets puissants des cambrures de yoga avec des instructions étape par étape, des séquences, et des conseils d\'experts pour maintenir votre pratique sans douleur.'),
(6, 'Yoga de Flexion Avant', 'Apprenez à travailler en toute sécurité les muscles raides, à promouvoir la flexibilité du bas du corps, et à trouver le bon alignement avec des poses de yoga de flexion avant.'),
(7, 'Yoga d\'Ouverture des Hanches', 'Détendez les hanches serrées, améliorez votre amplitude de mouvement et votre circulation, soulagez les douleurs dorsales et plus encore dans ces poses de yoga d\'ouverture des hanches.'),
(8, 'Yoga Debout', 'Développez la force et la stabilité dans vos poses debout, et ressentez les bienfaits tout au long de votre pratique. Construisez la force et posez les fondations pour une pratique du yoga en toute sécurité.'),
(9, 'Yoga Restauratif', 'Le yoga restauratif se concentre sur la détente après une longue journée et la relaxation de votre esprit. Au cœur de ce style, l\'accent est mis sur la relaxation du corps. Vous passez plus de temps dans moins de postures pendant la classe. Beaucoup de poses sont modifiées pour être plus faciles et plus relaxantes. Le yoga restauratif aide également à purifier et libérer votre esprit.'),
(10, 'Yoga d\'Équilibre sur les Bras', 'Dépassez la peur, améliorez l\'équilibre et renforcez votre corps avec des poses de yoga d\'équilibre sur les bras comme la Pose de la Grue, la Pose de la Planche, la Pose de la Luciole et plus encore.'),
(11, 'Yoga d\'Équilibre', 'Construisez une fondation solide pour votre pratique des asanas avec ces poses de yoga d\'équilibre. Obtenez des instructions étape par étape et récoltez les bienfaits.'),
(12, 'Yoga d\'Inversion', 'Maîtrisez les inversions - surmontez la peur et découvrez comment défier la gravité avec ces instructions étape par étape. Apprenez à vous préparer et à rester en sécurité dans les poses de yoga d\'inversion.');

INSERT INTO `Difficulty` (`id`, `difficulty_level`) VALUES
(1, 'Débutante'),
(2, 'Intermédiaire'),
(3, 'Difficile');

INSERT INTO `Launched_Session` (`userId`, `sessionId`, `start_date`, `end_date`) VALUES
(1, 1, '2024-01-09 00:00:00', '2024-01-09 00:00:00'),
(1, 1, '2024-01-09 15:20:08', '2024-01-09 22:20:22'),
(1, 1, '2024-01-09 15:20:09', '2024-01-09 16:16:24'),
(1, 1, '2024-01-09 16:16:38', '2024-01-09 16:16:51'),
(1, 1, '2024-01-09 16:16:59', '2024-01-09 16:22:47'),
(1, 1, '2024-01-09 16:22:55', '2024-01-09 16:24:12'),
(1, 1, '2024-01-09 17:09:22', '2024-01-09 17:10:14'),
(1, 1, '2024-01-09 17:14:23', '2024-01-09 17:17:31'),
(1, 1, '2024-01-09 17:17:42', '2024-01-09 17:17:51'),
(1, 1, '2024-01-19 18:02:39', '2024-01-20 15:03:18'),
(1, 1, '2024-01-20 22:33:41', '2024-01-20 22:35:54'),
(1, 1, '2024-01-20 22:37:22', '2024-01-21 13:10:34'),
(1, 1, '2024-01-21 13:18:05', '2024-01-21 13:21:28'),
(1, 1, '2024-01-21 13:32:59', '2024-01-21 13:35:19'),
(1, 1, '2024-01-21 14:13:10', '2024-01-21 14:23:59'),
(1, 1, '2024-01-21 14:42:40', '2024-01-21 14:43:10'),
(1, 1, '2024-01-21 15:03:43', '2024-01-21 15:05:13'),
(1, 1, '2024-01-21 15:06:40', '2024-01-21 15:07:38'),
(1, 1, '2024-01-21 16:29:35', '2024-01-22 10:21:17'),
(1, 1, '2024-01-22 10:38:39', '2024-01-22 10:45:13'),
(1, 1, '2024-01-22 10:51:30', '2024-01-22 10:57:42'),
(1, 1, '2024-01-22 10:57:47', '2024-01-22 11:11:27'),
(1, 1, '2024-01-22 11:11:57', '2024-01-22 11:12:32'),
(1, 1, '2024-01-22 11:12:46', '2024-01-22 11:13:51'),
(1, 1, '2024-01-22 11:18:55', '2024-01-22 11:23:20'),
(1, 1, '2024-01-22 11:32:28', '2024-01-22 11:33:56'),
(1, 1, '2024-01-22 11:37:24', '2024-01-22 11:37:33'),
(1, 1, '2024-01-22 11:41:32', '2024-01-22 11:41:40'),
(1, 1, '2024-01-22 11:43:09', '2024-01-22 11:43:26'),
(1, 1, '2024-01-22 11:45:28', '2024-01-22 11:45:36'),
(1, 1, '2024-01-22 11:46:18', '2024-01-22 11:46:25'),
(1, 1, '2024-01-22 11:46:52', '2024-01-22 11:46:59'),
(1, 1, '2024-01-22 11:50:22', '2024-01-22 11:50:30'),
(1, 1, '2024-01-22 11:51:01', '2024-01-22 11:51:08'),
(1, 1, '2024-01-22 12:36:57', '2024-01-22 12:37:04'),
(1, 1, '2024-01-22 12:38:33', '2024-01-22 12:38:40'),
(1, 1, '2024-01-22 12:43:18', '2024-01-22 12:43:26'),
(1, 1, '2024-01-22 12:44:57', '2024-01-22 12:45:04'),
(1, 1, '2024-01-22 12:48:05', '2024-01-22 12:48:12'),
(1, 1, '2024-01-22 12:53:54', '2024-01-22 12:54:01'),
(1, 1, '2024-01-22 12:56:31', '2024-01-22 12:56:39'),
(1, 1, '2024-01-22 13:01:40', '2024-01-22 13:01:50'),
(1, 1, '2024-01-22 13:04:06', '2024-01-22 13:04:15'),
(1, 1, '2024-01-22 13:08:36', '2024-01-22 13:08:43'),
(1, 1, '2024-01-22 13:10:12', '2024-01-22 13:10:24'),
(1, 1, '2024-01-22 13:10:27', '2024-01-22 13:10:35'),
(1, 1, '2024-01-22 13:13:35', '2024-01-22 13:14:12'),
(1, 1, '2024-01-22 13:16:33', '2024-01-22 13:16:41'),
(1, 1, '2024-01-22 13:16:45', '2024-01-22 13:16:53'),
(1, 1, '2024-01-22 15:49:14', '2024-01-22 15:49:38'),
(1, 1, '2024-01-23 16:43:05', '2024-01-23 16:43:22'),
(1, 2, '2024-01-09 16:24:20', '2024-01-09 16:25:03'),
(1, 2, '2024-01-20 21:52:29', '2024-01-20 21:53:21');

INSERT INTO `Pose` (`id`, `sanskrit_name`, `english_name`, `description`, `benefits`, `img_url_svg`, `img_url_jpg`, `img_url_svg_alt`, `difficultyId`) VALUES
(1, 'Nāvāsana', 'Bateau', 'De la position assise, les pieds sont soulevés de manière à ce que les cuisses forment un angle d\'environ 45-50 degrés par rapport au sol. Le coccyx s\'allonge vers la terre et le pubis se rapproche du nombril. Les omoplates sont écartées dans le dos et les mains atteignent autour de l\'arrière des mollets, avec les jambes tirées vers le corps. Le menton est légèrement incliné vers le sternum de sorte que la base du crâne s\'éloigne légèrement de l\'arrière du cou. Le regard est dirigé vers l\'avant.', 'Renforce  l\'abdomen, les fléchisseurs de la hanche et la colonne vertébrale. Stimule les reins, la t', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483071/yoga-api/1_txmirf.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483071/yoga-api/1_txmirf.png', 'https://www.dropbox.com/s/4m64ztxkj8a4dab/boatstraightlegs.svg?raw=1', 2),
(2, 'Ardha Nāvāsana', 'Demi-bateau', 'À partir d\'une position assise, les mains sont saisies autour de l\'arrière des jambes et les genoux sont pliés à un angle de 90 degrés. Les deux jambes sont tirées vers l\'abdomen. Le noyau (muscles abdominaux) est activé pour maintenir l\'équilibre sur les os assis (assurez-vous que le dos ne s\'arrondit pas). L\'avant du torse s\'allonge entre le pubis et le haut du sternum pendant que la colonne vertébrale s\'étend dans les deux directions, atteignant vers le ciel et s\'enracinant dans la terre. Le regard est dirigé vers l\'avant et les bandhas sont activés.', 'Renforce l\'abdomen, les fléchisseurs de la hanche et la colonne vertébrale. Stimule les reins, la th', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483073/yoga-api/2_ozh7sv.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483073/yoga-api/2_ozh7sv.png', 'https://www.dropbox.com/s/1nx0r94msxjwvyp/boatbentlegs.svg?raw=1', 1),
(3, 'Dhanurāsana', 'Arc', 'À partir d\'une position ventrale avec l\'abdomen contre la terre, les mains saisissent les chevilles (mais pas le dessus des pieds) avec les genoux pas plus larges que la largeur de vos hanches. Les talons sont soulevés loin des fesses et en même temps les cuisses sont élevées loin de la terre, créant des forces opposées alors que le centre de la poitrine, les hanches et le dos s\'ouvrent. Le regard est dirigé vers l\'avant.', 'Etire l\'ensemble de l\'avant du corps, les chevilles, les cuisses et l\'aine, l\'abdomen et la poitrine', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483072/yoga-api/3_aa0fgk.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483072/yoga-api/3_aa0fgk.png', 'https://www.dropbox.com/s/wizj5kwxvez4c0a/bow.svg?raw=1', 2),
(4, 'Setu Bandha Sarvāṅgāsana', 'Pont', 'À partir d\'une position allongée sur le dos, les hanches sont soulevées avec les talons des pieds enracinés dans la terre près des os assis. Les orteils sont activement relevés et le bassin est rentré. Les cuisses sont parallèles à la terre et les doigts sont entrelacés sous le corps avec la cage thoracique relevée et le cœur ouvert. L\'arrière du cou repose sur la terre. Le regard est dirigé vers le ciel.', 'Etire la poitrine, le cou et la colonne vertébrale. Stimule les organes abdominaux, les poumons et l', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483074/yoga-api/4_qq6nxw.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483074/yoga-api/4_qq6nxw.png', 'https://www.dropbox.com/s/f1w64ybg4sn8ejt/bridge.svg?raw=1', 2),
(5, 'Baddha Koṇāsana', 'Papillon', 'En position assise, pliez les deux genoux et abaissez-les de chaque côté pour ouvrir les hanches. Joignez les plantes des pieds et rapprochez les talons autant que possible de l\'aine, en gardant les genoux près du sol. Les mains peuvent descendre pour saisir et ajuster les pieds de manière à ce que les plantes soient tournées vers le haut et que les talons et les petits orteils se touchent. Les épaules doivent être tirées en arrière et le dos ne doit pas s\'arrondir.', 'Ouvre les hanches et l\'aine. Étire les épaules, la cage thoracique et le dos. Stimule les organes ab', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483074/yoga-api/5_i64gif.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483074/yoga-api/5_i64gif.png', 'https://www.dropbox.com/s/3h2pts6xbn28dh7/butterfly%3F.svg?raw=1', 1),
(6, 'Uṣṭrāsana', 'Chameau', 'Depuis une position à genoux, les genoux sont espacés de la largeur des hanches et les cuisses sont perpendiculaires à la terre. Les faces internes des cuisses sont resserrées et légèrement tournées vers l\'intérieur, avec les fesses engagées mais non contractées. Le coccyx est rentré, mais les hanches ne sont pas projetées en avant. Les tibias et le dessus des pieds sont fermement pressés contre la terre. La cage thoracique est ouverte, tout comme le centre du cœur, mais les côtes inférieures avant ne pointent pas brusquement vers le ciel. Le bas du dos éloigne les côtes du bassin pour maintenir la colonne lombaire aussi longue que possible. La base des paumes est fermement pressée contre les plantes (ou les talons) des pieds et les doigts pointent vers les orteils. Les bras sont tendus et légèrement tournés vers l\'extérieur au niveau de l\'articulation de l\'épaule, de sorte que les plis des coudes sont dirigés vers l\'avant sans rapprocher les omoplates. Le cou est dans une position relativement neutre, ni fléchi ni étendu, ou (uniquement pour les pratiquants avancés) la tête se penche en arrière. Veillez à ne pas trop solliciter votre cou et à ne pas contracter votre gorge. Le regard est dirigé soit vers le ciel soit vers la terre, en fonction de votre souplesse.', 'Etire l\'ensemble de l\'avant du corps, les chevilles, les cuisses et l\'aine, l\'abdomen et la poitrine', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483075/yoga-api/6_ri1w0e.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483075/yoga-api/6_ri1w0e.png', 'https://www.dropbox.com/s/o5gr4lngltsdg5r/camel.svg?raw=1', 2),
(7, 'Marjaryāsana', 'Chat', 'À partir de la position de la boîte neutre, transférez légèrement du poids sur les paumes. Les poignets, les coudes et les épaules sont alignés. L\'abdomen est contracté et remonté avec la colonne vertébrale arquée en une forte courbure de cobra. Le sommet de la tête est dirigé vers la terre et le cou est détendu. Le regard est dirigé entre les bras vers le ventre.', 'Soulage la colonne vertébrale et le cou. Dynamise le corps.', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483075/yoga-api/7_a6aspg.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483075/yoga-api/7_a6aspg.png', 'https://www.dropbox.com/s/cginnz98of2jpgr/cat.svg?raw=1', 1),
(8, 'Bitilāsana', 'Vache', 'À partir de la position neutre de la boîte, la cage thoracique est relevée avec une légère courbure dans le bas du dos. Le coccyx se soulève en direction de la position de l\'inclinaison du chien. Les yeux sont doux et le regard est dirigé vers le ciel.', 'Elimine la fatigue. Améliore la respiration et la circulation sanguine vers le cerveau. Rafraîchit l', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483077/yoga-api/8_wi10sn.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483077/yoga-api/8_wi10sn.png', 'https://www.dropbox.com/s/neau4ceai1rskh6/cow.svg?raw=1', 1),
(9, 'Utkaṭāsana', 'Chaise', 'Depuis une position debout, les pieds sont ensemble et enracinés dans la terre, les orteils étant activement relevés. Les genoux sont pliés, et le poids du corps repose sur les talons des pieds. Le bassin est rentré, et la cage thoracique est relevée. Le cou est une extension naturelle de la colonne vertébrale. Les bras sont levés vers le ciel avec les coudes tendus et les biceps près des oreilles. Les mains peuvent être ensemble ou séparées, les paumes se faisant face et les doigts écartés largement. Le regard est dirigé vers l\'avant.', 'Renforce les chevilles, les cuisses, les mollets et la colonne vertébrale. Étire les épaules et la p', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483078/yoga-api/9_ewvoun.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483078/yoga-api/9_ewvoun.png', 'https://www.dropbox.com/s/9emlawz8vayk8bm/chair.svg?raw=1', 1),
(10, 'Balāsana', 'Posture de l\'enfant', 'Depuis une position à genoux, les orteils et les genoux sont ensemble, avec la majeure partie du poids du corps reposant sur les talons des pieds. Les bras sont tendus vers l\'arrière, reposant le long des jambes. Le front repose doucement sur la terre. Le regard est dirigé vers le bas et vers l\'intérieur.', 'Etire doucement les hanches, les cuisses et les chevilles. Apaise le cerveau et contribue à soulager', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483079/yoga-api/10_wzpo85.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483079/yoga-api/10_wzpo85.png', 'https://www.dropbox.com/s/ini3uwali0q5gxa/child.svg?raw=1', 1),
(11, 'Śavāsana', 'Posture du cadavre', 'Le corps repose sur la terre en position allongée sur le dos, avec les bras le long du corps. Les paumes sont détendues et ouvertes vers le ciel. Les omoplates sont tirées vers l\'arrière, vers le bas et légèrement roulées en dessous de manière confortable, reposant uniformément sur la terre. Les jambes sont tendues vers le bas et légèrement écartées. Les talons sont rentrés et les orteils tombent vers l\'extérieur. Les yeux sont fermés. Tout est détendu. Le regard est dirigé vers l\'intérieur.', 'Apaise le cerveau et contribue à soulager le stress et une légère dépression. Détend le corps. Rédui', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483078/yoga-api/11_dczyrp.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483078/yoga-api/11_dczyrp.png', 'https://www.dropbox.com/s/eohyx2crvtjvaxb/sivasana.svg?raw=1', 1),
(12, 'Ashta Chandrāsana', 'Fente croissant', 'Depuis la posture de la montagne, à l\'inspiration, levez les mains et entrelacez les doigts. À l\'expiration, penchez-vous d\'un côté en étirant la cage thoracique opposée.', 'Etire la cage thoracique, les bras et le torse. Tonifie les muscles obliques.', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483080/yoga-api/12_pv4p1z.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483080/yoga-api/12_pv4p1z.png', 'https://www.dropbox.com/s/1oc1dqv8mfwo8uj/highlunge.svg?raw=1', 2),
(13, 'Bakāsana', 'Corbeau', 'Depuis une position inversée, avec les hanches en l\'air et la tête en bas, les bras sont pliés à un angle de 90 degrés avec les genoux reposant sur les coudes. Les paumes sont fermement ancrées dans la terre, avec les phalanges appuyées solidement pour le soutien. Le ventre est tiré vers le haut et vers l\'intérieur vers la colonne vertébrale, avec la cage thoracique et le menton relevés. Le poids du corps se déplace légèrement vers l\'avant lorsque les orteils se soulèvent et se détachent de la terre pour atteindre la pleine expression de la pose. Le regard est dirigé vers le bas et légèrement vers l\'avant.', 'Renforce les bras et les poignets. Étire le haut du dos. Renforce les muscles abdominaux. Ouvre l\'ai', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483083/yoga-api/13_hdjxuz.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483083/yoga-api/13_hdjxuz.png', 'https://www.dropbox.com/s/ukaxoioh0uooswj/crow.svg?raw=1', 2),
(14, 'Pīñcha Mayūrāsana', 'Dauphin', 'À partir de la position du chien tête en bas (Downward-Facing Dog), les avant-bras sont posés sur la terre avec les coudes rapprochés et les paumes vers le bas dans une position de Sphinx. Le bassin est rentré. La cage thoracique est relevée. Les pieds sont enracinés et les jambes sont droites avec le coccyx en position de chien incliné. Le regard est dirigé vers le bas et légèrement vers l\'avant.', 'Apaise le cerveau et contribue à soulager le stress et une légère dépression. Dynamise le corps. Éti', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483080/yoga-api/14_k9lr9a.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483080/yoga-api/14_k9lr9a.png', 'https://www.dropbox.com/s/px1foombb3v24se/dolphin.svg?raw=1', 3),
(15, 'Parivṛtta Adho Mukha Śvānāsana', 'Chien tête en bas', 'À partir de la position du chien tête en bas (downward dog), les jambes sont tendues avec les os assis inclinés vers le haut et tendant vers le ciel. Les pieds sont à plat avec les talons solidement enracinés. Une paume est à plat avec les phalanges réparties uniformément sur la terre. L\'autre main passe sous le corps et saisit la cheville opposée. La colonne vertébrale est longue et le cœur est ouvert vers le ciel. Le cou est détendu, et le sommet de la tête est relâché vers la terre. Le regard est dirigé vers le centre.', 'Apaise le cerveau et contribue à soulager le stress et une légère dépression. Renforce les bras et l', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483081/yoga-api/15_vkviqn.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483081/yoga-api/15_vkviqn.png', 'https://www.dropbox.com/s/75xa1bduu2u5y7d/downdog.svg?raw=1', 2),
(16, 'Garuḍāsana', 'Aigle', 'À partir d\'une position debout, une cuisse est croisée par-dessus l\'autre avec les orteils et/ou la cheville accrochés derrière le mollet inférieur. Le poids du corps est équilibré sur le pied qui reste au sol. Les bras sont croisés devant le torse de telle sorte qu\'un bras est croisé au-dessus de l\'autre. Le bras supérieur est rentré dans le coude du bras inférieur. Les mains sont également accrochées l\'une à l\'autre. Une fois accrochées, les coudes se lèvent et les doigts s\'étirent vers le plafond. Le regard est doux et dirigé vers l\'avant.', 'Renforce et étire les chevilles et les mollets. Étire les cuisses, les hanches, les épaules et le ha', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483081/yoga-api/16_g7ueht.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483081/yoga-api/16_g7ueht.png', 'https://www.dropbox.com/s/w05qgx7wyxva1y3/eagle.svg?raw=1', 2),
(17, 'Utthita Hasta Pādāṅguṣṭhāsana', 'Bras tendu au gros orteil', 'À partir de la position de la montagne (mountain pose), levez un pied. Penchez-vous en avant et attrapez les orteils avec les doigts. Placez l\'autre main sur la hanche pour aligner la hanche vers l\'avant. Redressez lentement le genou et le torse, puis ouvrez la jambe sur le côté. Utilisez une sangle si nécessaire. Regardez vers l\'avant ou du côté opposé de la jambe tendue pour maintenir l\'équilibre.', 'Ouvre les hanches et l\'aine. Étire les ischio-jambiers, les bandes ilio-tibiales et les jambes. Amél', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483084/yoga-api/17_l9joyu.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483084/yoga-api/17_l9joyu.png', 'https://www.dropbox.com/s/0yk0z7f0a4ni37l/extendedhandtotoe.svg?raw=1', 3),
(18, 'Utthita Pārśvakoṇāsana', 'Angle latéral étendu', 'À partir de la position du guerrier II, la partie inférieure du corps reste immobile tandis que la partie supérieure du corps se plie vers l\'avant au niveau du pli de la hanche. Un bras est tendu vers l\'avant avec le biceps près de l\'oreille et les doigts écartés largement, tandis que l\'autre bras descend vers la terre à l\'intérieur de la cuisse. Le haut du torse et le regard se tournent vers le ciel.', 'Renforce et étire les jambes, les genoux et les chevilles. Étire l\'aine, la colonne vertébrale, la t', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483083/yoga-api/18_aqufak.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483083/yoga-api/18_aqufak.png', 'https://www.dropbox.com/s/yzynxmyb9o7eras/extendedsideangle.svg?raw=1', 2),
(19, 'Pīñcha Mayūrāsana', 'Paon à plumes', 'Depuis une position inversée, avec le corps perpendiculaire à la terre, le poids du corps est soutenu sur les avant-bras qui sont parallèles et fermement enfoncés dans la terre. Les paumes sont à plat. Les phalanges sont uniformément pressées dans la terre. Les doigts sont écartés largement. Les deux jambes s\'étendent vers le ciel en une ligne droite, avec le bassin rentré. La cage thoracique est relevée. Le regard est dirigé vers l\'avant.', 'Renforce les bras et les épaules. Améliore la concentration et l\'équilibre. Étire le haut et le bas ', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483084/yoga-api/19_jadqwc.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483084/yoga-api/19_jadqwc.png', 'https://www.dropbox.com/s/kjlyju4m91qgoi6/forearmstand.svg?raw=1', 3),
(20, 'Uttānāsana', 'Courber vers l\'avant', 'Depuis une position debout, le corps se plie au niveau du pli de la hanche avec la colonne vertébrale bien droite. Le cou est détendu et le sommet de la tête est dirigé vers la terre. Les pieds sont enracinés dans la terre. Les orteils sont activement relevés. La colonne vertébrale est droite. La cage thoracique est relevée. La poitrine et les cuisses sont en contact. Le sacrum se soulève vers le ciel en position de chien incliné. Les doigts sont entrelacés derrière le corps, et les paumes sont ensemble. Les bras et les coudes sont tendus. Les omoplates se tournent l\'une vers l\'autre lorsque les mains avancent (s\'éloignant du bas du dos). Le regard est dirigé vers le bas et vers l\'intérieur.', 'Apaise le cerveau et contribue à soulager le stress et une légère dépression. Stimule le foie et les', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483085/yoga-api/20_uogrfq.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483085/yoga-api/20_uogrfq.png', 'https://www.dropbox.com/s/sjqfq99pqpelv4v/forwardfoldshoulderstretch.svg?raw=1', 2),
(21, 'Ardha Chandrāsana', 'Demi-lune', 'Depuis une position debout, une jambe est tendue tandis que l\'autre est étendue en arrière parallèlement à la terre (ou légèrement au-dessus de la parallèle), et une main repose sur la terre (au-delà du côté du petit orteil du pied, à environ 30 centimètres), tandis que l\'autre main est étendue vers le ciel. Les omoplates sont serrées ensemble et les doigts se déplacent en direction opposée. Le poids du corps est principalement supporté par la jambe en appui, tandis que la main au sol supporte très peu de poids, mais est utilisée de manière intelligente pour réguler l\'équilibre. Le haut du corps est ouvert vers le ciel. Les deux hanches sont en rotation externe. L\'énergie est activement étendue à travers les orteils fléchis pour maintenir la jambe levée forte. La cheville intérieure du pied en appui est fortement relevée vers le haut, comme si elle puisait de l\'énergie de la terre. Le sacrum et les omoplates sont fermement pressés contre le torse arrière et allongent le coccyx vers la jambe levée. Le regard est dirigé vers le haut ou vers le bas, en fonction de l\'état du cou. En cas de blessure au cou, le regard est dirigé vers le bas.', 'Renforce l\'abdomen, les chevilles, les cuisses, les fessiers et la colonne vertébrale. Étire l\'aine,', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483085/yoga-api/21_etedlp.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483085/yoga-api/21_etedlp.png', 'https://www.dropbox.com/s/gpumf9eehr8wo9g/halfmoon.svg?raw=1', 3),
(22, 'Adho Mukha Vṛkṣāsana', 'Posture sur les mains', 'Dans cette posture inversée, le poids du corps repose sur les mains, espacées de la largeur des épaules, avec les doigts dirigés vers l\'avant et parallèles les uns aux autres (si les épaules sont raides, les index sont légèrement tournés vers l\'extérieur). Les omoplates sont fermes contre le torse arrière et remontent vers le coccyx. Les bras supérieurs sont tournés vers l\'extérieur, avec la partie interne du coude tournée vers l\'avant de la pièce pour maintenir les omoplates larges, tandis que les bras extérieurs se serrent vers l\'intérieur en forces opposées pour l\'équilibre et la stabilité. Les paumes sont ouvertes et les bases des index sont fermement pressées contre la terre. L\'équilibre est maintenu en gardant les Bandhas engagés tout en repoussant la terre avec les bras tendus et les pieds fléchis. Le regard est dirigé vers le bas et vers l\'avant.', 'Renforce les épaules, les bras et les poignets. Étire le ventre. Améliore le sens de l\'équilibre. Ap', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483085/yoga-api/22_ojzmr8.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483085/yoga-api/22_ojzmr8.png', 'https://www.dropbox.com/s/p7pf5j0untktn9c/handstand.svg?raw=1', 3),
(23, 'Aṅjaneyāsana', 'Fente basse en croissant', 'Le genou avant est plié à un angle de 90 degrés directement au-dessus de la cheville, et le genou arrière repose sur la terre avec le dessus du pied arrière fermement pressé contre la terre. Les hanches sont alignées et poussées vers l\'avant. Les faces internes des cuisses se rapprochent l\'une de l\'autre. Le bassin est rentré pour protéger le bas du dos. La cage thoracique est relevée. Les bras sont levés. Les mains peuvent être ensemble ou séparées, les paumes se faisant face avec les doigts écartés largement. Le regard est dirigé vers l\'avant.', 'Etire la poitrine , les poumons, le cou, le ventre et l\'aine (psoas). Renforce les épaules, les bras', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483086/yoga-api/23_k2jccj.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483086/yoga-api/23_k2jccj.png', 'https://www.dropbox.com/s/h0ehjaz1wa9xfu1/lowlunge.svg?raw=1', 1),
(24, 'Supta Kapotāsana', 'Pigeon', 'Allongez-vous sur le dos en position supine. Pliez les genoux, les talons près des os iliaques, et croisez une cheville sur le genou opposé. Passez les mains ou atteignez entre les cuisses. Soulevez le pied du sol et maintenez le genou plié derrière la cuisse ou le tibia pour le rapprocher de la poitrine, en veillant à ce que le sacrum soit ancré au sol.', 'Etire les ischio-jambiers et les quadriceps. Si le coude est utilisé pour pousser la cuisse, cela ou', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483088/yoga-api/24_ulgsjo.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483088/yoga-api/24_ulgsjo.png', 'https://www.dropbox.com/s/77peru289zm446u/pigeon.svg?raw=1', 2),
(25, 'Eka Pāda Rājakapotāsana', 'Pigeon Royal', 'Depuis une position assise, les hanches étant alignées, une jambe est étendue vers l\'avant avec le genou plié et parallèle à la terre. Le talon avant est enraciné près de l\'aine (ou étendu à un angle de 90 degrés si la flexibilité le permet). L\'autre jambe est étendue vers l\'arrière avec le genou plié et perpendiculaire à la terre. Le pied arrière est accroché à l\'intérieur du coude du bras arrière. Le coude avant est plié vers le haut, perpendiculaire à la terre, avec le biceps près de l\'oreille. Les doigts sont entrelacés pour réaliser la prise derrière le corps et aider à ouvrir la poitrine. Le regard est naturel et dirigé vers l\'avant.', 'Étire les cuisses, l\'aine (psoas), l\'abdomen, la poitrine, les épaules et le cou. Stimule les organe', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483087/yoga-api/25_rssro9.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483087/yoga-api/25_rssro9.png', 'https://www.dropbox.com/s/10usd0gcqgy6o53/kingpigeon.svg?raw=1', 2),
(26, 'Phalakāsana', 'Planche', 'Le corps est parallèle à la terre. Le poids du corps est soutenu par des bras tendus et des orteils actifs. L\'abdomen est tiré vers la colonne vertébrale et le bassin est rentré. Le cou est une extension naturelle de la colonne vertébrale et le menton est légèrement rentré. Les paumes sont plates et les coudes sont près du corps. Les articulations sont alignées avec les poignets, les coudes et les épaules formant une ligne droite perpendiculaire à la terre. Le regard suit la colonne vertébrale et les yeux sont dirigés vers le bas.', 'Renforce les bras, les poignets et la colonne vertébrale. Tonifie l\'abdomen.', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483088/yoga-api/26_mxkzlo.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483088/yoga-api/26_mxkzlo.png', 'https://www.dropbox.com/s/jg6ge8zpaltx10f/plank.svg?raw=1', 2),
(27, 'Halāsana', 'La charrue', 'Depuis une position allongée sur le dos, le haut du dos repose sur la terre avec les hanches et les jambes pivotées vers l\'arrière au-dessus et au-delà de la tête vers la terre. Le torse est perpendiculaire à la terre. Les jambes sont complètement étendues sans plier les genoux, les orteils atteignent la terre. Les mains soutiennent soit le bas du dos, soit sont étendues derrière le dos sur la terre avec les coudes étendus et les doigts entrelacés (autant que la flexibilité le permet), ouvrant les épaules. Le cou est droit, le menton rentré. Ne regardez pas sur le côté, car cela pourrait provoquer une blessure au cou. Le regard est dirigé vers l\'intérieur.', 'Apaise le cerveau. Stimule les organes abdominaux et les glandes thyroïdes. Étire les épaules et la ', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483088/yoga-api/27_m4yux9.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483088/yoga-api/27_m4yux9.png', 'https://www.dropbox.com/s/zi9231wbajm6d2m/plow.svg?raw=1', 2),
(28, 'Pārśvottānāsana', 'Pyramide', 'Depuis une position debout, une jambe en avant et une jambe en arrière, penchez le torse vers l\'avant au niveau de l\'articulation de la hanche. Arrêtez-vous lorsque le torse est parallèle au sol. Pressez les extrémités des doigts ou les paumes plates sur le sol de chaque côté du pied avant, en maintenant une colonne vertébrale droite et allongée. Si vous ne pouvez pas toucher le sol ou maintenir une colonne vertébrale droite, soutenez les mains avec une paire de blocs. Poussez les cuisses vers l\'arrière et allongez le torse vers l\'avant, en vous élevant par le haut du sternum. Ensuite, selon votre flexibilité, rapprochez le torse avant du haut de la cuisse sans arrondir la colonne vertébrale. Finalement, le long torse avant reposera sur la cuisse. Le regard est dirigé vers le bas.', 'Apaise le cerveau. Étire la colonne vertébrale, les épaules, les hanches et les ischio-jambiers. Ren', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483089/yoga-api/28_uu58tt.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483089/yoga-api/28_uu58tt.png', 'https://www.dropbox.com/s/j7p2600bmf840e0/pyramid.svg?raw=1', 2),
(29, 'Pārśva Vīrabhadrāsana', 'Guerrier inversé', 'À partir de la posture du guerrier II, la partie inférieure du corps reste immobile tandis que la partie supérieure du corps s\'arque légèrement en une douce cambrure en arrière. Le bras supérieur est étendu vers l\'arrière avec le biceps près de l\'oreille et les doigts écartés largement. L\'autre bras glisse le long de la jambe arrière, reposant sur la cuisse ou le tibia, mais pas sur l\'articulation du genou. Le regard est dirigé vers le ciel.', 'Renforce et étire les jambes, les genoux et les chevilles. Étire l\'aine, la colonne vertébrale, la t', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483089/yoga-api/29_ww7bot.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483089/yoga-api/29_ww7bot.png', 'https://www.dropbox.com/s/q6yn6cb9fglo0wp/reverswarrior.svg?raw=1', 2),
(30, 'Paśchimottānāsana', 'Assis pliée vers l\'avant', 'Depuis une position assise avec les os des fesses enracinés dans la terre, les jambes s\'étendent vers l\'avant dans la mesure où la poitrine et les cuisses peuvent rester en contact. Les doigts s\'enroulent autour des orteils. Le haut du corps se plie vers l\'avant au niveau du pli des hanches, avec la colonne vertébrale bien droite. Le regard est dirigé vers l\'avant.', 'Apaise le cerveau et aide à soulager le stress et la dépression légère. Étire la colonne vertébrale,', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483091/yoga-api/30_gumpl3.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483091/yoga-api/30_gumpl3.png', 'https://www.dropbox.com/s/ji0otecqx42by00/seatedforwardfold.svg?raw=1', 1),
(31, 'Padmāsana', 'Lotus', 'Amenez la cheville du bas et placez-la sur le dessus du genou opposé, de sorte que les deux chevilles reposent sur le dessus des cuisses.', 'Ouvre les hanches, l\'aine et étire les genoux, les chevilles et les cuisses. Renforce le dos, apaise', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483091/yoga-api/31_ozseum.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483091/yoga-api/31_ozseum.png', 'https://www.dropbox.com/s/0oylivjwzuj5fnp/seatedORlotus.svg?raw=1', 2),
(32, 'Ardhā Matsyendrāsana', 'Demi-seigneur des poissons', 'Commencez en position assise. Pliez un genou de manière à ce que la plante de votre pied soit proche de la cuisse intérieure opposée. Pliez votre genou opposé, avec le pied sur le sol, le talon à l\'extérieur de votre cuisse pliée. Étirez votre bras (du même côté que votre jambe en Lotus) vers le ciel et commencez à le tourner vers l\'extérieur de votre genou plié. Utilisez votre main opposée comme levier pour approfondir la torsion. Crochetez votre coude à l\'extérieur de votre cuisse et regardez par-dessus votre épaule arrière. Si vous souhaitez approfondir davantage la torsion, enroulez votre bras autour du tibia de votre genou plié et faites passer votre bras opposé pour le rejoindre. Attrapez les doigts opposés ou le poignet. Maintenez une colonne vertébrale longue.', 'Étire les épaules, la poitrine, les cuisses, l\'aine et l\'abdomen. Renforce les jambes et les chevill', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483091/yoga-api/32_hafoa0.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483091/yoga-api/32_hafoa0.png', 'https://www.dropbox.com/s/u9joi8lbntxumyh/seatedspinaltwist.svg?raw=1', 3),
(33, 'Sālamba Sarvāṅgāsana', 'Chandelle', 'Depuis une position allongée sur le dos, le haut du dos repose sur la terre avec les hanches dirigées tout droit vers le ciel. Le torse est perpendiculaire à la terre. Les jambes sont entièrement tendues et les orteils sont actifs. Les mains soutiennent soit le bas du dos soit sont étendues le long du corps en position de \"matchstick\". Le cou est plat sur la terre et le menton est rentré. Le regard est dirigé vers l\'intérieur.', 'Apaise le cerveau et aide à soulager le stress et la dépression légère. Stimule les glandes thyroïde', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483091/yoga-api/33_r7motl.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483091/yoga-api/33_r7motl.png', 'https://www.dropbox.com/s/tqj48exec3zub2u/shoulderstand.svg?raw=1', 2),
(34, 'Vasiṣṭhāsana', 'Planche sur le côté', 'Depuis une position d\'équilibre sur les bras, le poids du corps est supporté d\'un côté et réparti également entre le bras et le pied inférieurs, tandis que l\'autre bras (supérieur) se lève avec les doigts écartés largement et l\'autre pied (supérieur) s\'empile par-dessus. Le pied inférieur (ancré) est plat et agrippe la terre depuis le bord extérieur du pied. Si la flexibilité du pied est limitée, au lieu d\'agripper la terre avec un pied plat, le poids du corps est équilibré sur le bord du pied qui est fléchi plutôt que plat. Le bras qui supporte le poids du corps et le pied ancré appuient activement sur le sol tandis que les omoplates se raffermissent contre le dos, puis s\'écartent de la colonne vertébrale en se rapprochant du coccyx. Les Bandhas sont engagés pour maintenir l\'équilibre et la stabilité. Le sommet de la tête s\'éloigne du cou et le regard est dirigé vers la main.', 'Apaise le cerveau et aide à soulager le stress et la dépression légère. Étire les épaules, les muscl', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483093/yoga-api/34_qle5tp.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483093/yoga-api/34_qle5tp.png', 'https://www.dropbox.com/s/w35ciia4u570xj8/sideplank.svg?raw=1', 2),
(35, 'Sālamba Bhujaṅgāsana', 'Sphinx', 'Depuis une position ventrale, la région pelvienne est fermement contractée vers l\'intérieur vers la ligne médiane du corps, tandis que le pubis est rentré. Les jambes sont étendues vers l\'arrière et le dessus des pieds est plat. Les paumes sont à plat et les coudes sont sur le tapis, empilés juste en dessous des épaules. Sur une inhalation, soulevez le sternum et étendez le cou loin des épaules, tout en maintenant les coudes, les paumes et l\'os pelvien fermement attachés au tapis.', 'Renforce la colonne vertébrale. Étire la poitrine, les poumons, les épaules et l\'abdomen. Stimule le', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483092/yoga-api/35_dytwvz.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483092/yoga-api/35_dytwvz.png', 'https://www.dropbox.com/s/cl8teqpf9yingwm/sphinx.svg?raw=1', 1),
(36, 'Hanumānāsana', 'Posture du singe ', 'The hips are parallel and squared to the earth with one leg extended forward.  The opposite leg extended back with the knee and foot squared to the earth.  The inner thighs scissor towards each other.  The hands are by the side body or at the heart center in Anjali Mudra (Salutation Seal) or stretched straight up toward the sky.  The ribcage is lifted.  The heart is open.  The gaze is forward.', 'Étire les cuisses, les muscles ischio-jambiers et l\'aine. Stimule les organes abdominaux.', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483092/yoga-api/36_a2z20a.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483092/yoga-api/36_a2z20a.png', 'https://www.dropbox.com/s/u8dxhc41hjfcxj6/splits.svg?raw=1', 3),
(37, 'Mālāsana', 'Posture de la guirlande', 'Depuis une position accroupie, les pieds sont aussi proches l\'un de l\'autre que possible (gardez vos talons au sol si vous le pouvez ; sinon, supportez-les sur un tapis plié). Les cuisses sont légèrement plus écartées que le torse. Le torse penche doucement en avant et se loge confortablement entre les cuisses. Les coudes sont pressés contre les genoux internes et les paumes sont réunies en Anjali Mudra (Sceau de Salutation). Les genoux résistent aux coudes pour aider à allonger le torse avant. Le regard est doux et dirigé vers l\'avant.', 'Étire les chevilles, l\'aine et le torse arrière. Tonifie l\'abdomen.', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483093/yoga-api/37_moh7ii.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483093/yoga-api/37_moh7ii.png', 'https://www.dropbox.com/s/ntrwtdlr6tdkdxz/squat.svg?raw=1', 1),
(38, 'Uttānāsana', 'Cigogne', 'Depuis une position debout, le corps se plie au niveau du pli de la hanche avec la colonne vertébrale bien droite. Le cou est détendu et le sommet de la tête est dirigé vers la terre. Les pieds sont enracinés dans la terre avec les orteils activement relevés. La colonne vertébrale est droite. La cage thoracique est relevée. La poitrine et les cuisses sont en contact. Le sacrum se soulève vers le ciel en position de chien incliné. Les bouts des doigts reposent sur la terre à côté des orteils. Le regard est dirigé vers le bas ou légèrement vers l\'avant.\n\n\n\n\n\n', 'Calme le cerveau et aide à soulager le stress et la dépression légère. Stimule le foie et les reins.', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483093/yoga-api/38_yb3thk.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483093/yoga-api/38_yb3thk.png', 'https://www.dropbox.com/s/u09snmhtposvaq0/standingforwardfold.svg?raw=1', 1),
(39, 'Ashta Chandrāsana', 'Croissant de lune', 'Depuis la posture de la montagne, à l\'inspiration, levez les mains et entrelacez les doigts ensemble. À l\'expiration, penchez-vous d\'un côté, en allongeant la cage thoracique opposée et en vous étirant.', 'Étire la cage thoracique, les bras et le torse. Tonifie les muscles obliques.', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483095/yoga-api/39_hqj0sa.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483095/yoga-api/39_hqj0sa.png', 'https://www.dropbox.com/s/9tv6z3qdcw2vg3a/standingstretch.svg?raw=1', 1),
(40, 'Upaviṣṭha Koṇāsana', 'Side Splits', 'À partir d\'une large posture, les jambes sont ouvertes et étendues latéralement selon votre degré de flexibilité. Les bords extérieurs des pieds sont tournés et agrippent la terre. Le poids du corps est soutenu par les bras. Les paumes sont enracinées dans la terre avec les doigts pointant vers le corps. Il ne doit y avoir aucun excès de poids sur les articulations du genou ou de la cheville lorsque vous vous abaissez en fonction de votre flexibilité. Le regard est dirigé vers le bas et légèrement vers l\'avant.', 'Etire les muscles intérieurs et arrière des jambes. Stimule les organes abdominaux. Renforce la colo', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483093/yoga-api/40_dkmow6.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483093/yoga-api/40_dkmow6.png', 'https://www.dropbox.com/s/6z51vzosovhx5w7/straddlesplit.svg?raw=1', 3),
(41, 'Vṛkṣāsana', 'Posture de l\'arbre', 'À partir d\'une position debout, un pied est enraciné dans la terre avec le talon opposé ancré dans la cuisse intérieure, les orteils pointant vers la terre. Le bassin et le menton sont rentrés. Les bras sont levés au-dessus de la tête avec les paumes jointes en position de prière. Le regard est dirigé vers l\'avant.\n\n\n\n', 'Renforce les jambes, les chevilles et les pieds. Améliore la flexibilité des hanches et des genoux. ', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483094/yoga-api/41_veknug.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483094/yoga-api/41_veknug.png', 'https://www.dropbox.com/s/mn2ktlihp12mtfa/tree.svg?raw=1', 2),
(42, 'Trikoṇāsana', 'Triangle', 'À partir d\'une position debout, les jambes sont droites et écartées en une large posture. Les pieds sont alignés et à plat sur la terre, avec le pied arrière orienté à un angle de 60 degrés vers l\'avant. Les faces internes des cuisses sont tournées vers l\'extérieur, loin l\'une de l\'autre. Le bassin est rentré et la cage thoracique est relevée. Un bras s\'étend vers le ciel tandis que l\'autre descend vers la terre. Les deux bras sont alignés avec les épaules en une ligne droite. Les doigts s\'étirent vers l\'extérieur tandis que les omoplates se serrent ensemble. Le regard est dirigé vers l\'avant.', 'Étire et renforce les cuisses, les genoux et les chevilles. Étire les hanches, l\'aine, les muscles i', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483096/yoga-api/42_jawxqw.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483096/yoga-api/42_jawxqw.png', 'https://www.dropbox.com/s/l41pfqjwmjoy5os/triangle.svg?raw=1', 1),
(43, 'Ūrdhva Mukha Śvānāsana', 'Chien tête en haut', 'Le corps est en position ventrale, parallèle à la terre. Le poids du corps est soutenu de manière égale par les bras tendus et le dessus des pieds, qui pressent fermement contre la terre. Les épaules sont tournées vers l\'arrière et vers le bas. La cage thoracique est relevée et tirée légèrement vers l\'avant dans une légère cambrure thoracique supérieure. Les articulations sont alignées, avec les poignets, les coudes et les épaules formant une ligne droite. Le cou est une extension naturelle de la colonne vertébrale et le menton est légèrement rentré. L\'abdomen est tiré vers le haut en direction de la colonne vertébrale. Les paumes sont plates et les coudes sont près du corps. Le regard est dirigé vers l\'avant.', 'Améliore la posture. Renforce la colonne vertébrale, les bras et les poignets. Étire la poitrine, le', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483096/yoga-api/43_m3nxjk.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483096/yoga-api/43_m3nxjk.png', 'https://www.dropbox.com/s/vnfx1srlwt1583t/updog.svg?raw=1', 1),
(44, 'Vīrabhadrāsana I', 'Guerrier un', 'À partir d\'une position debout, les jambes sont écartées en une large posture, les pieds alignés et à plat sur la terre. Le pied arrière est orienté à un angle de 60 degrés vers l\'avant. Les hanches sont alignées. Les faces internes des cuisses sont tournées l\'une vers l\'autre. Le genou avant est plié à un angle de 90 degrés directement au-dessus de la cheville. Les bras s\'étendent vers le ciel avec les biceps près des oreilles. Les mains peuvent être ensemble ou séparées, les paumes se faisant face avec les doigts écartés largement. La cage thoracique est relevée et le bassin rentré. Le regard est dirigé vers l\'avant.', 'Étire la poitrine, les poumons, les épaules, le cou, le ventre et l\'aine (psoas). Renforce les épaul', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483096/yoga-api/44_dqeayo.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483096/yoga-api/44_dqeayo.png', 'https://www.dropbox.com/s/j9fip5gm1o1l3fx/warrior1.svg?raw=1', 1),
(45, 'Vīrabhadrāsana II', 'Guerrier deux', 'À partir d\'une position debout, les jambes sont écartées en une large posture. Le genou avant est plié à un angle de 90 degrés directement au-dessus de la cheville. La jambe arrière est étendue et droite, avec le bord extérieur du pied arrière agrippant la terre à un angle de 60 degrés vers l\'avant. Les faces internes des cuisses sont tournées vers l\'extérieur, loin l\'une de l\'autre. Le bassin est rentré. La cage thoracique est relevée. Les bras sont étendus sur les côtés et alignés avec les épaules en une ligne droite, avec les doigts tendus vers l\'extérieur tandis que les omoplates se serrent ensemble. Le regard est dirigé vers les doigts de devant.', 'Renforce et étire les jambes et les chevilles. Étire l\'aine, la poitrine, les poumons et les épaules', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483096/yoga-api/45_ehimr1.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483096/yoga-api/45_ehimr1.png', 'https://www.dropbox.com/s/rsb3mx41dfq4otl/warrior2.svg?raw=1', 1),
(46, 'Vīrabhadrāsana III', 'Guerrier trois', 'À partir d\'une position debout, une jambe est enracinée et perpendiculaire à la terre, tandis que l\'autre jambe est levée, étendue vers l\'arrière et parallèle à la terre. La tête du fémur de la jambe en appui presse vers l\'arrière vers le talon et est activement enracinée dans la terre. Les bras et la jambe étendue se rallongent dans des directions opposées avec les bandhas (verrous énergétiques) activés. Les hanches sont alignées et le coccyx est fermement ancré dans le bassin. Les bras, le torse et la jambe levée étendue doivent être positionnés relativement parallèles au sol. Le regard est dirigé vers l\'avant ou vers le bas.', 'Renforce les chevilles et les jambes. Renforce les épaules et les muscles du dos. Tonifie l\'abdomen.', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483097/yoga-api/46_lz6v7i.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483097/yoga-api/46_lz6v7i.png', 'https://www.dropbox.com/s/lwgoky3z37ameif/warrior3.svg?raw=1', 3),
(47, 'Ūrdhva Dhanurāsana', 'Posture de la roue', 'À partir d\'une position allongée sur le dos, les paumes sont enracinées dans la terre avec les doigts pointés vers les talons. Les pieds sont fermement posés au sol. Les hanches sont relevées. Les cuisses sont légèrement tournées vers l\'intérieur. La colonne thoracique est arquée, créant une forte courbe en croissant le long de la colonne vertébrale. Le regard est dirigé vers l\'avant.', 'Renforce les bras, les poignets, les jambes, les fessiers, les abdominaux et la colonne vertébrale. ', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483097/yoga-api/47_w2jsof.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483097/yoga-api/47_w2jsof.png', 'https://www.dropbox.com/s/kpa1bewuut3lm5q/wheel.svg?raw=1', 3),
(48, 'Camatkārāsana', 'Chose sauvage', 'À partir de la posture du chien tête en bas, levez une jambe vers le ciel et alignez la hanche correspondante sur l\'autre hanche. Approchez autant que possible le talon supérieur des fesses. Les hanches restent alignées, puis avancez lentement les épaules au-dessus des mains. Replacez la main correspondante à la jambe levée avec l\'autre main et basculez-vous en avant en étendant la main supérieure vers l\'avant. Le bas du pied est maintenant orienté vers l\'avant du tapis, et vous restez sur la pointe du pied supérieur avec le genou correspondant plié. Continuez à lever les hanches vers le ciel et continuez à tendre la main libre vers l\'avant de la pièce, légèrement vers le bas. Laissez la tête s\'incliner en arrière.', 'Étire la poitrine, les épaules, le dos et la gorge. Renforce et ouvre les hanches, les fléchisseurs ', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483097/yoga-api/48_unoav6.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483097/yoga-api/48_unoav6.png', 'https://www.dropbox.com/s/d1dbdvo4l7xry4w/downdogflip.svg?raw=1', 3);

INSERT INTO `Pose_Category` (`poseId`, `categoryId`) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 1),
(2, 2),
(2, 3),
(3, 4),
(3, 5),
(5, 2),
(5, 6),
(5, 7),
(6, 4),
(6, 5),
(7, 1),
(8, 4),
(8, 5),
(9, 1),
(9, 3),
(9, 8),
(10, 6),
(10, 7),
(10, 9),
(11, 9),
(12, 8),
(13, 1),
(13, 10),
(14, 1),
(14, 3),
(14, 8),
(15, 3),
(15, 6),
(15, 8),
(16, 7),
(16, 8),
(16, 11),
(17, 7),
(17, 8),
(17, 11),
(18, 3),
(18, 8),
(19, 3),
(19, 12),
(20, 6),
(21, 8),
(21, 11),
(22, 3),
(22, 8),
(22, 11),
(23, 8),
(24, 5),
(25, 5),
(25, 7),
(26, 1),
(26, 3),
(26, 10),
(27, 12),
(28, 3),
(28, 6),
(28, 8),
(29, 8),
(30, 2),
(30, 6),
(31, 2),
(32, 2),
(32, 7),
(33, 11),
(33, 12),
(34, 1),
(34, 10),
(34, 11),
(35, 4),
(35, 5),
(36, 2),
(37, 8),
(38, 6),
(39, 8),
(39, 11),
(40, 2),
(40, 6),
(40, 7),
(41, 8),
(41, 11),
(42, 3),
(42, 8),
(43, 4),
(43, 5),
(44, 3),
(44, 8),
(45, 3),
(45, 8),
(46, 3),
(46, 8),
(46, 11),
(47, 3),
(47, 4),
(47, 5),
(48, 4),
(48, 10);

INSERT INTO `Session` (`id`, `title`, `description`, `duration`, `difficultyId`, `userId`, `isCustom`) VALUES
(1, 'Yoga pour renforcer le corps', 'Travaillez et tonifiez l\'ensemble de votre corps avec des poses de yoga pour la musculation telles que la Chaise, le Guerrier I et la Pose de l\'Angle Étendu.', 15, 1, NULL, 0),
(2, 'Yoga étirements dorsaux', 'Découvrez les effets puissants des étirements dorsaux de yoga grâce à des instructions étape par étape, des séquences et des conseils d\'experts pour maintenir votre pratique sans douleur.', 20, 3, NULL, 0),
(3, 'Yoga assis', 'Pratiquez le yoga avec des postures assises qui vous aident à trouver un meilleur alignement, à augmenter votre flexibilité et à soulager les douleurs et les gênes du bas du dos. Tonifiez votre ventre, massez vos organes internes et soulagez les douleurs du bas du dos avec ces postures de yoga assises.', 20, 2, NULL, 0),
(4, 'Nouvelle Session', 'Description de la nouvelle session.', 15, NULL, 1, 1);

INSERT INTO `Session_Pose` (`sessionId`, `poseId`) VALUES
(1, 1),
(1, 2),
(1, 9),
(1, 14),
(1, 15),
(1, 18),
(1, 19),
(1, 22),
(1, 26),
(1, 28),
(1, 42),
(1, 44),
(1, 45),
(1, 46),
(1, 47),
(2, 3),
(2, 6),
(2, 8),
(2, 24),
(2, 25),
(2, 35),
(2, 43),
(2, 47),
(3, 1),
(3, 2),
(3, 5),
(3, 22),
(3, 23),
(3, 32),
(3, 36),
(3, 40);

INSERT INTO `User` (`id`, `username`, `email`, `password`, `date_joined`) VALUES
(1, 'Ana', 'ana@gmail.com', '$2b$10$5B9FB.4Idhk2H1dLI9xeIutY8WATBCuMMPLdMMTyhp/3..hwAW9mW', '2024-01-05 21:25:36'),
(2, 'John', 'john@free.fr', '$2b$10$l82pbm1lFL7.ad70kreHZej4UWv5LzMpb8M9shscNBuWYBGnuqdPO', '2024-01-05 21:26:09'),
(3, 'Marie', 'marie@gmail.com', '$2b$10$ZSgdOtNdmj6HXyGm9WUDm.8nwTH4p2HkuSbl3U85B20U1/UViUHFC', '2024-01-13 09:26:54');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;