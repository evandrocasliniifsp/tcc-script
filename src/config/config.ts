import dotenv from 'dotenv';

dotenv.config();

export const RAW_FILE_PATH = process.env.RAW_FILE_PATH || '';
export const PROCESSED_FILE_BASE_PATH = process.env.PROCESSED_FILE_BASE_PATH || '';
export const REST_API_BASE_URL = process.env.REST_API_BASE_URL || 'http://localhost:3000';
export const GRAPHQL_API_BASE_URL = process.env.GRAPHQL_API_BASE_URL || 'http://localhost:3000/graphql';
export const SHOULD_TRANSFORM = process.env.SHOULD_TRANSFORM === 'true';
export const SHOULD_POPULATE = process.env.SHOULD_POPULATE === 'true';
export const SHOULD_TEST = process.env.SHOULD_TEST === 'true';
