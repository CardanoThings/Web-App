import { readable } from "svelte/store"

export let pages = readable([
    {
        path: "/introductions",
        title: "Introductions",
        description: "",
        keywords:"",
        footer: true,
        navigation: true,
    },
    {
        path: "/glossary",
        title: "Glossary",
        description: "",
        keywords:"",
        footer: true,
        navigation: true,
    },
    {
        path: "/ressources",
        title: "Ressources",
        description: "",
        keywords:"",
        footer: true,
        navigation: true,
    },
    {
        path: "/tutorials",
        title: "Tutorials",
        description: "",
        keywords:"",
        footer: true,
        navigation: true,
    },
    {
        path:"",
        title:"",
        description:"",
        keywords:"",
        footer: true,
        navigation: true
    }
]);