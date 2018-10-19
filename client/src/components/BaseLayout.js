import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'material-ui/Card';

const BaseLayout = ({ secretData, user }) => (
  <Card className="container">
    <CardTitle
      title="BaseLayout"
      subtitle="This render works"
    />
  {secretData && <CardText style={{ fontSize: '16px', color: 'green' }}>You did it <strong>{user.name}</strong>!<br />{secretData}</CardText>}
  </Card>
);

BaseLayout.propTypes = {
  secretData: PropTypes.string.isRequired
};

export default BaseLayout;