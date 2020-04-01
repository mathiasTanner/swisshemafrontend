import gql from "graphql-tag";

const MENUITEMS_QUERY = gql`
  query MenuItemTests {
    menuItemTests {
      id
      FR
      EN
      DE
      sub_menu_item_tests {
        id
        name
        FR
        EN
        DE
      }
    }
  }
`;

export default MENUITEMS_QUERY;
