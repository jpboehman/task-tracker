import PropTypes from 'prop-types';
import Button from './Button';

// De-structure the props object coming in!
const Header = ({ title, onAdd, showAdd }) => {
  return (
    // React functions - in return statement they return JSX
    <header className="header">
      <h1>{title}</h1>
      <Button
        color={showAdd ? 'red' : 'green'}
        text={showAdd ? 'Close' : 'Add'}
        onClick={onAdd}
      />
    </header>
  );
};

// Good practice to set default values -> Mention default values for components in the interview
Header.defaultProps = {
  title: 'Task Tracker',
};

// Setting propTypes helps make our code more robust
Header.propTypes = {
  title: PropTypes.string.isRequired,
};


export default Header;
