import DocumentIcon from '../../assets/img/attachment-document-icon.png';
import ArchiveIcon from '../../assets/img/attachment-archive-icon.png';
import WordIcon from '../../assets/img/attachment-word-icon.jpeg';

const attachmentsTypes = {
    png: {
        type: 'Image',
        icon: DocumentIcon
    },
    jpg: {
        type: 'Image',
        icon: DocumentIcon
    },
    jpeg: {
        type: 'Image',
        icon: DocumentIcon
    },
    gif: {
        type: 'Image',
        icon: DocumentIcon
    },
    zip: {
        type: 'Archive',
        icon: ArchiveIcon
    },
    'x-7z-compressed': {
        type: 'Archive',
        icon: ArchiveIcon
    },
    'x-xz': {
        type: 'Archive',
        icon: ArchiveIcon
    },
    'vnd.openxmlformats-officedocument.wordprocessingml.document': {
        type: 'Document',
        icon: WordIcon
    },
    document: {
        type: 'Document',
        icon: DocumentIcon
    }
};

export function checkAttachmentType(type) {
    const typeSplited = type.split('/')[1];
    return attachmentsTypes[typeSplited] || attachmentsTypes['document'];
}
