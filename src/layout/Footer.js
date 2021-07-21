import React from "react";
import { Pagination } from "antd";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(fab, faChevronLeft, faChevronRight);
const Footer = () => {
  return <Pagination defaultCurrent={1} total={50} />;
};
export default Footer;
