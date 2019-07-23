<template>
    <component
            :is="`Attachment${component.type}`"
            :data="attachment"
            :deleteButton="deleteButton"
            :icon="component.icon"
    ></component>
</template>

<script>
  import AttachmentImage from './AttachmentImage';
  import AttachmentDocument  from './AttachmentDocument';
  import AttachmentArchive  from './AttachmentArchive';
  import DocumentIcon from '../../assets/img/attachment-document-icon.png';
  import { checkAttachmentType } from '../../services/messages/attachments.service'

  export default {
    components: {AttachmentImage, AttachmentDocument, AttachmentArchive},
    props: {
      attachment: {
        required: true,
        type: Object
      },
      deleteButton: {
          required: false,
          type: Boolean,
          default: false
      },
    },
      data() {
        return {
            component: {
                type: 'Document',
                icon: DocumentIcon
            }
        }
      },
      beforeMount() {
          this.component = checkAttachmentType(this.attachment.type);
      }
  }
</script>
