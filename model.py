from database import Base
from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy import Integer,Column,String

class Book(Base):
    __tablename__ = "books"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    author = Column(String) 
    description = Column(String)
    year = Column(Integer)
