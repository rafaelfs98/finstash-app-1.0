import { Button, Group, TextInput, rem } from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import React, { useState } from "react";
import RevenuesCardView from "./RevenuesCardView";

const RevenuesTable: React.FC = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <>
      <Group mt="xl" mb="xl" justify="space-between">
        <TextInput
          placeholder="Search by any field"
          mb="md"
          accessKey="s"
          leftSection={
            <IconSearch
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
        />
        <Button mb="md" size="compact-lg">
          <IconPlus size="1rem" />
        </Button>
      </Group>

      <RevenuesCardView search={search} />
    </>
  );
};

export default RevenuesTable;
