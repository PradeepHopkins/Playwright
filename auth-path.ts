import path from 'path';

/**
 * Project root = directory where playwright.config.ts lives
 * This is stable across CLI, IDE, CI, and multiple runs.
 */
export const PROJECT_ROOT = path.dirname(require.resolve('./playwright.config'));

export const AUTH_DIR = path.join(PROJECT_ROOT, '.auth');
export const AUTH_FILE = path.join(AUTH_DIR, 'authUser.json');
