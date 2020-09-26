const { Router } = require('express')
const QRCode = require('qrcode')
const LogEntry = require('../models/LogEntry')

const router = Router()

const { API_KEY } = process.env

router.get('/', (req, res) => {
  res.json({
    message: '🗺',
  })
})

router.get('/all', async (req, res, next) => {
  try {
    const allLogs = await LogEntry.find()
    // console.log(allLogs)
    res.json(allLogs)
  } catch (error) {
    next(error)
  }
})

router.post('/qr', (req, res) => {
  const qrStringInfo = req.body.qrString
    ? req.body.qrString
    : 'https://www.youtube.com/watch?v=G1IbRujko-A'
  console.log(qrStringInfo)
  QRCode.toDataURL(qrStringInfo, (err, url) => {
    res.json({
      imageQR: url,
    })
  })
})

router.post('/post', async (req, res, next) => {
  try {
    if (req.get('API_KEY') !== API_KEY) {
      res.status(401)
      throw new Error('UnAuthorized')
    }

    const newLogEntry = new LogEntry(req.body)
    const savedEntrie = await newLogEntry.save()
    // console.log(savedEntrie);
    return res.json(savedEntrie)
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422)
    }
    return next(error)
  }
})

// modify in construccion

router.put('/modify', async (req, res, next) => {
  try {
    return res.json({
      message: 'modify completed',
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(422)
    }
    return next(error)
  }
})

router.delete('/delete', async (req, res, next) => {
  try {
    const removed = await LogEntry.deleteOne({ _id: req.body.entryId })
    res.status(200)
    return res.json({
      ...removed,
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(422)
    }
    return next(error)
  }
})

router.get('/artists', (req, res) => {
  res.json({
    artists: [
      {
        id: 1,
        name: 'Jimi Hendrix',
        cover: 'jimi_hendrix',
        bio:
          "James Marshall 'Jimi' Hendrix (born Johnny Allen Hendrix; November 27, 1942 – September 18, 1970) was an American musician, singer, and songwriter. Although his mainstream career spanned only four years, he is widely regarded as one of the most influential electric guitarists in the history of popular music, and one of the most celebrated musicians of the 20th century. The Rock and Roll Hall of Fame describes him as 'arguably the greatest instrumentalist in the history of rock music'",
        albums: [
          {
            albumId: 'a1',
            title: 'Electric Ladyland',
            year: 1968,
            cover: 'electric-ladyland',
            price: 20,
          },
          {
            albumId: 'a2',
            title: 'Experience',
            year: 1971,
            cover: 'experienced',
            price: 25,
          },
          {
            albumId: 'a3',
            title: 'Isle of Wright',
            year: 1971,
            cover: 'isle_of_wright',
            price: 15,
          },
          {
            albumId: 'a4',
            title: 'Band of Gypsys',
            year: 1970,
            cover: 'band_of_gypsys',
            price: 10,
          },
        ],
        genre: 'rock, blues',
      },
      {
        id: 2,
        name: 'Madonna',
        cover: 'madonna',
        bio:
          "Madonna is a pop music singer and actress who went solo in 1981 and became a sensation in the then male-dominated 1980s music scene. By 1991, she had achieved 21 Top 10 hits in the United States and sold more than 70 million albums internationally. In January 2008, she was named the world's wealthiest female musician by Forbes magazine.",
        albums: [
          {
            albumId: 'b1',
            title: 'Like a Virgin',
            year: 1984,
            cover: 'like_a_virgin',
            price: 20,
          },
          {
            albumId: 'b2',
            title: 'True Blue',
            year: 1986,
            cover: 'true_blue',
            price: 25,
          },
          {
            albumId: 'b3',
            title: 'Erotica',
            year: 1994,
            cover: 'erotica',
            price: 15,
          },
          {
            albumId: 'b4',
            title: 'Ray of Light',
            year: 1998,
            cover: 'ray_of_light',
            price: 10,
          },
        ],
        genre: 'pop',
      },
      {
        id: 3,
        name: 'Johnny Cash',
        cover: 'johnny_cash',
        bio:
          "Born to poor cotton farmers in Kingsland, Arkansas, Cash rose to fame in the prominent country music scene in Memphis, Tennessee, after four years in the Air Force. He traditionally began his concerts by simply introducing himself,'Hello, I'm Johnny Cash,' followed by 'Folsom Prison Blues', one of his signature songs.",
        albums: [
          {
            albumId: 'c1',
            title: "Ain't No Grave",
            year: 2010,
            cover: 'no_grave',
            price: 20,
          },
          {
            albumId: 'c2',
            title: 'Out Among the Stars',
            year: 2014,
            cover: 'among_stars',
            price: 25,
          },
          {
            albumId: 'c3',
            title: 'Solitary Man',
            year: 2000,
            cover: 'solitary_man',
            price: 15,
          },
          {
            albumId: 'c4',
            title: 'The Man Comes Around',
            year: 2002,
            cover: 'man_comes_around',
            price: 10,
          },
        ],
        genre: 'pop',
      },
      {
        id: 4,
        name: 'Pink Floyd',
        cover: 'pink_floyd',
        bio:
          'Pink Floyd were an English rock band formed in London in 1965. Gaining a following as a psychedelic pop group, they were distinguished for their extended compositions, sonic experimentation, philosophical lyrics and elaborate live shows, and became a leading band of the progressive rock genre.',
        albums: [
          {
            albumId: 'd1',
            title: 'The Wall',
            year: 1979,
            cover: 'the_wall',
            price: 20,
          },
          {
            albumId: 'd2',
            title: 'The Dark Side of the Moon',
            year: 1973,
            cover: 'dark_side',
            price: 25,
          },
          {
            albumId: 'd3',
            title: 'Animals',
            year: 1977,
            cover: 'animals',
            price: 15,
          },
        ],
        genre: 'Rock',
      },
      {
        // function passParam (req, res, next) {
        //   QRCode.toFile(
        //     'path/to/filename.png',
        //     'Some text',
        //     {
        //       color: {
        //         dark: '#00F', // Blue dots
        //         light: '#0000' // Transparent background
        //       }
        //     },
        //     function (err) {
        //       if (err) throw err
        //       console.log('done')
        //     }
        //   )
        //   req.user = 'mau aqui'
        //   next()
        // }

        id: 5,
        name: 'Kirk_fletcher',
        cover: 'kirk-fletcher',
        bio:
          'Kirk Fletcher (born December 23, 1975) is an American electric blues guitarist, singer, and songwriter. ... Fletcher has been nominated for four Blues Music Awards and was a 2015 British Blues Awards nominee. His latest album, Hold On, was released in October 2018.',
        albums: [
          {
            albumId: 'd1',
            title: 'The Wall',
            year: 1979,
            cover: 'the_wall',
            price: 20,
          },
          {
            albumId: 'd2',
            title: 'The Dark Side of the Moon',
            year: 1973,
            cover: 'dark_side',
            price: 25,
          },
          {
            albumId: 'd3',
            title: 'Animals',
            year: 1977,
            cover: 'animals',
            price: 15,
          },
        ],
        genre: 'Rock',
      },
      {
        id: 6,
        name: 'Nirvana',
        cover: 'nirvana',
        bio:
          'Nirvana was an American rock band formed in Aberdeen, Washington, in 1987. Founded by lead singer-songwriter and guitarist Kurt Cobain and bassist Krist Novoselic, the band went through a succession of drummers before recruiting Dave Grohl in 1990.',
        albums: [
          {
            albumId: 'd1',
            title: 'The Wall',
            year: 1979,
            cover: 'the_wall',
            price: 20,
          },
          {
            albumId: 'd2',
            title: 'The Dark Side of the Moon',
            year: 1973,
            cover: 'dark_side',
            price: 25,
          },
          {
            albumId: 'd3',
            title: 'Animals',
            year: 1977,
            cover: 'animals',
            price: 15,
          },
        ],
        genre: 'Rock',
      },
      {
        id: 7,
        name: 'Red hot',
        cover: 'red_hot',
        bio:
          'Red Hot Chili Peppers are an American rock band formed in Los Angeles in 1983. ... The band consists of lead vocalist Anthony Kiedis, bassist Flea, drummer Chad Smith, and guitarist John Frusciante. With over 80 million records sold worldwide, Red Hot Chili Peppers are one of the best-selling bands of all time.',
        albums: [
          {
            albumId: 'd1',
            title: 'The Wall',
            year: 1979,
            cover: 'the_wall',
            price: 20,
          },
          {
            albumId: 'd2',
            title: 'The Dark Side of the Moon',
            year: 1973,
            cover: 'dark_side',
            price: 25,
          },
          {
            albumId: 'd3',
            title: 'Animals',
            year: 1977,
            cover: 'animals',
            price: 15,
          },
        ],
        genre: 'Rock',
      },
      {
        id: 8,
        name: 'Gorillaz',
        cover: 'gorilaz',
        bio:
          "Gorillaz are a British virtual band created in 1998 by musician Damon Albarn and artist Jamie Hewlett. The band primarily consists of four animated members: Stuart '2-D' Pot, Murdoc Niccals, Noodle, and Russel Hobbs. Their fictional universe is presented in music videos, interviews and short cartoons.",
        albums: [
          {
            albumId: 'd1',
            title: 'The Wall',
            year: 1979,
            cover: 'the_wall',
            price: 20,
          },
          {
            albumId: 'd2',
            title: 'The Dark Side of the Moon',
            year: 1973,
            cover: 'dark_side',
            price: 25,
          },
          {
            albumId: 'd3',
            title: 'Animals',
            year: 1977,
            cover: 'animals',
            price: 15,
          },
        ],
        genre: 'Rock',
      },
    ],
  })
})

module.exports = router
