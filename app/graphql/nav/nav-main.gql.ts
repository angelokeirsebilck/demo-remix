import { gql } from 'graphql-request'

export const navMain = gql`
    query navMainQuery($site: [String]!) {
        navigationNodes(navHandle: "fieldMainNav", site: $site) {
            id
            title
            element {
                uri
                language
            }
            children {
                title
                element {
                    uri
                }
            }
        }
    }
`
