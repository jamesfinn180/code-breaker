import path from 'path'

const config = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@consts': path.resolve(__dirname, 'src/consts'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@datatypes': path.resolve(__dirname, 'src/datatypes'),
      '@slices': path.resolve(__dirname, 'src/slices'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@storage': path.resolve(__dirname, 'src/storage'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
    },
  },
}

export default config
