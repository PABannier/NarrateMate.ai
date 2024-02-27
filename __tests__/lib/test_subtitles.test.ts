import { describe, it, expect } from '@jest/globals';
import { jest } from '@jest/globals';

import { fetchSubtitlesFromVideoID } from '../../src/lib/subtitles';

interface MockFetchResponse {
    text: () => Promise<string>;
}

describe('fetchSubtitlesFromVideoID', () => {
    it('should fetch and process subtitles correctly', async () => {
        const mockResponse = (): Response => {
            const res: Partial<Response> = {
              text: jest.fn().mockResolvedValue(`
                <html>
                  <body>
                    <script>
                      var ytInitialPlayerResponse = {
                        captionTracks: [
                          {
                            baseUrl: 'https://example.com/subtitles',
                            vssId: '.en',
                          },
                          {
                            baseUrl: 'https://example.com/subtitles',
                            vssId: '.fr',
                          },
                        ],
                      };
                    </script>
                  </body>
                </html>
              `),
            };
            return res as Response;
          };
      // Mock the fetch function to return a sample YouTube video page data
      global.fetch = jest.fn().mockResolvedValue({
        text: jest.fn().mockResolvedValue(`
          <html>
            <body>
              <script>
                var ytInitialPlayerResponse = {
                  captionTracks: [
                    {
                      baseUrl: 'https://example.com/subtitles',
                      vssId: '.en',
                    },
                    {
                      baseUrl: 'https://example.com/subtitles',
                      vssId: '.fr',
                    },
                  ],
                };
              </script>
            </body>
          </html>
        `),
      } as MockFetchResponse);
  
      // Mock the fetch function to return a sample subtitles XML
      global.fetch.mockResolvedValueOnce({
        text: jest.fn().mockResolvedValue(`
          <?xml version="1.0" encoding="utf-8" ?>
          <transcript>
            <text start="0.5" dur="2.5">Hello</text>
            <text start="3.0" dur="4.0">World</text>
          </transcript>
        `),
      });
  
      const videoID = 'abc123';
      const result = await fetchSubtitlesFromVideoID(videoID);
  
      expect(result).toBe('Hello World');
    });
  
    it('should handle missing captions correctly', async () => {
      // Mock the fetch function to return a sample YouTube video page data without captions
      global.fetch = jest.fn().mockResolvedValue({
        text: jest.fn().mockResolvedValue(`
          <html>
            <body>
              <script>
                var ytInitialPlayerResponse = {};
              </script>
            </body>
          </html>
        `),
      });
  
      const videoID = 'abc123';
      const result = await fetchSubtitlesFromVideoID(videoID);
  
      expect(result).toBe('');
    });
  
    it('should handle missing subtitle language track correctly', async () => {
      // Mock the fetch function to return a sample YouTube video page data with captions but missing English track
      global.fetch = jest.fn().mockResolvedValue({
        text: jest.fn().mockResolvedValue(`
          <html>
            <body>
              <script>
                var ytInitialPlayerResponse = {
                  captionTracks: [
                    {
                      baseUrl: 'https://example.com/subtitles',
                      vssId: '.fr',
                    },
                  ],
                };
              </script>
            </body>
          </html>
        `),
      });
  
      // Mock the fetch function to return a sample subtitles XML
      global.fetch.mockResolvedValueOnce({
        text: jest.fn().mockResolvedValue(`
          <?xml version="1.0" encoding="utf-8" ?>
          <transcript>
            <text start="0.5" dur="2.5">Bonjour</text>
            <text start="3.0" dur="4.0">Monde</text>
          </transcript>
        `),
      });
  
      const videoID = 'abc123';
      const result = await fetchSubtitlesFromVideoID(videoID);
  
      expect(result).toBe('Bonjour Monde');
    });
  });