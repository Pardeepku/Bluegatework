import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const DATA_DIR = path.join(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (err) {
    console.error('Failed to create data directory:', err);
  }
}

const SETTINGS_FILE = path.join(DATA_DIR, 'site-settings.json');
const IMAGES_FILE = path.join(DATA_DIR, 'site-images.json');
const BLOGS_FILE = path.join(DATA_DIR, 'site-blogs.json');
const INQUIRIES_FILE = path.join(DATA_DIR, 'site-inquiries.json');

function readJsonFile<T>(filePath: string, fallback: T): T {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data) as T;
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
  }
  return fallback;
}

function writeJsonFile(filePath: string, data: any): boolean {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
    return false;
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Enable JSON and URL-encoded body parsing with high limit for image assets
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Basic API Health Endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Settings API
  app.get('/api/settings', (req, res) => {
    const settings = readJsonFile(SETTINGS_FILE, null);
    res.json({ success: true, data: settings });
  });

  app.post('/api/settings', (req, res) => {
    const newSettings = req.body;
    if (!newSettings || typeof newSettings !== 'object') {
      return res.status(400).json({ success: false, error: 'Invalid settings payload' });
    }
    const ok = writeJsonFile(SETTINGS_FILE, newSettings);
    res.json({ success: ok });
  });

  // Images API
  app.get('/api/images', (req, res) => {
    const images = readJsonFile(IMAGES_FILE, null);
    res.json({ success: true, data: images });
  });

  app.post('/api/images', (req, res) => {
    const newImages = req.body;
    if (!newImages || typeof newImages !== 'object') {
      return res.status(400).json({ success: false, error: 'Invalid images payload' });
    }
    const ok = writeJsonFile(IMAGES_FILE, newImages);
    res.json({ success: ok });
  });

  // Blogs API
  app.get('/api/blogs', (req, res) => {
    const blogs = readJsonFile(BLOGS_FILE, null);
    res.json({ success: true, data: blogs });
  });

  app.post('/api/blogs', (req, res) => {
    const newBlogs = req.body;
    if (!Array.isArray(newBlogs)) {
      return res.status(400).json({ success: false, error: 'Invalid blogs array' });
    }
    const ok = writeJsonFile(BLOGS_FILE, newBlogs);
    res.json({ success: ok });
  });

  // Inquiries API
  app.get('/api/inquiries', (req, res) => {
    const inquiries = readJsonFile(INQUIRIES_FILE, []);
    res.json({ success: true, data: inquiries });
  });

  app.post('/api/inquiries', (req, res) => {
    const inquiry = req.body;
    const existing = readJsonFile<any[]>(INQUIRIES_FILE, []);
    existing.unshift(inquiry);
    const ok = writeJsonFile(INQUIRIES_FILE, existing);
    res.json({ success: ok });
  });

  // Save All Bundle
  app.post('/api/save-all', (req, res) => {
    const { settings, images, blogs } = req.body;
    let ok = true;
    if (settings) ok = ok && writeJsonFile(SETTINGS_FILE, settings);
    if (images) ok = ok && writeJsonFile(IMAGES_FILE, images);
    if (blogs) ok = ok && writeJsonFile(BLOGS_FILE, blogs);
    res.json({ success: ok, message: 'All website content saved to permanent server storage' });
  });

  // Vite development middleware or static production serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));

    // Handle SPA routing: all non-static requests return index.html
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
