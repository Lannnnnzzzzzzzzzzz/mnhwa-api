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
    const data = await fetchManga({ name: searchId });

    const results = data.map(manga => ({
      title: manga.post_title,
      link: `https://kiryuu03.com/manga/${manga.post_name}`,
      imageSrc: manga.thumbnail || '',
      latestChapter: manga.latest_chapter || '',
      rating: manga.rating || '0',
    }));

    res.json({ seriesList: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to search manga' });
  }
};
