<template>
  <div class="attachment">
    <component :is="`Attachment${attachment.type}`"></component>
  </div>
</template>

<script>
  import AttachmentImage from './AttachmentImage';
  import AttachmentArchive  from './AttachmentArchive';

  export default {
    components: {AttachmentArchive,AttachmentImage},
    props: {
      attachment: {
        required: true,
        type: Object
      }
    },
  }
</script>