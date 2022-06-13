import {
    Box,
    SimpleGrid,
    Center,
    Image as ChakraImage,
    useColorMode,
    Heading,
    Text,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import SectionResolver from "../Landing/SectionResolver";

function Feature1() {
    const { colorMode } = useColorMode();
    const { t } = useTranslation("landing");
    return (
        <>
            <SectionResolver
                heading={"Monitize your ideas"}
                styledHeading="Easily"
                image="/monetize.png"
                body={[
                    `In Aerx, makers can easily monetize content and retain their
          ownership rights.`,
                    `Just publish what you have created: text, video, picture or audio.
          It doesn't matter if you are a professional artist who just
          came up with a funny meme, an aspiring musician or an author of
          interesting texts. Post it and get rewarded if other users like
          it.`,
                ]}
            />
        </>
        // <Box height="500px" position="relative" maxWidth={800} margin="0 auto">
        //     <SimpleGrid columns={2} spacing={10}>
        //         <Box textAlign="left">
        //             <Center height="100%">
        //                 <Box px={8} position="relative">
        //                     <ChakraImage
        //                         filter={
        //                             colorMode === "light"
        //                                 ? "invert(1)"
        //                                 : "invert(0)"
        //                         }
        //                         src="/01.png"
        //                         width="140px"
        //                         position="absolute"
        //                         top={-10}
        //                         right={100}
        //                     />
        //                     <Heading>
        //                         {t("features.feature1.description")}
        //                     </Heading>
        //                     <Text m="2">{t("features.feature1.caption")}</Text>
        //                 </Box>
        //             </Center>
        //         </Box>
        //         <Box height="100%" width="100%">
        //             <ChakraImage src="/multimedia.png" />
        //         </Box>
        //     </SimpleGrid>
        //     <ChakraImage
        //         zIndex={-1}
        //         src="/grid.png"
        //         filter={colorMode === "light" ? "invert(1)" : "invert(0)"}
        //         width={400}
        //         position="absolute"
        //         top={0}
        //         right={"20%"}
        //     />
        // </Box>
    );
}

export default Feature1;
