import { BigNumber } from "@ethersproject/bignumber";
import { ethers } from "ethers";
import React, { useState } from "react";
import { Text, VStack, Button, Flex, Box, Center } from "@chakra-ui/react";
import Image from "next/image";
import qs from "qs";
import type { TokenBalance } from "@/hooks/usePoolGearData";
import SwapTokenField from "./shared/SwapTokenField";
import { useWeb3Context } from "@/contexts/Web3Context";

const Swap: React.FC = () => {
  const { loading, account, provider } = useWeb3Context();
  const NON_METAFACTORY_TOKEN_SYMBOLS: string[] = ["WETH", "DAI"];
  const METAFACTORY_TOKEN_SYMBOLS: string[] = ["ROBOT"];
  const [sellToken, setSellToken] = useState<TokenBalance>({
    symbol: NON_METAFACTORY_TOKEN_SYMBOLS[0],
    balance: 0,
  });
  const [sellTokenList, setSellTokenList] = useState<string[]>(NON_METAFACTORY_TOKEN_SYMBOLS);

  const [buyToken, setBuyToken] = useState<TokenBalance>({
    symbol: METAFACTORY_TOKEN_SYMBOLS[0],
    balance: 0,
  });
  const [buyTokenList, setBuyTokenList] = useState<string[]>(METAFACTORY_TOKEN_SYMBOLS);
  const switchCurrencies = () => {
    const currentSellToken = { ...sellToken };
    const currentSellTokenList = sellTokenList;

    setSellToken({ ...buyToken });
    setBuyToken({ ...currentSellToken });
    setSellTokenList(buyTokenList);
    setBuyTokenList(currentSellTokenList);
  };

  const handleSwap = async () => {
    const params = {
      sellToken: "0xfb5453340c03db5ade474b27e68b6a9c6b2823eb",
      buyToken: "ETH",
      sellAmount: ethers.utils.parseEther("1.5").toString(),
    };
    console.log(`https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`);


    if (provider && account) {
      const signer = provider.getSigner();
      const response = await fetch(`https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`);
      const quote = await response.json();
      console.log(quote);

      const erc20Contract = IERC20__factory.connect("0xfb5453340c03db5ade474b27e68b6a9c6b2823eb", signer);
      const balance = await erc20Contract.balanceOf(account);
      console.log(ethers.utils.formatEther(balance));


      // const wethContract = IWETH__factory.connect(quote.allowanceTarget, signer);
      // const daiContract = IERC20__factory.connect(quote.allowanceTarget, signer);

      // await daiContract.approve(ethers.constants.MaxUint256);

      // const tx = {
      //   from: account,
      //   to: quote.to,
      //   data: ethers.utils.hexlify(quote.data),
      //   value: ethers.utils.parseEther(quote.value),
      //   gasLimit: ethers.utils.hexlify(Number(quote.gas)),
      //   gasPrice: BigNumber.from(quote.gasPrice),
      // };
      // await signer.sendTransaction(tx);

      // await web3.eth.sendTransaction({
      //   from: account,
      //   to: quote.to,
      //   data: quote.data,
      //   value: quote.value,
      //   gas: quote.gas,
      //   gasPrice: quote.gasPrice,
      // });

      // const response = await fetch(
      //   `https://api.0x.org/swap/v0/quote?buyToken=DAI&sellToken=ETH&sellAmount=${ethers.utils.parseEther("0.01").toString()}`,
      // );
      if (response.ok) {
        if (quote.allowanceTarget && quote.allowanceTarget > 0) {
          const erc20Contract = IERC20__factory.connect(quote.sellTokenAddress, signer);
          await erc20Contract.approve(quote.allowanceTarget, BigNumber.from(quote.sellAmount));
        }

        // await web3.eth.sendTransaction({
        //   from: account,
        //   to: quote.to,
        //   data: quote.data,
        //   value: quote.value,
        //   gasPrice: quote.gasPrice,
        //   // 0x-API cannot estimate gas in forked mode.
        //   // takerAddress: account,
        // });

        const tx = {
          from: account,
          to: quote.to,
          data: ethers.utils.hexlify(quote.data),
          value: BigNumber.from(quote.value),
          // gasLimit: ethers.utils.hexlify(Number(quote.gas)),
          gasPrice: BigNumber.from(quote.gasPrice),
        };
        await signer.sendTransaction(tx);
      }
    }
  };

  //   web3.eth.sendTransaction({
  //     from: taker,
  //     to: quote.to,
  //     data: quote.data,
  //     value: quote.value,
  //     gasPrice: quote.gasPrice,
  //     // 0x-API cannot estimate gas in forked mode.
  //     ...(FORKED ? {} : { gas : quote.gas }),
  // }));};

  if (loading || !account) return null;

  return (
    <VStack border="2px" borderTop="0px" borderRight="0px" spacing="0px">
      <VStack spacing="16px" width="100%" px="32px" pt="32px" pb="26px">
        <Box width="100%">
          <Text fontFamily="body_regular" fontWeight="400" fontSize="16px">
            Sell
          </Text>
        </Box>
        <SwapTokenField
          selectedToken={sellToken}
          disableInput={!!buyToken.balance && buyToken.balance > 0}
          tokenList={sellTokenList}
          setSelectedTokenCallback={setSellToken}
        />
        <Center
          boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
          borderRadius="10px"
          cursor="pointer"
          onClick={switchCurrencies}
        >
          <Image src="/switch.svg" alt="" width="40px" height="40px" />
        </Center>
        <Box width="100%">
          <Text fontFamily="body_regular" fontWeight="400" fontSize="16px">
            Buy
          </Text>
        </Box>
        <SwapTokenField
          selectedToken={buyToken}
          disableInput={!!sellToken.balance && sellToken.balance > 0}
          tokenList={buyTokenList}
          setSelectedTokenCallback={setBuyToken}
        />
      </VStack>
      <Flex width="100%" backgroundColor="#D9BAFF">
        <Button
          onClick={handleSwap}
          _focus={{ boxShadow: "none" }}
          variant="unstyled"
          alignSelf="center"
          width="100%"
          borderRadius="0px"
          mt="16px"
          mb="20px"
        >
          <Flex spacing="0px" justifyContent="center">
            <Text color="##8B2CFF" fontFamily="body_bold" fontWeight="800" fontSize="24px" m="5px">
              Preview trade
            </Text>
          </Flex>
        </Button>
      </Flex>
    </VStack>
  );
};

export default Swap;
