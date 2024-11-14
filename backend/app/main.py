from fastapi import FastAPI, Depends, HTTPException
from prisma import Prisma
from fastapi.middleware.cors import CORSMiddleware
from routes.login import router as login_router
from routes.cadastro import router as cadastro_router
from routes.dash import router as dash_router
from routes.info import router as info_router
from middlewares.jwt_auth_middleware import JWTAuthMiddleware


app = FastAPI()
prisma = Prisma()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials= True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event('startup')
async def startup():
    await prisma.connect()
    
@app.on_event('shutdown')
async def shutdown():
    await prisma.disconnect()
    

app.include_router(login_router, prefix="/login", tags=["login"])
app.include_router(cadastro_router, prefix="/cadastro", tags=["cadastro"])
app.include_router(dash_router, prefix="/dash", tags=["dash"])
app.include_router(info_router, prefix='/info', tags=['info'])
    


    





