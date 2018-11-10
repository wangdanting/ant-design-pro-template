import React, { PureComponent } from "react";
import { connect } from "dva";

import styles from "./AdvancedProfile.less";
@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects["profile/fetchAdvanced"]
}))
class AdvancedProfile extends PureComponent {
  render() {
    return <div>dd</div>;
  }
}

export default AdvancedProfile;
