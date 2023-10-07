from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from web3 import Web3

import mysql.connector
app = FastAPI()

# Connect to Ganache
w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:7545"))
connected = False
try:
    if w3.eth.accounts:
        connected = True
except:
    pass

assert connected, "Failed to connect to the blockchain"


origins = ["*"]

db_config = {
    "host": "localhost",
    "user": "root",
    "password": "abc12345",
    "database": "website_data"
}

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Item(BaseModel):
    name: str
    description: str = None
    price: float
    tax: float = None

class PurchaseRequest(BaseModel):
    isbn: str
    price: float

# for section 3


@app.get("/")
async def funcTest1():
    return "Hello, this is fastAPI data"



@app.get("/jsonData")
async def funcTest():
    jsonResult = {
        "name": "Kyle",
        "Uni-year": 2,
        "isStudent": True,
        "hobbies": ["reading", "swimming"]
    }
    return jsonResult


@app.get("/student/{student_id}")
async def getStudentId(student_id: int):
    return {"student_id": student_id}


@app.post("/items/", response_model=Item)
def create_item(item: Item):
    return item



@app.get("/getBooks/")
def get_books():
    try:
        # Establish a database connection
        connection = mysql.connector.connect(**db_config)

        # Create a cursor to execute SQL queries
        cursor = connection.cursor()

        # Define the SQL query to retrieve data (e.g., all books)
        query = "SELECT * FROM books"

        # Execute the SQL query
        cursor.execute(query)

        # Fetch all the rows
        result = cursor.fetchall()

        # Convert the result to a list of dictionaries
        books = []
        for row in result:
            book = {
                "ISBN": row[0],
                "Book_Title": row[1],
                "Book_Author": row[2],
                "Book_Category": row[3],
                "Cover_URL": row[4],
                "Price": row[5],
            }
            books.append(book)


        # Close the cursor and the database connection
        cursor.close()
        connection.close()

        return books

    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}
    


@app.post("/purchase")
async def purchase_item(purchase_data: PurchaseRequest):
    try:
        # Insert into purchase_data table
        # query = "INSERT INTO purchase_data (ISBN, Price) VALUES (%s, %s)"
        # values = (purchase_data.isbn, purchase_data.price)

        # Delete from assets table
        # delete_query = "DELETE FROM available_assets WHERE ISBN = %s"
        # delete_values = (purchase_data.isbn,)

        # Process smart contract
        # contract.processPurchase(purchase_data.isbn, purchase_data.price)

        # Simulate a successful purchase for now
        return {"message": ("Purchase successful: ", purchase_data)}

    except Exception as err:
        # Handle errors, e.g., return an appropriate error response
        return HTTPException(status_code=500, detail=f"Error: {err}")