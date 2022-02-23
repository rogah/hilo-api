import { registerAs } from '@nestjs/config';

const DEFAULT_PORT = 5000;

export default registerAs('http', () => ({
    port: process.env.PORT || DEFAULT_PORT,
}));
