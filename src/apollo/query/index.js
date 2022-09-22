import { gql } from "@apollo/client"

export const tests = gql`
  query tests($limit: Int, $start: Int) {
    tests(limit: $limit, start: $start) {
      id
      test1
    }
  }
`
export const testsCount = gql`
  query {
    testsCount
  }
`
