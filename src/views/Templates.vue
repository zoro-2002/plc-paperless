<template>
    <div class="template-container ">
        <template-cards v-for="template in templates" :key="template.createdOn" :name="template.name"
            :imageUrl="template.imageUrl"></template-cards>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import TemplateCards from "../components/TemplateCards.vue";
export default {
    components: {
        TemplateCards
    },
    computed: {
        ...mapGetters('templates', ['templates'])
    },
}

</script>

<style lang="scss" scoped>
.template-container {
    width: 80vw;
    display: grid;
    grid-column-gap: 1rem;
    grid-row-gap: 2rem;
    grid-template-columns: repeat(2, 1fr);
    position: absolute;
    top: 10vh;
    left: 50%;
    transform: translateX(-50%);
    // margin: 0 auto;
    // margin-top: 10vh;

}

@media(min-width:750px) {
    .template-container {
        grid-column-gap: 2rem;
        grid-row-gap: 2rem;
        grid-template-columns: repeat(3, 1fr);
        // margin: 0 auto;
        // margin-top: 10vh;

    }
}

@media(min-width:1000px) {
    .template-container {
        grid-column-gap: 2rem;
        grid-row-gap: 2rem;
        grid-template-columns: repeat(4, 1fr);
        // margin: 0 auto;
        // margin-top: 10vh;
    }
}

@media(min-width:1440px) {
    .template-container {
        grid-column-gap: 2rem;
        grid-row-gap: 2rem;
        grid-template-columns: repeat(5, 1fr);
        // margin: 0 auto;
        // margin-top: 10vh;
    }
}
</style>