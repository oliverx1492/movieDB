

<script setup>
import { ref } from 'vue';
import { reactive } from 'vue';
import {store} from "./store"


    const tag = ref("")

    const setTag = (tag) => {
        // console.log("Tag: ", tag)
        store.tag = tag
        store.searchValue = "discover"
    }
</script>



<template>
    <!-- empfgelungen -->
    <div class="flex justify-around h-20 items-center bg-tertiary w-screen">
        <p @click="setTag('movie')" class="text-xl cursor-pointer">Beliebte Filme</p>
        <p @click="setTag('tv')" class="text-xl cursor-pointer">Beliebte Serien</p>
        <p @click="setTag('person')" class="text-xl cursor-pointer">Beliebte Personen</p>
    </div>
</template>