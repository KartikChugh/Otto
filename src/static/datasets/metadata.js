import React from "react";

import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";

import { SampleDataset } from "state/StateTypes";

export const datasetMetadata = {
  [SampleDataset.IRIS]: {
    title: "Iris",
    subtitle: "A small dataset of flowers",
    icon: <SendIcon fontSize="small" />,
  },
  [SampleDataset.TWITTER]: {
    title: "Twitter",
    subtitle: "Text data from twitter tweets",
    icon: <InboxIcon fontSize="small" />,
  },
  [SampleDataset.BOSTON]: {
    title: "Boston",
    subtitle: "Yum",
    icon: <DraftsIcon fontSize="small" />,
  },
};
