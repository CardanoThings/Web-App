import { findWorkshopStep } from '$lib/utils/workshop-utils.js';

export const load = async ({ url }) => {
    const { workshop, step } = findWorkshopStep(url.pathname);

    return {
        workshop,
        step,
        tip: JSON.stringify([
            {
                "hash": "14c6413b8df915c58d9da162cf22ad58dc52834c8ce7105fe91d08e804cb5a36",
                "epoch_no": 252,
                "abs_slot": 107460097,
                "epoch_slot": 237697,
                "block_height": 4122947,
                "block_no": 4122947,
                "block_time": 1763143297
            }
        ], null, 2),
    }
};