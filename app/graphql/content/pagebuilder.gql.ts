export const pageBuilder = `
fieldPageBuilder {
    nodes {
      type
      ... on fieldPageBuilder_blockImage_BlockType {
        type
        blockTypeHandle
        fieldImage {
          id
          url
        }
      }
      ... on fieldPageBuilder_blockText_BlockType {
        type
        fieldText
        blockTypeHandle
      }
      html
      content
      tagName
      text  
    }
  }
`
