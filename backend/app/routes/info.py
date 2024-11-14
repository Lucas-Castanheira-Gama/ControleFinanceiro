from fastapi import APIRouter
from prisma import Prisma
from fastapi import APIRouter, Depends, HTTPException, Request, status
import jwt
from dotenv import load_dotenv
import os
from prisma_connection import get_prisma
import logging
from pydantic import BaseModel

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()
prisma = Prisma()
load_dotenv()

JWT_SECRET = os.getenv("JWT_SECRET")
ALGORITHM = os.getenv("ALGORITHM")


def get_current_user(request: Request):
    auth_header = request.headers.get('Authorization')
    
    if auth_header is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token de autenticacao ausente",
            headers={'WWW-Authenticate': 'Bearer'},  
        )
    print('opa1')
    token = auth_header.split(' ')[1]
    
    try:
        payload = jwt.decode(token,JWT_SECRET,ALGORITHM)
        user_id = payload.get("sub")
        
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token invalido"
            )
            
        print('opaaaaa')
        
        return user_id
     
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token expirado",
        )
    
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token invalido",
        )
        
           

@router.get('/')
async def mostrar_dash(user_id: str = Depends(get_current_user), prisma: Prisma = Depends(get_prisma)):
    user = await prisma.user.find_unique(
        where={
            "id": user_id
        }
    )

    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    return {
        "user": user

    }
    
class SalvarData(BaseModel):
    name: str
    date: str
    telefone: str

@router.post('/salvar')
async def salvar_dados(data: SalvarData,user_id: str = Depends(get_current_user), prisma: Prisma = Depends(get_prisma)):
    user = await prisma.user.update(
        where={
            "id": user_id
        },
        data={
            'name': data.name,
            'date': data.date,
            'telefone': data.telefone
        }
    )
    if not user:
        raise HTTPException(status_code=401, detail="Erro com o usuario")

    return {"message": "Atualizado com sucesso", "user": user}
    