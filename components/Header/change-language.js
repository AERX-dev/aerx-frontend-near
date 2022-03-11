import Link from "next/link";
import i18Config from "../../i18n.json";
import useTranslation from "next-translate/useTranslation";
import setLanguage from "next-translate/setLanguage";

import { useRouter } from "next/router";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  IconButton,
} from "@chakra-ui/react";

const { locales } = i18Config;

export default function ChangeLanguage() {
  const { t, lang } = useTranslation("common");
  const { asPath } = useRouter();

  return (
    <Menu size="xs">
      <MenuButton
        _hover={{ bg: "none" }}
        _active={{ bg: "none" }}
        fontSize="sm"
        as={IconButton}
        rounded="full"
        variant="outline"
      >
        {lang.toUpperCase()}
      </MenuButton>

      <MenuList maxWidth={"100px"}>
        <MenuItem onClick={async () => await setLanguage("en")}>
          {t("english")}{" "}
          <small style={{ marginLeft: 8 }}>
            <b>en</b>
          </small>
        </MenuItem>
        <MenuItem onClick={async () => await setLanguage("es")}>
          {t("spanish")}{" "}
          <small style={{ marginLeft: 8 }}>
            <b>sp</b>
          </small>
        </MenuItem>
        {/* <MenuItem onClick={async () => await setLanguage('hi_IN')}>hi_IN</MenuItem> */}
        <MenuItem onClick={async () => await setLanguage("ru")}>
          {t("russian")}{" "}
          <small style={{ marginLeft: 8 }}>
            <b>ru</b>
          </small>
        </MenuItem>
        {/* <MenuItem onClick={async () => await setLanguage('uz_Latn_UZ')}>uz_Latn_UZ</MenuItem> */}
      </MenuList>
    </Menu>
  );
}
