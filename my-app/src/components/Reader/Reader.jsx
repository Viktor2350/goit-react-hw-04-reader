import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import Controls from '../Controls/Controls';
import Publication from '../Publication/Publication';
import itemsPublication from '../../json/publications.json';
import styles from './Reader.module.css';

const getItemFromProps = props => queryString.parse(props.location.search).item;

export default class Reader extends Component {
  state = {
    items: itemsPublication,
    currentPage: 0,
  };

  componentDidMount() {
    const { location, history } = this.props;
    const item = getItemFromProps(this.props);
    if (!item) {
      return history.push({
        pathname: location.pathname,
        search: `item=1`,
      });
    }
    return this.setState({ currentPage: item - 1 });
  }

  componentDidUpdate(prevProps, prevState) {
    const { location, history } = this.props;
    const item = getItemFromProps(this.props);
    const prevItem = getItemFromProps(prevProps);
    const { items } = this.state;
    if (item !== prevItem && item <= items.length) {
      this.setState({
        currentPage: item - 1,
      });
    } else if (item > items.length) {
      history.push({
        pathname: location.pathname,
        search: `item=1`,
      });
    }
  }

  handleClick = ({ target }) => {
    const { name } = target;
    // const { currentPage } = this.state;
    const { location, history } = this.props;

    const redirect = () => {
      return history.push({
        ...location,
        search: `item=${this.state.currentPage + 1}`,
        pathname: '/reader',
      });
    };

    if (name === 'prev') {
      this.setState(
        state => ({
          currentPage: state.currentPage - 1,
        }),
        redirect,
      );
    } else if (name === 'next') {
      this.setState(
        state => ({
          currentPage: state.currentPage + 1,
        }),
        redirect,
      );
    }
  };

  render() {
    const { currentPage, items } = this.state;
    return (
      <div className={styles.reader}>
        <Publication
          title={items[currentPage].title}
          text={items[currentPage].text}
          id={items[currentPage].id}
        />
        <p className={styles.counter}>{currentPage + 1}/12</p>
        <Controls handleClick={this.handleClick} currentPage={currentPage} />
      </div>
    );
  }
}

Reader.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
