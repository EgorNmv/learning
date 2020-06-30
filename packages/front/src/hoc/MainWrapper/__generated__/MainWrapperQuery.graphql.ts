/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type MainWrapperQueryVariables = {
    email: string;
};
export type MainWrapperQueryResponse = {
    readonly getUserGroups: string;
};
export type MainWrapperQuery = {
    readonly response: MainWrapperQueryResponse;
    readonly variables: MainWrapperQueryVariables;
};



/*
query MainWrapperQuery(
  $email: String!
) {
  getUserGroups(sub: $email)
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "email",
    "type": "String!"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "sub",
        "variableName": "email"
      }
    ],
    "kind": "ScalarField",
    "name": "getUserGroups",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MainWrapperQuery",
    "selections": (v1/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MainWrapperQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "MainWrapperQuery",
    "operationKind": "query",
    "text": "query MainWrapperQuery(\n  $email: String!\n) {\n  getUserGroups(sub: $email)\n}\n"
  }
};
})();
(node as any).hash = '45da3d6769e9c5d900e8714236d379b5';
export default node;
