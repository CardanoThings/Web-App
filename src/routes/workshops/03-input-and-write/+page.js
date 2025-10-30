import { workshops } from '$lib/data/workshops.js';
export function load() {
    return {
        workshop: workshops[2],
    };
};
