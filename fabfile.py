from fabric.api import local, abort, run, lcd, cd, settings, sudo, env

env.hosts = [
    'sparkpl.ug',

    ]
def deploy():
    with cd("/var/www/prod/ntds_dash/"):
        sudo('git pull origin master', user='www-data')
        sudo('/opt/venvs/ntds_dash/bin/python manage.py migrate', user='www-data')
        sudo('supervisorctl restart  lvmart')