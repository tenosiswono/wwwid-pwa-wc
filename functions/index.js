const functions = require('firebase-functions')
const axios = require('axios')
const LRUCache = require('lru-cache')
const slug = require('slug')
const cors = require('cors')({origin: true})

const apiCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60
})
const getCacheKey = (req) => {
  return `${req.url}`
}
exports.api = functions.https.onRequest((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  cors(req, res, () => {
    renderAndCache(req, res)
  })
})

const processData = (req, res, apiData) => {
  const key = getCacheKey(req)
  let response
  if (req.query.type === 'detail') {
    let dataDetail = apiData.filter(i => req.query.slug === i.slug)[0]
    if (dataDetail) {
      response = JSON.stringify({
        author: dataDetail.author,
        pubDate: dataDetail.pubDate,
        title: dataDetail.title,
        slug: dataDetail.slug,
        thumbnail: dataDetail.thumbnail,
        categories: dataDetail.categories,
        content: dataDetail.content
      })
    } else {
      res.status(404).send('Not found')
      return
    }
  } else {
    console.log(apiData)
    response = JSON.stringify(
      apiData.filter(i => req.query.cat ? i.categories.indexOf(req.query.cat) > -1 : true).map(i => {
        return {
          author: i.author,
          pubDate: i.pubDate,
          title: i.title,
          slug: i.slug,
          thumbnail: i.thumbnail,
          description: i.description
        }
      })
      )
  }
  if (res.statusCode !== 200) {
    res.send(response)
    return
  }
  apiCache.set(key, response)
  res.setHeader('x-cache', 'MISS')
  res.send(response)
}
const renderAndCache = (req, res) => {
  const key = getCacheKey(req)
  if (apiCache.has(key)) {
    res.setHeader('x-cache', 'HIT')
    res.send(apiCache.get(key))
    return
  }
  if (apiCache.has('api-data')) {
    processData(req, res, apiCache.get('api-data'))
  } else {
    axios.get('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2Fwwwid')
    .then((response) => {
      console.log(response.data)
      const apiData = response.data.items.map(i => {
        return {
          author: i.author,
          categories: i.categories,
          pubDate: i.pubDate,
          title: i.title,
          slug: slug(i.title).toLocaleLowerCase(),
          thumbnail: i.thumbnail,
          description: i.content.split('</p>')[0].substring(i.content.indexOf('<p>') + 3).replace(/<\/?[^>]+(>|$)/g, ''),
          content: i.content
        }
      })
      console.log(apiData)
      apiCache.set('api-data', apiData)
      return processData(req, res, apiData)
    })
    .catch((error) =>{
      throw error
    })
  }
}

