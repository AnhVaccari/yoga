-- -------------------------------------------------------------
-- TablePlus 5.8.0(526)
--
-- https://tableplus.com/
--
-- Database: yoga-app
-- Generation Time: 2024-01-26 10:46:40.2130
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
(1, 'Core Yoga', 'Engage your abdominal muscles with core yoga poses that build a strong and stable center like Boat Pose, Dolphin Pose and Side Plank Pose.'),
(2, 'Seated Yoga', ' Yoga practice with seated poses that help you find better alignment, increase your flexibility, and relieve lower back pain and discomfort. Tone the belly, massage your internal organs, and relieve lower back pain in these seated yoga poses. '),
(3, 'Strengthening Yoga', 'Work and tone your entire body with strengthening yoga poses like Chair Pose, Warrior I Pose and Extended Side Angle Pose.'),
(4, 'Chest Opening Yoga', 'Open your heart and shoulders in chest opening yoga poses like Camel Pose, Fish Pose and Wild Thing.'),
(5, 'Backbend Yoga', 'Discover the powerful effects of yoga backbends with step-by-step instructions, sequences, and expert advice to keep your practice pain-free.'),
(6, 'Forward Bend Yoga', 'Learn how to work stiff muscles safely, promote lower-body flexibility, and find correct alignment with forward bend yoga poses.'),
(7, 'Hip Opening Yoga', 'Loosen tight hips, improve your range of motion and circulation, alleviate back pain and more in these hip-opening yoga poses.'),
(8, 'Standing Yoga', 'Develop strength and stability in your standing poses, and feel the benefits throughout your practice. Build strength and set the foundation for a safe yoga practice. '),
(9, 'Restorative Yoga', 'Restorative yoga focuses on winding down after a long day and relaxing your mind. At its core, this style focuses on body relaxation. You spend more time in fewer postures throughout the class. Many of the poses are modified to be easier and more relaxing. Restorative yoga also helps to cleanse and free your mind.'),
(10, 'Arm Balance Yoga', 'Move past fear, build better balance, and strengthen your body with arm balance yoga poses like Crane Pose, Plank Pose, Firefly Pose amd more.'),
(11, 'Balancing Yoga', 'Build a strong foundation for your asana practice with these balancing yoga poses. Get step-by-step instructions and reap the benefits.'),
(12, 'Inversion Yoga', 'Master inversions—overcome fear and discover how to defy gravity with these step-by-step instructions. Learn how to prepare for and stay safe in inversion yoga poses.');

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
(1, 'Nāvāsana', 'Bateau', 'From a seated position the feet are lifted up so that the thighs are angled about 45-50 degrees relative to the earth.  The tailbone is lengthened into the earth and the pubis pulls toward the navel.  The shoulder blades are spread across the back and the hands reach around the back of the calves, with legs pulled towards the body.  The chin is tipped slightly toward the sternum so that the base of the skull lifts lightly away from the back of the neck.  Gaze is forward.', 'Renforce  l\'abdomen, les fléchisseurs de la hanche et la colonne vertébrale. Stimule les reins, la t', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483071/yoga-api/1_txmirf.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483071/yoga-api/1_txmirf.png', 'https://www.dropbox.com/s/4m64ztxkj8a4dab/boatstraightlegs.svg?raw=1', 2),
(2, 'Ardha Nāvāsana', 'Demi-bateau', 'From a seated position the hands are gripped around the back of the legs and the knees are bent in a 90 degree angle.  Both legs are pulled in towards the abdomen.  The core is engaged to maintain balance on the sits bones (be sure that the back does not round).  The front of the torso lengthens between the pubis and top of the sternum as the spine extends in both directions reaching up to the sky and rooting down to the earth.  The gaze is forward and Bandhas are engaged.', 'Renforce l\'abdomen, les fléchisseurs de la hanche et la colonne vertébrale. Stimule les reins, la th', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483073/yoga-api/2_ozh7sv.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483073/yoga-api/2_ozh7sv.png', 'https://www.dropbox.com/s/1nx0r94msxjwvyp/boatbentlegs.svg?raw=1', 1),
(3, 'Dhanurāsana', 'Arc', 'From a prone position with the abdomen on the earth, the hands grip the ankles (but not the tops of the feet) with knees no wider than the width of your hips.  The heels are lifted away from the buttocks and at the same time the thighs are lifted away from the earth working opposing forces as the heart center, hips and back open.  The gaze is forward.', 'Etire l\'ensemble de l\'avant du corps, les chevilles, les cuisses et l\'aine, l\'abdomen et la poitrine', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483072/yoga-api/3_aa0fgk.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483072/yoga-api/3_aa0fgk.png', 'https://www.dropbox.com/s/wizj5kwxvez4c0a/bow.svg?raw=1', 2),
(4, 'Setu Bandha Sarvāṅgāsana', 'Pont', 'From a supine position, on your back, the hips are pressed up with the heels of the feet rooted into the earth close to the sits bones.  The toes are actively lifted and the pelvis tucked.  The thighs are parallel to the earth and the fingers are interlaced under the body with the ribcage lifted and the heart open.  The back of the neck rests on the earth.  The gaze is to the sky.', 'Etire la poitrine, le cou et la colonne vertébrale. Stimule les organes abdominaux, les poumons et l', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483074/yoga-api/4_qq6nxw.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483074/yoga-api/4_qq6nxw.png', 'https://www.dropbox.com/s/f1w64ybg4sn8ejt/bridge.svg?raw=1', 2),
(5, 'Baddha Koṇāsana', 'Papillon', 'In sitting position, bend both knees and drop the knees to each side, opening the hips.  Bring the soles of the feet together and bring the heels as close to the groin as possible, keeping the knees close to the ground.  The hands may reach down and grasp and maneuver the feet so that the soles are facing upwards and the heels and little toes are connected.  The shoulders should be pulled back and no rounding of the spine.', 'Ouvre les hanches et l\'aine. Étire les épaules, la cage thoracique et le dos. Stimule les organes ab', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483074/yoga-api/5_i64gif.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483074/yoga-api/5_i64gif.png', 'https://www.dropbox.com/s/3h2pts6xbn28dh7/butterfly%3F.svg?raw=1', 1),
(6, 'Uṣṭrāsana', 'Chameau', 'From a kneeling position the knees are hip width apart and the thighs are perpendicular to the earth.  The inner thighs are narrowed and rotated slightly inward with the buttocks engaged but not hardened.  The tailbone is tucked under but the hips do not puff forward.  The shins and tops of the feet are pressed firmly into the earth.  The ribcage is open, along with the heart center, but the lower front ribs do not protrude sharply towards the sky.  The lower back lifts the ribs away from the pelvis to keep the lower spine as long as possible.  The base of the palms are pressed firmly against the soles (or heels) of the feet and the fingers are pointed toward the toes.  The arms are extended straight and are turned slightly outward at the shoulder joint so the elbow creases face forward without squeezing the shoulder blades together.  The neck is in a relatively neutral position, neither flexed nor extended, or (for the advanced practitioners only) the head drops back.  Be careful not to strain your neck and harden your throat.  The gaze is either towards the sky or towards the earth, depending upon your flexibility.', 'Etire l\'ensemble de l\'avant du corps, les chevilles, les cuisses et l\'aine, l\'abdomen et la poitrine', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483075/yoga-api/6_ri1w0e.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483075/yoga-api/6_ri1w0e.png', 'https://www.dropbox.com/s/o5gr4lngltsdg5r/camel.svg?raw=1', 2),
(7, 'Marjaryāsana', 'Chat', 'From box neutral shift some weight to the palms.  The wrists, elbows and shoulders are in one line.  The abdomen is pulled in and up with the spine arched in a strong Cobra spine.  The crown of the head is towards the earth and the neck is relaxed.  The gaze is between the arms towards the belly.', 'Soulage la colonne vertébrale et le cou. Dynamise le corps.', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483075/yoga-api/7_a6aspg.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483075/yoga-api/7_a6aspg.png', 'https://www.dropbox.com/s/cginnz98of2jpgr/cat.svg?raw=1', 1),
(8, 'Bitilāsana', 'Vache', 'From  box neutral the ribcage is lifted with a gentle sway in the low back.  The tailbone lifts up into dog tilt.  The eyes are soft and the gaze is to the sky.', 'Elimine la fatigue. Améliore la respiration et la circulation sanguine vers le cerveau. Rafraîchit l', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483077/yoga-api/8_wi10sn.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483077/yoga-api/8_wi10sn.png', 'https://www.dropbox.com/s/neau4ceai1rskh6/cow.svg?raw=1', 1),
(9, 'Utkaṭāsana', 'Chaise', 'From a standing position, the feet are together and rooted into the earth with toes actively lifted.  The knees are bent and the weight of the body is on the heels of the feet.  The pelvis is tucked in and the ribcage is lifted.  The neck is a natural extension of the spine.  The arms are lifted up toward the sky with the elbows straight and the biceps by the ears.  The hands can be together or separated and facing each other with the fingers spread wide.  The gaze is forward.', 'Renforce les chevilles, les cuisses, les mollets et la colonne vertébrale. Étire les épaules et la p', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483078/yoga-api/9_ewvoun.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483078/yoga-api/9_ewvoun.png', 'https://www.dropbox.com/s/9emlawz8vayk8bm/chair.svg?raw=1', 1),
(10, 'Balāsana', 'Posture de l\'enfant', 'From a kneeling position, the toes and knees are together with most of the weight of the body resting on the heels of the feet.  The arms are extended back resting alongside the legs.  The forehead rests softly onto the earth.  The gaze is down and inward.', 'Etire doucement les hanches, les cuisses et les chevilles. Apaise le cerveau et contribue à soulager', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483079/yoga-api/10_wzpo85.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483079/yoga-api/10_wzpo85.png', 'https://www.dropbox.com/s/ini3uwali0q5gxa/child.svg?raw=1', 1),
(11, 'Śavāsana', 'Posture du cadavre', 'The body rests on the earth in a supine position with the arms resting by the side body.  The palms are relaxed and open toward the sky.  The shoulder blades are pulled back, down and rolled under comfortably, resting evenly on the earth.  The legs are extended down and splayed open.  The heels are in and the toes flop out.  The eyes are closed.  Everything is relaxed.  The gaze is inward.', 'Apaise le cerveau et contribue à soulager le stress et une légère dépression. Détend le corps. Rédui', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483078/yoga-api/11_dczyrp.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483078/yoga-api/11_dczyrp.png', 'https://www.dropbox.com/s/eohyx2crvtjvaxb/sivasana.svg?raw=1', 1),
(12, 'Ashta Chandrāsana', 'Fente croissant', 'From mountain pose, on the inhalation bring the hands up and interlace the fingers together. Exhale, bend to one side, lengthening the opposite of the rib cage and stretch.', 'Etire la cage thoracique, les bras et le torse. Tonifie les muscles obliques.', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483080/yoga-api/12_pv4p1z.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483080/yoga-api/12_pv4p1z.png', 'https://www.dropbox.com/s/1oc1dqv8mfwo8uj/highlunge.svg?raw=1', 2),
(13, 'Bakāsana', 'Corbeau', 'From an inverted position, with the hips up and the head down, the arms are bent in a 90-degree angle with the knees resting on the elbows.  The palms are firmly rooted into the earth with knuckles pressed firmly into the earth for support.  The belly is pulled up and in towards the spine with the ribcage and chin lifted.  The weight of the body shifts slightly forward as the toes lift up and off the earth into the full expression of the pose.  The gaze is down and slightly forward.', 'Renforce les bras et les poignets. Étire le haut du dos. Renforce les muscles abdominaux. Ouvre l\'ai', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483083/yoga-api/13_hdjxuz.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483083/yoga-api/13_hdjxuz.png', 'https://www.dropbox.com/s/ukaxoioh0uooswj/crow.svg?raw=1', 2),
(14, 'Pīñcha Mayūrāsana', 'Dauphin', 'From Downward-Facing Dog, the forearms are planted onto the earth with the elbows narrow and the palms down in a Sphinx position. The pelvis is tucked. The ribcage lifted. The feet are rooted and the legs are straight with the tailbone in dog tilt. The gaze is down and slightly forward.', 'Apaise le cerveau et contribue à soulager le stress et une légère dépression. Dynamise le corps. Éti', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483080/yoga-api/14_k9lr9a.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483080/yoga-api/14_k9lr9a.png', 'https://www.dropbox.com/s/px1foombb3v24se/dolphin.svg?raw=1', 3),
(15, 'Parivṛtta Adho Mukha Śvānāsana', 'Chien tête en bas', 'From downward_dog.html the legs are straight with the sits bones tilted up and reaching for the sky.  The feet are flat with the heels firmly rooted.  One palm is flat with the knuckles evenly pressed into the earth.  The other hand reaches under the body and grasps the opposite ankle.  The spine is long and the heart is open toward the sky.  The neck is loose and the crown of the head is relaxed toward the earth.  The gaze is toward the center.', 'Apaise le cerveau et contribue à soulager le stress et une légère dépression. Renforce les bras et l', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483081/yoga-api/15_vkviqn.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483081/yoga-api/15_vkviqn.png', 'https://www.dropbox.com/s/75xa1bduu2u5y7d/downdog.svg?raw=1', 2),
(16, 'Garuḍāsana', 'Aigle', 'From a standing position the one thigh is crossed over the other with the toes and/or the ankle hooked behind the lower calf.  The weight of the body is balanced on the standing foot.  The arms are crossed in front of the torso so that one arm is crossed above the other arm.  The top arm is tucked into the elbow crook of the bottom arm.  The hands are hooked around each other as well.  Once hooked, the elbows lift up and the fingers stretch towards the ceiling.  The gaze is soft and forward.', 'Renforce et étire les chevilles et les mollets. Étire les cuisses, les hanches, les épaules et le ha', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483081/yoga-api/16_g7ueht.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483081/yoga-api/16_g7ueht.png', 'https://www.dropbox.com/s/w05qgx7wyxva1y3/eagle.svg?raw=1', 2),
(17, 'Utthita Hasta Pādāṅguṣṭhāsana', 'Bras tendu au gros orteil', 'From mountain.html pose, lift one foot.  Bend forward and catch the toes with the fingers.  Place the other hand on the hip to square the hip towards the front.  Slowly straighten the knee and the torso and open the leg to one side.  Use a strap if necessary.  Gaze towards the front or opposite of the extended leg for balance.', 'Ouvre les hanches et l\'aine. Étire les ischio-jambiers, les bandes ilio-tibiales et les jambes. Amél', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483084/yoga-api/17_l9joyu.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483084/yoga-api/17_l9joyu.png', 'https://www.dropbox.com/s/0yk0z7f0a4ni37l/extendedhandtotoe.svg?raw=1', 3),
(18, 'Utthita Pārśvakoṇāsana', 'Angle latéral étendu', 'From warrior II the lower body stays static while the upper body is folded forward at the crease of the hip.  One arm is extended toward the front with the bicep by the ear and the fingers spread wide while the other reaches down to the earth on the inside of the thigh.  The upper torso and the gaze twist up towards the sky.', 'Renforce et étire les jambes, les genoux et les chevilles. Étire l\'aine, la colonne vertébrale, la t', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483083/yoga-api/18_aqufak.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483083/yoga-api/18_aqufak.png', 'https://www.dropbox.com/s/yzynxmyb9o7eras/extendedsideangle.svg?raw=1', 2),
(19, 'Pīñcha Mayūrāsana', 'Paon à plumes', 'From an inverted position, with the body perpendicular to the earth, the weight of the body is supported on the forearms that are parallel and pressed firmly into the earth.  The palms are flat.  The knuckles are evenly pressed into the earth.  The fingers are spread wide.  Both legs reach up toward the sky in a straight line with the pelvis tucked.  The ribcage is lifted.  The gaze is forward.', 'Renforce les bras et les épaules. Améliore la concentration et l\'équilibre. Étire le haut et le bas ', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483084/yoga-api/19_jadqwc.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483084/yoga-api/19_jadqwc.png', 'https://www.dropbox.com/s/kjlyju4m91qgoi6/forearmstand.svg?raw=1', 3),
(20, 'Uttānāsana', 'Courber vers l\'avant', 'From a standing position, the body is folded over at the crease of the hip with the spine long.  The neck is relaxed and the crown of the head is towards the earth.  The feet are rooted into the earth.  The toes are actively lifted.  The spine is straight.  The ribcage is lifted.  The chest and the thighs are connected.  The sacrum lifts up toward the sky in dog tilt.  The fingers are interlaced behind the body and the palms are together.  The arms and elbows are straight.  The shoulder blades rotate towards each other as the hands move forward (away from the lower back).  The gaze is down and inward.', 'Apaise le cerveau et contribue à soulager le stress et une légère dépression. Stimule le foie et les', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483085/yoga-api/20_uogrfq.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483085/yoga-api/20_uogrfq.png', 'https://www.dropbox.com/s/sjqfq99pqpelv4v/forwardfoldshoulderstretch.svg?raw=1', 2),
(21, 'Ardha Chandrāsana', 'Demi-lune', 'From a standing position one leg is straight while the other is extended back parallel to the earth (or a little above parallel) and one hand is on the earth (beyond the little-toe side of the foot, about 12 inches) while the other hand is extended up towards the sky.  The shoulder blades are squeezed together and the fingers move outward in opposing directions.  The weight of the body is supported mostly by the standing leg while the bottom hand has very little weight on it but is used intelligently to regulate balance.  The upper torso is rotated open to the sky.  Both hips are externally rotated.  Energy is extended actively through the flexed toes to keep the raised leg strong.  The inner ankle of the standing foot is lifted strongly upward, as if drawing energy from the earth.  The sacrum and scapulae are firmly pressed against the back torso and lengthen the coccyx toward the raised foot.  The gaze is either up or down, depending on the condition of the neck.  If injured the gaze is down.', 'Renforce l\'abdomen, les chevilles, les cuisses, les fessiers et la colonne vertébrale. Étire l\'aine,', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483085/yoga-api/21_etedlp.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483085/yoga-api/21_etedlp.png', 'https://www.dropbox.com/s/gpumf9eehr8wo9g/halfmoon.svg?raw=1', 3),
(22, 'Adho Mukha Vṛkṣāsana', 'Posture sur les mains', 'In this inverted posture the weight of the body is on the hands - shoulder-width apart with fingers forward and parallel to each other (if the shoulders are tight, the index fingers are turned out slightly).  The shoulder blades are firm against the back torso and pulled up toward the tailbone.  The upper arms are rotated outward with the eye of the elbow to the front of the room to keep the shoulder blades broad while the outer arms hug inward in opposing forces for balance and stability.  The palms are spread and the bases of the index fingers are pressed firmly against the earth.  Balance is maintained by keeping the Bandhas engaged while pressing the earth away with straight arms and flexed feet.  The gaze is down and forward.', 'Renforce les épaules, les bras et les poignets. Étire le ventre. Améliore le sens de l\'équilibre. Ap', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483085/yoga-api/22_ojzmr8.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483085/yoga-api/22_ojzmr8.png', 'https://www.dropbox.com/s/p7pf5j0untktn9c/handstand.svg?raw=1', 3),
(23, 'Aṅjaneyāsana', 'Fente basse en croissant', 'The front knee is bent in a 90-degree angle directly above the ankle and the back knee is resting on the earth with the top of the back foot pressed firmly into the earth.  The hips are squared and pressed forward.  The inner thighs scissor towards each other.  The pelvis is tucked under to protect the low back.  The ribcage is lifted.  The arms are lifted.  The hands can be together or separated and facing each other with the fingers spread wide.  The gaze is forward.', 'Etire la poitrine , les poumons, le cou, le ventre et l\'aine (psoas). Renforce les épaules, les bras', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483086/yoga-api/23_k2jccj.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483086/yoga-api/23_k2jccj.png', 'https://www.dropbox.com/s/h0ehjaz1wa9xfu1/lowlunge.svg?raw=1', 1),
(24, 'Supta Kapotāsana', 'Pigeon', 'Lie on the back in supine position.  Bend the knees, heels close to SI bones and cross one ankle over the opposite knee.  Thread the hands or reach through between the thighs.  Lift the foot off the floor and hold the bent knee behind the thigh or shin to bring it closer to the chest, make sure that the acrum is rooted to the floor.', 'Etire les ischio-jambiers et les quadriceps. Si le coude est utilisé pour pousser la cuisse, cela ou', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483088/yoga-api/24_ulgsjo.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483088/yoga-api/24_ulgsjo.png', 'https://www.dropbox.com/s/77peru289zm446u/pigeon.svg?raw=1', 2),
(25, 'Eka Pāda Rājakapotāsana', 'Pigeon Royal', 'From a seated position with the hips squared, one leg is extended forward with the knee bent and parallel to the earth.  The front heel is rooted close to the groin (or extended out in a 90 degree angle if flexibility allows).  The other leg is extended back with the knee bent and perpendicular to the earth.  The back foot is hooked on the inside of the elbow of the back arm.  The front elbow is bent upward perpendicular to the earth with the bicep by the ear.  The fingers are interlaced to connect the bind behind the body and assist in opening the chest.  The gaze is natural and forward.', 'Étire les cuisses, l\'aine (psoas), l\'abdomen, la poitrine, les épaules et le cou. Stimule les organe', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483087/yoga-api/25_rssro9.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483087/yoga-api/25_rssro9.png', 'https://www.dropbox.com/s/10usd0gcqgy6o53/kingpigeon.svg?raw=1', 2),
(26, 'Phalakāsana', 'Planche', 'The body is parallel to the earth.  The weight of the body is supported by straight arms and active toes.  The abdomen is pulled up towards the spine and the pelvis is tucked in.  The neck is a natural extension of the spine and the chin is slightly tucked.  The palms are flat and the elbows are close to the side body.  The joints are stacked with the wrists, elbows and shoulders in a straight line perpendicular to the earth.  The gaze follows the spine and the eyes are focused down.', 'Renforce les bras, les poignets et la colonne vertébrale. Tonifie l\'abdomen.', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483088/yoga-api/26_mxkzlo.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483088/yoga-api/26_mxkzlo.png', 'https://www.dropbox.com/s/jg6ge8zpaltx10f/plank.svg?raw=1', 2),
(27, 'Halāsana', 'La charrue', 'From a supine position, the upper back rests on the earth with the hips and legs revolved back over the torso above and beyond the head towards the earth.  The torso is perpendicular to the earth.  The legs are fully extended with no bend at the knees as the toes reach for the earth.  The hands are either supporting the lower back or extended behind the back on the earth with extended elbows and fingers interlaced (as flexibility allows), opening the shoulders.  The neck is straight.  The chin tucked.  Do not look to the side as this may injure the neck.  The is gaze inward.', 'Apaise le cerveau. Stimule les organes abdominaux et les glandes thyroïdes. Étire les épaules et la ', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483088/yoga-api/27_m4yux9.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483088/yoga-api/27_m4yux9.png', 'https://www.dropbox.com/s/zi9231wbajm6d2m/plow.svg?raw=1', 2),
(28, 'Pārśvottānāsana', 'Pyramide', 'From a standing position with one leg forward and one back lean the torso forward at the crease of the hip joint.  Stop when the torso is parallel to the floor.  Press the fingertips or flat palms to the floor on either side of the front foot, maintaining a straight elongated spine.  If it isn’t possible to touch the floor, or to maintain a straight spine, support the hands on a pair of blocks.  Press the thighs back and lengthen the torso forward, lifting up through the top of the sternum.  Then, as flexibility allows, bring the front torso closer to the top of the thigh without rounding the spine.  Eventually the long front torso will rest down on the thigh.  The gaze is down.', 'Apaise le cerveau. Étire la colonne vertébrale, les épaules, les hanches et les ischio-jambiers. Ren', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483089/yoga-api/28_uu58tt.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483089/yoga-api/28_uu58tt.png', 'https://www.dropbox.com/s/j7p2600bmf840e0/pyramid.svg?raw=1', 2),
(29, 'Pārśva Vīrabhadrāsana', 'Guerrier inversé', 'From warrior II , the lower body stays static while the upper body arches back in a gentle back bend.  The top arm is extended back with the bicep by the ear and the fingers spread wide.  The other arm slides down the back leg resting on the thigh or shin, but not the knee joint.  The gaze is up towards the sky.', 'Renforce et étire les jambes, les genoux et les chevilles. Étire l\'aine, la colonne vertébrale, la t', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483089/yoga-api/29_ww7bot.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483089/yoga-api/29_ww7bot.png', 'https://www.dropbox.com/s/q6yn6cb9fglo0wp/reverswarrior.svg?raw=1', 2),
(30, 'Paśchimottānāsana', 'Assis pliée vers l\'avant', 'From a seated position with the sits bones rooted into the earth the legs extend forward to the degree that the chest and thighs can stay connected.  The fingers wrap around the toes.  The upper torso folds forward at the crease of the hips with the spine long.  The gaze is forward.', 'Apaise le cerveau et aide à soulager le stress et la dépression légère. Étire la colonne vertébrale,', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483091/yoga-api/30_gumpl3.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483091/yoga-api/30_gumpl3.png', 'https://www.dropbox.com/s/ji0otecqx42by00/seatedforwardfold.svg?raw=1', 1),
(31, 'Padmāsana', 'Lotus', 'Bring the bottom ankle and place it on top of the opposite knee, both ankles will be resting on top of the thighs.', 'Ouvre les hanches, l\'aine et étire les genoux, les chevilles et les cuisses. Renforce le dos, apaise', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483091/yoga-api/31_ozseum.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483091/yoga-api/31_ozseum.png', 'https://www.dropbox.com/s/0oylivjwzuj5fnp/seatedORlotus.svg?raw=1', 2),
(32, 'Ardhā Matsyendrāsana', 'Demi-seigneur des poissons', 'Begin in a seated position. Bend one knee so the sole of your foot is close to the opposite inner thigh. Bend your opposite knee in, foot on the floor, heel to the outside of your bent thigh. Extend your arm (same side of your Lotus leg) high into the sky and begin to twist it to the outside of your bent knee. Use your opposite hand as leverage to twist deeper. Hook your elbow to the outside of your thigh and gaze over your back shoulder. If you want to extend your twist deeper, wrap your arm around the shin of your bent knee and sweep your opposite arm around to meet it. Catch opposite fingertips or the wrist. Keep a long spine.', 'Étire les épaules, la poitrine, les cuisses, l\'aine et l\'abdomen. Renforce les jambes et les chevill', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483091/yoga-api/32_hafoa0.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483091/yoga-api/32_hafoa0.png', 'https://www.dropbox.com/s/u9joi8lbntxumyh/seatedspinaltwist.svg?raw=1', 3),
(33, 'Sālamba Sarvāṅgāsana', 'Chandelle', 'From a supine position, the upper back is resting on the earth with the hips straight up towards the sky.  The torso is perpendicular to the earth.  The legs are fully extended and the toes are active.  The hands are either supporting the lower back or extended up by the side body in matchstick.  The neck is flat on the earth and the chin is tucked in.  The gaze is inward.', 'Apaise le cerveau et aide à soulager le stress et la dépression légère. Stimule les glandes thyroïde', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483091/yoga-api/33_r7motl.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483091/yoga-api/33_r7motl.png', 'https://www.dropbox.com/s/tqj48exec3zub2u/shoulderstand.svg?raw=1', 2),
(34, 'Vasiṣṭhāsana', 'Planche sur le côté', 'From an arm balance position the weight of the body is supported on one side and distributed equally between the bottom arm and foot while the other (top) arm lifts with fingers spread wide and the other (top) foot stacks on top.  The grounded (bottom) foot is flat and gripping the earth from the outside edge of the foot.  If flexibility of the foot is limited then instead of gripping the earth with a flat foot, the weight of the body is balanced on the side edge of the foot that is flexed instead of flat.  The arm supporting the weight of the body and the grounded foot actively press into the floor as the shoulder blades firm against the back and then widen away from the spine drawing toward the tailbone.  Bandhas are engaged to maintain balance and stability.  The crown of the head reaches away from the neck and the gaze is up towards the hand.', 'Apaise le cerveau et aide à soulager le stress et la dépression légère. Étire les épaules, les muscl', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483093/yoga-api/34_qle5tp.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483093/yoga-api/34_qle5tp.png', 'https://www.dropbox.com/s/w35ciia4u570xj8/sideplank.svg?raw=1', 2),
(35, 'Sālamba Bhujaṅgāsana', 'Sphinx', 'From a prone position with the pelvic bowl is firmly contracted interiorly towards the center line of the body while the pubis is tucked under.  The legs are extended back and the tops of the feet are flat.  The palms are flat and the elbows are on the mat, stacked right below the shoulders.  On an inhalation, lift the sternum and extend the neck away from shoulders with the elbows, palms and pelvic bone firmly attached to the mat.', 'Renforce la colonne vertébrale. Étire la poitrine, les poumons, les épaules et l\'abdomen. Stimule le', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483092/yoga-api/35_dytwvz.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483092/yoga-api/35_dytwvz.png', 'https://www.dropbox.com/s/cl8teqpf9yingwm/sphinx.svg?raw=1', 1),
(36, 'Hanumānāsana', 'Posture du singe ', 'The hips are parallel and squared to the earth with one leg extended forward.  The opposite leg extended back with the knee and foot squared to the earth.  The inner thighs scissor towards each other.  The hands are by the side body or at the heart center in Anjali Mudra (Salutation Seal) or stretched straight up toward the sky.  The ribcage is lifted.  The heart is open.  The gaze is forward.', 'Étire les cuisses, les muscles ischio-jambiers et l\'aine. Stimule les organes abdominaux.', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483092/yoga-api/36_a2z20a.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483092/yoga-api/36_a2z20a.png', 'https://www.dropbox.com/s/u8dxhc41hjfcxj6/splits.svg?raw=1', 3),
(37, 'Mālāsana', 'Posture de la guirlande', 'From a squatting position the feet are as close together as possible (keep your heels on the floor if you can; otherwise, support them on a folded mat).  The thighs are slightly wider than the torso.  The torso is leaning gently forward and tucked snugly between the thighs.  The elbows are pressed against the inner knees and the palms are together in Anjali Mudra (Salutation Seal).  The knees resist the elbows to help lengthen the front torso.  The gaze is soft and forward.', 'Étire les chevilles, l\'aine et le torse arrière. Tonifie l\'abdomen.', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483093/yoga-api/37_moh7ii.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483093/yoga-api/37_moh7ii.png', 'https://www.dropbox.com/s/ntrwtdlr6tdkdxz/squat.svg?raw=1', 1),
(38, 'Uttānāsana', 'Cigogne', 'From a standing position, the body is folded over at the crease of the hip with the spine long.  The neck is relaxed and the crown of the head is towards the earth.  The feet are rooted into the earth with the toes actively lifted.  The spine is straight.  The ribcage is lifted.  The chest and the thighs are connected.  The sacrum lifts up toward the sky in dog tilt.  The fingertips are resting on the earth next to the toes.  The gaze is down or slightly forward.', 'Calme le cerveau et aide à soulager le stress et la dépression légère. Stimule le foie et les reins.', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483093/yoga-api/38_yb3thk.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483093/yoga-api/38_yb3thk.png', 'https://www.dropbox.com/s/u09snmhtposvaq0/standingforwardfold.svg?raw=1', 1),
(39, 'Ashta Chandrāsana', 'Croissant de lune', 'From mountain pose, on the inhalation bring the hands up and interlace the fingers together.  Exhale, bend to one side, lengthening the opposite of the rib cage and stretch.', 'Étire la cage thoracique, les bras et le torse. Tonifie les muscles obliques.', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483095/yoga-api/39_hqj0sa.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483095/yoga-api/39_hqj0sa.png', 'https://www.dropbox.com/s/9tv6z3qdcw2vg3a/standingstretch.svg?raw=1', 1),
(40, 'Upaviṣṭha Koṇāsana', 'Side Splits', 'From a wide stance the legs are open and extended sideways to your degree of flexibility.  The outer edges of the feet are rotated and gripping toward the earth.  The weight of the body is supported by the arms.  The palms are rooted into the earth with the fingers pointing towards the body.  There should be no excess weight on the knee or ankle joints as you lower down to your degree of flexibility. The gaze is down and slightly forward.', 'Etire les muscles intérieurs et arrière des jambes. Stimule les organes abdominaux. Renforce la colo', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483093/yoga-api/40_dkmow6.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483093/yoga-api/40_dkmow6.png', 'https://www.dropbox.com/s/6z51vzosovhx5w7/straddlesplit.svg?raw=1', 3),
(41, 'Vṛkṣāsana', 'Posture de l\'arbre', 'From a standing position, one foot is rooted into the earth with the opposite heel rooted into the inner thigh with the toes pointing towards the earth.  The pelvis and the chin are tucked in.  The arms are lifted above the head with the palms together in prayer position.  The gaze is forward.', 'Renforce les jambes, les chevilles et les pieds. Améliore la flexibilité des hanches et des genoux. ', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483094/yoga-api/41_veknug.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483094/yoga-api/41_veknug.png', 'https://www.dropbox.com/s/mn2ktlihp12mtfa/tree.svg?raw=1', 2),
(42, 'Trikoṇāsana', 'Triangle', 'From a standing position, the legs are straight and separated into a wide stance.  The feet are aligned and flat on the earth with the back foot in a 60-degree angle towards the front.  The inner thighs are rotated externally away from each other.  The pelvis is tucked and the ribcage is lifted.  One arm extends up towards the sky as the other reaches down to the earth.  Both arms are aligned with the shoulders in a straight line.  The fingers reach out as the shoulder blades squeeze together.  The gaze is toward the front.', 'Étire et renforce les cuisses, les genoux et les chevilles. Étire les hanches, l\'aine, les muscles i', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483096/yoga-api/42_jawxqw.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483096/yoga-api/42_jawxqw.png', 'https://www.dropbox.com/s/l41pfqjwmjoy5os/triangle.svg?raw=1', 1),
(43, 'Ūrdhva Mukha Śvānāsana', 'Chien tête en haut', 'The body is in a prone position parallel to the earth.  The weight of the body is supported equally by the straight arms and the tops of the feet which press firmly into the earth.  The shoulders are rotated back and down.  The ribcage is lifted and pulled thru to the front in a slight upper thoracic backbend.  The joints are stacked with the wrists, elbows and shoulders in a straight-line.  The neck is a natural extension of the spine and the chin is slightly tucked.  The abdomen is pulled up towards the spine.  The palms are flat and the elbows are close to the side body.  The gaze is forward.', 'Améliore la posture. Renforce la colonne vertébrale, les bras et les poignets. Étire la poitrine, le', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483096/yoga-api/43_m3nxjk.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483096/yoga-api/43_m3nxjk.png', 'https://www.dropbox.com/s/vnfx1srlwt1583t/updog.svg?raw=1', 1),
(44, 'Vīrabhadrāsana I', 'Guerrier un', 'From a standing position, the legs are in a wide stance with the feet aligned and flat on the earth.  The back foot is in a 60-degree angle towards the front.  The hips are squared.  The inner thighs are rotated towards each other.  The front knee is bent in a 90-degree angle directly above the ankle.  The arms extend up to the sky with the biceps by the ears.  The hands can be together or separated and facing each other with the fingers spread wide.  The ribcage is lifted and the pelvis tucked.  The gaze is forward.', 'Étire la poitrine, les poumons, les épaules, le cou, le ventre et l\'aine (psoas). Renforce les épaul', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483096/yoga-api/44_dqeayo.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483096/yoga-api/44_dqeayo.png', 'https://www.dropbox.com/s/j9fip5gm1o1l3fx/warrior1.svg?raw=1', 1),
(45, 'Vīrabhadrāsana II', 'Guerrier deux', 'From a standing position, the legs are separated into a wide stance.  The front knee is bent in a 90-degree angle directly above the ankle.  The back leg is extended and straight with the outside edge of the back foot gripping the earth in a 60-degree angle towards the front.  The inner thighs are externally rotated away from each other.  The pelvis is tucked.  The ribcage is lifted.  The arms are extended out to the sides and are aligned with the shoulders in a straight line with the fingers reaching out as the shoulder blades squeeze together.  The gaze is toward the front fingers.', 'Renforce et étire les jambes et les chevilles. Étire l\'aine, la poitrine, les poumons et les épaules', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483096/yoga-api/45_ehimr1.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483096/yoga-api/45_ehimr1.png', 'https://www.dropbox.com/s/rsb3mx41dfq4otl/warrior2.svg?raw=1', 1),
(46, 'Vīrabhadrāsana III', 'Guerrier trois', 'From a standing position, one leg is rooted and perpendicular to the earth while the other leg is raised, extended back and parallel to the earth.  The head of the thighbone of the standing leg presses back towards the heel and is actively rooted into the earth.  The arms and the extended leg lengthen in opposing directions with Bandhas engaged.  The hips are squared and the tailbone presses firmly into the pelvis.  The arms, torso, and extended raised leg should be positioned relatively parallel to the floor.  The gaze is forward or down.', 'Renforce les chevilles et les jambes. Renforce les épaules et les muscles du dos. Tonifie l\'abdomen.', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483097/yoga-api/46_lz6v7i.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483097/yoga-api/46_lz6v7i.png', 'https://www.dropbox.com/s/lwgoky3z37ameif/warrior3.svg?raw=1', 3),
(47, 'Ūrdhva Dhanurāsana', 'Posture de la roue', 'Pressed up from a supine position, lying on your back, the palms are rooted into the earth with the fingers pointed towards the heels.  The feet are grounded.  The hips are pressed up.  The thighs are rotated inward.  The thoracic spine is arched creating a strong crescent arch along the spinal column.  The gaze is forward.', 'Renforce les bras, les poignets, les jambes, les fessiers, les abdominaux et la colonne vertébrale. ', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483097/yoga-api/47_w2jsof.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483097/yoga-api/47_w2jsof.png', 'https://www.dropbox.com/s/kpa1bewuut3lm5q/wheel.svg?raw=1', 3),
(48, 'Camatkārāsana', 'Chose sauvage', 'From downward dog pose, elevate one leg toward the sky and stack the corresponding hip over the other hip.  Bring the upper heel as close to the buttocks as possible.  The hips remain stacked; then bring the shoulders forward slowly over the hands.  Replace the corresponding hand to the upraised leg with the other hand and flip yourself over and extend the top hand forward.  The bottom foot is now facing toward the front of the mat and you remain on the ball of the top foot and the corresponding knee is bent.  Continue to lift hips up towards the sky and continue reaching the free hand towards the front of the room and slightly downwards.  Allow the head to curl back.', 'Étire la poitrine, les épaules, le dos et la gorge. Renforce et ouvre les hanches, les fléchisseurs ', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483097/yoga-api/48_unoav6.svg', 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483097/yoga-api/48_unoav6.png', 'https://www.dropbox.com/s/d1dbdvo4l7xry4w/downdogflip.svg?raw=1', 3);

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