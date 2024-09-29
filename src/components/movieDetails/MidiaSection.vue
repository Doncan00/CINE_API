<script setup>

    import { ref, onMounted } from 'vue';

    const midia_showing = ref(0)

</script>

<template>
    <div class="midia">
        <div class="midia-headers">
            <div class="headers">
                <h1>Media</h1>
                <button @click="midia_showing = 0">Mas popular</button>
                <button @click="midia_showing = 1">Videos</button>
                <button @click="midia_showing = 2">Imagenes de fondo</button>    
                <button @click="midia_showing = 3">Carteles</button>
            </div>
            <div class="links">
                <a href="">Texto link</a>
            </div>
        </div>

        <div class="media-content">
            <div class="more-popular" v-if="midia_showing == 0">
                more-popular
            </div>
            <div class="videos" v-if="midia_showing == 1">
                videos
            </div>
            <div class="bg-imgs" v-if="midia_showing == 2">
                bg-imgs
            </div>
            <div class="posters" v-if="midia_showing == 3">
                posters
            </div>
        </div>

    </div>
</template>