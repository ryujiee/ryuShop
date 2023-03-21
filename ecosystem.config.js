module.exports = {
    apps: [
      {
        name: "ryuShop",
        script: "./server.js",
        instances: 1,
        env: {
          NODE_ENV: "production",
          PORT: 3000,
        },
        watch: [
          "server.js",
          "src/**/*.js",
        ],
        ignore_watch: [
          "node_modules",
        ],
        error_file: "logs/error.log",
        out_file: "logs/out.log",
        log_date_format: "YYYY-MM-DD HH:mm:ss",
      },
    ],
  };
  