<template>
    <div class="nav d-flex flex-column">
        <NavSection :title="$ml.get('Nav.users')" :isOpen=true :itemsList="users" id="collapse1"/>
        <NavSection :title="$ml.get('Nav.channels')" :isOpen=false :itemsList="users" id="collapse2"/>
        <NavSection :title="$ml.get('Nav.groups')" :isOpen=false :itemsList="users" id="collapse3"/>
    </div>
</template>

<script>
    import NavSection from './NavSection'

    export default {
        data() {
            return {
                users: [
                    {name: 'Вася', link: 'vasya_link'},
                    {name: 'Петя', link: 'petay_link'},
                    {name: 'Андрей', link: 'andrey_link'},
                    {name: 'Дима', link: 'dima_link'}
                ]
            }
        },
        components: {
            NavSection
        }
    }

</script>

<style scoped>
    .nav {
        height: 100%;
        flex-wrap: nowrap !important;
    }
</style>