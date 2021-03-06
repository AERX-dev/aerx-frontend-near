import { HeroSection, Features, Team } from "../components/Landing";
import Layout from "../components/Layout2";
import styles from "../styles/Home.module.css";
import Channel from "../components/Landing/channel";
import Footer from "../components/Footer";
import { Box, LightMode } from "@chakra-ui/react";

export default function Home() {
    return (
        <LightMode>
        <Layout>
            <Box position="relative" maxW="80vw" zIndex={10} mx="auto" >
                <HeroSection />
                <Features />
                {/* <Team /> */}
                <Channel />
                <Footer />
            </Box>
        </Layout>
        </LightMode>
    );
}
