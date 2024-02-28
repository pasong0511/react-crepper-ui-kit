// src/globals.d.ts
declare global {
    interface Window {
        PasongTest: {
            [key: string]: string;
        };
    }
}

export {};
