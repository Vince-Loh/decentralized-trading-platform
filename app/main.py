from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from web3 import Web3
from datetime import datetime
from solcx import compile_standard, install_solc
import json

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

# Blockchain Config ---
chain_id = 1337 
contract_address = '0x05Dff9C22035c92c3E986dE39Fbe67d7Fc52450f'

with open("../dtp_truffle_project/contracts/PurchaseBook.sol", "r") as file:
    bookstore_file = file.read()

    install_solc("0.6.0")
    compiled_sol = compile_standard(
        {
            "language" : "Solidity", 
            "sources" : {"PurchaseBook.sol": {"content" : bookstore_file}}, 
            "settings" : {
                "outputSelection" : {
                    "*" : { "*" : ["abi", "metadata", "evm.bytecode", "evm.sourceMap"]}
                }
            },
        },
        solc_version = "0.6.0"
    )

with open("compiled_code.json", "w") as file:
            json.dump(compiled_sol, file)

abi = compiled_sol["contracts"]["PurchaseBook.sol"]["PurchaseBook"]["abi"]
#bytecode = compiled_sol["contracts"]["PurchaseBook.sol"]["PurchaseBook"]["evm"]["bytecode"]["object"]

BookContract = w3.eth.contract(address=contract_address, abi=abi)
# ------------------ #

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


class PurchaseRequest(BaseModel):
    isbn: str
    price: int
    purchased_by: str
    purchase_email: str
    purchase_date: str = datetime.now().strftime('%Y-%m-%d')
    customer_wallet: str

# for section 3

@app.get("/getBooksForSale/")
async def get_books():
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        query = "SELECT * FROM books_sale"
        cursor.execute(query)
        result = cursor.fetchall()

        books = []
        for row in result:
            book = {
                "ISBN": row[0],
                "Price": row[1],
            }
            books.append(book)

        cursor.close()
        connection.close()

        return books

    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}
    
@app.get("/getBookInfo/{book_isbn}")
async def get_book_info(book_isbn : str):
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        query = "SELECT * FROM books WHERE ISBN = %s"
        values = [book_isbn, ]
        cursor.execute(query, values)

        result = cursor.fetchone()
        print("DEBUG BELOW)")
        print(book_isbn)
        print(result)
        
        book = {
            "ISBN": result[0],
            "Book_Title": result[1],
            "Book_Author": result[2],
            "Book_Category": result[3],
            "Cover_URL": result[4],
        }

        cursor.close()
        connection.close()

        return book

    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}



@app.get("/getPurchases/")
async def get_purchases():
    try:
        result = await get_blockchain_purchases()
        print(result)
        purchases = []
        for row in result:
            purchase = {
                "ISBN": row["ISBN"],
                "Price": row["price"],
                "Purchased_By": row["purchasedBy"],
                "Purchase_Email": row["purchaseEmail"],
                "Purchase_Date": row["purchaseDate"]
            }
            purchases.append(purchase)
        return purchases

    except Exception as err:
        # Handle errors, e.g., return an appropriate error response
        print(f"Error: {err}")
        return HTTPException(status_code=500, detail=f"Error: {err}")


@app.post("/purchase")
async def purchase_item(purchase_data: PurchaseRequest):
    try:

        customer_wallet = '0xA2B690363847F3B0d9D85e41af6E59c76c30e1fC'  # Replace with your address
        private_key = '0x82052e7430821598b4919f85fa76d3a8a92520b4dab54b80bce0a85c1eb02b1a'  # Replace with your private key
        # Calculate nonce
        nonce = w3.eth.get_transaction_count(customer_wallet)
        price_wei = int(purchase_data.price * 10**18)

    
        # Perform the purchase
        purchase_txn = BookContract.functions.purchaseItem(
            purchase_data.isbn,
            purchase_data.price,
            purchase_data.purchased_by,
            purchase_data.purchase_email,
            purchase_data.purchase_date,
        ).build_transaction(
            {
                "chainId": chain_id,
                "gasPrice": w3.eth.gas_price,
                "from": customer_wallet,
                "nonce": nonce,
                "value": price_wei
            }
        )

        signed_purchase_txn = w3.eth.account.sign_transaction(purchase_txn, private_key=private_key)
        purchase_tx_hash = w3.eth.send_raw_transaction(signed_purchase_txn.rawTransaction)
        purchase_tx_receipt = w3.eth.wait_for_transaction_receipt(purchase_tx_hash)

        """
        # Insert into purchase_data table
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        query = "INSERT INTO purchase_data (ISBN, Price, Purchased_By, Purchase_Date) VALUES (%s, %s, %s, %s)"
        values = (purchase_data.isbn, purchase_data.price, purchase_data.purchased_by, purchase_data.purchase_date)
        cursor.execute(query, values)
        connection.commit()
        """
        """
        # Delete from assets table
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        delete_query = "DELETE FROM books_sale WHERE ISBN = %s"
        delete_values = (purchase_data.isbn,)
        cursor.execute(delete_query, delete_values)
        connection.commit()
        cursor.close()
        connection.close()
        """
        

        return {"message": f"Purchase successful: {purchase_tx_receipt}"}

    except Exception as err:
        # Handle errors, e.g., return an appropriate error response
        print(f"Error: {err}")
        return HTTPException(status_code=500, detail=f"Error: {err}")


async def get_blockchain_purchases():
    try:
        purchase_count = BookContract.functions.getTotalPurchaseCount().call()

        purchases = []
        for i in range(1, purchase_count + 1):
            purchase_data = BookContract.functions.getPurchase(i).call()
            purchases.append({
                "ISBN": purchase_data[0],
                "price": purchase_data[1],
                "purchasedBy": purchase_data[2],
                "purchaseEmail": purchase_data[3],
                "purchaseDate": purchase_data[4]
            })
        return purchases
    except Exception as err:
        # Handle errors, e.g., return an appropriate error response
        print(f"Error: {err}")
        return HTTPException(status_code=500, detail=f"Error: {err}")