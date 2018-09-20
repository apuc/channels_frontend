<template>
    <header class="bg-light">
        <b-dropdown variant="link" size="lg">
            <template slot="button-content">
                <span>{{$t('shared.change_language')}}</span>
            </template>
            <b-dropdown-item
                    v-for="(lang, i) in languages"
                    :key="`Lang${i}`"
                    :value="lang"
                    v-on:click="changeLanguage(lang)"
            >{{ lang }}</b-dropdown-item>
        </b-dropdown>
    </header>
</template>

<script>
    import { getLanguages } from '../translations';
    import { i18n } from '../main';

    export default {
        data() {
            return {
                languages: getLanguages()
            }
        },
        methods: {
            changeLanguage(lang) {
                i18n.lang = lang;
                console.log(i18n)
            }
        }
    }
</script>

<style scoped>
    header {
        min-height: 100px;
    }

</style>