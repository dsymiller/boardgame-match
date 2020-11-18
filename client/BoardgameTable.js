import React from 'react';
import BoardgameRow from './BoardgameRow';

function BoardgameTable(props) {
  const { boardgames, favorites, handleFavorite, updatePicks } = props;
  const rows = boardgames.map((game) => {
    const isFavorite = favorites.includes(game._id);
    return (
      <BoardgameRow
        game={game}
        isFavorite={isFavorite}
        gameid={game._id}
        key={game._id}
        handleFavorite={(gameid, isFavorite) =>
          handleFavorite(gameid, isFavorite)
        }
        updatePicks={(e) => updatePicks(e)}
      />
    );
  });

  return (
    <div id="boardgame-table">
      <table>
        <thead>
          <tr>
            <th>PICK</th>
            <th>FAV</th>
            <th>THUMB</th>
            <th>TITLE</th>
            <th>PLAYERS</th>
            <th>PLAYTIME</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

export default BoardgameTable;
