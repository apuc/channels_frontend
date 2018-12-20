<template>
    <div class="attachment">
        <component :is='attachment.type + "Attachment"'></component>
    </div>
</template>

<script>
    import ImageAttachment from './attachment_types/ImageAttachment'
    import ArchiveAttachment from './attachment_types/ArchiveAttachment'

    export default {
        components: {
            ArchiveAttachment,
            ImageAttachment
        },
        props: {
            attachment: {
                required: true,
                type: Object
            }
        },
        computed: {}
    }

</script>