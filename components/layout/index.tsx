import React, { ReactNode, useEffect } from "react";
import { Flex, Spacer } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { LOGO_HEIGHT } from "@/utils/constants";
import { useWeb3Context } from "@/contexts/Web3Context";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { loading, account, errors } = useWeb3Context();
  const router = useRouter();
  useEffect(() => {
    if (!loading && !errors && !account && router.pathname !== "/profile") {
      router.push("/profile");
    }
  }, [account, errors, loading, router]);

  return (
    <Flex flexDirection="column" minH="100vh">
      <Navigation />
      <Flex
        flex="1"
        flexDirection="column"
        mx={{ base: "24px", sm: "24px", md: `${LOGO_HEIGHT}px`, lg: `${LOGO_HEIGHT}px` }}
        border={{ base: "0px", sm: "00px", md: "2px", lg: "2px" }}
        marginBlockEnd="20px"
      >
        <Spacer />
        {children}
        <Spacer />
      </Flex>
      <Footer />
    </Flex>
  );
};

export default Layout;
