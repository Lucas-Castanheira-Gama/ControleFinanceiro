# middlewares/jwt_auth_middleware.py
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request, HTTPException
from typing import Callable
import jwt
import os
from dotenv import load_dotenv

load_dotenv()
JWT_SECRET = os.getenv("JWT_SECRET")
ALGORITHM = os.getenv("ALGORITHM")

class JWTAuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next: Callable):
        # Verifica se a rota é pública, como login e cadastro
        if request.url.path in ["/login", "/cadastro"]:
            response = await call_next(request)
            return response

        # Pega o token do cabeçalho da requisição
        token = request.headers.get("Authorization")
        if not token:
            raise HTTPException(status_code=401, detail="Token de autenticação ausente")

        try:
            # Remove o prefixo "Bearer " do token, se presente
            token = token.replace("Bearer ", "")
            # Decodifica o token JWT
            payload = jwt.decode(token, JWT_SECRET, algorithms=[ALGORITHM])
            request.state.user = payload  # Armazena o payload do token no estado da requisição
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Token expirado")
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=401, detail="Token inválido")

        # Chama a próxima função na cadeia de execução
        response = await call_next(request)
        return response
