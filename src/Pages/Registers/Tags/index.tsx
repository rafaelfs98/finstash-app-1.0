// Categories.tsx
import React from "react";
import { Title } from "@mantine/core";
import ListView from "../../../Components/ListView/ListView";
import CategoryActions from "./TagsActions";

const Tags: React.FC = () => {
  return (
    <>
      <Title order={2}>Tags</Title>
      <ListView
        columns={[
          { key: "name", label: "Tag" },
          { key: "color", label: "Cor" },
        ]}
        resource="tags?order=id.asc"
        actions={CategoryActions()}
      />
    </>
  );
};

export default Tags;
