import React, { Component } from 'react';
import MatchSearch from './MatchSearch';
import BoardgameTable from './BoardgameTable';

class BoardgameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      boardgames: [],
    };
  }
  async componentDidMount() {
    const result = await fetch(`/api/boardgames/${this.props.user}`);
    const data = await result.json();
    const { favorites, boardgames } = data;
    this.setState({
      favorites,
      boardgames,
    });
  }

  async addFavorite(userid, gameid) {
    const result = await fetch(
      `/api/boardgames/favorites/${userid}/${gameid}`,
      {
        method: 'PUT',
      }
    );
    const data = await result.json();
    const { favorites } = data;
    this.setState({
      favorites,
    });
  }

  async deleteFavorite(userid, gameid) {
    const result = await fetch(
      `/api/boardgames/favorites/${userid}/${gameid}`,
      {
        method: 'DELETE',
      }
    );
    const data = await result.json();
    const { favorites } = data;
    this.setState({
      favorites,
    });
  }
  handleFavorite(gameid, isFavorite) {
    const userid = this.props.user;
    if (isFavorite) return this.deleteFavorite(userid, gameid);
    return this.addFavorite(userid, gameid);
  }

  render() {
    return (
      <div id="boardgame-container">
        <MatchSearch />
        <BoardgameTable
          boardgames={this.state.boardgames}
          favorites={this.state.favorites}
          handleFavorite={(gameid, isFavorite) =>
            this.handleFavorite(gameid, isFavorite)
          }
        />
      </div>
    );
  }
}

export default BoardgameContainer;
