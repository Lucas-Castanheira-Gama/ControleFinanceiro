from fastapi import APIRouter, Depends, HTTPException
from prisma import Prisma
from prisma_connection import get_prisma
from fastapi.security import OAuth2PasswordBearer
import jwt
import os
from dotenv import load_dotenv

router = APIRouter()
prisma = Prisma()
load_dotenv()
JWT_SECRET = os.getenv("JWT_SECRET")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = 30
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def verify_token(token: str):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[ALGORITHM])
        return payload  # Retorna os dados do token (como o ID do usuário)
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expirado")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Token inválido")



@router.get('/')
async def mostrar_users(token: str = Depends(oauth2_scheme), prisma: Prisma = Depends(get_prisma)):
    # Verifica o token usando a função que você criou
    payload = verify_token(token)

    # Agora você pode acessar os dados do token, como o ID do usuário
    user_id = payload.get("sub")

    users = await prisma.user.find_many()

    if users:
        return users
    else:
        return {"message": "sem usuarios"}
