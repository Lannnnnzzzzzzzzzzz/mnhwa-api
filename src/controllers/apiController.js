import { fetchManga, fetchChapter } from '../utils/apiClient.js';
import axios from 'axios';
import { load } from 'cheerio';

const WP_API_BASE = 'https://kiryuu03.com/wp-json/wp/v2';

export const getManhwaNew = async (req, res) => {
  try {
    const data = await fetchManga({ is_update: true });

    const results = data.slice(0, 20).map(manga => ({
      title: manga.post_title,
      link: `https://kiryuu03.com/manga/${manga.post_name}`,
      imageSrc: manga.thumbnail || '',
      chapters: []
    }));

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};

export const getManhwaDetail = async (req, res) => {
  try {
    const { manhwaId } = req.params;
    const data = await fetchManga({ slug: manhwaId });

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Manga not found' });
    }

    const manga = data[0];
    const chapters = await fetchChapter({ parent_id: manga.ID });

    const manhwaDetails = {
      title: manga.post_title,
      synopsis: manga.post_content,
      imageSrc: manga.thumbnail || '',
      link: `https://kiryuu03.com/manga/${manga.post_name}`,
      status: manga.status || 'Unknown',
      type: manga.type || 'Unknown',
      chapters: Array.isArray(chapters) ? chapters.map(ch => ({
        chapterNum: ch.title,
        chapterLink: ch.url || `https://kiryuu03.com/?chapter=${ch.slug}`,
        chapterDate: ch.date || '',
      })) : []
    };

    res.json(manhwaDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch manga detail' });
  }
};

export const getChapter = async (req, res) => {
  try {
    const { chapterId } = req.params;
    const url = `https://kiryuu03.com/?chapter=${chapterId}`;

    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      timeout: 15000
    });

    const $ = load(response.data);
    const images = [];

    $('img.chapter-img, img.lazy, img[data-src], img[src*="yuucdn"]').each((i, el) => {
      let src = $(el).attr('src') || $(el).attr('data-src');
      if (src && (src.includes('http') || src.startsWith('//'))) {
        if (src.startsWith('//')) src = 'https:' + src;
        images.push(src);
      }
    });

    if (images.length === 0) {
      $('img').each((i, el) => {
        let src = $(el).attr('src');
        if (src && src.includes('http')) {
          images.push(src);
        }
      });
    }

    const title = $('h1.entry-title, h1').first().text().trim() || `Chapter ${chapterId}`;
    const prevChapter = $('.ch-prev-btn, a[rel="prev"]').attr('href') || null;
    const nextChapter = $('.ch-next-btn, a[rel="next"]').attr('href') || null;

    const chapterData = {
      title: title,
      manhwaLink: '',
      images: images,
      prevChapter: prevChapter,
      nextChapter: nextChapter,
      chapters: []
    };

    res.json(chapterData);
  } catch (error) {
    console.error('Chapter fetch error:', error.message);
    res.status(500).json({ error: 'Failed to fetch chapter data' });
  }
};

export const getManhwaPopular = async (req, res) => {
  try {
    const response = await axios.get(`${WP_API_BASE}/manga`, {
      params: {
        orderby: 'views',
        order: 'desc',
        per_page: 20,
        type: 'manhwa'
      }
    });

    const results = response.data.map(manga => ({
      title: manga.title.rendered,
      link: manga.link,
      imageSrc: manga.thumbnail || '',
      rating: manga.rating || '0',
    }));

    res.json(results);
  } catch (error) {
    console.error(error);
    const data = await fetchManga({});
    const results = data.slice(0, 20).map(manga => ({
      title: manga.post_title,
      link: `https://kiryuu03.com/manga/${manga.post_name}`,
      imageSrc: manga.thumbnail || '',
      rating: '0',
    }));
    res.json(results);
  }
};

export const getSearch = async (req, res) => {
  try {
    const { searchId } = req.params;
    const url = `https://kiryuu03.com/?s=${encodeURIComponent(searchId)}`;

    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      timeout: 15000
    });

    const $ = load(response.data);
    const results = [];

    $('.listupd article, .bsx, .bs, .anime').each((i, el) => {
      const title = $(el).find('.tt, h2, h3, .entry-title, a').first().text().trim();
      const link = $(el).find('a').first().attr('href');
      const imageSrc = $(el).find('img').first().attr('src') || $(el).find('img').first().attr('data-src') || '';

      if (title && link && link.includes('manga')) {
        results.push({
          title,
          link,
          imageSrc,
          latestChapter: '',
          rating: '0',
        });
      }
    });

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to search manga' });
  }
};

export const getSearchPage = async (req, res) => {
  try {
    const { searchId, pageNumber } = req.params;
    const url = `https://kiryuu03.com/page/${pageNumber}/?s=${encodeURIComponent(searchId)}`;

    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      timeout: 15000
    });

    const $ = load(response.data);
    const results = [];

    $('.listupd article, .bsx, .bs, .anime').each((i, el) => {
      const title = $(el).find('.tt, h2, h3, .entry-title, a').first().text().trim();
      const link = $(el).find('a').first().attr('href');
      const imageSrc = $(el).find('img').first().attr('src') || $(el).find('img').first().attr('data-src') || '';

      if (title && link && link.includes('manga')) {
        results.push({
          title,
          link,
          imageSrc,
          latestChapter: '',
          rating: '0',
        });
      }
    });

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to search manga' });
  }
};

export const getManhwaTop = async (req, res) => {
  try {
    const data = await fetchManga({});

    const results = data.slice(0, 20).map(manga => ({
      title: manga.post_title,
      link: `https://kiryuu03.com/manga/${manga.post_name}`,
      imageSrc: manga.thumbnail || '',
      rating: manga.rating || '0',
    }));

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch top manga' });
  }
};

export const getManhwaOngoing = async (req, res) => {
  try {
    const data = await fetchManga({});

    const results = data.slice(0, 20).map(manga => ({
      title: manga.post_title,
      link: `https://kiryuu03.com/manga/${manga.post_name}`,
      imageSrc: manga.thumbnail || '',
      status: 'Ongoing',
    }));

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch ongoing manga' });
  }
};

export const getManhwaRecommendation = async (req, res) => {
  try {
    const data = await fetchManga({});

    const results = data.slice(0, 10).map(manga => ({
      title: manga.post_title,
      link: `https://kiryuu03.com/manga/${manga.post_name}`,
      imageSrc: manga.thumbnail || '',
      rating: manga.rating || '0',
    }));

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
};

export const getGenres = async (req, res) => {
  try {
    const url = 'https://kiryuu03.com/manga/';
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      timeout: 15000
    });

    const $ = load(response.data);
    const genres = [];

    $('.genre-list a, .genres a, a[href*="/genres/"]').each((i, el) => {
      const name = $(el).text().trim();
      const link = $(el).attr('href');
      if (name && link) {
        const slug = link.split('/genres/')[1]?.replace('/', '') || '';
        if (slug) {
          genres.push({
            name: name,
            slug: slug,
            link: link
          });
        }
      }
    });

    if (genres.length === 0) {
      const defaultGenres = [
        { name: 'Action', slug: 'action', link: 'https://kiryuu03.com/genres/action/' },
        { name: 'Adventure', slug: 'adventure', link: 'https://kiryuu03.com/genres/adventure/' },
        { name: 'Comedy', slug: 'comedy', link: 'https://kiryuu03.com/genres/comedy/' },
        { name: 'Drama', slug: 'drama', link: 'https://kiryuu03.com/genres/drama/' },
        { name: 'Fantasy', slug: 'fantasy', link: 'https://kiryuu03.com/genres/fantasy/' },
        { name: 'Romance', slug: 'romance', link: 'https://kiryuu03.com/genres/romance/' },
        { name: 'Martial Arts', slug: 'martial-arts', link: 'https://kiryuu03.com/genres/martial-arts/' },
        { name: 'School Life', slug: 'school-life', link: 'https://kiryuu03.com/genres/school-life/' },
        { name: 'Shounen', slug: 'shounen', link: 'https://kiryuu03.com/genres/shounen/' },
        { name: 'Supernatural', slug: 'supernatural', link: 'https://kiryuu03.com/genres/supernatural/' }
      ];
      return res.json(defaultGenres);
    }

    res.json(genres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch genres' });
  }
};

export const getGenreId = async (req, res) => {
  try {
    const { genreId } = req.params;
    const url = `https://kiryuu03.com/genres/${genreId}/`;

    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      timeout: 15000
    });

    const $ = load(response.data);
    const results = [];

    $('.listupd article, .bsx, .bs').each((i, el) => {
      const title = $(el).find('.tt, h2, h3, .entry-title').text().trim();
      const link = $(el).find('a').first().attr('href');
      const imageSrc = $(el).find('img').first().attr('src') || $(el).find('img').first().attr('data-src') || '';

      if (title && link) {
        results.push({
          title,
          link,
          imageSrc,
        });
      }
    });

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch genre data' });
  }
};

export const getGenreIdPage = async (req, res) => {
  try {
    const { genreId, pageNumber } = req.params;
    const url = `https://kiryuu03.com/genres/${genreId}/page/${pageNumber}/`;

    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      timeout: 15000
    });

    const $ = load(response.data);
    const results = [];

    $('.listupd article, .bsx, .bs').each((i, el) => {
      const title = $(el).find('.tt, h2, h3, .entry-title').text().trim();
      const link = $(el).find('a').first().attr('href');
      const imageSrc = $(el).find('img').first().attr('src') || $(el).find('img').first().attr('data-src') || '';

      if (title && link) {
        results.push({
          title,
          link,
          imageSrc,
        });
      }
    });

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch genre page data' });
  }
};

export const getList = async (req, res) => {
  try {
    const data = await fetchManga({});

    const results = data.map(manga => ({
      title: manga.post_title,
      link: `https://kiryuu03.com/manga/${manga.post_name}`,
      imageSrc: manga.thumbnail || '',
      type: manga.type || 'Unknown',
    }));

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch manga list' });
  }
};
