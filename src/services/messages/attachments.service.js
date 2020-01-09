import DocumentIcon from '../../assets/img/attachment-document-icon.png';
import ArchiveIcon from '../../assets/img/attachment-archive-icon.png';
import WordIcon from '../../assets/img/attachment-word-icon.jpeg';

const attachmentsTypes = {
  
     image:{
       component: 'Image',
       icon:null
     },
  
     document:{
       component: 'Document',
       icon:{
         'vnd.openxmlformats-officedocument.wordprocessingml.document':WordIcon,
         'default':DocumentIcon
       }
     },
     
     archive:{
       component: 'Archive',
       icon: ArchiveIcon
     },
  
     link:{
       component: 'Link',
       icon:null
     }, 
  
     reply:{
       component: 'ReplyMessage',
       icon:null
     },
};

export function checkAttachmentType(type) {
    return attachmentsTypes[type] || attachmentsTypes.document;
}
