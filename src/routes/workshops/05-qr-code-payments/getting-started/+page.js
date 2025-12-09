import { findWorkshopStep } from '$lib/utils/workshop-utils.js';

export const load = async ({ url }) => {
    const { workshop, step } = findWorkshopStep(url.pathname);

    return {
        workshop,
        step
    };
};

