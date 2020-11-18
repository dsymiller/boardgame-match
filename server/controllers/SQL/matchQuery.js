const matchQuery = `
WITH pick_count AS (
	WITH combined_matches AS (
		WITH matches_game_1 AS (
			SELECT u._id, u.username
			FROM users u
			INNER JOIN users_boardgames ub ON u._id=ub.users_id
			INNER JOIN boardgames b ON b._id=ub.boardgames_id
			WHERE b._id=$2
			AND u._id<>$1
		)
		, matches_game_2 AS (
			SELECT u._id, u.username
			FROM users u
			INNER JOIN users_boardgames ub ON u._id=ub.users_id
			INNER JOIN boardgames b ON b._id=ub.boardgames_id
			WHERE b._id=$3
			AND u._id<>$1
		)
		, matches_game_3 AS (
			SELECT u._id, u.username
			FROM users u
			INNER JOIN users_boardgames ub ON u._id=ub.users_id
			INNER JOIN boardgames b ON b._id=ub.boardgames_id
			WHERE b._id=$4
			AND u._id<>$1
		)
		SELECT *
		FROM matches_game_1
		UNION ALL
		SELECT *
		FROM matches_game_2
		UNION ALL
		SELECT *
		FROM matches_game_3
	)
SELECT username, count(*) AS pick_count
FROM combined_matches
GROUP BY username
)
, match_count AS (
	WITH matched_faves AS (
		WITH users_favorites AS (
		SELECT b._id AS favorites
		FROM users u
		INNER JOIN users_boardgames ub ON u._id=ub.users_id
		INNER JOIN boardgames b ON b._id=ub.boardgames_id
		WHERE u._id = $1
		)
		, unmatched_faves AS(
		SELECT u.username, b._id AS match_faves
		FROM users u
		INNER JOIN users_boardgames ub ON u._id=ub.users_id
		INNER JOIN boardgames b ON b._id=ub.boardgames_id
		WHERE u._id <> $1
		)
	SELECT * FROM
	unmatched_faves
	INNER JOIN users_favorites ON match_faves=favorites
	)
	SELECT username, count(*) AS fave_matches
	FROM matched_faves
	GROUP BY username
)
SELECT pc.username, pick_count, fave_matches FROM
pick_count pc
INNER JOIN match_count mc ON pc.username=mc.username
ORDER BY pick_count DESC , fave_matches DESC
LIMIT 3
`;
module.exports = matchQuery;
