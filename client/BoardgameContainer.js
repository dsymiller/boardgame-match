import React, { Component } from 'react';
import MatchSearch from './MatchSearch';
import BoardgameTable from './BoardgameTable';

class BoardgameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      boardgames: [],
      picks: new Set(),
      matches: [
        {
          username: '',
          pick_count: '',
          fave_matches: '',
        },
        {
          username: '',
          pick_count: '',
          fave_matches: '',
        },
        {
          username: '',
          pick_count: '',
          fave_matches: '',
        },
      ],
    };
  }

  async componentDidMount() {
    try {
      const result = await fetch(`/api/boardgames/${this.props.user}`);
      const data = await result.json();
      const { favorites, boardgames } = data;
      this.setState({
        favorites,
        boardgames,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async addFavorite(userid, gameid) {
    try {
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
    } catch (err) {
      console.log(err);
    }
  }

  async deleteFavorite(userid, gameid) {
    try {
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
    } catch (err) {
      console.log(err);
    }
  }
  handleFavorite(gameid, isFavorite) {
    const userid = this.props.user;
    if (isFavorite) return this.deleteFavorite(userid, gameid);
    return this.addFavorite(userid, gameid);
  }
  updatePicks(e) {
    const gameid = e.target.getAttribute('gameid');
    const isChecked = e.target.checked;
    const newPicks = new Set(this.state.picks);
    if (isChecked) newPicks.add(gameid);
    else newPicks.delete(gameid);
    this.setState({
      picks: newPicks,
    });
  }
  async handleSearch() {
    try {
      const userid = this.props.user;
      const picks = Array.from(this.state.picks);
      let gameid1 = picks[0] ? picks[0] : 0;
      let gameid2 = picks[1] ? picks[1] : 0;
      let gameid3 = picks[2] ? picks[2] : 0;
      const result = await fetch(
        `/api/boardgames/matches/${userid}/${gameid1}/${gameid2}/${gameid3}`
      );
      const data = await result.json();
      const { matches } = data;
      this.setState({ matches });
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    return (
      <div id="boardgame-container">
        <MatchSearch
          matches={this.state.matches}
          handleSearch={() => this.handleSearch()}
          picks={this.state.picks}
          username={this.props.username}
        />
        <BoardgameTable
          boardgames={this.state.boardgames}
          favorites={this.state.favorites}
          handleFavorite={(gameid, isFavorite) =>
            this.handleFavorite(gameid, isFavorite)
          }
          updatePicks={(e) => this.updatePicks(e)}
        />
      </div>
    );
  }
}

export default BoardgameContainer;
