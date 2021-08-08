import PropTypes from 'prop-types';
import { useEffect, useState, useContext } from 'react';
import { StoreContext } from '../Store';

const Button = () => {
  const [globalState, dispatch] = useContext(StoreContext);
  console.log(`globalState in Button.js is: ${JSON.stringify(globalState)}`);
  const { showAddTask } = globalState;
  const [buttonColor, setButtonColor] = useState('green');
  const [buttonText, setButtonText] = useState('Add');

  const handleColorAndText = (event) => {
    event.preventDefault();
    if (!showAddTask) {
      setButtonColor('red');
      setButtonText('Close');
      dispatch({
        type: 'SHOW_ADD_TASK',
        showAddTask,
      });
    } else {
      setButtonColor('green');
      setButtonText('Add');
      dispatch({
        showAddTask,
        type: 'SHOW_ADD_TASK',
      });
    }
  };

  return (
    <button
      onClick={handleColorAndText}
      style={{ backgroundColor: buttonColor }}
      className="btn"
    >
      {buttonText}
    </button>
  );
};

Button.defaultProps = {
  color: 'steelblue',
};

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
