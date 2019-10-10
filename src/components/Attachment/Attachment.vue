<template>
    <component
            :is="`Attachment${attachmentType.component}`"
            :data="attachment"
            :deleteButton="deleteButton"
            :icon="attachmentType.icon"
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
            attachmentType: {
                component: 'Document',
                icon: DocumentIcon
            }
        }
      },
      beforeMount() {
          this.attachmentType = checkAttachmentType(this.attachment.type);
      }
  }
</script>
