/* eslint-disable camelcase */
import { Box, Grid, GridItem, Text, Flex } from "@chakra-ui/react";
import { useMemo } from "react";
import type { NextPage } from "next";
import { Loading, YearlyBarChart } from "@/components/atoms";
import Table from "@/components/table";
import { generateYearsUntilToday } from "@/utils/time";
import UnclaimedTokens from "@/components/atoms/UnclaimedTokens";
import useClaims from "@/hooks/useClaims";

const Claim: NextPage = () => {
  const START_YEAR = 2021;
  // duplicit setClaimsYear state with the bar chart - bad practice but cant isloate chart from rest of buttons
  const { unclaimedTotal, handleClaim, loading, monthlyClaims, claims, setClaimsYear, claimsYear } =
    useClaims();

  const tableColumns = useMemo(
    () => [
      {
        Header: "Address",
        accessor: "address",
        style: {
          fontSize: "18px",
          fontWeight: "400",
          width: { md: "40%", lg: "40%" },
          minWidth: { md: "210px", lg: "210px" },
        },
      },
      {
        Header: "Amount ($ROBOT)",
        accessor: "amount",
        style: {
          fontFamily: "body_bold",
          fontSize: "18px",
          fontWeight: "800",
        },
      },
      {
        Header: "Date",
        accessor: "date",
        style: {
          fontFamily: "body_regular",
          fontSize: "16px",
          fontWeight: "400",
          textAlign: "left",
        },
      },
    ],
    [],
  );

  return (
    <Box>
      {loading && <Loading />}
      {!loading && (
        <Box>
          <Box
            borderX={{ base: "2px", sm: "2px", md: "0px", lg: "0px" }}
            borderTop={{ base: "2px", sm: "2px", md: "0px", lg: "0px" }}
            borderBottom="2px"
          >
            <YearlyBarChart
              chartData={monthlyClaims}
              title="Distributions"
              startYear={claimsYear}
              years={generateYearsUntilToday(START_YEAR)}
              yearSelectedCallback={setClaimsYear}
            />
          </Box>
          <Grid templateColumns="repeat(10, 1fr)" width="100%" mt="25px">
            <GridItem
              colSpan={{ base: 10, sm: 10 }}
              display={{ base: "block", sm: "block", md: "none", lg: "none" }}
              mb="30px"
            >
              <UnclaimedTokens unclaimedTotal={unclaimedTotal} handleClaim={handleClaim} />
            </GridItem>
            <GridItem colSpan={{ base: 10, sm: 10, md: 7, lg: 7 }}>
              <Flex
                justifyContent={{ base: "start ", sm: "start", md: "start", lg: "start" }}
                borderBottom="2px"
              >
                <Text
                  borderTop="2px"
                  borderRight="2px"
                  borderLeft="2px"
                  px="10px"
                  py="2px"
                  fontWeight="400"
                  fontSize="18px"
                >
                  Distributions History
                </Text>
              </Flex>
              <Table
                // @ts-ignore
                columns={tableColumns}
                data={claims || []}
                initialState={{
                  pageSize: 10,
                }}
              />
            </GridItem>
            <GridItem
              colSpan={{ md: 3, lg: 3 }}
              display={{ base: "none", sm: "none", md: "block", lg: "block" }}
              ml="30px"
            >
              <UnclaimedTokens unclaimedTotal={unclaimedTotal} handleClaim={handleClaim} />
            </GridItem>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default Claim;
