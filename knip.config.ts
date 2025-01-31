import { type KnipConfig } from 'knip';

const config: KnipConfig = {
  prettier: ['./prettier.config.mjs'],
  stylelint: ['./stylelint.config.js'],
  workspaces: {
    '.': {},
    'apps/backend': {
      entry: [
        'src/main.ts',
        'src/libs/config/ormconfig.ts',
        'test/app.error2error-spec.ts',
        'src/migrations/*.ts'
      ]
    },
    'apps/frontend': {
      entry: ['src/index.tsx']
    },
    'packages/shared': {
      entry: ['src/index.ts'],
      includeEntryExports: true
    }
  }
};

export default config;
