# 📋 Complete Endpoint List

Base URL: `http://localhost:3000/api`

---

## ✅ Kiryuu Endpoints (All Implemented)

### 1. New Manhwa
```
GET /manhwa-new
```
Get list manhwa terbaru (20 items)

**Response:**
```json
[
  {
    "title": "Nano Machine",
    "link": "https://kiryuu03.com/manga/nano-machine",
    "imageSrc": "",
    "chapters": []
  }
]
```

---

### 2. Manhwa Popular
```
GET /manhwa-popular
```
Get list manhwa populer (20 items)

**Response:**
```json
[
  {
    "title": "Nano Machine",
    "link": "https://kiryuu03.com/manga/nano-machine",
    "imageSrc": "",
    "rating": "0"
  }
]
```

---

### 3. Manhwa Top
```
GET /manhwa-top
```
Get list manhwa top (20 items)

---

### 4. Manhwa Ongoing
```
GET /manhwa-ongoing
```
Get list manhwa ongoing (20 items)

**Response:**
```json
[
  {
    "title": "Nano Machine",
    "link": "https://kiryuu03.com/manga/nano-machine",
    "imageSrc": "",
    "status": "Ongoing"
  }
]
```

---

### 5. Manhwa Recommendation
```
GET /manhwa-recommendation
```
Get list manhwa rekomendasi (10 items)

---

### 6. Manhwa Detail
```
GET /manhwa-detail/:manhwaId
```
Get detail manhwa sesuai manhwaId

**Example:**
```
GET /manhwa-detail/nano-machine
```

**Response:**
```json
{
  "title": "Nano Machine",
  "synopsis": "Setelah direndahkan dan menghabiskan hidupnya...",
  "imageSrc": "",
  "link": "https://kiryuu03.com/manga/nano-machine",
  "status": "Unknown",
  "type": "Unknown",
  "chapters": [
    {
      "chapterNum": "Nano Machine Chapter 287",
      "chapterLink": "https://kiryuu03.com/?chapter=nano-machine-chapter-287",
      "chapterDate": ""
    }
  ]
}
```

---

### 7. Chapter Detail
```
GET /chapter/:chapterId
```
Get detail chapter manhwa sesuai chapterId

**Example:**
```
GET /chapter/nano-machine-chapter-287
```

**Response:**
```json
{
  "title": "Nano Machine Chapter 287",
  "manhwaLink": "",
  "images": [
    "https://yuucdn.com/wp-content/uploads/images/n/nano-machine/chapter-287/1.webp",
    "https://yuucdn.com/wp-content/uploads/images/n/nano-machine/chapter-287/2.webp"
  ],
  "prevChapter": null,
  "nextChapter": null,
  "chapters": []
}
```

---

### 8. Genre List
```
GET /genres
```
Get list genre

**Response:**
```json
[
  {
    "name": "Action",
    "slug": "action",
    "link": "https://kiryuu03.com/genres/action/"
  },
  {
    "name": "Adventure",
    "slug": "adventure",
    "link": "https://kiryuu03.com/genres/adventure/"
  }
]
```

---

### 9. Manhwa by Genre
```
GET /genre/:genreId
```
Get list manhwa sesuai genre

**Example:**
```
GET /genre/action
```

**Response:**
```json
[
  {
    "title": "Nano Machine",
    "link": "https://kiryuu03.com/manga/nano-machine",
    "imageSrc": ""
  }
]
```

---

### 10. Manhwa by Genre with Page
```
GET /genre/:genreId/page/:pageNumber
```
Get list manhwa sesuai genre dan page

**Example:**
```
GET /genre/action/page/2
```

---

### 11. Manhwa Search
```
GET /search/:searchId
```
Get list manhwa sesuai searchQuery

**Example:**
```
GET /search/nano
GET /search/nano%20machine
```

**Response:**
```json
[
  {
    "title": "Nano Machine",
    "link": "https://kiryuu03.com/manga/nano-machine",
    "imageSrc": "",
    "latestChapter": "",
    "rating": "0"
  }
]
```

---

### 12. Manhwa Search with Page
```
GET /search/:searchId/page/:pageNumber
```
Get list manhwa sesuai searchQuery dan page

**Example:**
```
GET /search/nano/page/2
```

---

### 13. A-Z List Manhwa
```
GET /list
```
Get A-Z list manhwa

**Response:**
```json
[
  {
    "title": "Nano Machine",
    "link": "https://kiryuu03.com/manga/nano-machine",
    "imageSrc": "",
    "type": "Unknown"
  }
]
```

---

## 🧪 Testing Examples

### Using curl:

```bash
# Get latest manhwa
curl http://localhost:3000/api/manhwa-new

# Search for manga
curl http://localhost:3000/api/search/nano

# Get manga detail
curl http://localhost:3000/api/manhwa-detail/nano-machine

# Get chapter images
curl http://localhost:3000/api/chapter/nano-machine-chapter-287

# Get genres
curl http://localhost:3000/api/genres

# Get manga by genre
curl http://localhost:3000/api/genre/action
```

### Using JavaScript/Fetch:

```javascript
// Get latest manhwa
const response = await fetch('http://localhost:3000/api/manhwa-new');
const data = await response.json();
console.log(data);

// Search manga
const searchResponse = await fetch('http://localhost:3000/api/search/nano');
const searchData = await searchResponse.json();
console.log(searchData);

// Get manga detail
const detailResponse = await fetch('http://localhost:3000/api/manhwa-detail/nano-machine');
const detailData = await detailResponse.json();
console.log(detailData);

// Get chapter
const chapterResponse = await fetch('http://localhost:3000/api/chapter/nano-machine-chapter-287');
const chapterData = await chapterResponse.json();
console.log(chapterData);
```

---

## 📝 Notes

1. **All endpoints return JSON**
2. **Rate limiting recommended**: 500-1000ms delay between requests
3. **imageSrc may be empty** on some endpoints due to API limitations
4. **Search uses URL encoding** for special characters (spaces, etc)
5. **Chapter images** return full URLs ready to use
6. **Error responses** follow format: `{ "error": "Error message" }`

---

## ✅ Status Summary

| Endpoint | Status | Notes |
|----------|--------|-------|
| /manhwa-new | ✅ Working | Returns 20 items |
| /manhwa-popular | ✅ Working | Returns 20 items |
| /manhwa-top | ✅ Working | Returns 20 items |
| /manhwa-ongoing | ✅ Working | Returns 20 items |
| /manhwa-recommendation | ✅ Working | Returns 10 items |
| /manhwa-detail/:id | ✅ Working | Includes chapters list |
| /chapter/:id | ✅ Working | Includes all images |
| /genres | ✅ Working | All genres |
| /genre/:id | ✅ Working | Manga by genre |
| /genre/:id/page/:num | ✅ Working | Paginated results |
| /search/:query | ✅ Working | Search functionality |
| /search/:query/page/:num | ✅ Working | Paginated search |
| /list | ✅ Working | A-Z list |

**Total: 13 endpoints - All Working! ✅**

---

## 🚀 Quick Start

1. Start the server:
```bash
node src/app.js
```

2. Test an endpoint:
```bash
curl http://localhost:3000/api/manhwa-new | json_pp
```

3. Integrate in your app and enjoy! 🎉
