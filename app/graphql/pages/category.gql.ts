import { gql } from 'graphql-request'

export const categoryQuery = gql`
    query entryQuery($uri: [String]!, $site: [String]!) {
        page: category(uri: $uri, site: $site) {
            id
            title
            uri
            slug
            siteId
            language
            groupHandle
            localized {
                uri
                language
            }
        }
    }
`
