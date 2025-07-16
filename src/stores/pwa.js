import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// PWA installation store
export const canInstall = writable(false);
export const isInstalled = writable(false);
export const deferredPrompt = writable(null);

// Service worker update store
export const swUpdateAvailable = writable(false);
export const swRegistration = writable(null);

// Initialize PWA functionality only in browser
if (browser) {
    // Check if app is already installed
    if (typeof window !== 'undefined' && window.matchMedia && window.navigator) {
        if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
            isInstalled.set(true);
        }
    }

    // Listen for beforeinstallprompt event
    if (typeof window !== 'undefined') {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt.set(e);
            canInstall.set(true);
        });

        // Listen for app installation
        window.addEventListener('appinstalled', () => {
            isInstalled.set(true);
            canInstall.set(false);
            deferredPrompt.set(null);
            console.log('PWA was installed');
        });
    }
}

// Function to install PWA
export const installPWA = async () => {
    if (!browser) return;

    let prompt;
    const unsubscribe = deferredPrompt.subscribe(value => prompt = value);
    unsubscribe();

    if (prompt) {
        try {
            prompt.prompt();
            const { outcome } = await prompt.userChoice;

            if (outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }

            deferredPrompt.set(null);
            canInstall.set(false);
        } catch (error) {
            console.error('Installation failed:', error);
        }
    }
};

// Function to check for service worker updates
export const checkForUpdates = async () => {
    if (!browser || !('serviceWorker' in navigator)) return;

    try {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
            swRegistration.set(registration);
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                if (newWorker) {
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            swUpdateAvailable.set(true);
                        }
                    });
                }
            });
        }
    } catch (error) {
        console.error('Error checking for service worker updates:', error);
    }
};

// Function to apply service worker update
export const applyUpdate = async () => {
    if (!browser) return;

    let registration;
    const unsubscribe = swRegistration.subscribe(value => registration = value);
    unsubscribe();

    if (registration && registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        if (typeof window !== 'undefined') {
            window.location.reload();
        }
    }
};
