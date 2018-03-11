select * from clickerUsers
where username ilike $1
and password = $2