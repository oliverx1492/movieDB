<script setup>
import { onMounted, onUpdated, ref, watch } from 'vue';
import { store } from "./store.js"
// Idee: Hier wird die Suche stattfinden, API abfrage und 
const API_KEY = import.meta.env.VITE_API_KEY

const searchResult = ref([])
//Ladestatus
const loading = ref(false)
const error = ref(null)
const filter = ref("all")
const pag = ref(6)
const link = ref("")



const loadResult = async () => {

    

    //Wie viele auf einer Seite angezeigt werden sollen
    pag.value = 6

    //Loading status
    loading.value = true

    //Error Wert
    error.value = null

    //Suchergbenis Array
    searchResult.value = []

    //Aus store abgerufen
    //Tag = movie, tv, oder person
    const tag = store.tag
    //searchValue = discover oder search
    const searchValue = store.searchValue

    //API Abfrage
    try {


        link.value = `https://api.themoviedb.org/3/${searchValue}/${tag}?api_key=${API_KEY}&query=${store.query}&language=de-DE`


        const response = await fetch(link.value);
        // discover https://api.themoviedb.org/3/discover/movie?language=de-DE&page=1&sort_by=popularity.desc'

        if (response.ok) {
            const data = await response.json()
            console.log("RESULT: ", data.results)


            searchResult.value = data.results

            // console.log(filter)
            // Suchergbeniss durch Input wird gefiltert nach movie, tv und person
            if (filter.value !== "all") {
                const filteredResult = data.results.filter(item => item.media_type == filter.value)
                console.log(filteredResult)
                searchResult.value = filteredResult
            }


        }

        else {
            console.log("Error Code erhalten")
        }
    }



    catch (error) {
        console.log("Fehler beim Abrufen der API", error)
    }
    finally {
        loading.value = false
    }
}

const clearFilter = () => {
    filter.value = "all"
}

// wwenn sich wert in watch ändert wird funktion getriggert
watch(() => store.query, loadResult)
watch(() => store.query, clearFilter)
watch(() => filter.value, loadResult)
watch(() => store.tag, loadResult)

</script>

<template>

    <div>
        <p v-if="loading">LOADING....</p>
        <p v-if="error">ERROR</p>
        <p class="text-3xl p-4">Suchergebnisse für {{ store.query }}</p>
        <div class="flex ">
            <p class="text-2xl p-4">Filter:</p>
            <p @click="() => filter = 'movie'" class="cursor-pointer text-2xl p-4">Filme</p>
            <p @click="() => filter = 'tv'" class="cursor-pointer text-2xl p-4">Serien</p>
            <p @click="() => filter = 'person'" class="cursor-pointer text-2xl p-4">Personen</p>
        </div>
        <ul v-if="searchResult.length > 0">



            <div class="lg:grid lg:grid-cols-3 flex flex-col ">
                <li class="p-4 lg:m-4 lg:border rounded-md lg:h-80 max-h-96 flex"
                    v-for="result in searchResult.slice(0, pag)" :key="result.id">
                    <div class="w-1/2 relative overflow-hidden flex justify-center">
                        <img v-if="result.poster_path"
                            :src="`https://image.tmdb.org/t/p/original/${result.poster_path}`"
                            class="h-full animation-all duration-500 hover:scale-110" alt="Poster" />
                        <img v-if="result.profile_path"
                            :src="`https://image.tmdb.org/t/p/original/${result.profile_path}`"
                            class="h-full animation-all duration-500 hover:scale-110" alt="Profile" />
                    </div>

                    <div class="p-4 w-1/2 overflow-y-scroll">
                        <p class="m-2 lg:text-3xl text-lg" v-if="result.original_name"> {{ result.original_name }} </p>
                        <p class="m-2 lg:text-3xl text-lg" v-if="result.title">{{ result.title }}</p>
                        <p class="m-2">{{ result.media_type }}</p>
                        <p v-if="result.vote_average" class="m-2">Bewertung: {{ result.vote_average }}</p>
                        <p v-if="result.release_date" class="m-2">Erscheinungsjahr: {{ result.release_date ? result.release_date.slice(0, 4) :
                            'N/A' }}</p>
                        <hr />
                        <p class="text-sm m-2">{{ result.overview }}</p>
                        <p class="text-sm m-2" v-if="result.known_for">Bekannt durch: {{ result.known_for[0].original_title }}</p>

                  
                    </div>


                </li>

            </div>
            <div class="flex justify-center ">
                <button class="text-center bg-secondary  p-4 m-4 rounded-md" @click="() => pag = pag + 6">Mehr
                    laden...</button>
            </div>
        </ul>
        <!-- Kein Titel gefunden -->
        <div v-if="!loading && searchResult.length === 0">
            <p class="p-4">Keine Ergebnisse</p>
        </div>
    </div>

</template>
