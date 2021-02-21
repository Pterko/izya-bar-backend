# Izya Bar Api

Docker Run (Linux):
```
docker run -p 5555:3000 --name izya-bar-backend -v ~/database:/usr/src/app/database izya-bar-backend
```

Docker Run (Windows):
```
docker run -p 5555:3000 --name izya-bar-backend -v D:\database:/usr/src/app/database izya-bar-backend
```

Service will be available at port 5555

How to build an image:
```
docker build -t izya-bar-backend .
```