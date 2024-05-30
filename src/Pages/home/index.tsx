import { SimpleGrid } from "@mantine/core";
import TransactionsStats from "./TransactionsStats";

export function Home() {
  return (
    <>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }}>
        <TransactionsStats />
      </SimpleGrid>
    </>
  );
}
