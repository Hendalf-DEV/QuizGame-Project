
import mongoose from 'mongoose'
import { question } from '../models/questionModel.js'
import { MONGODB_URI } from '../config/config.js'

const sampleQuestions = [
  {
    'question': 'Mikä on maailman suurin valtameri?',
    'options': [
      'Atlantin valtameri',
      'Intian valtameri',
      'Tyynimeri',
      'Jäämeri'
    ],
    'correctIndex': 2
  },
  {
    'question': 'Kuka oli Yhdysvaltain ensimmäinen presidentti?',
    'options': [
      'Thomas Jefferson',
      'George Washington',
      'Abraham Lincoln',
      'John Adams'
    ],
    'correctIndex': 1
  },
  {
    'question': 'Mikä alkuaine on kemialliselta merkiltään O?',
    'options': [
      'Kulta',
      'Happi',
      'Hopea',
      'Helium'
    ],
    'correctIndex': 1
  },
  {
    'question': 'Missä kaupungissa sijaitsee Eiffel-torni?',
    'options': [
      'Lontoo',
      'Pariisi',
      'Rooma',
      'Berliini'
    ],
    'correctIndex': 1
  },
  {
    'question': 'Kuka sävelsi \'Pienen yösoiton\'?',
    'options': [
      'Beethoven',
      'Mozart',
      'Bach',
      'Chopin'
    ],
    'correctIndex': 1
  },
  {
    'question': 'Mikä planeetta on lähimpänä aurinkoa?',
    'options': [
      'Venus',
      'Merkurius',
      'Mars',
      'Jupiter'
    ],
    'correctIndex': 1
  },
  {
    'question': 'Kuka kirjoitti \'Romeo ja Julia\'?',
    'options': [
      'Charles Dickens',
      'William Shakespeare',
      'Jane Austen',
      'Mark Twain'
    ],
    'correctIndex': 1
  },
  {
    'question': 'Mikä on Suomen kansalliseläin?',
    'options': [
      'Karhu',
      'Susi',
      'Ilves',
      'Hirvi'
    ],
    'correctIndex': 0
  },
  {
    'question': 'Kuka voitti jalkapallon MM-kisat 2018?',
    'options': [
      'Brasilia',
      'Saksa',
      'Ranska',
      'Argentiina'
    ],
    'correctIndex': 2
  },
  {
    'question': 'Mikä on maailman korkein vuori?',
    'options': [
      'K2',
      'Mount Everest',
      'Kilimanjaro',
      'Mont Blanc'
    ],
    'correctIndex': 1
  },
  {
    'question': 'Kuka keksi hehkulampun?',
    'options': [
      'Nikola Tesla',
      'Thomas Edison',
      'Alexander Graham Bell',
      'Benjamin Franklin'
    ],
    'correctIndex': 1
  },
  {
    'question': 'Missä maassa sijaitsee Machu Picchu?',
    'options': [
      'Chile',
      'Peru',
      'Brasilia',
      'Meksiko'
    ],
    'correctIndex': 1
  },
  {
    'question': 'Mikä on maailman suurin aavikko?',
    'options': [
      'Sahara',
      'Arabian aavikko',
      'Gobi',
      'Kalahari'
    ],
    'correctIndex': 0
  },
  {
    'question': 'Kuka on Harry Potter -kirjojen kirjoittaja?',
    'options': [
      'J.R.R. Tolkien',
      'J.K. Rowling',
      'Stephen King',
      'Suzanne Collins'
    ],
    'correctIndex': 1
  },
  {
    'question': 'Mikä on ihmisen suurin elin?',
    'options': [
      'Maksa',
      'Iho',
      'Keuhkot',
      'Sydän'
    ],
    'correctIndex': 1
  },
  {
    'question': 'Missä kaupungissa järjestettiin ensimmäiset modernit olympialaiset?',
    'options': [
      'Ateena',
      'Pariisi',
      'Lontoo',
      'Rooma'
    ],
    'correctIndex': 0
  },
  {
    'question': 'Kuka näyttelee Jack Dawsonia elokuvassa Titanic?',
    'options': [
      'Brad Pitt',
      'Leonardo DiCaprio',
      'Tom Cruise',
      'Johnny Depp'
    ],
    'correctIndex': 1
  },
  {
    'question': 'Mikä on maailman pisin joki?',
    'options': [
      'Amazon',
      'Niili',
      'Mississippi',
      'Jangtse'
    ],
    'correctIndex': 0
  },
  {
    'question': 'Kuka maalasi Mona Lisan?',
    'options': [
      'Michelangelo',
      'Leonardo da Vinci',
      'Raphael',
      'Van Gogh'
    ],
    'correctIndex': 1
  },
  {
    'question': 'Mikä on Japanin pääkaupunki?',
    'options': [
      'Osaka',
      'Tokio',
      'Kioto',
      'Nagoya'
    ],
    'correctIndex': 1
  },
  {
    'question': 'Kuka voitti Nobelin rauhanpalkinnon vuonna 1993 Nelson Mandelan kanssa?',
    'options': [
      'Desmond Tutu',
      'F.W. de Klerk',
      'Kofi Annan',
      'Jimmy Carter'
    ],
    'correctIndex': 1
  },
  {
    'question': 'Mikä on maailman suurin saari?',
    'options': [
      'Madagaskar',
      'Grönlanti',
      'Borneo',
      'Australia'
    ],
    'correctIndex': 1
  },
  {
    'question': 'Kuka on säveltänyt \'Für Elise\'?',
    'options': [
      'Beethoven',
      'Mozart',
      'Bach',
      'Haydn'
    ],
    'correctIndex': 0
  },
  {
    'question': 'Missä maassa sijaitsee Taj Mahal?',
    'options': [
      'Pakistan',
      'Intia',
      'Nepal',
      'Bangladesh'
    ],
    'correctIndex': 1
  },
  {
    'question': 'Mikä on kemiallinen merkki raudalle?',
    'options': [
      'Fe',
      'Ir',
      'Ra',
      'Rn'
    ],
    'correctIndex': 0
  },
  {
    'question': 'Kuka ohjasi elokuvan \'Inception\'?',
    'options': [
      'Steven Spielberg',
      'Christopher Nolan',
      'James Cameron',
      'Ridley Scott'
    ],
    'correctIndex': 1
  },
  {
    'question': 'Mikä eläin tunnetaan \'aavikon laivana\'?',
    'options': [
      'Kameli',
      'Hevonen',
      'Aasi',
      'Dromedaari'
    ],
    'correctIndex': 0
  },
  {
    'question': 'Kuka kirjoitti \'Sota ja rauha\'?',
    'options': [
      'Leo Tolstoi',
      'Fjodor Dostojevski',
      'Anton Tšehov',
      'Aleksandr Pushkin'
    ],
    'correctIndex': 0
  },
  {
    'question': 'Mikä on maailman suurin maa pinta-alaltaan?',
    'options': [
      'Kanada',
      'Kiina',
      'Venäjä',
      'Yhdysvallat'
    ],
    'correctIndex': 2
  },
  {
    'question': 'Kuka keksi puhelimen?',
    'options': [
      'Alexander Graham Bell',
      'Thomas Edison',
      'Nikola Tesla',
      'Guglielmo Marconi'
    ],
    'correctIndex': 0
  },
  {
    'question': 'Missä kaupungissa sijaitsee Colosseum?',
    'options': [
      'Ateena',
      'Rooma',
      'Istanbul',
      'Milano'
    ],
    'correctIndex': 1
  },
  {
    'question': 'Mikä on maailman syvin järvi?',
    'options': [
      'Baikal',
      'Tanganjika',
      'Superior',
      'Victoria'
    ],
    'correctIndex': 0
  },
  {
    'question': 'Kuka on säveltänyt \'Joutsenlampi\'?',
    'options': [
      'Tšaikovski',
      'Beethoven',
      'Mozart',
      'Strauss'
    ],
    'correctIndex': 0
  },
  {
    'question': 'Mikä on Australian pääkaupunki?',
    'options': [
      'Sydney',
      'Melbourne',
      'Canberra',
      'Brisbane'
    ],
    'correctIndex': 2
  },
  {
    'question': 'Kuka näyttelee Iron Mania Marvel-elokuvissa?',
    'options': [
      'Chris Evans',
      'Robert Downey Jr.',
      'Chris Hemsworth',
      'Mark Ruffalo'
    ],
    'correctIndex': 1
  },
  {
    'question': 'Mikä on maailman korkein rakennus?',
    'options': [
      'Shanghai Tower',
      'Burj Khalifa',
      'Taipei 101',
      'Empire State Building'
    ],
    'correctIndex': 1
  },
  {
    'question': 'Kuka kirjoitti \'Don Quijote\'?',
    'options': [
      'Miguel de Cervantes',
      'Gabriel García Márquez',
      'Pablo Neruda',
      'Federico García Lorca'
    ],
    'correctIndex': 0
  },
  {
    'question': 'Missä maassa sijaitsee Niagaran putoukset?',
    'options': [
      'Yhdysvallat ja Kanada',
      'Kanada ja Meksiko',
      'Yhdysvallat ja Meksiko',
      'Kanada ja Alaska'
    ],
    'correctIndex': 0
  },
  {
    'question': 'Mikä on kemiallinen merkki vedylle?',
    'options': [
      'H',
      'He',
      'Hy',
      'Hd'
    ],
    'correctIndex': 0
  },
  {
    'question': 'Kuka ohjasi elokuvan \'Avatar\'?',
    'options': [
      'James Cameron',
      'Peter Jackson',
      'George Lucas',
      'Ridley Scott'
    ],
    'correctIndex': 0
  },
  {
    'question': 'Mikä eläin on nopein maalla?',
    'options': [
      'Leijona',
      'Antilooppi',
      'Gepardi',
      'Tiikeri'
    ],
    'correctIndex': 2
  },
  {
    'question': 'Kuka kirjoitti \'Pieni prinsessa\'?',
    'options': [
      'Frances Hodgson Burnett',
      'Louisa May Alcott',
      'Lucy Maud Montgomery',
      'Beatrix Potter'
    ],
    'correctIndex': 0
  },
  {
    'question': 'Mikä on maailman suurin tulivuori?',
    'options': [
      'Mauna Loa',
      'Etna',
      'Krakatoa',
      'Vesuvius'
    ],
    'correctIndex': 0
  },
  {
    'question': 'Kuka voitti jalkapallon MM-kisat 2014?',
    'options': [
      'Saksa',
      'Brasilia',
      'Espanja',
      'Argentiina'
    ],
    'correctIndex': 0
  },
  {
    'question': 'Missä maassa sijaitsee pyramideja Gizan alueella?',
    'options': [
      'Sudan',
      'Egypti',
      'Libya',
      'Marokko'
    ],
    'correctIndex': 1
  },
  {
    'question': 'Mikä on kemiallinen merkki natriumille?',
    'options': [
      'Na',
      'N',
      'Nm',
      'Nr'
    ],
    'correctIndex': 0
  },
  {
    'question': 'Kuka ohjasi elokuvan \'Jurassic Park\'?',
    'options': [
      'Steven Spielberg',
      'George Lucas',
      'James Cameron',
      'Ridley Scott'
    ],
    'correctIndex': 0
  },
  {
    'question': 'Mikä eläin tunnetaan suurimpana nisäkkäänä?',
    'options': [
      'Afrikan norsu',
      'Sinivalas',
      'Virtahepo',
      'Sarvikuono'
    ],
    'correctIndex': 1
  },
  {
    'question': 'Kuka kirjoitti \'Anna Karenina\'?',
    'options': [
      'Leo Tolstoi',
      'Fjodor Dostojevski',
      'Anton Tšehov',
      'Aleksandr Pushkin'
    ],
    'correctIndex': 0
  },
  {
    'question': 'Mikä on maailman suurin valtio väkiluvultaan?',
    'options': [
      'Intia',
      'Kiina',
      'Yhdysvallat',
      'Indonesia'
    ],
    'correctIndex': 1
  }
]

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...')
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB!')

    console.log('Clearing existing questions...')
    await question.deleteMany({})

    console.log('Inserting sample questions...')
    await question.insertMany(sampleQuestions)

    console.log(`Successfully seeded ${sampleQuestions.length} questions!`)
    process.exit(0)
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()

