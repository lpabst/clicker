update clickerAnalytics
set loginpagehits = $1,
homepagehits = $2,
gamestarts = $3,
thousandcompletes = $4,
tenthcompletes = $5,
hundredthcompletes = $6,
millioncompletes = $7,
billioncompletes = $8,
gameovercompletes = $9
where id = 1