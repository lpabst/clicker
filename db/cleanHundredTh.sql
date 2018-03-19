delete from hundredThleaders
where score > (
    select score from hundredThLeaders
    order by score asc
    limit 1
    offset $1
)