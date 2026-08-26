import { UIEnvironment } from "./backend/envBackend";

// eslint-disable-next-line
export {};

declare global {
    interface Window {
        env: UIEnvironment;
    }
}
