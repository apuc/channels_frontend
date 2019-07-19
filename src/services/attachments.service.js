const attachmentsTypes = [
    {
        attachmentsType: 'Image',
        fileType: 'image'
    },
    {
        attachmentsType: 'Document',
        fileType: 'text'
    },
    {
        attachmentsType: 'Document',
        fileType: 'application'
    }
];

export function checkAttachmentType(type) {
    for(let i = 0; i < attachmentsTypes.length; i++) {
        if (type.indexOf(attachmentsTypes[i].fileType) !== -1) {
            return attachmentsTypes[i].attachmentsType;
        }
    }
    return 'Document'
}
