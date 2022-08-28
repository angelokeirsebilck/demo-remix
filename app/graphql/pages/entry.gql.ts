import { gql } from 'graphql-request'

export const entryQuery = gql`
    query entryQuery($uri: [String]!, $site: [String]!) {
        page: entry(uri: $uri, site: $site) {
            id
            title
            uri
            slug
            typeHandle
            sectionHandle
            siteId
            language
            localized {
                uri
                language
            }
            ... on pages_default_Entry {
                id
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
            }
        }
    }
`
