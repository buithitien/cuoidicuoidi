import { connect } from "react-redux";
import LoginPage from "../pages/LoginPage";
import { login } from "../redux/slide/authSlice";
import { changeRoute } from "../redux/slide/routeSlice";

import { RootState } from "../redux/store";

const mapActionToLogin = {
  login,
  changeRoute,
};
const mapStateToProps = (state: RootState) => {
  return {
  };
};

export default connect(mapStateToProps, mapActionToLogin)(LoginPage);
