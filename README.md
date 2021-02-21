# Izya Bar Api

Docker Run (Linux):
```
docker run -p 80:3000 -v ~/db.json:/usr/src/app/database.json izya-bar-backend
```

Docker Run (Windows):
```
docker run -p 80:3000 -v D:\db.json:/usr/src/app/database.json izya-bar-backend
```

How to build an image:
```
docker build -t izya-bar-backend .
```