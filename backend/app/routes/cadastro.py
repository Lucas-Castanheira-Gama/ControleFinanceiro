from fastapi import FastAPI, Depends, HTTPException, APIRouter
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from prisma import Prisma
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import jwt
import datetime
import os
from dotenv import load_dotenv
from datetime import datetime,timedelta
from typing import Optional
from prisma_connection import get_prisma


router = APIRouter()
prisma = Prisma()


class CadastroData(BaseModel):
    email: str
    name: str
    password: str
    

@router.post('/')
async def cadastrar(data: CadastroData, prisma: Prisma = Depends(get_prisma)):
    
    user = await prisma.user.create(
        data={
            "email": data.email,
            "password": data.password,
            "name": data.name,
        }
    )
    
    if not user:
        raise HTTPException(status_code=401, detail="Credenciais inválidas")

    return {"message": "Cadastro bem-sucedido", "user": user.name}
    