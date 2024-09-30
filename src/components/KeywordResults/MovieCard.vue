<script setup>

    const props = defineProps({
        backdrop_path: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        release_date: {
            type: String,
            required: true
        },
        overview: {
            type: String,
            required: true
        }
    })

</script>

<template>

    <div class="image">
        <img :src="'https://image.tmdb.org/t/p/w500' + backdrop_path" alt="">
    </div>

    <div class="title-realese_date">
        <h1>{{ title }}</h1>
        <h2>{{ release_date }}</h2>
    </div>

    <p>{{ overview }}</p>

</template>