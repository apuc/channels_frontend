<template>
    <component
            :is="`Attachment${attachmentType.component}`"
            :data="attachment"
            :deleteButton="deleteButton"
            :icon="attachmentType.icon"
            :big="big"
    ></component>
</template>

<script>
  import AttachmentImage from './AttachmentImage';
  import AttachmentDocument  from './AttachmentDocument';
  import AttachmentArchive  from './AttachmentArchive';
  import AttachmentLink  from './AttachmentLink';
  import AttachmentReplyMessage  from './AttachmentReplyMessage';
  import AttachmentRss  from './AttachmentRss';
  import DocumentIcon from '../../assets/img/attachment-document-icon.png';
  import { checkAttachmentType } from '../../services/messages/attachments.service'

  export default {
    components: {AttachmentImage, AttachmentDocument, AttachmentArchive,AttachmentLink,AttachmentReplyMessage,AttachmentRss},
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
      big:{
          default:false
      }
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
