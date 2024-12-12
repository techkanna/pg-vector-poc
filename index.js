import { pipeline } from '@huggingface/transformers';
import fs from 'fs';
import {data} from './data.js';
const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

// const dotProduct = output1.data.reduce((acc, value, index) => acc + value * output2.data[index], 0);

const step = 21
const range = 3
// total 270 movies

const start = (step * range) - range;
const end = (step * range);

const pageData = data.slice(start, end);

let rows = ''
  
for await (const movie of pageData) {
  const { id, title, tagline, overview } = movie;
  const titleEmbedding = await extractor(title, { pooling: 'mean', normalize: true })
  const taglineEmbedding = await extractor(tagline, { pooling: 'mean', normalize: true })
  const overviewEmbedding = await extractor(overview, { pooling: 'mean', normalize: true })
  

  rows += `INSERT INTO movies (id,title, tagline, overview, titleEmbedding, taglineEmbedding, overviewEmbedding) VALUES(${id}, '${title}', '${tagline}', '${overview}', '[${titleEmbedding.data}]', '[${taglineEmbedding.data}]', '[${overviewEmbedding.data}]');\n`;
}

fs.writeFileSync(`step-${step}-rows-${start}-to-${end}.sql`, rows);