import { createApp, setupApp } from './app/setup/create-app';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.scss';

const app = createApp();
setupApp(app);
