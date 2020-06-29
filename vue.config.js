const fs = require('fs')

module.exports = {
  devServer: {
    https: {
      key: fs.readFileSync('./certs/example.com+6-key.pem'),
      cert: fs.readFileSync('./certs/example.com+6.pem'),
    },
    public: 'https://localhost:8080/'
},
  "transpileDependencies": [
    "vuetify"
  ]
}