export const SOURCES = {
  KIRYUU: {
    name: 'Kiryuu',
    baseUrl: 'https://kiryuu03.com',
    apiUrl: 'https://kiryuu03.com/wp-json/kiru/v1',
    type: 'api',
    enabled: true
  },
  KOMIKCAST: {
    name: 'Komikcast',
    baseUrl: 'https://komikcast.com',
    type: 'scrape',
    enabled: false // Disabled karena perlu JavaScript rendering
  },
  BACAKOMIK: {
    name: 'Bacakomik',
    baseUrl: 'https://bacakomik.one',
    type: 'scrape',
    enabled: true
  }
};

export const DEFAULT_SOURCE = 'KIRYUU';

export function getSource(sourceName) {
  return SOURCES[sourceName?.toUpperCase()] || SOURCES[DEFAULT_SOURCE];
}

export function getEnabledSources() {
  return Object.entries(SOURCES)
    .filter(([key, source]) => source.enabled)
    .map(([key, source]) => ({ key, ...source }));
}
