delete from tenThLeaders
where score > (
    select score from tenThLeaders
    order by score asc
    limit 1
    offset $1
)