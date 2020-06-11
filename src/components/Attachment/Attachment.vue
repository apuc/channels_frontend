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
  const AttachmentImage = () => import('./AttachmentImage');
  const AttachmentYoutube = () => import('./AttachmentYoutube');
  const AttachmentDocument = () => import('./AttachmentDocument');
  const AttachmentArchive = () => import('./AttachmentArchive');
  const AttachmentLink  = () => import('./AttachmentLink');
  const AttachmentReplyMessage = () => import('./AttachmentReplyMessage');
  const AttachmentRss = () => import('./AttachmentRss');
  const AttachmentGitHub  = () => import('./AttachmentGitHub');
  import DocumentIcon from '../../assets/img/attachment-document-icon.png';
  import { checkAttachmentType } from '../../services/messages/attachments.service'

  export default {
    components: {
      AttachmentImage, 
      AttachmentYoutube,
      AttachmentDocument, 
      AttachmentArchive,
      AttachmentLink,
      AttachmentReplyMessage,
      AttachmentRss,
      AttachmentGitHub,
    },
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
