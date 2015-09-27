sudo npm install -g grunt-cli
ulimit -n 2560 


dynamic group by


select id, date(created_at)
from users
where created_at >= now() - interval '30 days'    


chps by branch






select d, count(charts.id)
from generate_series(
  current_date - interval '12 months', 
  current_date, 
  '1 day'
) d
left join charts on charts.created_at <= d and (
  charts.deleted_at is null or
  charts.deleted_at > d
)
group by 1




select date(d) as day, count(sales.id) 
from generate_series(
  current_date - interval '30 day', 
  current_date, 
  '1 day'
) d 
left join sales on date(sales.created_at) = d 
group by day order by day;




location /ws/ {
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_pass http://unix:/path/to/web.socket;
}





uwsgi --virtualenv /path/to/virtualenv --http-socket /path/to/web.socket --gevent 1000 --http-websockets --workers=2 --master --module wsgi_websocket# NTDS_Dashboard
