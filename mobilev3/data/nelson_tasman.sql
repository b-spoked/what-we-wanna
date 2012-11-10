-- phpMyAdmin SQL Dump
-- version 2.11.11.3
-- http://www.phpmyadmin.net
--
-- Host: 118.139.179.50
-- Generation Time: Nov 09, 2012 at 01:38 AM
-- Server version: 5.0.92
-- PHP Version: 5.3.2

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Database: `adminwww`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL auto_increment,
  `comment` text NOT NULL,
  `rating` int(11) default NULL,
  `userID` int(11) NOT NULL,
  `noteID` int(11) NOT NULL,
  `addedon` date default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` VALUES(1, 'The walk was fantastic, we had a buggy and it was no dramas at all.', 4, 2, 2, '2012-09-25');
INSERT INTO `comments` VALUES(2, 'We have both a 2 and 5 year old and they were both entertained at the playground.', 4, 2, 2, '2012-09-25');
INSERT INTO `comments` VALUES(3, 'The kids totally ignored the playground but loved the ducks!.', 4, 2, 2, '2012-09-25');
INSERT INTO `comments` VALUES(4, 'A bit too challenging for our 3 year but would be good for older kids.', 3, 2, 2, '2012-09-25');
INSERT INTO `comments` VALUES(5, 'The toilet was a nightmare - no water and unclean! Steer clear.', 1, 2, 2, '2012-09-25');
INSERT INTO `comments` VALUES(6, 'The good - trains where a massive hit. The bad - trying to get the kids to leave. Awesome!!', 5, 2, 2, '2012-09-25');

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `id` int(11) NOT NULL auto_increment,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `address` text NOT NULL,
  `latitude` text NOT NULL,
  `longitude` text NOT NULL,
  `tags` text,
  `rating` int(11) default NULL,
  `userID` int(11) default NULL,
  `addedon` date default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=295 ;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` VALUES(1, 'Anslow Place Reserve Playground', '', 'Tasman 7025, New Zealand', '-41.40166890347686', '173.05177035958491', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(2, 'Arbor Lea Reserve Playground', '', 'Tasman 7020, New Zealand', '-41.334760760912594', '173.19431333196431', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(3, 'Brightwater Recreation Reserve Playground', '', 'Tasman 7022, New Zealand', '-41.375025370869913', '173.10826515200372', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(4, 'Brooklyn Domain Playground', '', 'Brooklyn, New Zealand', '-41.096991696061643', '172.95840023800938', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(5, 'Burbush Park Playground', '', 'Tasman 7020, New Zealand', '-41.338175856215841', '173.19106147355095', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(6, 'Cambridge Street Playground', '', 'Tasman 7020, New Zealand', '-41.339404834309519', '173.18299390031112', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(7, 'Chelsea Ave Reserve Playground', '', 'Tasman 7020, New Zealand', '-41.348765530653409', '173.1811263677522', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(8, 'Coach Place Reserve Playground', '', 'Tasman 7022, New Zealand', '-41.372875246874578', '173.10221201500559', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(9, 'Collins Road Reserve Playground', '', 'Tasman 7020, New Zealand', '-41.347203062071472', '173.1668190531982', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(10, 'Decks Reserve Playground', '', 'Tasman 7120, New Zealand', '-41.110694679200492', '173.01272646596388', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(11, 'Easby Park Playground', '', 'Tasman 7020, New Zealand', '-41.348294300269728', '173.20214832187057', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(12, 'Eginton Park Playground', '', 'Tasman 7120, New Zealand', '-41.108666791001554', '173.0191490806601', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(13, 'Faulkner Bush Reserve Playground', '', 'Tasman 7025, New Zealand', '-41.407512179163696', '173.04194789881635', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(14, 'Feary Crescent Reserve Playground', '', 'Tasman 7110, New Zealand', '-40.849219837027434', '172.80485176709018', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(15, 'Harwood Place Reserve Playground', '', 'Upper Takaka, New Zealand', '-41.02894818787604', '172.82135456060715', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(16, 'Hope Hall and Recreation Reserve Playground', '', 'Tasman 7020, New Zealand', '-41.352587590143997', '173.15462592583262', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(17, 'Jean Berriman Park Playground', '', 'Tasman 7020, New Zealand', '-41.335099529310497', '173.18912937509702', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(18, 'Shuttleworth Reserve Playground', '', 'Tasman 7025, New Zealand', '-41.401853098796934', '173.04821347561514', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(19, 'Riwaka Memorial Reserve Playground', '', 'Riwaka, New Zealand', '-41.075740783507626', '172.9971897757778', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(20, 'Murchison Playground', '', '4 Hampden St, Murchison 7007, New Zealand', '-41.80190968118707', '172.32606894493935', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(21, 'Norm Large Park Playground', '', 'undefined', '-41.344116013356093', '173.17679379964267', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(22, 'Norman Andrews Place Reserve Playground', '', 'undefined', '-41.345052628312359', '173.16548610383066', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(23, 'North Street Reserve Playground', '', 'undefined', '-41.13441041277698', '173.02309775186873', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(24, 'Onekaka Hall Recreation Reserve Playground', '', 'undefined', '-40.762854998290102', '172.70635241752288', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(25, 'Park Drive Reserve Playground', '', 'undefined', '-41.34361470425344', '173.20783176591999', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(26, 'Pohara Beach Camp Playground', '', '790 Abel Tasman Dr, Pohara 7183, New Zealand', '-40.833573764788177', '172.88272934136086', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(27, 'Takaka Memorial Reserve Playground', '', '1 Reilly St, Takaka 7110, New Zealand', '-40.858089276559966', '172.80563447677886', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(28, 'Reservoir Creek Walkway Rec Reserve Playground', '', '10-12 Welsh Pl, Richmond 7020, New Zealand', '-41.341053328498234', '173.20100328967015', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(29, 'Riverview Motor Camp Playground', '', '19 Riverview Rd, Murchison 7077, New Zealand', '-41.795662988871513', '172.34125454341984', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(30, 'Rockville School Reserve Playground', '', '934 Collingwood-Bainham Main Rd, Rockville 7073, New Zealand', '-40.729153338877417', '172.61901656391717', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(31, 'Tilson Crescent Reserve Playground', '', '9 Tui Close, Motueka 7120, New Zealand', '-41.120877213748066', '173.01327564607482', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(32, 'Starveall Street Reserve Playground', '', '5 Ben Nevis Crescent, Brightwater 7022, New Zealand', '-41.378104939190116', '173.10834742771956', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(33, 'St James Avenue Reserve Playground', '', '10 Aratia Way, Richmond 7020, New Zealand', '-41.347626063787956', '173.17383523475436', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(34, 'Tapawera Playground', '', '102 Main Road Tapawera, Tapawera 7096, New Zealand', '-41.388554959903189', '172.82473829382224', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(35, 'Tapawera Playground', '', '5 Kowhai St, Tapawera 7096, New Zealand', '-41.388728825690137', '172.82552943725852', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(36, 'Tasman Memorial Recreation Reserve Playground', '', '11 Rush Ln, Tasman 7173, New Zealand', '-41.186303888192903', '173.04768723047451', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(37, 'Tata Heights Reserve Playground', '', '16A Tata Heights, Tata Beach 7183, New Zealand', '-40.810958163372327', '172.91816673003729', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(38, 'Tawa Place Playground', '', '9 Tawa Pl, Tapawera 7096, New Zealand', '-41.388765131150599', '172.82709012547815', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(39, 'Ted Reed Reserve Playground', '', '70 School Rd, Riwaka 7198, New Zealand', '-41.076267738926177', '173.00563220222216', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(40, 'Thorps Bush Playground', '', '23 Hickmott Pl, Motueka 7120, New Zealand', '-41.115153246652355', '173.01272523660785', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(41, 'Richards Recreation Reserve Playground', '', '100 Wildman Rd, Motueka 7120, New Zealand', '-41.139144084327135', '172.9995701870582', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(42, 'Winston Park Playground', '', '14 Churchill Ave, Richmond 7020, New Zealand', '-41.347794514495909', '173.19876116992933', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(43, 'Mapua Recreation Reserve Playground', '', '74 Aranui Rd, Mapua 7005, New Zealand', '-41.25203836190196', '173.09474064993515', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(44, 'McKee Memorial Rec Reserve Playground', '', '1420 The Coastal Hwy, Ruby Bay 7173, New Zealand', '-41.215279960114813', '173.08380753051827', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(45, 'Memorial Park Playground', '', '104 High St, Motueka 7120, New Zealand', '-41.109209276793891', '173.0095721936683', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(46, 'Owen River Recreational Reserve Playground', '', 'Kawatiri-Murchison Hwy, Owen River 7077, New Zealand', '-41.68652787762683', '172.4514352747274', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(47, 'Fire Station Playground', '', '2 Tasman St, Collingwood 7073, New Zealand', '-40.677119888648434', '172.68273527940602', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(48, 'Upper Moutere Recreation Reserve Playground', '', '1539 Moutere Hwy, Upper Moutere 7175, New Zealand', '-41.256484552780783', '173.01021878720815', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(49, 'Motueka Public Library', '', '10 Pah St, Motueka 7120, New Zealand', '-41.109857682942852', '173.00960398442126', 'Library', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(50, 'Takaka Memorial Library', '', '3 Junction St, Takaka 7110, New Zealand', '-40.858877916530645', '172.80506130798665', 'Library', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(51, 'Richmond District Library', '', '280 Queen St, Richmond 7020, New Zealand', '-41.338100196482195', '173.18390501100907', 'Library', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(52, 'Murchison Public Library', '', '92 Fairfax St, Murchison 7007, New Zealand', '-41.802920163668105', '172.3251821820036', 'Library', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(53, 'Motueka District Museum', '', '136 High St, Motueka 7120, New Zealand', '-41.110762578111093', '173.01086383240789', 'Museum', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(54, 'Golden Bay Museum and Gallery', '', '73 Commercial St, Takaka 7110, New Zealand', '-40.857774632157188', '172.80614531003593', 'Museum', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(55, 'Collingwood Museum', '', '2 Tasman St, Collingwood 7073, New Zealand', '-40.676993755063997', '172.68262458173481', 'Museum', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(56, 'Murchison District Museum', '', '60 Fairfax St, Murchison 7007, New Zealand', '-41.801561225911193', '172.32521533919007', 'Museum', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(57, 'Waller Street Public Toilet, Murchison', '', '78-82 State Hwy, Murchison 7007, New Zealand', '-41.800260751515488', '172.33108978728364', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(58, 'I-SITE Murchison Visitor Centre', '', '47 Waller St, Murchison 7007, New Zealand', '-41.799950471450579', '172.32615423050376', 'Visitor Centre', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(59, 'I-SITE Golden Bay Visitor Centre', '', '15 Willow St, Takaka 7110, New Zealand', '-40.862108249880826', '172.80644442123645', 'Visitor Centre', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(60, 'I-SITE Motueka Visitor Centre', '', '24 Wallace St, Motueka 7120, New Zealand', '-41.111701264540358', '173.01228789582348', 'Visitor Centre', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(61, 'Wallace Street Public Toilet, Motueka', '', '24 Wallace St, Motueka 7120, New Zealand', '-41.111760664706267', '173.01242144777487', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(62, 'Staples Street Public Toilet, Motueka', '', '163 Staples St, Motueka 7120, New Zealand', '-41.100327058910985', '173.02950850685681', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(63, 'Pah Street Public Toilet, Motueka', '', '6 Pah St, Motueka 7120, New Zealand', '-41.109753989070285', '173.01008098942847', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(64, 'Thorpe Bush Public Toilet, Motueka', '', '1 Woodland Ave, Motueka 7120, New Zealand', '-41.115423113170216', '173.01194747232333', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(65, 'Everett Street Public Toilet, Motueka', '', '10 Everett St, Motueka 7120, New Zealand', '-41.135245560423513', '173.02341507203289', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(66, 'Memorial Reserve Public Toilet, Takaka', '', '63 Commercial St, Takaka 7110, New Zealand', '-40.858256630236014', '172.8059914278036', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(67, 'Jubilee Park Public Toilet, Richmond', '', '20 Gladstone Rd, Richmond 7020, New Zealand', '-41.338636886152237', '173.17830756708389', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(68, 'I-SITE Richmond Visitor Centre', '', '30 Gladstone Rd, Richmond 7020, New Zealand', '-41.339203372717854', '173.17735650059126', 'Visitor Centre', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(69, 'Richmond Mall Public Toilet', '', '226 Queen St, Richmond 7020, New Zealand', '-41.339370082901027', '173.18634420154825', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(70, 'Washbourn Gardens Public Toilet, Richmond', '', '15 Oxford St, Richmond 7020, New Zealand', '-41.343242323694199', '173.18660098311588', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(71, 'Dellside Reserve Public Toilet, Richmond', '', '18 Barrington Pl, Richmond 7020, New Zealand', '-41.352202033679994', '173.20145842833332', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(72, 'ASB Aquatic Centre', '', '161 Salisbury Rd, Richmond 7020, New Zealand', '-41.333751810250718', '173.19971054722387', 'Pool', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(73, 'Rabbit Island Public Toilet', '', 'Forestry Rd, Rabbit Island 7081, New Zealand', '-41.264431420789776', '173.14992749515912', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(74, 'Mapua Recreation Reserve Public Toilet', '', '74 Aranui Rd, Mapua 7005, New Zealand', '-41.251910479453691', '173.0947930788405', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(75, 'Brightwater Recreation Reserve Public Toilet', '', '14 Lord Rutherford Rd N, Brightwater 7022, New Zealand', '-41.374926103602107', '173.10715872589023', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(76, 'Appleby Bridge Recreation Reserve Public Toilet', '', '538 Appleby Hwy, Appleby 7081, New Zealand', '-41.30832657936238', '173.1275190197542', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(77, 'Whitby Way Public Toilet, Wakefield', '', '2 Whitby Way, Wakefield 7025, New Zealand', '-41.405513575677148', '173.04297474352137', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(78, 'Grossi Point Recreation Reserve Public Toilet', '', '55 Tahi St, Mapua 7005, New Zealand', '-41.260728646364562', '173.0996119923613', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(79, 'Kina Beach Recreation Reserve Public Toilet', '', '11 Cliff Rd, Tasman 7173, New Zealand', '-41.185000330730418', '173.06544410350904', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(80, 'Busch Recreation Reserve Public Toilet', '', '374 Aniseed Valley Rd, Aniseed Valley 7081, New Zealand', '-41.386870794804246', '173.15655150042423', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(81, 'Firestones Reserve Public Toilet', '', '411 Lee Valley Rd, Lee Valley 7091, New Zealand', '-41.413471438266434', '173.16070001084347', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(82, 'Ligar Bay Esplanade Reserve Public Toilet', '', '1130 Abel Tasman Dr, Tata Beach 7183, New Zealand', '-40.822224886010645', '172.90876537140079', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(83, 'McKee Memorial Recreation Reserve Public Toilet', '', '1450 The Coastal Hwy, Ruby Bay 7173, New Zealand', '-41.214408754833904', '173.08381103397312', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(84, 'Meads Recreation Reserve Public Toilet', '', '118 Mead Rd, Lee Valley 7091, New Zealand', '-41.408933952551436', '173.16167157352109', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(85, 'Miles Reserve Public Toilet', '', '84 Bishop Rd, Parapara 7182, New Zealand', '-40.720893218371785', '172.69183756979066', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(86, 'Patons Rock Recreation Reserve Public Toilet', '', '212 Patons Rock Rd, Patons Rock 7182, New Zealand', '-40.787587662323716', '172.76170699761812', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(87, 'Pohara Recreation Reserve Public Toilet', '', '876 Abel Tasman Dr, Pohara 7183, New Zealand', '-40.83118882428824', '172.89195107120329', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(88, 'Stephens Bay Esplanade Reserve Public Toilet', '', '42 Stephens Bay Rd, Kaiteriteri 7197, New Zealand', '-41.048146784551115', '173.01796781621758', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(89, 'Twin Bridges Reserve Public Toilet', '', '397 Aniseed Valley Rd, Aniseed Valley 7081, New Zealand', '-41.384734597804325', '173.15832244621825', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(90, 'Upper Moutere Recreation Reserve Public Toilet', '', '1539 Moutere Hwy, Upper Moutere 7175, New Zealand', '-41.256634373419672', '173.0093323162051', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(91, 'Wai-iti Recreation Reserve Public Toilet', '', '437 Wakefield-Kohatu Hwy, Wai-Iti 7095, New Zealand', '-41.429652869911976', '172.99281292589575', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(92, 'White Gate Reserve Public Toilet', '', '615 Aniseed Valley Rd, Aniseed Valley 7081, New Zealand', '-41.388657437271434', '173.17410441322525', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(93, 'Wakefield Recreation Reserve Public Toilet', '', '10 State Hwy, Wakefield 7025, New Zealand', '-41.407166995902188', '173.03963152452371', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(94, 'Edward Baigent Reserve Public Toilet', '', '8 Wakefield-Kohatu Hwy, Wakefield 7025, New Zealand', '-41.407586800517819', '173.03506359114999', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(95, 'Faulkner Bush Reserve Public Toilet', '', '19 Clifford Rd, Wakefield 7025, New Zealand', '-41.407434686358243', '173.04036766695302', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(96, 'Alex Ryder Memorial Reserve Public Toilet', '', '61 Rowling Rd, Kaiteriteri 7197, New Zealand', '-41.042044305241319', '173.0179745111804', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(97, 'Uruwhenua Recreation Reserve Public Toilet', '', '1155 E Takaka Rd, Upper Takaka 7183, New Zealand', '-40.987969413761327', '172.82100042181165', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(98, 'Brooklyn Recreation Reserve Public Toilet', '', '78 Brooklyn Valley Rd, Brooklyn 7198, New Zealand', '-41.097009702650965', '172.95824175676952', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(99, 'Richards Recreation Reserve Public Toilet', '', '100 Wildman Rd, Motueka 7120, New Zealand', '-41.139007464378658', '172.99962831155852', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(100, 'Tasman Memorial Recreation Reserve Public Toilet', '', '11 Rush Ln, Tasman 7173, New Zealand', '-41.186338333695502', '173.04765890011117', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(101, 'Warring Carpark Public Toilet', '', 'John Wesley Ln, Richmond 7020, New Zealand', '-41.340593850348192', '173.18524138014678', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(102, 'Kaiteriteri Beach Public Toilet', '', '15 Inlet Rd, Kaiteriteri 7197, New Zealand', '-41.037748419832141', '173.01660839095109', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(103, 'Pinehills Recreation Reserve Public Toilet', '', '210 Stafford Dr, Ruby Bay 7005, New Zealand', '-41.229565622716116', '173.08422578679244', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(104, 'Murchison Hospital and Health Centre', '', '58 Hotham St, Murchison 7007, New Zealand', '-41.806473134732144', '172.32851478919397', 'Hospital', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(105, 'Golden Bay Community Hospital', '', '10 Central Takaka Rd, Takaka 7183, New Zealand', '-40.878243556074672', '172.81687631559356', 'Hospital', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(106, 'Motueka Community Hospital', '', '15 Courtney St, Motueka 7120, New Zealand', '-41.129833830772995', '173.00824525558781', 'Hospital', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(107, 'Fairfax Street Public Toilet, Murchison', '', '43 Fairfax St, Murchison 7007, New Zealand', '-41.800485388332881', '172.32565048284746', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(108, 'Nayland Pool', 'Outdoor summer pools that include a separate toddlers pool, a pool for lengths and a dive pool. ', '192 Nayland Rd, Stoke, Nelson 7011, New Zealand', '-41.306055527621844', '173.23201022430607', 'Pool', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(109, 'Tahunanui Model Railway', '', 'Hounsell Cir, Tahunanui, Nelson 7011, New Zealand', '-41.282166755452138', '173.24427638717114', 'Model Train, Beach', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(110, 'Riverside Pool', '', '25 Riverside Dr, Nelson, 7010, New Zealand', '-41.271917305330796', '173.28957190985631', 'Pool', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(111, 'Suter Art Gallery', '', '208 Bridge St, Nelson, 7010, New Zealand', '-41.273012246483255', '173.28993795038838', 'Art Gallery, Gardens, Ducks', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(112, 'Natureland', '', 'Hounsell Cir, Tahunanui, Nelson 7011, New Zealand', '-41.281130222374919', '173.24457671246145', 'Animals,Beach', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(113, 'Stoke Library', '', '35 Putaitai St, Stoke, Nelson 7011, New Zealand', '-41.311883691011644', '173.23334738028672', 'Library', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(114, 'Stoke Toy Library', '', '206 Songer St, Stoke, Nelson 7011, New Zealand', '-41.313039736941953', '173.23183351981336', 'Toy Library', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(115, 'Elma Turner Library Nelson', '', '2 Tahaki St, Nelson, 7010, New Zealand', '-41.270308072521239', '173.28297411215033', 'Library', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(116, 'Nelson Toy Library', '', '13 Pettit Pl, The Wood, Nelson 7010, New Zealand', '-41.27000013761328', '173.28988191498084', 'Toy Library', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(117, 'Nightingale Library Tahunanui', '', '2 Beach Rd, Tahunanui, Nelson 7011, New Zealand', '-41.280267865851798', '173.24969250664466', 'Library', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(118, 'I-SITE Nelson Visitors Centre', '', '75-81 Trafalgar St, Nelson, 7010, New Zealand', '-41.270463929213342', '173.28433668662143', 'Visitor Centre', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(119, 'Skate Park Webcam', '', 'State Hwy, The Wood, Nelson 7010, New Zealand', '-41.263576473785328', '173.29065174740256', 'Skate Park', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(120, 'Boulder Bank Lighthouse', '', 'Brunt Quay, Port Nelson, Nelson 7010, New Zealand', '-41.254645565095451', '173.26513413930448', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(121, 'Hira North Long Drop', '', '769 Hira Rd, Hira 7071, New Zealand', '-41.213537608220179', '173.39799870235507', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(122, 'Hira South Long Drop', '', '769 Hira Rd, Hira 7071, New Zealand', '-41.213667658736604', '173.39785108958779', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(123, 'Sunday Swimming Hole Public Toilet', '', '102 Maitai Valley Rd, Maitai 7010, New Zealand', '-41.273172322911513', '173.31179448229562', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(124, 'Montgomery Sq Suprloo Public Toilet', '', '18 Montgomery Square, Nelson, 7010, New Zealand', '-41.273451721437908', '173.28250595000941', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(125, 'Buxton Square Public Toilet', '', '1 Buxton Square, Nelson, 7010, New Zealand', '-41.273480004856879', '173.28546578742288', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(126, 'Botanics - Gents Public Toilet', '', '192 Milton St, The Wood, Nelson 7010, New Zealand', '-41.273956931627062', '173.2947120128307', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(127, 'Monaco Reserve Public Toilet', '', '62 Point Rd, Monaco, Nelson 7011, New Zealand', '-41.304010750013056', '173.21361690072021', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(128, 'Wakapuaka Public Toilet', '', '464 Wakapuaka Rd, Wakapuaka 7071, New Zealand', '-41.207450289726253', '173.36383107694434', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(129, 'Miyazu Japanes Public Toilet', '', '125 Atawhai Dr, Atawhai, Nelson 7010, New Zealand', '-41.259141193207611', '173.29861157218224', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(130, 'Neale Park Public Toilet', '', '25 N Rd, The Wood, Nelson 7010, New Zealand', '-41.263112070700345', '173.29350409124592', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(131, 'Haulashore Island Long Drop', '', '385-387 State Hwy, Stepneyville, Nelson 7010, New Zealand', '-41.265824766048581', '173.25818464278484', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(132, 'Trafalgar Park Public Toilet', '', '30 Trafalgar St, The Wood, Nelson 7010, New Zealand', '-41.267803998139527', '173.28374374735711', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(133, 'Branford Park Public Toilet', '', '105 Maitai Valley Rd, Maitai 7010, New Zealand', '-41.272684845826802', '173.30698193173734', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(134, 'Queens Gardens Public Toilet', '', '208 Bridge St, Nelson, 7010, New Zealand', '-41.27285276252757', '173.29027184649959', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(135, 'Roller Skating Rink Public Toilet', '', 'Back Beach Rd, Tahunanui, Nelson 7011, New Zealand', '-41.280084277488754', '173.24182389861707', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(136, 'Club House Public Toilet', '', '336 Maitai Valley Rd, Maitai 7010, New Zealand', '-41.280176183450621', '173.33084240954292', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(137, 'Victory Square Public Toilet', '', '160 Toi Toi St, Nelson South, Nelson 7010, New Zealand', '-41.281261033910219', '173.27096632447493', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(138, 'Modellers Pond Public Toilet', '', 'Hounsell Cir, Tahunanui, Nelson 7011, New Zealand', '-41.281788369562662', '173.24270327468628', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(139, 'Melrose Grdns Public Toilet', '', '20 Melrose Terrace, Nelson South, Nelson 7010, New Zealand', '-41.282516146730636', '173.28471763865613', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(140, 'Golf Course Public Toilet', '', '336 Maitai Valley Rd, Maitai 7010, New Zealand', '-41.283334777377412', '173.32671028370106', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(141, 'Oyster Island Long Drop', '', '73 Martin St, Monaco, Nelson 7011, New Zealand', '-41.301304927592952', '173.20032257375982', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(142, 'Brook Camp Public Toilet', '', '600 Brook St, The Brook, Nelson 7010, New Zealand', '-41.308166147063361', '173.29281568158947', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(143, 'Brook Camp Public Toilet', '', '600 Brook St, The Brook, Nelson 7010, New Zealand', '-41.308820088078974', '173.29268647056489', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(144, 'Broadgreen Public Toilet', '', '276 Nayland Rd, Stoke, Nelson 7011, New Zealand', '-41.309148719175006', '173.22846288078026', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(145, 'Brook Camp Public Toilet', '', '600 Brook St, The Brook, Nelson 7010, New Zealand', '-41.309412180884387', '173.29242076036806', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(146, 'Brook Camp Public Toilet', '', '600 Brook St, The Brook, Nelson 7010, New Zealand', '-41.310628310305283', '173.29208682649926', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(147, 'Brook Camp Public Toilet', '', '600 Brook St, The Brook, Nelson 7010, New Zealand', '-41.310696857648828', '173.29214670678701', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(148, 'Brook Camp Public Toilet', '', '600 Brook St, The Brook, Nelson 7010, New Zealand', '-41.310851208455844', '173.29211880746209', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(149, 'Brook Camp Public Toilet', '', '600 Brook St, The Brook, Nelson 7010, New Zealand', '-41.310927822248374', '173.29208958379331', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(150, 'Stoke Library Public Toilet', '', '33 Putaitai St, Stoke, Nelson 7011, New Zealand', '-41.312034896300418', '173.23339291387498', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(151, 'Isel Park Public Toilet', '', '170 The Ridgeway, Stoke, Nelson 7011, New Zealand', '-41.313476675870255', '173.24059947223625', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(152, 'Third House Hut Long Drop', '', '600 Brook St, The Brook, Nelson 7010, New Zealand', '-41.324713815000578', '173.32560041763404', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(153, 'Roding Footbridge Long Drop', '', '1770 Aniseed Valley Rd, Aniseed Valley 7081, New Zealand', '-41.356547849125562', '173.26513528580185', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(154, 'Roding Radio Mast Long Drop', '', '1770 Aniseed Valley Rd, Aniseed Valley 7081, New Zealand', '-41.358726212364665', '173.25839902777076', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(155, 'Champion Smelter Long Drop', '', 'Barnicoat Walkway, Aniseed Valley 7081, New Zealand', '-41.359764523630666', '173.29313477592126', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(156, 'United Creek Long Drop', '', 'Barnicoat Walkway, Aniseed Valley 7081, New Zealand', '-41.367782351625237', '173.30769867816366', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(157, 'Back Beach Public Toilet', '', 'Back Beach Rd, Tahunanui, Nelson 7011, New Zealand', '-41.279666717176745', '173.23732502273774', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(158, 'Pioneers Park Public Toilet', '', '10 Washington Rd, Washington Valley, Nelson 7010, New Zealand', '-41.272671548544778', '173.27573132744877', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(159, 'Beach Cafe Public Toilet', '', 'Bisley Walk, Tahunanui, Nelson 7011, New Zealand', '-41.279983511807664', '173.24477008681725', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(160, 'Netball Pavillion Public Toilet', '', '117-123 Saxton Rd, Stoke, Nelson 7011, New Zealand', '-41.328033613238674', '173.21756981893159', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(161, 'Vickerman Street Public Toilet', '', '52 Vickerman St, Port Nelson, Nelson 7010, New Zealand', '-41.263682155504405', '173.27848006639655', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(162, 'Tahuna Library Public Toilet', '', '2 Beach Rd, Tahunanui, Nelson 7011, New Zealand', '-41.280358238408354', '173.2496853902833', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(163, 'Lions Playground Public Toilet', '', 'Bisley Walk, Tahunanui, Nelson 7011, New Zealand', '-41.279641472302586', '173.2496484941517', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(164, 'Botanics - Ladies Public Toilet', '', '192 Milton St, The Wood, Nelson 7010, New Zealand', '-41.274067878274245', '173.29469463053769', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(165, 'Millers Acre Public Toilet', '', '5 Ajax Ave, Nelson, 7010, New Zealand', '-41.270313655241829', '173.28454760347242', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(166, 'Greenmeadows Public Toilet', '', '236 Songer St, Stoke, Nelson 7011, New Zealand', '-41.313539659604594', '173.23467868328086', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(167, 'Bisley Walk Public Toilet', '', 'Bisley Walk, Tahunanui, Nelson 7011, New Zealand', '-41.280079457994482', '173.24752218282757', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(168, 'Ngawhatu Public Toilet', '', '19 Ngawhatu Rd, Stoke, Nelson 7011, New Zealand', '-41.323154892155024', '173.23232404902157', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(169, 'Basin Reserve Public Toilet', '', '431-541 State Hwy, Britannia Heights, Nelson 7010, New Zealand', '-41.272401550899502', '173.25999982798717', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(170, 'Wakefield Quay Public Toilet', '', '272 Wakefield Quay, Stepneyville, Nelson 7010, New Zealand', '-41.26306926736865', '173.26912546131021', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(171, 'Branford Bbq Public Toilet', '', '102 Maitai Valley Rd, Maitai 7010, New Zealand', '-41.273572506148859', '173.30677413241719', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(172, 'Hockey Pavillion Public Toilet', '', '142 Saxton Rd E, Stoke, Nelson 7011, New Zealand', '-41.329715685525244', '173.21947262082617', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(173, 'Soccer Pavillion Public Toilet', '', 'Main Rd, Stoke, Nelson 7011, New Zealand', '-41.328322207628887', '173.21349114942907', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(174, 'Novaloo Public Toilet', '', '19 Haven Rd, Nelson, 7010, New Zealand', '-41.271445355443127', '173.28017402526797', 'Public Toilet', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(175, 'Nelson Provincial Museum', '', '270 Trafalgar St, Nelson, 7010, New Zealand', '-41.27446211582442', '173.28354586090873', 'Museum', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(176, 'Brook Waimarama Sanctuary', '', '600 Brook St, The Brook, Nelson 7010, New Zealand', '-41.311893780824214', '173.29242568847073', 'Birds, Nature Reserve,Walk', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(177, 'Founders Heritage Park', '', 'Everett St, The Wood, Nelson 7010, New Zealand', '-41.261783563994811', '173.29756238625771', 'Historic', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(178, 'Branford Park Playground', '', '102 Maitai Valley Rd, Maitai 7010, New Zealand', '-41.273753003508652', '173.30667299752042', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(179, 'The Glen Reserve Playground', '', '28 Seafield Terrace, Glenduan 7071, New Zealand', '-41.185770584985299', '173.36150022330085', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(180, 'Monaco Reserve Playground', '', '62 Point Rd, Monaco, Nelson 7011, New Zealand', '-41.303549257153698', '173.21365787830669', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(181, 'Russell Reserve Playground', '', '4 Queens Rd, Stepneyville, Nelson 7010, New Zealand', '-41.26731373189142', '173.27108832541734', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(182, 'Wards Reserve Playground', '', '26 Brook St, The Brook, Nelson 7010, New Zealand', '-41.281889076079565', '173.29082405591089', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(183, 'Brook Park Playground', '', '113 Brook St, The Brook, Nelson 7010, New Zealand', '-41.289107304991596', '173.29179803574482', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(184, 'Bolt Reserve Playground', '', '36 Golf Haven Way, Annesbrook, Nelson 7011, New Zealand', '-41.291174691733147', '173.23552720776732', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(185, 'Blackwood East Reserve Playground', '', '5 Blackwood St, Wakatu, Nelson 7011, New Zealand', '-41.295296635939692', '173.24468428664895', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(186, 'Aldinga Reserve Playground', '', '7 Lusty Pl, Stoke, Nelson 7011, New Zealand', '-41.311746211659987', '173.22386079647106', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(187, 'Manson Reserve Playground', '', '9A Manson Ave, Stoke, Nelson 7011, New Zealand', '-41.320372072215307', '173.22795284461708', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(188, 'Bledisloe South Reserve Playground', '', '49 Bledisloe Ave, Stoke, Nelson 7011, New Zealand', '-41.305992233673237', '173.23891004220576', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(189, 'Vosper Reserve Playground', '', '3A Vosper St, Toi Toi, Nelson 7010, New Zealand', '-41.279627233635239', '173.26727072078947', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(190, 'Waimea North Reserve Playground', '', '201 Kawai St S, Nelson South, Nelson 7010, New Zealand', '-41.291512945028217', '173.26885431479189', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(191, 'Murphy North Reserve Playground', '', '34 Murphy St, Toi Toi, Nelson 7010, New Zealand', '-41.285122963917409', '173.26386344157982', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(192, 'Poets Park Playground', '', '11 Shelley Crescent, Stoke, Nelson 7011, New Zealand', '-41.314749110252059', '173.22697321302539', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(193, 'Fairfield Park Playground', '', '12A Brougham St, Nelson South, Nelson 7010, New Zealand', '-41.282019700966138', '173.28203150813053', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(194, 'Werneth Reserve Playground', '', '10 Werneth St, Atawhai, Nelson 7010, New Zealand', '-41.237816215743024', '173.32228242290128', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(195, 'Montrose Reserve Playground', '', '11B Montrose Dr, Atawhai, Nelson 7010, New Zealand', '-41.252806054396501', '173.31116545974257', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(196, 'Wakapuaka Reserve Playground', '', '460 Wakapuaka Rd, Wakapuaka 7071, New Zealand', '-41.207439777687533', '173.36345046955981', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(197, 'Wolfe Reserve Playground', '', '50 Wolfe St, Washington Valley, Nelson 7010, New Zealand', '-41.274673608258162', '173.26742371823136', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(198, 'Riverside Reserve Playground', '', '25 Riverside Dr, Nelson, 7010, New Zealand', '-41.271863874672064', '173.28921498884409', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(199, 'Ngaio Reserve Playground', '', '8 Ngaio St, Stoke, Nelson 7011, New Zealand', '-41.309168205537283', '173.23981672147798', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(200, 'Poplar Reserve Playground', '', '28 Panorama Dr, Enner Glynn, Nelson 7011, New Zealand', '-41.310418672655196', '173.24970692605262', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(201, 'Cattle Market Reserve Playground', '', '14 Ben Bracken Pl, Bishopdale, Nelson 7010, New Zealand', '-41.293997740245935', '173.26881610945901', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(202, 'Marsden Recreation Ground Playground', '', '210 Songer St, Stoke, Nelson 7011, New Zealand', '-41.313115043233331', '173.23200261817792', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(203, 'Victory Square Playground', '', '3 Northesk St, Nelson South, Nelson 7010, New Zealand', '-41.279937498532682', '173.27101484629489', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(204, 'Botanics Sportsfield Playground', '', '184-186 Milton St, The Wood, Maitai 7010, New Zealand', '-41.273532628412958', '173.29487738799955', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(205, 'Neale Park Playground', '', '25 N Rd, The Wood, Nelson 7010, New Zealand', '-41.262582548968972', '173.2952849913498', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(206, 'Abraham Heights Reserve Playground', '', '69 Abraham Heights, Washington Valley, Nelson 7010, New Zealand', '-41.277324677134381', '173.26477219939594', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(207, 'Ngawhatu Sportsfield Playground', '', '303 The Ridgeway S, Stoke, Nelson 7011, New Zealand', '-41.321637369750448', '173.23275130340687', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(208, 'Grove Reserve Playground', '', '1 Rosa Cristina Way, The Wood, Nelson 7010, New Zealand', '-41.26977433352247', '173.28990165096786', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(209, 'Saxton Field Playground', '', '92 Saxton Rd E, Stoke, Nelson 7011, New Zealand', '-41.328065700294957', '173.21589610028269', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(210, 'Tahunanui Recreation Reserve Playground', '', 'Bisley Walk, Tahunanui, Nelson 7011, New Zealand', '-41.279508474920235', '173.24902673850528', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(211, 'Pioneers Park Playground', '', '19 Washington Rd, Washington Valley, Nelson 7010, New Zealand', '-41.272487450941846', '173.27542079097387', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(212, 'Tresillian Reserve Playground', '', '10 Tresillian Ave, Marybank, Nelson 7010, New Zealand', '-41.224606359271696', '173.32365679137453', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(213, 'Manu Kau Reserve Playground', '', '30 Monaco View, Stoke, Nelson 7011, New Zealand', '-41.313306925499383', '173.21588095184777', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(214, 'Annesbrook Youth Park Playground', '', 'State Hwy, Stoke, Nelson 7011, New Zealand', '-41.299517090228733', '173.24239448839029', 'Playground', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(215, 'Centre of NZ', '', '5 Maitai Rd, Maitai 7010, New Zealand', '-41.272810310912419', '173.29949879688564', 'View, Walk', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(216, 'Tahunanui Beach', '', 'Bisley Walk, Tahunanui, Nelson 7011, New Zealand', '-41.279141844685107', '173.24662215495928', 'Beach,Walk', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(217, 'Nelson Hospital', '', '98 Waimea Rd, Nelson South, Nelson 7010, New Zealand', '-41.287410390845977', '173.27264741769963', 'Hospital', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(218, 'Linden Place Reserve Open Orchard', '', '13 Linden Pl, Brooklyn 7198, New Zealand', '-41.097259990796843', '172.96580499021687', 'Open Orchard', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(219, 'Decks Reserve Open Orchard', '', '24 Wallace St, Motueka 7120, New Zealand', '-41.111224990565702', '173.01263400047259', 'Open Orchard', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(220, 'Open Orchard', '', '29 Mcglashen St, Motueka 7120, New Zealand', '-41.11264799135607', '173.0048070003001', 'Open Orchard', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(221, 'Motueka High School Open Orchard', '', '11 Wakatu Pl, Motueka 7120, New Zealand', '-41.114409991017808', '173.00720200058896', 'Open Orchard', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(222, 'Motueka Hospital Open Orchard', '', '15 Courtney St, Motueka 7120, New Zealand', '-41.129825000971394', '173.00840900009729', 'Open Orchard', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(223, 'Open Orchard', 'Pears', '655 Atawhai Crescent, Atawhai, Nelson 7010, New Zealand', '-41.236155991377707', '173.31723000053239', 'Open Orchard', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(224, 'Open Orchard', '', '714A Atawhai Dr, Atawhai, Nelson 7010, New Zealand', '-41.236442991379207', '173.31648298991541', 'Open Orchard', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(225, 'Open Orchard', '', '655 Atawhai Crescent, Atawhai, Nelson 7010, New Zealand', '-41.23664099090692', '173.31677200041202', 'Open Orchard', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(226, 'Clifton Terrace School Open Orchard', 'Fig Quince Feijoa Citrus Hazelnut', '655 Atawhai Crescent, Atawhai, Nelson 7010, New Zealand', '-41.236697000846974', '173.31667800007054', 'Open Orchard', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(227, 'Frenchhay Drive Open Orchard', 'Apples And Citrus Trees', '9 Frenchay Dr, Atawhai, Nelson 7010, New Zealand', '-41.243651000888235', '173.32467399993104', 'Open Orchard', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(228, 'Wakapuaka Cemetery Open Orchard', 'Lemon', '272 Atawhai Dr, Atawhai, Nelson 7010, New Zealand', '-41.254645990840814', '173.30374098986658', 'Open Orchard', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(229, 'Atawahi Drive Open Orchard', '30 Olive Trees', '272 Atawhai Dr, Atawhai, Nelson 7010, New Zealand', '-41.256114990879382', '173.29991100023346', 'Open Orchard', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(230, 'Miyazu Park Orchard', '20 Cherry Trees', '125 Atawhai Dr, Atawhai, Nelson 7010, New Zealand', '-41.259090000580507', '173.29929200018407', 'Open Orchard', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(231, 'Open Orchard', '2 Olives', '5 Walters Bluff, Atawhai, Nelson 7010, New Zealand', '-41.260516991357441', '173.29937700025837', 'Open Orchard', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(232, 'Walters Bluff Open Orchard', '30 Olive Trees', '5 Walters Bluff, Atawhai, Nelson 7010, New Zealand', '-41.260517000551246', '173.29937000015306', 'Open Orchard', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(233, 'Neale Park Cycleway Open Orchard', '6 Feijoas', 'State Hwy, The Wood, Nelson 7010, New Zealand', '-41.262500991284703', '173.29257200014959', 'Open Orchard', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(234, 'Iwa Road Open Orchard', '3 Plum Trees', 'Iwa Rd, The Wood, Nelson 7010, New Zealand', '-41.263195000742286', '173.297997000344', 'Open Orchard', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(235, 'Open Orchard', 'Apple', '5 Weka St, The Wood, Nelson 7010, New Zealand', '-41.26625099127584', '173.2883450003682', 'Open Orchard', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(236, 'Rutherford Park Open Orchard', 'Irish Strawberry', 'State Hwy, Nelson, 7010, New Zealand', '-41.266700991298912', '173.27943399036661', 'Open Orchard', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(237, 'Open Orchard', '2 Olive Trees', '5 Fountain Pl, Beachville, Nelson 7010, New Zealand', '-41.266974991069013', '173.27561999033605', 'Open Orchard', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(238, 'Rutherford Park Open Orchard', 'Irish Strawberry', 'State Hwy, Port Nelson, Nelson 7010, New Zealand', '-41.267112991366503', '173.27879298999767', 'Open Orchard', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(239, 'Rutherford Park Open Orchard', 'Apple', '111 Haven Rd, Nelson, 7010, New Zealand', '-41.267508991380097', '173.27838099005257', 'Open Orchard', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(240, 'Auckland Point Kindergarten Open Orchard', 'Fig', '111 Haven Rd, Nelson, 7010, New Zealand', '-41.268142991356413', '173.27746600039424', 'Open Orchard', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(241, 'Auckland Point Kindergarten Open Orchard', 'Pear', '111 Haven Rd, Nelson, 7010, New Zealand', '-41.268187990966943', '173.27761799037742', 'Open Orchard', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(242, 'Grove Street Open Orchard', '3 Olives', '1 Grove St, The Wood, Nelson 7010, New Zealand', '-41.269000990867703', '173.28437800019458', 'Open Orchard', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(243, 'Grove Street Open Orchard', '1 Olive', '96 Grove St, The Wood, Nelson 7010, New Zealand', '-41.269355990666284', '173.29446400016428', 'Open Orchard', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(244, 'Maitai Walkway Open Orchard', 'Linden: Collect Flowers To Make A Tea', '13-15 Ajax Ave, Nelson, 7010, New Zealand', '-41.269595990580299', '173.28646899024784', 'Open Orchard', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(245, 'Maitai Walkway Open Orchard', 'Linden: Collect Flowers To Make A Tea', '7-13 Ajax Ave, Nelson, 7010, New Zealand', '-41.269767990790619', '173.28575099019045', 'Open Orchard', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(246, 'Open Orchard', 'Cherry', '73-85 Halifax St, The Wood, Nelson 7010, New Zealand', '-41.270968990673623', '173.29115299008765', 'Open Orchard', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(247, 'Anzac Park Open Orchard', 'Macadamia', '23 Haven Rd, Nelson, 7010, New Zealand', '-41.27112999137605', '173.27967800007963', 'Open Orchard', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(248, 'Maitai Valley Walkway Open Orchard', '3 Fig Trees', '105 Maitai Valley Rd, Maitai 7010, New Zealand', '-41.272090991379528', '173.31025700039399', 'Open Orchard', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(249, 'Branford Park Open Orchard', '2 Walnuts 1 Fig', '102 Maitai Valley Rd, Maitai 7010, New Zealand', '-41.272719990501351', '173.30581800022645', 'Open Orchard', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(250, 'Quebec Road Open Orchard', 'Peach', '43-45 Arrow St, Washington Valley, Nelson 7010, New Zealand', '-41.272853990652557', '173.27082799006155', 'Open Orchard', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(251, 'Open Orchard', 'Apple', '188 Atawhai Dr, Atawhai, Nelson 7010, New Zealand', '-41.25710373201656', '173.30077101479645', 'Open Orchard', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(252, 'Open Orchard', 'Plum', 'Trent Dr, Nelson Airport, Nelson 7011, New Zealand', '-41.297247834242604', '173.23079198035899', 'Open Orchard', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(253, 'Open Orchard', '6 Feijoas', '5 Rossetti Ct, Stoke, Nelson 7011, New Zealand', '-41.318171536161444', '173.22455901803227', 'Open Orchard', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(254, 'Open Orchard', 'Wild Watercress', '921 Main Road Stoke, Richmond 7020, New Zealand', '-41.331659313435281', '173.20967675842977', 'Open Orchard', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(255, 'Railway Reserve Stoke Open Orchard', '1 Feijoa', '14 Wordsworth Pl, Stoke, Nelson 7011, New Zealand', '-41.317375828806249', '173.22524337567569', 'Open Orchard', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(256, 'Railway Reserve Stoke Open Orchard', '4 Feijoas', '652 Main Road Stoke, Stoke, Nelson 7011, New Zealand', '-41.317805680897933', '173.22533382119576', 'Open Orchard', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(257, 'Willow Walk Open Orchard', 'Watercress And Mint', '41 Alton St, Nelson, 7010, New Zealand', '-41.27774764206697', '173.28954591683507', 'Open Orchard', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(258, 'Open Orchard', 'Apple', '55 Milnthorpe Quay, Parapara 7182, New Zealand', '-40.716523076704028', '172.68405047939495', 'Open Orchard', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(259, 'Marchwood Grove Open Orchard', 'Watercress', '1-2 Marchwood Grove, Richmond 7020, New Zealand', '-41.335060002696544', '173.20186144564448', 'Open Orchard', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(260, 'Stoke Hall Public Toilet', '', '548 Main Road Stoke, Stoke, Nelson 7011, New Zealand', '-41.314310736166092', '173.23229269470374', 'Open Orchard', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(261, 'Greenmeadows Sports Field Public Toilet', '', '23 Suter St, Stoke, Nelson 7011, New Zealand', '-41.313652408669192', '173.23840237989816', 'Open Orchard', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(262, 'ANZ ATM BP 2GO HAVEN ROAD', '', '163 Haven Rd, Beachville, Nelson 7010, New Zealand', '-41.266698374016883', '173.27573507230122', 'Atm', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(263, 'WESTPAC ATM COUNTDOWN NELSON', '', '3 St Vincent Street, Nelson, 7010, New Zealand', '-41.272699663984071', '173.27785408396417', 'Atm', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(264, 'WESTPAC ATM PAPERPLUS NELSON', '', '237 Trafalgar St, Nelson, 7010, New Zealand', '-41.273814808002228', '173.28410035801045', 'Atm', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(265, 'WESTPAC ATM TATTOO LOUNGE', '', '9 Tahunanui Dr, Tahunanui, Nelson 7011, New Zealand', '-41.281028849470125', '173.2497068945988', 'Atm', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(266, 'ANZ ATM PUTAITAI STREET STOKE', '', '15-17 Putaitai St, Stoke, Nelson 7011, New Zealand', '-41.312075284132206', '173.23398046093365', 'Atm', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(267, 'ANZ ATM NELSON BRANCH', '', '', '-41.274406965833364', '73.28413911566446', 'Atm', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(268, 'ASB ATM NELSON BRANCH', '', '260 Trafalgar St, Nelson, 7010, New Zealand', '-41.274147330259886', '173.28370970270808', 'Atm', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(269, 'BNZ ATM NELSON BRANCH', '', '228 Trafalgar St, Nelson, 7010, New Zealand', '-41.273526472438128', '173.28377003321481', 'Atm', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(270, 'ANZ ATM FASHION ISLAND NELSON', '', '244 Hardy St, Nelson, 7010, New Zealand', '-41.274448228270835', '173.28549089462555', 'Atm', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(271, 'THE NATIONAL BANK ATM NELSON BRANCH', '', '254 Trafalgar St, Nelson, 7010, New Zealand', '-41.273912628507887', '173.28375504929366', 'Atm', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(272, 'KIWIBANK ATM THE WAREHOUSE NELSON', '', '7 St Vincent St, Nelson, 7010, New Zealand', '-41.271829836058949', '173.2782415357843', 'Atm', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(273, 'KIWIBANK ATM NELSON POSTSHOP', '', '209 Hardy St, Nelson, 7010, New Zealand', '-41.274203397941633', '173.28473371607814', 'Atm', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(274, 'WESTPAC ATM NELSON AIRPORT', '', 'Nelson Airport (NSN), Trent Dr, Nelson Airport, Nelson 7011, New Zealand', '-41.299757080359861', '173.22496936095737', 'Atm', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(275, 'WESTPAC ATM NELSON BRANCH', '', '168 Trafalgar St, Nelson, 7010, New Zealand', '-41.272395316935793', '173.2837925602096', 'Atm', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(276, 'WESTPAC ATM STOKE BRANCH', '', '11 Putaitai St, Stoke, Nelson 7011, New Zealand', '-41.312139287516359', '173.23412498463725', 'Atm', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(277, 'BNZ ATM NEW WORLD NELSON', '', '73 Vanguard St, Nelson, 7010, New Zealand', '-41.275514928042718', '173.27816957846571', 'Atm', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(278, 'BNZ ATM NEW WORLD STOKE', '', '107 Neale Ave, Stoke, Nelson 7011, New Zealand', '-41.312612264797011', '173.23288218151842', 'Atm', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(279, 'BNZ ATM SHELL RUTHERFORD', '', '106 Rutherford St, Nelson, 7010, New Zealand', '-41.274653686058883', '173.2805371491425', 'Atm', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(280, 'KIWIBANK ATM MILLERS ACRE CENTRE NELSON', '', '75-81 Trafalgar St, Nelson, 7010, New Zealand', '-41.270527688723597', '173.28435326162514', 'Atm', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(281, 'KIWIBANK ATM STOKE POSTSHOP', '', '27 Putaitai St, Stoke, Nelson 7011, New Zealand', '-41.311939350921918', '173.2337486355157', 'Atm', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(282, 'Nelson Bus Station', '', '27 Bridge St, Nelson, 7010, New Zealand', '-41.272195051843362', '173.28234584734031', 'Bus Station', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(283, 'Grampians Summit', '', 'Grampian Rd, The Brook, Nelson 7010, New Zealand', '-41.298088353481582', '173.27971666264787', 'Walk, View', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(284, 'Ronaki Track', '', 'Grampians, Nelson South, Nelson 7010, New Zealand', '-41.28797477958782', '173.28391406616757', 'Walk', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(285, 'Grampians Walkway', '', 'Grampians, Nelson South, Nelson 7010, New Zealand', '-41.284881864133595', '173.28682567688827', 'Walk', 3, 1, '2012-09-01');
INSERT INTO `notes` VALUES(286, 'Demo Beach Walk', 'Beach loop from the back beach ending at the playground', 'Back Beach Road, Tahunanui, Demovile', '-41.285974', '173.23166', 'Walk, Beach, Playground', 3, 1, '2012-09-25');
INSERT INTO `notes` VALUES(287, 'Demo Valley Playground', 'A great little playground that has become a family fav with a new play house and good swings', 'Pioneer Park, Washington Valley, Demovile', '-41.272525', '173.275487', 'Playground, Swings', 3, 1, '2012-09-25');
INSERT INTO `notes` VALUES(288, 'Demo Model Train Ride', 'A hit with the whole family are the great train rides at the modelers pond - they even have Thomas!', 'Modelers pond, Tahunanui, Demovile', '-41.281806', '173.24388', 'Trains, Beach', 5, 1, '2012-09-25');
INSERT INTO `notes` VALUES(289, 'Demo Park', 'A good size park with lots of trees to climb and heaps of room to play cricket or kick around a ball', 'Back Beach Road, Tahunanui, Demovile', '-41.285974', '173.23166', 'Park, Field', 3, 1, '2012-09-25');
INSERT INTO `notes` VALUES(290, 'Demo Toilets', 'Clean toilets with a change table for the little ones', 'Pioneer Park, Washington Valley, Demovile', '-41.272525', '173.275487', 'Toilets, Change table', 3, 1, '2012-09-25');
INSERT INTO `notes` VALUES(291, 'Demo Park and Lake', 'Big park with trees, lots of grass a small lake and plenty of wildlife', 'Big Park, Tahunanui, Demovile', '-41.281806', '173.24388', 'Ducks, Lake, Park, Field', 5, 1, '2012-09-25');
INSERT INTO `notes` VALUES(292, 'Demo Forrest Walk', 'Walk through native forrest - nice wide track that is flat and suited to buggy or kids on small bikes', 'Back Beach Road, Tahunanui, Demovile', '-41.285974', '173.23166', 'Walk, Bush', 3, 1, '2012-09-25');
INSERT INTO `notes` VALUES(293, 'Demo Museum', 'This Museum is great on a rainey day (or any day actually) with exhibits aimed at the kids and that are interactive to keep them entertained.', 'Pioneer Park, Washington Valley, Demovile', '-41.272525', '173.275487', 'Rainy Day', 3, 1, '2012-09-25');
INSERT INTO `notes` VALUES(294, 'Demo Big Playground', 'Playground that suits all ages (well under 10) with a seprate toddlers area. Swings, slides, climbing structures', 'Big Park, Tahunanui, Demovile', '-41.281806', '173.24388', 'Playground, Swings, Slide', 5, 1, '2012-09-25');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL auto_increment,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `addedon` date default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` VALUES(1, 'Demo Dave', 'demo.dave@whatwewanna.co.nz', '2012-09-25');
INSERT INTO `user` VALUES(2, 'Demo Daisy', 'demo.daisey@whatwewanna.co.nz', '2012-09-25');
INSERT INTO `user` VALUES(3, 'Demo Donna', 'demo.donna@whatwewanna.co.nz', '2012-09-25');
