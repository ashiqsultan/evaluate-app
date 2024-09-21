import 'dotenv/config';

interface IConfig {
  port: string;
  corsOptions: any;
  DB_URL: string;
}

const config: IConfig = {
  port: process.env.PORT || '5000',
  corsOptions: { origin: '*' },
  DB_URL: process.env.DB_URL || '',
};

export default config;
