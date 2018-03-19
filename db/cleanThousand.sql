delete from thousandleaders
where score > (
    select score from thousandLeaders
    order by score asc
    limit 1
    offset $1
)