# backend/app/api/__init__.py
"""
API routers for the Physical AI Book backend.
"""

from . import auth, chat

__all__ = ["auth", "chat"]
