delete from millionLeaders
where score > (
    select score from millionLeaders
    order by score asc
    limit 1
    offset $1
)