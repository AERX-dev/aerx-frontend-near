import React from "react";
import { Button, useColorMode } from "@chakra-ui/react";
import { AddIcon, ArrowForwardIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { RiSendPlaneFill } from "react-icons/ri";
import { MdOutlineDone } from "react-icons/md";
import { HiShoppingBag, HiOutlineDocumentSearch, HiRefresh } from "react-icons/hi";

export const SendButton = () => {
    return (
        <Button
            borderRadius={20}
            bgColor="#6054F0"
            size="md"
            variant="outline"
            leftIcon={<RiSendPlaneFill />}
        >
        </Button>
    );
};

export const SwapButton = () => {
    return (
        <Button
            borderRadius={20}
            bgColor="#6054F0"
            size="md"
            variant="outline"
            leftIcon={<HiRefresh />}
        >
        </Button>
    );
};

export const FollowButton = () => {
    return (
        <Button
            borderRadius={20}
            bgColor="transparent"
            _hover={{ color: "black", bgColor: "#E2E8F0" }}
            size="md"
            variant="outline"
            leftIcon={<MdOutlineDone />}
        >
            {" "}
            Followed
        </Button>
    );
};

export const ReceiveIconButton = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Button
            borderRadius={20}
            size="md"
            _hover={{ color: "black", bgColor: "#E2E8F0" }}
            variant="solid"
            bgColor={colorMode === "light" ? "#edf2f7" : "#edf2f714"}
            leftIcon={<ArrowForwardIcon />}
        >
            {""}
        </Button>
    );
};

export const SendIconButton = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Button
            borderRadius={20}
            size="md"
            _hover={{ color: "black", bgColor: "#E2E8F0" }}
            variant="solid"
            bgColor={colorMode === "light" ? "#edf2f7" : "#edf2f714"}
            leftIcon={<ArrowUpIcon />}
        >
            {" "}
            Send
        </Button>
    );
};

export const PurpleButton = ({ children, ...rest }) => {
    return (
        <Button
            borderRadius={20}
            bgColor="#6054F0"
            size="sm"
            position="absolute"
            leftIcon={<HiShoppingBag />}
            {...rest}
        >
            {children}
        </Button>
    );
};
