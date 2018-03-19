delete from gameOverLeaders
where score > (
    select score from gameOverLeaders
    order by score asc
    limit 1
    offset $1
)