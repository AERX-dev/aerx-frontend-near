import React, { ChangeEvent } from "react";
import { useState, useEffect } from "react";
import { HiRefresh } from "react-icons/hi";
import { AiOutlineArrowLeft } from "react-icons/ai";
import useCustomToast from "@/hooks/useCustomToast";

import {
    Box,
    Flex,
    VStack,
    Button,
    Text,
    Icon,
    useColorMode,
} from "@chakra-ui/react";
import ExchangeInput from "./input";
import { nearStore } from "@/stores/near";
import SwitchToken from "./switchTokens";
import { ExchangeCurrencyType } from "@/types/exchange";
import { HEIGHT, WIDTH } from "@/utils/styles";
import Slippage from "./slippage";

export type ExchangeProps = {
    balance: number;
    bg: string;
    flip: () => void;
};

const Exchange: React.VFC<ExchangeProps> = ({ balance, bg, flip }) => {
    const { colorMode } = useColorMode();
    const toast = useCustomToast();
    const nearState = nearStore((state: any) => state);

    // price of AERX(=20AREX/1NEAR for now)
    const [price, setPrice] = useState(1 / 20);

    // if user is trying to sell AERX token
    const [isSelling, setIsSelling] = useState(false);
    const [currency, setCurrency] = useState<{
        base: ExchangeCurrencyType;
        quote: ExchangeCurrencyType;
    }>({
        base: "NEAR",
        quote: "AEX",
    });

    const [exchangeData, setExchangeData] = useState({
        baseAmount: "",
        quoteAmount: "",
        slippage: "",
    });

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) {
            setExchangeData((prev: any) => ({
                ...prev,
                baseAmount: " ",
            }));
        }

        const inputNum = Number(e.target.value);

        if (isNaN(inputNum)) return;

        setExchangeData((prev: any) => ({
            ...prev,
            baseAmount: inputNum.toString(),
        }));
    };

    const changeSlippage = (value: string) => {
        setExchangeData((prev: any) => ({
            ...prev,
            slippage: value,
        }));
    };

    const switchCurrency = () => {
        setCurrency((prev: { quote: any; base: any; }) => ({
            base: prev.quote,
            quote: prev.base,
        }));
        setExchangeData((prev: { quoteAmount: string; baseAmount: string; }) => ({
            ...prev,
            baseAmount: prev.quoteAmount,
            quoteAmount: prev.baseAmount,
        }));
        setIsSelling(!isSelling);
    };

    useEffect(() => {
        const calculateOutput = async () => {
            const price = isSelling ? 1 / 20 : 20; // TODO: FETCH REAL TIME TOKEN PRICE FOR NEAR

            const amount = Number(exchangeData.baseAmount);
            if (isNaN(amount) || amount < 0)
                return setExchangeData((prev: any) => ({
                    ...prev,
                    quoteAmount: "0",
                }));

            // TODO: SHOULD CALCULATE REAL RATE AFTER TOKEN CONTRACT DEPLOYED
            // Call API to fetch the price
            setExchangeData((prev: any) => ({
                ...prev,
                quoteAmount: (amount * price).toString(),
            }));
            setPrice(price);
        };
        calculateOutput();
    }, [exchangeData.baseAmount, isSelling]);

    useEffect(() => {
        console.dir(exchangeData);
    }, [exchangeData]);

    const _min_expected = "0"; //this is slippage(must be number in "" that is string)

    const swap = async () => {
        console.log("SWAP CLICKED, WILL PROCEED TO SWAP AEX FOR NEAR...");
        try {
            await nearState.profileContract?.swap(
                {
                    amount: exchangeData.baseAmount,
                    min_expected: _min_expected,
                },
                "300000000000000", //attached gas
                "1", //attached deposit
            );
            //Todo: call get balance
        } catch (e: any) {
            console.log("ERROR SWAP COULD NOT BE COMPLETED");
            toast("error", "SWAP ERROR: " + e.message, "CNFTerror");
        }
    };

    return (
        <Flex
            justifyContent={"space-between"}
            direction={"column"}
            bg={bg}
            h={HEIGHT.sidebar}
            w={WIDTH.sidebar}
            py={7}
            px={2}
            rounded={"md"}
        >
            <Box px={2} w={"100%"}>
                <Box pb={6}>
                    <Text
                        fontWeight="semibold"
                        fontSize="lg"
                        color={"gray"}
                        textAlign={"center"}
                    >
                        Transfer tokens
                    </Text>
                </Box>
                <VStack>
                    <Box w={"100%"} px={5}>
                        <ExchangeInput
                            value={exchangeData.baseAmount}
                            handleChange={handleInput}
                            placeholder={"100"}
                            currency={currency.base}
                        />
                        {/* TODO: CHANGE THE AMOUNT 102.4 TO AMOUNT FROM CONTRACT OR API TO APPLY REAL TIME VALUE */}
                        <Text
                            color={"gray"}
                            textAlign={"center"}
                            fontSize={"sm"}
                            mt={"16px"}
                        >
                            Available: {balance} {currency.base}
                        </Text>
                    </Box>
                    <Box w={"100%"} pt={5} px={5} alignItems={"center"}>
                        <Slippage handleChange={changeSlippage} />
                        <Text
                            color={"gray"}
                            textAlign={"center"}
                            fontSize={"sm"}
                            mt={"16px"}
                        >
                            Slippage tolerance
                        </Text>
                    </Box>
                    <Box w={"100%"} mt={0}>
                        <SwitchToken handleClick={switchCurrency} />
                    </Box>
                    <Box w={"100%"} px={5} textAlign={"center"}>
                        <ExchangeInput
                            value={exchangeData.quoteAmount}
                            handleChange={handleInput}
                            placeholder={"100"}
                            currency={currency.quote}
                            disabled={true}
                        />
                        <Text
                            color={"gray"}
                            textAlign={"center"}
                            fontSize={"sm"}
                            my={"16px"}
                        >
                            {/* TODO: CHANGE THE AMOUNT 3.9 TO VARIABLE */}1{" "}
                            {currency.base} = {`${price} ${currency.quote}`}
                        </Text>
                    </Box>
                    <Box pt={10} w={"100%"} px={5} textAlign={"center"}>
                        <Button
                            rounded={"full"}
                            size="md"
                            width="100%"
                            maxW={"230px"}
                            h={"56px"}
                            mx={"auto"}
                            bgColor={colorMode === "light" ? "purple" : "brand"}
                            leftIcon={<HiRefresh />}
                            py={"20px"}
                            onClick={swap}
                        >
                            change
                        </Button>
                    </Box>
                </VStack>
            </Box>
            <Flex
                mt={5}
                justifyContent={"center"}
                alignItems={"center"}
                onClick={flip}
                w={"100%"}
            >
                <Icon as={AiOutlineArrowLeft} color={"gray"} />
                <Text color={"gray"} _hover={{ cursor: "pointer" }} ml={2}>
                    Back
                </Text>
            </Flex>
        </Flex>
    );
};

export default Exchange;
