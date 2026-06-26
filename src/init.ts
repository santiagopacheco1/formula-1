import { App } from './app';

const application = new App();

application.start().catch(error => {
    console.error('Failed to start application:', error);
    process.exit(1);
});