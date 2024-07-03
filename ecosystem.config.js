module.exports = {
  apps: [
    {
      name: "Project-Architectural-Blog",
      script: "bin/www",
      env: {
        NODE_ENV: "production",
        PORT: 80,
        SECRET_KEY: "SECRET_KEY",
        CLOUDINARY_CLOUD_NAME: "dphp2ihaz",
        CLOUDINARY_API_KEY: "272351512164427",
        CLOUDINARY_API_SECRET: "qOhiAQaF3eY5MBTMNaYqU3NjVSs",
        CLOUDINARY_URL:
          "cloudinary://272351512164427:qOhiAQaF3eY5MBTMNaYqU3NjVSs@dphp2ihaz",
        DATABASE_URL:
          "postgresql://postgres.pgbvbfmmgxjgwdkjgqti:pya11solviria@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres",
      },
    },
  ],
};
