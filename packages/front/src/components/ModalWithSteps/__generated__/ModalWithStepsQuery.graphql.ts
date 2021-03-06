/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type ModalWithStepsQueryVariables = {
    categoryId: number;
    organizerId: number;
    targetAudienceId: number;
    formatId: number;
    startDate?: string | null;
    endDate?: string | null;
    withTrainingsWithoutDate: boolean;
};
export type ModalWithStepsQueryResponse = {
    readonly trainingsForReport: ReadonlyArray<{
        readonly trainingId: number;
        readonly name: string;
        readonly organizer: {
            readonly name: string;
        };
        readonly start: string | null;
        readonly end: string | null;
        readonly isDateSet: boolean;
    }>;
};
export type ModalWithStepsQuery = {
    readonly response: ModalWithStepsQueryResponse;
    readonly variables: ModalWithStepsQueryVariables;
};



/*
query ModalWithStepsQuery(
  $categoryId: Float!
  $organizerId: Float!
  $targetAudienceId: Float!
  $formatId: Float!
  $startDate: String
  $endDate: String
  $withTrainingsWithoutDate: Boolean!
) {
  trainingsForReport(categoryId: $categoryId, organizerId: $organizerId, targetAudienceId: $targetAudienceId, formatId: $formatId, startDate: $startDate, endDate: $endDate, withTrainingsWithoutDate: $withTrainingsWithoutDate) {
    trainingId: id
    name
    organizer {
      name
    }
    start
    end
    isDateSet
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "categoryId",
    "type": "Float!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "organizerId",
    "type": "Float!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "targetAudienceId",
    "type": "Float!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "formatId",
    "type": "Float!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "startDate",
    "type": "String"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "endDate",
    "type": "String"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "withTrainingsWithoutDate",
    "type": "Boolean!"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "categoryId",
        "variableName": "categoryId"
      },
      {
        "kind": "Variable",
        "name": "endDate",
        "variableName": "endDate"
      },
      {
        "kind": "Variable",
        "name": "formatId",
        "variableName": "formatId"
      },
      {
        "kind": "Variable",
        "name": "organizerId",
        "variableName": "organizerId"
      },
      {
        "kind": "Variable",
        "name": "startDate",
        "variableName": "startDate"
      },
      {
        "kind": "Variable",
        "name": "targetAudienceId",
        "variableName": "targetAudienceId"
      },
      {
        "kind": "Variable",
        "name": "withTrainingsWithoutDate",
        "variableName": "withTrainingsWithoutDate"
      }
    ],
    "concreteType": "TrainingEntity",
    "kind": "LinkedField",
    "name": "trainingsForReport",
    "plural": true,
    "selections": [
      {
        "alias": "trainingId",
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "OrganizerEntity",
        "kind": "LinkedField",
        "name": "organizer",
        "plural": false,
        "selections": [
          (v1/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "start",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "end",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isDateSet",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ModalWithStepsQuery",
    "selections": (v2/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ModalWithStepsQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "ModalWithStepsQuery",
    "operationKind": "query",
    "text": "query ModalWithStepsQuery(\n  $categoryId: Float!\n  $organizerId: Float!\n  $targetAudienceId: Float!\n  $formatId: Float!\n  $startDate: String\n  $endDate: String\n  $withTrainingsWithoutDate: Boolean!\n) {\n  trainingsForReport(categoryId: $categoryId, organizerId: $organizerId, targetAudienceId: $targetAudienceId, formatId: $formatId, startDate: $startDate, endDate: $endDate, withTrainingsWithoutDate: $withTrainingsWithoutDate) {\n    trainingId: id\n    name\n    organizer {\n      name\n    }\n    start\n    end\n    isDateSet\n  }\n}\n"
  }
};
})();
(node as any).hash = '1a4a5dd9a6b64a71dc0e44e9458bee88';
export default node;
