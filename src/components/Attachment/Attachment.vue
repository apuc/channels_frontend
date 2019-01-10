<template>
    <component
            :is="`Attachment${attachment.type}`"
            :data="attachment.data"
    ></component>
</template>

<script>
  import AttachmentImage from './AttachmentImage';
  import AttachmentDocument  from './AttachmentDocument';

  export default {
    components: {AttachmentImage, AttachmentDocument},
    props: {
      attachment: {
        required: true,
        type: Object
      }
    },
  }
</script>