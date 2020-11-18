import React from 'react';

function BoardgameRow(props) {
  const { game, isFavorite, gameid, handleFavorite } = props;
  let icon = (
    <svg
      onClick={() => handleFavorite(gameid, isFavorite)}
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="24"
      height="24"
      viewBox="0 0 48 48"
      style={{
        fill: isFavorite ? 'darkblue' : 'none',
        stroke: 'darkblue',
        strokeWidth: '3px',
      }}
    >
      <path d="M 24.009766 5 A 1.50015 1.50015 0 0 0 22.658203 5.8300781 L 17.505859 16.134766 L 5.2714844 18.017578 A 1.50015 1.50015 0 0 0 4.4394531 20.560547 L 12.902344 29.023438 L 11.017578 41.271484 A 1.50015 1.50015 0 0 0 13.193359 42.830078 L 24 37.191406 L 34.806641 42.830078 A 1.50015 1.50015 0 0 0 36.982422 41.271484 L 35.097656 29.023438 L 43.560547 20.560547 A 1.50015 1.50015 0 0 0 42.728516 18.017578 L 30.494141 16.134766 L 25.341797 5.8300781 A 1.50015 1.50015 0 0 0 24.009766 5 z"></path>
    </svg>
  );

  return (
    <tr className="boardgame-row">
      <td>
        <input type="checkbox" />
      </td>
      <td>{icon}</td>
      <td>
        <img src={game.thumbnail} alt={`${game.title} boxart`} />
      </td>
      <td>{game.title}</td>
      <td>
        {game.min_players === game.max_players
          ? `${game.min_players} players`
          : `${game.min_players} to ${game.max_players} players`}
      </td>
      <td>
        {game.min_playtime === game.max_playtime
          ? `${game.min_playtime} minutes`
          : `${game.min_playtime} to ${game.max_playtime} minutes`}
      </td>
    </tr>
  );
}

export default BoardgameRow;
