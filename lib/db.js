export default createConnection({
  try: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  catch (error) {
    console.error(error);
  }
});
