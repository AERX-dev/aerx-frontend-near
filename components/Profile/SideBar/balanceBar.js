import { Box, VStack, Icon, Heading, Text, HStack } from "@chakra-ui/react";
import { ReceiveIconButton, SendIconButton} from "../../UI/Buttons";

const BalanceBar = ({ balance, ...rest }) => {
    return (
        <Box
            bgImage="/images/balance-bg.svg"
            bgColor="#ffff0006"
            bgPos="center"
            bgSize="cover"
            bgBlendMode="darken"
            borderRadius="lg"
            w="100%"
            py={3}
			borderTopRadius	="0"
			borderTopColor="grey"
			borderTopWidth="1px"
			
            >
            <VStack
               className="content-align-left px-4" 
			   align="baseline"
			   fontSize="2.5vh"
            >   
                <Text className="font-semibold" >Your Balance</Text>
                <HStack>
                    <Icon width="24px" height="24px" viewBox="0 0 24 24" fill="none">
			<path d="M12.6156 1.62511C12.6186 1.62166 12.6184 1.62228 12.6151 1.62568L12.6156 1.62511ZM10.3844 22.3749C10.3814 22.3783 10.3816 22.3777 10.3849 22.3743L10.3844 22.3749ZM10.4958 23.247L10.6422 22.7689L10.4959 23.247C10.6733 23.3013 10.8326 23.2577 10.9412 23.197C11.0343 23.1449 11.0994 23.0762 11.1359 23.0347C11.2037 22.9574 11.2758 22.8506 11.3389 22.757C11.3432 22.7507 11.3474 22.7444 11.3515 22.7382L18.2037 12.5918C18.2066 12.5874 18.2097 12.5829 18.2129 12.5781C18.2501 12.5233 18.3045 12.4429 18.3409 12.3672C18.3804 12.2848 18.4708 12.0616 18.3417 11.8185L18.3416 11.8185C18.2124 11.5753 17.9768 11.5254 17.8864 11.512C17.8034 11.4997 17.7063 11.4999 17.64 11.5C17.6343 11.5 17.6288 11.5 17.6236 11.5H12.9285L12.9286 1.65352C12.9286 1.64606 12.9286 1.63851 12.9286 1.6309C12.9286 1.51798 12.9287 1.38916 12.9157 1.28716C12.9088 1.23237 12.8932 1.13896 12.8452 1.04371C12.7893 0.932609 12.6816 0.807322 12.5042 0.753026L12.3585 1.22908L12.5042 0.753025C12.3267 0.698729 12.1674 0.742284 12.0588 0.803025C11.9657 0.855102 11.9006 0.92383 11.8641 0.96533C11.7963 1.0426 11.7243 1.1494 11.6611 1.24301C11.6569 1.24932 11.6526 1.25558 11.6485 1.26176L4.79629 11.4082C4.79336 11.4126 4.79028 11.4171 4.78707 11.4219C4.74993 11.4767 4.69546 11.5571 4.65915 11.6328C4.61962 11.7152 4.52915 11.9384 4.65835 12.1815C4.78755 12.4247 5.02316 12.4746 5.11357 12.488C5.19662 12.5003 5.29373 12.5001 5.35995 12.5C5.36567 12.5 5.37117 12.5 5.3764 12.5H10.0715L10.0714 22.3465C10.0714 22.3539 10.0714 22.3615 10.0714 22.3691C10.0714 22.482 10.0713 22.6108 10.0843 22.7128C10.0912 22.7676 10.1068 22.861 10.1548 22.9563C10.2107 23.0674 10.3184 23.1927 10.4958 23.247ZM11.0763 22.5866C11.0762 22.5864 11.0762 22.5861 11.0762 22.5859L11.0768 22.5897C11.0767 22.5898 11.0765 22.5888 11.0763 22.5866Z" fill="#FFE500" stroke="#FFE600"/>
		    </Icon>
                    <Heading size="md" fontSize="2.5vh">{balance || 0}</Heading>
                </HStack>
                <HStack>
                    <SendIconButton />
                    <ReceiveIconButton />
                </HStack>
            </VStack>
        </Box>
    );
};

export default BalanceBar;
