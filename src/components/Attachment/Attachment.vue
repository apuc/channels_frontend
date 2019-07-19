<template>
    <component
            :is="`Attachment${component}`"
            :data="attachment"
            :deleteButton="deleteButton || false"
    ></component>
</template>

<script>
  import AttachmentImage from './AttachmentImage';
  import AttachmentDocument  from './AttachmentDocument';
  import { checkAttachmentType } from '../../services/attachments.service'

  export default {
    components: {AttachmentImage, AttachmentDocument},
    props: {
      attachment: {
        required: true,
        type: Object
      },
      deleteButton: {
          required: false,
          type: Boolean
      },
    },
      data() {
        return {
            component: 'Document'
        }
      },
      beforeMount() {
          this.component = checkAttachmentType(this.attachment.type);
      }
  }
</script>