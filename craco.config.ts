import path from 'path'

const config = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@consts': path.resolve(__dirname, 'src/consts'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
}

export default config
