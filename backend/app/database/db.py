# backend/src/database/db.py

import psycopg2
from psycopg2.extras import RealDictCursor
import os
from dotenv import load_dotenv

load_dotenv()

# Support both Render (DATABASE_URL) and Neon (NEON_DB_URL)
DATABASE_URL = os.getenv("DATABASE_URL") or os.getenv("NEON_DB_URL")

def get_db_connection():
    """Get database connection"""
    print(f"Attempting to connect to database at: {DATABASE_URL}")
    try:
        if not DATABASE_URL:
            print("ERROR: DATABASE_URL environment variable is not set.")
            raise ValueError("DATABASE_URL is not set")
        conn = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)
        print("Database connection successful!")
        return conn
    except psycopg2.OperationalError as e:
        print(f"FATAL: Database connection failed: {e}")
        # This type of error is often due to wrong credentials, host, or network issues.
        raise
    except Exception as e:
        print(f"An unexpected error occurred during database connection: {e}")
        raise

def init_db():
    """Initialize database with users table"""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Create users table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            user_id UUID PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            name VARCHAR(255) NOT NULL,
            hashed_password VARCHAR(255) NOT NULL,
            level VARCHAR(50),
            languages TEXT[],
            ai_experience VARCHAR(50),
            hardware_knowledge VARCHAR(50),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    conn.commit()
    cursor.close()
    conn.close()
    print("Database initialized successfully!")