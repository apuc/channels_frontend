<template>
    <div class="doc-attachment">
        <img :src="data.img_url" alt="document icon">
        <div class="doc-attachment-data">
            <span class="name">{{ data.name }}</span>
            <span class="weight">{{ data.weight }}</span>
        </div>
        <div class="close" @click="REMOVE_ATTACHMENT(data.id)">
            <v-icon scale="1" class="icon" name="times-circle"/>
        </div>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex';

    export default {
        name: 'AttachmentDocument',
        props: {
            data: {
                type: Object,
                required: true
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
    .doc-attachment {
        margin: 10px 0;
        display: flex;
        align-items: center;
        width: 100%;
    }
    .doc-attachment img {
        margin-right: 10px;
        display: block;
        width: 50px;
        height: 50px;
        flex-shrink: 0;
        object-fit: contain;
    }
    .doc-attachment-data {
        display: flex;
        flex-direction: column;
    }
    .close {
        display: block;
        margin-left: auto;
    }
</style>