from fastapi import FastAPI, Depends, HTTPException
import model, schemas
from sqlalchemy.orm import Session
from database import engine, get_db
from database import create_table
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
create_table()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],  
    allow_headers=["*"],  
)
model.Base.metadata.create_all(bind=engine)
# main.py
@app.post("/create", response_model=schemas.Book)
def create_book(book: schemas.BookCreate, db: Session = Depends(get_db)):
    
    new_book = model.Book(
        title=book.title,
        author=book.author,
        description=book.description,
        year=book.year
    )
    db.add(new_book)
    db.commit()
    db.refresh(new_book) 
    return new_book 

@app.get("/books", response_model=list[schemas.Book])
def get_books(db: Session = Depends(get_db)):
    books = db.query(model.Book).all() 
    return books 
@app.get("/books/{id}", response_model=schemas.Book)
def get_book(book_id:int,db:Session=Depends(get_db)):
    book=db.query(model.Book).filter(model.Book.id==book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book


@app.put("/book/{book_id}", response_model=schemas.Book)
def update_book(book_id: int, book: schemas.BookCreate, db: Session = Depends(get_db)):
    existing_book = db.query(model.Book).filter(model.Book.id == book_id).first()
    if not existing_book:
        raise HTTPException(status_code=404, detail="Book not found")
    
    # Update the existing book fields
    for key, value in book.dict().items():
        setattr(existing_book, key, value)

    db.commit()
    db.refresh(existing_book)
    return existing_book
@app.delete("/del",response_model=schemas.Book)
def delete_book(book_id:int,db:Session=Depends(get_db)):
    book = db.query(model.Book).filter(model.Book.id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    
    db.delete(book)
    db.commit()
    return book
