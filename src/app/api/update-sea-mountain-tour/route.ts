import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export async function POST() {
  try {
    const tour = {
      title: {
        en: 'Sea, Mountain & Hiking Grand Tour',
        fr: 'Grand Tour Mer, Montagne & Randonnée'
      },
      slug: {
        en: 'sea-mountain-hiking-grand-tour',
        fr: 'grand-tour-mer-montagne-randonnee'
      },
      shortDescription: {
        en: 'Duration: 12 Days / 11 Nights. A 12-day grand tour combining sea, mountain, and hiking experiences across the best of Djibouti.',
        fr: 'Durée: 12 Jours / 11 Nuits. Un grand tour de 12 jours combinant mer, montagne et randonnée à travers le meilleur de Djibouti.'
      },
      description: {
        en: 'This 12-day grand tour offers the ultimate Djibouti experience. From the DECAN animal refuge and Arta beach to the legendary Lac Assal and Lac Abbé, from the Goda Mountains hiking trails to the remote Allols and the islands of Moucha and Maskali, this comprehensive tour covers all the highlights of Djibouti. Perfect for adventurous travelers seeking a complete immersion in the country\'s diverse landscapes, cultures, and wildlife.',
        fr: 'Ce grand tour de 12 jours offre l\'expérience ultime de Djibouti. Du refuge animalier DECAN et de la plage d\'Arta au légendaire Lac Assal et au Lac Abbé, des sentiers de randonnée des Monts Goda aux Allols isolés et aux îles Moucha et Maskali, ce circuit complet couvre tous les points forts de Djibouti. Parfait pour les voyageurs aventureux en quête d\'une immersion complète dans la diversité des paysages, des cultures et de la faune du pays.'
      },
      price: 1200,
      depositAmount: 240,
      currency: 'USD',
      duration: 12,
      maxGroupSize: 8,
      difficulty: 'challenging',
      minAge: 12,
      meetingPoint: {
        en: 'Djibouti Airport or your hotel in Djibouti City',
        fr: 'Aéroport de Djibouti ou votre hôtel à Djibouti Ville'
      },
      images: {
        primary: '/images/tours/sea-mountain.jpg',
        gallery: [
          '/images/tours/sea-mountain-1.jpg',
          '/images/tours/sea-mountain-2.jpg',
          '/images/tours/sea-mountain-3.jpg',
          '/images/tours/sea-mountain-4.jpg',
        ],
      },
      destinations: ['Djibouti City', 'DECAN', 'Lac Assal', 'Lac Abbé', 'Goda Mountains', 'Allols', 'Moucha Island', 'Maskali Island'],
      highlights: {
        en: [
          'DECAN animal refuge visit',
          'Snorkeling at Arta Beach',
          'Legendary Lake Assal',
          'Lac Abbé lunar landscapes',
          'Goda Mountains hiking',
          'Remote Allols region',
          'Moucha and Maskali Islands',
          'Traditional village encounters'
        ],
        fr: [
          'Visite du refuge animalier DECAN',
          'Snorkeling à Arta Beach',
          'Légendaire Lac Assal',
          'Paysages lunaires du Lac Abbé',
          'Randonnée dans les Monts Goda',
          'Région isolée des Allols',
          'Îles Moucha et Maskali',
          'Rencontres avec les villages traditionnels'
        ]
      },
      itinerary: [
        {
          day: 1,
          title: {
            en: 'Visit to the DECAN refuge',
            fr: 'Visite du refuge DECAN'
          },
          description: {
            en: 'Arrival in Djibouti – transfer from the airport to your accommodation. Our local agency provides a comfortable, air-conditioned apartment for your overnight stay, with breakfast prepared to your preferences. Of course, if you prefer, you may book a hotel room instead. Lunch at the port restaurant in Djibouti. Afternoon: visit to the DECAN refuge. This is a wildlife park located near Djibouti that houses animals native to Djibouti and other regions of Africa. Tour of the city of Djibouti. Dinner: at a restaurant. Night: in our apartment or hotel.',
            fr: 'Arrivée à Djibouti – transfert de l\'aéroport à votre hébergement. Notre agence locale met à votre disposition un appartement confortable et climatisé pour votre nuit, avec un petit-déjeuner préparé selon vos préférences. Bien sûr, si vous préférez, vous pouvez réserver une chambre d\'hôtel à la place. Déjeuner au restaurant du port de Djibouti. Après-midi: visite du refuge DECAN. Il s\'agit d\'un parc animalier situé près de Djibouti qui abrite des animaux originaires de Djibouti et d\'autres régions d\'Afrique. Tour de la ville de Djibouti. Dîner: au restaurant. Nuit: dans notre appartement ou à l\'hôtel.'
          }
        },
        {
          day: 2,
          title: {
            en: 'Excursion and beach at Arta – 55 km',
            fr: 'Excursion et plage à Arta – 55 km'
          },
          description: {
            en: 'Morning: Hike starting from the refuge, suitable for all levels. For more experienced hikers, walk to the beach (about 2 hours). Lunch: picnic on Arta beach. Afternoon: fins, mask and snorkel on the reef at Arta beach. During the season from mid-November to January: excursions to observe whale sharks are possible; although these are gentle animals, it is not possible to schedule a meeting with them; therefore, an encounter—though likely—is never guaranteed. Return to Djibouti in the late afternoon. Dinner with a local family or at a restaurant (according to your choice). Night: in our apartment or hotel.',
            fr: 'Matin: Randonnée au départ du refuge, adaptée à tous les niveaux. Pour les randonneurs plus expérimentés, marche jusqu\'à la plage (environ 2 heures). Déjeuner: pique-nique sur la plage d\'Arta. Après-midi: palmes, masque et tuba sur le récif de la plage d\'Arta. Pendant la saison de mi-novembre à janvier: des excursions pour observer les requins-baleines sont possibles; bien que ce soient des animaux doux, il n\'est pas possible de planifier une rencontre avec eux; par conséquent, une rencontre—bien que probable—n\'est jamais garantie. Retour à Djibouti en fin d\'après-midi. Dîner avec une famille locale ou au restaurant (selon votre choix). Nuit: dans notre appartement ou à l\'hôtel.'
          }
        },
        {
          day: 3,
          title: {
            en: 'Djibouti to Randa camp via Lake Assal – 180 km',
            fr: 'Djibouti au camp Randa via le Lac Assal – 180 km'
          },
          description: {
            en: 'Morning: Early departure from Djibouti. About forty kilometers before reaching Lake Assal, we will stop to admire the magnificent scenery of the Dimbiya canyon, nicknamed the "Grand Canyon of Djibouti"… A few kilometers further on, another stop with a breathtaking view of Devil\'s Island and the Goubbet. Located in the heart of Djibouti, Lake Assal is one of the most spectacular natural sites in East Africa. This salt lake lies at approximately 153 to 155 meters below sea level, making it the lowest point in Africa. It is one of the saltiest lakes in the world (more than 300 grams of salt per liter of water). This, together with heavy evaporation due to the intense heat, explains the salt exploitation that has been practiced there for centuries. No living organisms can survive in the waters of Lake Assal. In good weather it is possible to bathe there; wearing plastic shoes is essential to protect your feet from the sharp salt crystals. The very high temperatures make the place inhospitable, but its legendary beauty, described by the adventurer-writer J. Kessel, makes it an unmissable site. Lunch: picnic on the Goubbet beach. Afternoon: we will visit the lava field located between Assal and Goubet, where we will observe the rift fault stretching for a few meters, which here measures only a few centimeters wide. Overnight at Goubbet and after breakfast we take the paved road (which is in poor condition in places) to the Randa guesthouse located at about 900 m altitude. Night in Randa and after breakfast visit the Randa gardens and its impressive legendary fig tree. After lunch, visit and immersion in a small nomad camp about 15 km from Randa, with the possibility of sleeping under the stars on site (optional). A unique experience. A rare and deeply authentic moment, suspended out of time, far from the bustle of civilization. Between simplicity and hospitality, a true human parenthesis at the pace of nomadic life.',
            fr: 'Matin: Départ tôt de Djibouti. Environ quarante kilomètres avant d\'atteindre le Lac Assal, nous nous arrêterons pour admirer le magnifique paysage du canyon de Dimbiya, surnommé le "Grand Canyon de Djibouti"… Quelques kilomètres plus loin, un autre arrêt avec une vue imprenable sur l\'île du Diable et le Goubbet. Situé au cœur de Djibouti, le Lac Assal est l\'un des sites naturels les plus spectaculaires d\'Afrique de l\'Est. Ce lac salé se trouve à environ 153 à 155 mètres sous le niveau de la mer, ce qui en fait le point le plus bas d\'Afrique. C\'est l\'un des lacs les plus salés du monde (plus de 300 grammes de sel par litre d\'eau). Ceci, associé à une forte évaporation due à la chaleur intense, explique l\'exploitation du sel qui y est pratiquée depuis des siècles. Aucun organisme vivant ne peut survivre dans les eaux du Lac Assal. Par beau temps, il est possible de s\'y baigner; le port de chaussures en plastique est essentiel pour protéger vos pieds des cristaux de sel coupants. Les températures très élevées rendent l\'endroit inhospitalier, mais sa beauté légendaire, décrite par l\'écrivain-aventurier J. Kessel, en fait un site incontournable. Déjeuner: pique-nique sur la plage de Goubbet. Après-midi: nous visiterons le champ de lave situé entre Assal et Goubet, où nous observerons la faille du rift s\'étendant sur quelques mètres, qui ne mesure ici que quelques centimètres de large. Nuit à Goubbet et après le petit-déjeuner, nous prenons la route goudronnée (qui est en mauvais état par endroits) jusqu\'à la maison d\'hôtes de Randa située à environ 900 m d\'altitude. Nuit à Randa et après le petit-déjeuner, visite des jardins de Randa et de son impressionnant figuier légendaire. Après le déjeuner, visite et immersion dans un petit campement nomade à environ 15 km de Randa, avec possibilité de dormir à la belle étoile sur place (en option). Une expérience unique. Un moment rare et profondément authentique, suspendu hors du temps, loin de l\'agitation de la civilisation. Entre simplicité et hospitalité, une véritable parenthèse humaine au rythme de la vie nomade.'
          }
        },
        {
          day: 4,
          title: {
            en: 'Hike to the Day camp at 1500 m altitude',
            fr: 'Randonnée vers le camp du Day à 1500 m d\'altitude'
          },
          description: {
            en: 'Morning: Hike from Randa to Day camp (about 4 hours) – transfer by 4x4 possible. Day camp is equipped with daboytas (traditional huts) arranged on a shaded, well-laid-out terrace. Sanitary facilities are quite satisfactory. From there, it is possible to make excursions into the primary forest of the same name or hikes to other camps in the Goda mountains, provided you are a strong hiker. Lunch and dinner at the camp.',
            fr: 'Matin: Randonnée de Randa au camp du Day (environ 4 heures) – transfert en 4x4 possible. Le camp du Day est équipé de daboytas (cases traditionnelles) disposées sur une terrasse ombragée et bien aménagée. Les sanitaires sont tout à fait satisfaisants. De là, il est possible de faire des excursions dans la forêt primaire du même nom ou des randonnées vers d\'autres camps dans les monts Goda, à condition d\'être un bon randonneur. Déjeuner et dîner au camp.'
          }
        },
        {
          day: 5,
          title: {
            en: 'Hike to Dittilou camp',
            fr: 'Randonnée vers le camp de Dittilou'
          },
          description: {
            en: 'Morning: Hike from Day camp to Dittilou camp (about 4 hours) – transfer by 4x4 possible. The Dittilou camp consists of about twenty daboytas (traditional huts) built on terraces. Located in the heart of lush vegetation at over 600 m altitude, the place breathes serenity. Sanitary facilities are clean and functional. A colony of green monkeys provides entertaining spectacles. Hiking is popular here. Experienced hikers can reach other camps in the Goda mountains. Lunch at Dittilou (beware of thieving green monkeys). Afternoon: Visit the village of Dougoum, near Dittilou camp. Dinner and overnight: Dittilou camp.',
            fr: 'Matin: Randonnée du camp du Day au camp de Dittilou (environ 4 heures) – transfert en 4x4 possible. Le camp de Dittilou se compose d\'une vingtaine de daboytas (cases traditionnelles) construites sur des terrasses. Situé au cœur d\'une végétation luxuriante à plus de 600 m d\'altitude, l\'endroit respire la sérénité. Les sanitaires sont propres et fonctionnels. Une colonie de singes verts offre des spectacles divertissants. La randonnée est populaire ici. Les randonneurs expérimentés peuvent atteindre d\'autres camps dans les monts Goda. Déjeuner à Dittilou (attention aux singes verts voleurs). Après-midi: Visite du village de Dougoum, près du camp de Dittilou. Dîner et nuit: camp de Dittilou.'
          }
        },
        {
          day: 6,
          title: {
            en: 'Journey to Ras Ali via Tadjourah – 40 km',
            fr: 'Voyage vers Ras Ali via Tadjourah – 40 km'
          },
          description: {
            en: 'Ras Ali camp is located after Tadjourah, on the seashore, at the end of a track of about ten kilometers. The sanitary facilities are basic by European standards, but perfectly adequate and clean. The cooking is excellent and the site is paradisiacal for snorkeling. Kayaking is also possible. Lunch at Ras Ali camp. Afternoon: swimming, snorkeling, kayaking on Ras Ali beach. Dinner and overnight at Ras Ali camp.',
            fr: 'Le camp de Ras Ali est situé après Tadjourah, au bord de la mer, au bout d\'une piste d\'une dizaine de kilomètres. Les sanitaires sont basiques selon les normes européennes, mais parfaitement adéquats et propres. La cuisine est excellente et le site est paradisiaque pour le snorkeling. Le kayak est également possible. Déjeuner au camp de Ras Ali. Après-midi: baignade, snorkeling, kayak sur la plage de Ras Ali. Dîner et nuit au camp de Ras Ali.'
          }
        },
        {
          day: 7,
          title: {
            en: 'From Ras Ali to Ras Bir – 100 km',
            fr: 'De Ras Ali à Ras Bir – 100 km'
          },
          description: {
            en: 'Morning: Early departure for Ras Bir camp after Obock. Lunch at a restaurant in Obock. In Obock, we will visit the house of Governor Lagarde, a remnant of the French colonization that began in Obock, and we will go to the maritime cemetery which holds the graves of French soldiers who died of fever between 1885 and 1889. Dinner and night at Ras Bir camp located on the seashore, less than ten kilometers from Obock.',
            fr: 'Matin: Départ tôt pour le camp de Ras Bir après Obock. Déjeuner dans un restaurant à Obock. À Obock, nous visiterons la maison du gouverneur Lagarde, vestige de la colonisation française qui a débuté à Obock, et nous nous rendrons au cimetière maritime qui abrite les tombes de soldats français morts de fièvre entre 1885 et 1889. Dîner et nuit au camp de Ras Bir situé au bord de la mer, à moins de dix kilomètres d\'Obock.'
          }
        },
        {
          day: 8,
          title: {
            en: 'Walk in the Godoria mangrove and return to Djibouti',
            fr: 'Promenade dans la mangrove de Godoria et retour à Djibouti'
          },
          description: {
            en: 'Morning: Visit the Ras Bir lighthouse – don\'t leave too quickly, you\'ll need to climb more than 200 steps to reach the top. We then continue north to the Godoria mangrove where a canoe excursion awaits. Return to Ras Bir camp for lunch. Afternoon: return journey to Djibouti (1). Dinner at a restaurant in Djibouti or with a local family (your choice). Night: in our apartment or hotel. (1) Depending on the day of the week, it is possible to organize a return by ferry.',
            fr: 'Matin: Visite du phare de Ras Bir – ne partez pas trop vite, il faudra gravir plus de 200 marches pour atteindre le sommet. Nous continuons ensuite vers le nord jusqu\'à la mangrove de Godoria où une excursion en pirogue nous attend. Retour au camp de Ras Bir pour le déjeuner. Après-midi: retour à Djibouti (1). Dîner au restaurant à Djibouti ou avec une famille locale (selon votre choix). Nuit: dans notre appartement ou à l\'hôtel. (1) Selon le jour de la semaine, il est possible d\'organiser un retour en ferry.'
          }
        },
        {
          day: 9,
          title: {
            en: 'On the planet Lac Abbé – 200 km',
            fr: 'Sur la planète Lac Abbé – 200 km'
          },
          description: {
            en: 'Morning: From Djibouti to Dikhil we travel about 120 km on a paved road; this is the main route used by Ethiopian truckers from the port of Djibouti to Addis Ababa to import the goods necessary for the country\'s economy. We will cross the semi-desert expanses of Petit Bara and Grand Bara where we will observe mirages, dust devils and… gazelles, with some luck. Lunch at the Gobaad restaurant in Dikhil. Afternoon: After Dikhil, we leave the road to travel 80 km of tracks that are sometimes sandy. We will cross the villages of As Eyla and Koutabouya. At the end of the route we may observe warthogs. Border site between Ethiopia and Djibouti, Lake Abbé presents a unique panorama. Its limestone chimneys offer a lunar landscape, very popular with photographers from all over the world, especially at sunrise and sunset. The first version of the film "Planet of the Apes" was shot at Lac Abbé…according to the rumor. The sulfur scents escaping from the numerous fumaroles gave the lake its name. Indeed, Abbé means "rotten"! The unique landscapes of the chimneys which can reach 50 meters in height, would almost make us forget the presence of the lake, on the banks of which we can observe pink flamingos! Arrival at the Lac Abbé camp in the evening, to watch the sunset. Evening meal and overnight at Lac Abbé camp.',
            fr: 'Matin: De Djibouti à Dikhil, nous parcourons environ 120 km sur une route asphaltée; c\'est la route principale utilisée par les camionneurs éthiopiens du port de Djibouti à Addis-Abeba pour importer les marchandises nécessaires à l\'économie du pays. Nous traverserons les étendues semi-désertiques du Petit Bara et du Grand Bara où nous observerons des mirages, des tourbillons de poussière et… des gazelles, avec un peu de chance. Déjeuner au restaurant Gobaad à Dikhil. Après-midi: Après Dikhil, nous quittons la route pour parcourir 80 km de pistes parfois sablonneuses. Nous traverserons les villages d\'As Eyla et Koutabouya. Au bout du parcours, nous pourrons observer des phacochères. Site frontalier entre l\'Éthiopie et Djibouti, le Lac Abbé présente un panorama unique. Ses cheminées de calcaire offrent un paysage lunaire, très prisé des photographes du monde entier, surtout au lever et au coucher du soleil. La première version du film "La Planète des Singes" a été tournée au Lac Abbé… selon la rumeur. Les odeurs de soufre s\'échappant des nombreuses fumerolles ont donné son nom au lac. En effet, Abbé signifie "pourri"! Les paysages uniques des cheminées qui peuvent atteindre 50 mètres de hauteur, feraient presque oublier la présence du lac, sur les rives duquel on peut observer des flamants roses! Arrivée au camp du Lac Abbé en soirée, pour admirer le coucher du soleil. Repas du soir et nuit au camp du Lac Abbé.'
          }
        },
        {
          day: 10,
          title: {
            en: 'Lac Abbé - Djibouti - 220 km',
            fr: 'Lac Abbé - Djibouti - 220 km'
          },
          description: {
            en: 'Morning: You will have to get up very early to watch the spectacle of the sunrise in the middle of the chimneys! Then we will try to approach the pink flamingos at the edge of the lake, which from year to year withdraws further and further. We will also observe some sources of boiling water. Then we take the way back to Djibouti. Lunch at Arta at Sunny Hill or at the Maison des Randonneurs run by an ex-French legionnaire, who fell in love with the country and is a real celebrity in Djibouti. Arta is a charming town, "perched" at an altitude of 600 meters, where the notables of Djibouti have a second home to take advantage of its mild temperature, 4 or 5 degrees lower than that of Djibouti. Arrival in Djibouti at the beginning of the afternoon, which will allow us to visit the city: lively areas such as Mahamoud Harbi Square, the starting point for public transport, Ménélik Square, Ethiopia Street, the shopping street of the Caisses... Evening meal: Restaurant in Djibouti. Night: in our apartment or hotel.',
            fr: 'Matin: Il faudra se lever très tôt pour assister au spectacle du lever du soleil au milieu des cheminées! Puis nous tenterons d\'approcher les flamants roses au bord du lac, qui d\'année en année s\'éloigne de plus en plus. Nous observerons également quelques sources d\'eau bouillante. Ensuite, nous prenons le chemin du retour vers Djibouti. Déjeuner à Arta au Sunny Hill ou à la Maison des Randonneurs tenue par un ancien légionnaire français, tombé amoureux du pays et qui est une véritable célébrité à Djibouti. Arta est une charmante ville, "perchée" à 600 mètres d\'altitude, où les notables de Djibouti ont une résidence secondaire pour profiter de sa température douce, 4 ou 5 degrés de moins que celle de Djibouti. Arrivée à Djibouti en début d\'après-midi, ce qui nous permettra de visiter la ville: les quartiers animés comme la place Mahamoud Harbi, point de départ des transports en commun, la place Ménélik, la rue d\'Éthiopie, la rue commerçante des Caisses... Repas du soir: Restaurant à Djibouti. Nuit: dans notre appartement ou à l\'hôtel.'
          }
        },
        {
          day: 11,
          title: {
            en: 'Day at the Moucha or Maskali Islands',
            fr: 'Journée aux îles Moucha ou Maskali'
          },
          description: {
            en: 'With only a few inhabitants, these two coral islands located at the entrance to the Gulf of Tadjourah are conducive to relaxation and idleness. We reach these islands after barely 30 minutes by boat. With a bit of luck, we will come across some dolphins… Snorkeling enthusiasts will prefer the observation of underwater fauna and flora in Maskali. For an additional fee, a scuba diving day with an oxygen bottle can be offered on Moucha Island. Lunch will be taken on the island. Return to Djibouti in the late afternoon. Evening meal: restaurant in Djibouti. Night: in our apartment or at the hotel.',
            fr: 'Avec seulement quelques habitants, ces deux îles coralliennes situées à l\'entrée du Golfe de Tadjourah sont propices à la détente et à la flânerie. Nous rejoignons ces îles après à peine 30 minutes en bateau. Avec un peu de chance, nous croiserons quelques dauphins… Les amateurs de snorkeling préféreront l\'observation de la faune et de la flore sous-marines à Maskali. Moyennant un supplément, une journée de plongée avec bouteille d\'oxygène peut être proposée sur l\'île Moucha. Le déjeuner sera pris sur l\'île. Retour à Djibouti en fin d\'après-midi. Repas du soir: restaurant à Djibouti. Nuit: dans notre appartement ou à l\'hôtel.'
          }
        },
        {
          day: 12,
          title: {
            en: 'Relaxing Day in Korambado -15 km',
            fr: 'Journée de détente à Korambado -15 km'
          },
          description: {
            en: 'Snorkeling on the program for this day. Lunch in a hut on the beach. You need a good 4x4 vehicle to get down to Korambado. Not far from Djibouti, the site is interesting for the practice of snorkeling (east side). A few "local color" huts, installed by the sea, provide the shade and the meal necessary to spend a very pleasant day there. Evening meal at the restaurant in Djibouti. On the menu Yemeni fish, the fish that you choose yourself, is cut into two slices placed in a circular oven…. Evening transfer to Djibouti airport.',
            fr: 'Snorkeling au programme pour cette journée. Déjeuner dans une case sur la plage. Il faut un bon véhicule 4x4 pour descendre à Korambado. Non loin de Djibouti, le site est intéressant pour la pratique du snorkeling (côté est). Quelques cases "couleur locale", installées au bord de la mer, procurent l\'ombre et le repas nécessaires pour y passer une journée très agréable. Repas du soir au restaurant à Djibouti. Au menu le poisson yéménite, le poisson que vous choisissez vous-même, est coupé en deux tranches placées dans un four circulaire…. Transfert en soirée à l\'aéroport de Djibouti.'
          }
        }
      ],
      included: {
        en: [
          'Transfer to/from the airport',
          'Private vehicle with driver and all transports within the country (ferry...)',
          'Services of guides qualified in French or English during the whole voyage',
          'Full board meal; meals at the restaurant are included for the fixed price indicated in the detailed program which will be given to you, an adjustment is made at the end of the stay according to the real cost of the meals taken',
          'One and a half liters of water per day per person',
          'Accommodation in a double room at the hotel in Djibouti city, or in the apartment of our local agency according to your choice'
        ],
        fr: [
          'Transfert à/et de l\'aéroport',
          'Véhicule privé avec chauffeur et tous les transports dans le pays (ferry...)',
          'Services de guides qualifiés en français ou en anglais pendant tout le voyage',
          'Pension complète; les repas au restaurant sont inclus pour le prix forfaitaire indiqué dans le programme détaillé qui vous sera remis, un ajustement est effectué en fin de séjour selon le coût réel des repas pris',
          'Un litre et demi d\'eau par jour par personne',
          'Hébergement en chambre double à l\'hôtel à Djibouti ville, ou dans l\'appartement de notre agence locale selon votre choix'
        ]
      },
      excluded: {
        en: [
          'International flights and visa',
          'Alcoholic beverages',
          'Medical expense insurance or medical repatriation',
          'Tips'
        ],
        fr: [
          'Vols internationaux et visa',
          'Boissons alcoolisées',
          'Assurance frais médicaux ou rapatriement médical',
          'Pourboires'
        ]
      },
      whatToBring: {
        en: [
          'Hiking boots',
          'Comfortable walking shoes',
          'Swimsuit and towel',
          'Snorkeling equipment (if you have your own)',
          'Sun protection (hat, sunscreen, sunglasses)',
          'Camera',
          'Warm layers for mountain nights',
          'Water bottle',
          'Headlamp/flashlight',
          'Personal medications'
        ],
        fr: [
          'Chaussures de randonnée',
          'Chaussures de marche confortables',
          'Maillot de bain et serviette',
          'Équipement de snorkeling (si vous en avez)',
          'Protection solaire (chapeau, crème solaire, lunettes)',
          'Appareil photo',
          'Vêtements chauds pour les nuits en montagne',
          'Bouteille d\'eau',
          'Lampe frontale/torche',
          'Médicaments personnels'
        ]
      },
      accommodation: {
        en: 'Mixed accommodation including camps, guesthouses, and apartments',
        fr: 'Hébergement mixte incluant camps, maisons d\'hôtes et appartements'
      },
      transportation: {
        en: 'Private 4x4 with air conditioning, ferry where applicable',
        fr: '4x4 privé avec climatisation, ferry le cas échéant'
      },
      cancellationPolicy: {
        en: 'Free cancellation up to 30 days before the tour. 50% refund for cancellations within 14 days. No refund for no-shows.',
        fr: 'Annulation gratuite jusqu\'à 30 jours avant le circuit. Remboursement de 50 % pour les annulations dans les 14 jours. Aucun remboursement pour les non-présentations.'
      },
      faqs: [
        {
          question: {
            en: 'Is this tour suitable for beginners?',
            fr: 'Ce circuit est-il adapté aux débutants ?'
          },
          answer: {
            en: 'This tour is challenging and best suited for experienced hikers. Some hikes are up to 4 hours.',
            fr: 'Ce circuit est difficile et convient mieux aux randonneurs expérimentés. Certaines randonnées peuvent durer jusqu\'à 4 heures.'
          }
        },
        {
          question: {
            en: 'What is the best time for this tour?',
            fr: 'Quelle est la meilleure période pour ce circuit ?'
          },
          answer: {
            en: 'The best time is from November to April when the weather is cooler and more comfortable for hiking.',
            fr: 'La meilleure période est de novembre à avril, lorsque le temps est plus frais et plus confortable pour la randonnée.'
          }
        }
      ],
      bestSeasons: ['nov', 'dec', 'jan', 'feb', 'mar', 'apr'],
      categories: ['adventure', 'hiking', 'grand-tour'],
      tags: ['Grand Tour', 'Mountains', 'Sea', 'Hiking', 'Lac Abbé', 'Lac Assal'],
      metaTitle: {
        en: 'Sea, Mountain & Hiking Grand Tour | Djibouti Explorer',
        fr: 'Grand Tour Mer, Montagne & Randonnée | Djibouti Explorer'
      },
      metaDescription: {
        en: 'A 12-day grand tour combining sea, mountain, and hiking experiences across the best of Djibouti.',
        fr: 'Un grand tour de 12 jours combinant mer, montagne et randonnée à travers le meilleur de Djibouti.'
      },
      rating: 0,
      reviewCount: 0,
      featured: true,
      published: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Find and update the tour
    const snapshot = await adminDb.collection('tours')
      .where('slug.en', '==', 'sea-mountain-hiking-grand-tour')
      .get();

    if (snapshot.empty) {
      await adminDb.collection('tours').add(tour);
      return NextResponse.json({
        success: true,
        message: '✅ Sea, Mountain & Hiking Grand Tour added successfully!',
      });
    }

    const doc = snapshot.docs[0]!; // non-null assertion: snapshot.empty was checked above
    await adminDb.collection('tours').doc(doc.id).update(tour);

    return NextResponse.json({
      success: true,
      message: '✅ Sea, Mountain & Hiking Grand Tour updated with exact itinerary!',
    });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}