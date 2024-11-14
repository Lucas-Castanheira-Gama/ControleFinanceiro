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
        },
        include={
            "documents": True
        }
    )

    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    return {
        "user": user.name,
        "documents": user.documents  # Retorna os documentos associados ao usuário
    }
    

class add_gasto_data(BaseModel):
    valor : str
    descricao : str
    tipo : str
    desre : str


@router.post('/addDespesa')
async def adicionando_despesa (data: add_gasto_data, user_id: str = Depends(get_current_user), prisma: Prisma = Depends(get_prisma)):
    new_document = await prisma.document.create(
        data={
            "valor": data.valor,
            "descricao": data.descricao,
            "tipo": data.tipo,
            "desre": data.desre,
            "userId": user_id,
            
        }
    )
    return{
        "message": "Despesa adcionada com sucesso",
        "documento": new_document
    }
    

class add_receita_data(BaseModel):
    valor : str
    descricao : str
    tipo : str
    desre : str

@router.post('/addReceita')
async def adicionando_receita (data: add_receita_data, user_id: str = Depends(get_current_user), prisma: Prisma = Depends(get_prisma)):
    new_document = await prisma.document.create(
        data={
            "valor": data.valor,
            "descricao": data.descricao,
            "tipo": data.tipo,
            "desre": data.desre,
            "userId": user_id,
            
        }
    )
    return{
        "message": "Receita adcionada com sucesso",
        "documento": new_document
    }
    

        
    
    