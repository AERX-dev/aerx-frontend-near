import {
    Box,
    useColorModeValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    Image as ChakraImage,
    Text,
    Avatar,
    Divider,
    Icon,
    IconButton,
} from "@chakra-ui/react";
import { ThunderboltOutlined, ThunderboltFilled } from "@ant-design/icons";
import { HiShoppingBag } from "react-icons/hi";
import { profileStore } from "../../stores/profile";
import { useState } from "react";
import { sendToken } from "../../lib/tokenContract";
import { nearStore } from "../../stores/near";
import { Layout } from "antd";
import PurpleButton from "../UI/PurpleButton";

const { Header, Footer, Content } = Layout;

function Post({ el }) {
    const postBg = useColorModeValue("#edf2f7", "#171923");
    const { isOpen, onOpen, onClose } = useDisclosure();
    let profileState = profileStore((state) => state);
    if (!profileState) {
        profileState = {};
    }

    const styles = {
        fontFamily: "poppings",
        backgroundColor: postBg,
        maxHeight: 430,
        borderRadius: 10,
        padding: 20,
        marginTop: 20,
        marginBottom: 20,
        header: {
            height: 64,
            display: "flex",
            alignItems: "center",
            position: "relative",
            gap: 5,
        },
        content: { maxHeight: 300 },
        footer: { height: 64, display: "flex", alignItems: "center" },
    };

    return (
        <>
            <Layout style={styles}>
                <Header style={styles.header}>
                    <Avatar
                        name="Pavel Dantsev"
                        src={
                            "https://bit.ly/dan-abramov" ||
                            profileState.profile?.profileImage
                        }
                        size="sm"
                    />
                    <Text my={2}>
                        {"Pavel Dantsev" || profileState.profile?.fullName}
                    </Text>
                    <Text className="opacity-50">
                        {"2h ago" || el?.created_at}
                    </Text>
                    <PurpleButton
                        className="right-0 text-white"
                        leftIcon={<HiShoppingBag />}
                    >
                        64 AE
                    </PurpleButton>
                </Header>
                <Content style={styles.content}>
                    <Box mb={1}>{el?.body}</Box>
                </Content>
                <Divider />
                <Footer
                    style={styles.footer}
                    className="flex align-middle gap-2"
                >
                    <Box onClick={onOpen}>
                        <IconButton
                            as={ThunderboltOutlined}
                            isRound
                            color="yellow"
                            variant="ghost"
                        />{" "}
                        {[10, 20, 30, 40][Math.floor(Math.random() * 4)]}
                    </Box>
                </Footer>
            </Layout>

            <ChargeModal
                profileState={profileState}
                el={el}
                state={[isOpen, onClose]}
            />
        </>
    );
}

const ChargeModal = ({ profileState, el, state }) => {
    const [isOpen, onClose] = state;
    const nearState = nearStore((state) => state);
    const sliderTrack = useColorModeValue("yellow.400", "yellow.400");
    const sliderTrackBg = useColorModeValue("yellow.100", "yellow.100");
    const sliderThumbColor = useColorModeValue("gray.900", "gray.900");
    const [sliderValue, setSliderValue] = useState(0);
    function updateSlider(e) {
        setSliderValue(e);
    }
    async function sendMoney(to, amount = 0.5) {
        sendToken(
            nearState, // state
            to, // reciever Id
            amount, // amount in ae
            `like from ${nearState?.accountId}`, // memo
        );
        onClose();
    }
    return (
        <Modal
            size="xl"
            isOpen={isOpen}
            onClose={() => {
                setSliderValue(0);
                onClose();
            }}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Reward Post</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box className="flex pb-4 gap-2 align-middle">
                        <Box className="inline-block h-10 w-10 bg-gray-500 rounded-full overflow-hidden">
                            <ChakraImage
                                src={profileState.profile?.profileImage}
                                objectFit="cover"
                                alt={profileState.profile?.fullName}
                            />
                        </Box>

                        <Box fontSize="lg" pt={1}>
                            {profileState.profile?.fullName}
                        </Box>
                    </Box>

                    {el?.body}

                    <Box className="py-2 flex pr-2">
                        <Box className="mr-4 text-2xl">
                            <Icon as={ThunderboltFilled} color="yellow" />
                        </Box>

                        <Slider
                            onChange={updateSlider}
                            size={"lg"}
                            aria-label="pay-slider"
                            colorScheme={"yellow"}
                            defaultValue={0}
                        >
                            <SliderTrack bg={sliderTrackBg}>
                                <SliderFilledTrack bg={sliderTrack} />
                            </SliderTrack>
                            <SliderThumb color={sliderThumbColor} boxSize={6}>
                                <small>{sliderValue}</small>
                            </SliderThumb>
                        </Slider>
                    </Box>
                </ModalBody>

                <ModalFooter>
                    <Button
                        variant="ghost"
                        mr={3}
                        onClick={() => {
                            setSliderValue(0);
                            onClose();
                        }}
                    >
                        Close
                    </Button>
                    <Button colorScheme="blue" onClick={sendMoney}>
                        Confirm
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default Post;
