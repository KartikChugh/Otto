import React from "react";

import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";

import {
  irisColumns,
  irisColumnsMap,
  iris,
  irisUnits,
} from "static/datasets/iris";
import {
  tweets,
  twitterColumns,
  twitterColumnsMap,
} from "static/datasets/tweets";
import { SampleDataset } from "state/StateTypes";

export const datasetMetadata = {
  [SampleDataset.IRIS]: {
    title: "Iris",
    subtitle: "A small dataset of flowers",
    icon: <SendIcon fontSize="small" />,
    instances: 150,
    attributes: 4,
    classes: 3,
    tags: ["Numeric"],
    columns: irisColumns,
    columnsMap: irisColumnsMap,
    data: iris,
    units: irisUnits,
  },
  [SampleDataset.TWITTER]: {
    title: "Twitter",
    subtitle: "Text data from twitter tweets",
    icon: <InboxIcon fontSize="small" />,
    instances: 200,
    tags: ["Text"],
    columns: twitterColumns,
    columnsMap: twitterColumnsMap,
    data: tweets,
  },
  [SampleDataset.BOSTON]: {
    title: "Boston",
    subtitle: "Yum",
    icon: <DraftsIcon fontSize="small" />,
    instances: 506,
    attributes: 13,
    tags: ["Numeric", "Categorical"],
    columns: [],
    columnsMap: {},
    data: [],
    units: [],
  },
};
