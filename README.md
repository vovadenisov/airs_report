# airs_report

#скопировать docker-compose.yml файл
#создать папку conf (дефолтный конфиг в папке deploy) на уровень выше docker-compose.yml файла

в конфиге указать:
STATIC_ROOT: /test_air/src/static
SECRET_KEY: <Любая не пустая строка>
ALLOWED_HOSTS: <имя хоста по которому будет запрашиваться сайт>


## запустить docker-compose
```bash
docker-compose up -d
```

# выполнить миграции
```bash
docker-compose exec airs-gunicorn python manage.py migrate
```

проект доступен на 8000 порту
