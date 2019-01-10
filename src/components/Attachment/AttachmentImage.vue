<template>
    <div class="attachment-image">
        <img :src="data.url" alt="attachment image">
        <div class="close-btn" @click="REMOVE_ATTACHMENT(data.id)">
            <v-icon scale="1" class="icon" name="times-circle"/>
        </div>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex';

    export default {
        name: 'AttachmentImage',
        props: {
            data: {
                required: true,
                type: Object
            }
        },
        methods: {
            ...mapMutations({
                REMOVE_ATTACHMENT: 'messages/REMOVE_ATTACHMENT',
            }),
        },
    }
</script>

<style>
    .attachment-image {
        position: relative;
        padding: 10px 0;
        width: 100px;
        height: 100px;
    }

    .attachment-image img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .close-btn {
        position: absolute;
        right: -5px;
        top: 0;
        z-index: 1;
        display: none;
        cursor: pointer;
    }
    
    .attachment-image:hover .close-btn {
        display: block;
    }
</style>