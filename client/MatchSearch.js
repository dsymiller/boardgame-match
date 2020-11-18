import React from 'react';

function MatchSearch(props) {
  const { username, picks, matches, handleSearch } = props;
  let error = '';
  if (picks.size > 3) error = 'You may not pick more than 3 games';
  return (
    <div className="match-search">
      <header>
        <h3>
          <span className="username">{username}</span>, pick up to 3 games to
          find matches for:
        </h3>
        <button
          onClick={() => handleSearch()}
          disabled={picks.size < 1 || picks.size > 3}
        >
          Match
        </button>
      </header>
      <div id="matches">
        <label htmlFor="match1">
          Match 1:
          <span className="username" id="match1">
            {matches[0].username}
          </span>
          <p>
            picks:{' '}
            <span className="match-results">{matches[0].pick_count}</span>
          </p>
          <p>
            faves:{' '}
            <span className="match-results">{matches[0].fave_matches}</span>
          </p>
        </label>
        <label htmlFor="match2">
          Match 2:
          <span className="username" id="match2">
            {matches[1].username}
          </span>
          <p>
            picks:{' '}
            <span className="match-results">{matches[1].pick_count}</span>
          </p>
          <p>
            faves:{' '}
            <span className="match-results">{matches[1].fave_matches}</span>
          </p>
        </label>
        <label htmlFor="match3">
          Match 3:
          <span className="username" id="match3">
            {matches[2].username}
          </span>
          <p>
            picks:{' '}
            <span className="match-results">{matches[2].pick_count}</span>
          </p>
          <p>
            faves:{' '}
            <span className="match-results">{matches[2].fave_matches}</span>
          </p>
        </label>
      </div>
      <p className="error">{error}</p>
    </div>
  );
}

export default MatchSearch;
