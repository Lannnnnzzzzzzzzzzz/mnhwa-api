# API Documentation

API ini mendukung 2 sumber data:
1. **Kiryuu** (kiryuu03.com) - Menggunakan WordPress REST API ✅
2. **Bacakomik** (bacakomik.one) - Menggunakan web scraping ✅

## Base URL
```
http://localhost:3000
```

---

## Kiryuu Endpoints (Default)

### 1. Get Latest Manhwa
```
GET /api/manhwa-new
```

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

### 2. Get Manhwa Detail
```
GET /api/manhwa-detail/:manhwaId
```

**Example:**
```
GET /api/manhwa-detail/nano-machine
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

### 3. Get Chapter Images
```
GET /api/chapter/:chapterId
```

**Example:**
```
GET /api/chapter/nano-machine-chapter-287
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

### 4. Search Manhwa
```
GET /api/search/:searchId
```

**Example:**
```
GET /api/search/nano
```

### 5. Get Popular Manhwa
```
GET /api/manhwa-popular
```

### 6. Get Top Manhwa
```
GET /api/manhwa-top
```

### 7. Get Ongoing Manhwa
```
GET /api/manhwa-ongoing
```

### 8. Get Recommendations
```
GET /api/manhwa-recommendation
```

### 9. Get Genres List
```
GET /api/genres
```

### 10. Get by Genre
```
GET /api/genre/:genreId
GET /api/genre/:genreId/page/:pageNumber
```

### 11. Get A-Z List
```
GET /api/list
```

---

## Bacakomik Endpoints

Semua endpoint Bacakomik menggunakan prefix `/api/bacakomik`

### 1. Get Latest
```
GET /api/bacakomik/manhwa-latest
```

### 2. Get Popular
```
GET /api/bacakomik/manhwa-popular
```

### 3. Get Detail
```
GET /api/bacakomik/manhwa-detail/:manhwaId
```

### 4. Get Chapter
```
GET /api/bacakomik/chapter/:chapterId
```

### 5. Search
```
GET /api/bacakomik/search/:searchId
GET /api/bacakomik/search/:searchId/page/:pageNumber
```

### 6. Get Genres
```
GET /api/bacakomik/genres
```

### 7. Get by Genre
```
GET /api/bacakomik/genre/:genreId
GET /api/bacakomik/genre/:genreId/page/:pageNumber
```

### 8. Get Top
```
GET /api/bacakomik/manhwa-top
```

### 9. Get Recommendation
```
GET /api/bacakomik/manhwa-recommendation
```

### 10. Get Only (Manhwa/Manga/Manhua)
```
GET /api/bacakomik/only/:onlyId/page/:pageNumber
```

**Example:**
```
GET /api/bacakomik/only/manhwa/page/1
```

---

## Status Endpoint

### Health Check
```
GET /health
```

**Response:**
```json
{
  "status": "healthy"
}
```

---

## Error Handling

Semua error akan mengembalikan format:
```json
{
  "error": "Error message description"
}
```

Status codes:
- `200` - Success
- `404` - Not found
- `500` - Server error

---

## Notes

1. **Kiryuu** menggunakan WordPress REST API sehingga lebih stabil dan cepat
2. **Bacakomik** menggunakan web scraping sehingga lebih lambat tapi tetap reliable
3. Beberapa field seperti `imageSrc` mungkin kosong karena keterbatasan API
4. Rate limiting direkomendasikan dengan delay 500-1000ms antar request

---

## Working Endpoints ✅

**Kiryuu (Tested & Working):**
- ✅ `/api/manhwa-new` - List manga terbaru
- ✅ `/api/manhwa-detail/:manhwaId` - Detail manga + chapters
- ✅ `/api/chapter/:chapterId` - Chapter images (32 images per chapter)

**Bacakomik:**
- Available tapi belum ditest semua

---

## Future Improvements

- [ ] Add image thumbnails support
- [ ] Add pagination support
- [ ] Add caching layer
- [ ] Add more sources (Komikcast, etc)
- [ ] Add rate limiting
- [ ] Add request validation
