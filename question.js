import { pipeline } from '@huggingface/transformers';
import fs from 'fs';

const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

const questionEmpading = await extractor('Peter Parker', { pooling: 'mean', normalize: true })

const questionQuary = `SELECT * FROM movies ORDER BY titleEmbedding <-> '[${questionEmpading.data}]' LIMIT 5;`

fs.writeFileSync('question.sql', questionQuary);