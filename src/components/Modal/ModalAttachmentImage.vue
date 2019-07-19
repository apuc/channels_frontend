<template>
    <div class="wrap">
        <img :src="payload.src" alt="image">
    </div>
</template>

<script>
    export default {
        name: "ModalAttachmentImage",
        props: {
            payload: Object
        }
    }
</script>

<style scoped>
    .wrap {
        position: relative;
        width: 100%;
        height: 100%;
    }
    .wrap img {
        height: 100%;
        width: 100%;
        object-fit: contain;
    }
</style>