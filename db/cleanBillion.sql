delete from billionLeaders
where score > (
    select score from billionLeaders
    order by score asc
    limit 1
    offset $1
)