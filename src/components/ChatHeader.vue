<template>
    <header class="bg-light">
        <b-dropdown class="language-dropdown" variant="link" size="md">
            <template slot="button-content">
                <v-icon scale="1.6" class="icon" name="flag"/>
            </template>
            <b-dropdown-item
                    v-for="lang in $ml.list"
                    :key="lang"
                    @click="$ml.change(lang)"
                    v-text="lang"
            ></b-dropdown-item>
        </b-dropdown>
    </header>
</template>

<script>

    export default {
        data() {
            return {
            }
        },
        computed: {}
    }
</script>

<style scoped>
    header {
        display: flex;
        align-items: center;
        min-height: 100px;
    }
    .icon {
        color: #ffeeba;
        stroke: blue;
        stroke-width: 15px;
    }
    .language-dropdown {
        margin-left: auto;
    }

</style>