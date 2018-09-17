<template>
    <div class="list-group">
        <b-list-group-item variant="warning" v-b-toggle="id" class="text-center nav-items-header">{{ title }}</b-list-group-item>
        <b-collapse :visible="isOpen" :id="id" class="nav-items">
            <b-list-group-item
                    v-for="(item, index) in itemsList"
                    :href="item.link"
                    :key="index + item.link"
                    class="d-flex justify-content-between align-items-center"
            >{{ item.name }}
            </b-list-group-item>
        </b-collapse>
    </div>
</template>

<script>
    export default {
        props: {
            id: String,
            title: String,
            itemsList: Array,
            isOpen: Boolean
        }
    }
</script>

<style scoped>
    .list-group {
        max-height: calc(100% - 100px);
    }
    .nav-items {
        height: 100%;
        overflow-x: hidden;
    }
    .nav-items-header {
        cursor: pointer;
    }
</style>