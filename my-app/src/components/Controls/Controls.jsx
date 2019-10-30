import React from 'react';
import PropTypes from 'prop-types';
import styles from './Controls.module.css';

const Controls = ({ handleClick, currentPage }) => (
  <section className={styles.controls}>
    <button
      name="prev"
      value="previous"
      type="button"
      className={styles.button}
      onClick={handleClick}
      disabled={!currentPage}
    >
      To Back
    </button>
    <button
      name="next"
      value="next"
      type="button"
      className={styles.button}
      onClick={handleClick}
      disabled={currentPage === 11}
    >
      To Next
    </button>
  </section>
);

Controls.propTypes = {
  handleClick: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Controls;
