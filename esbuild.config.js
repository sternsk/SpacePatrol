const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['./src/index.ts'], // Pfad zu Ihrer Haupteingabedatei
  bundle: true,
  outdir: './dist', // Ausgabeordner
  platform: 'browser',
  sourcemap: true,
  target: ['esnext'],
  loader: {
    '.js': 'jsx',
    '.ts': 'ts',
  },
  watch: process.argv.includes('--watch'), // Aktiviert das Watch-Mode, wenn '--watch' als Argument übergeben wird
}).catch(() => process.exit(1));
