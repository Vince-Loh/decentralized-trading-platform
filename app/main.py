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
web3 = Web3(Web3.HTTPProvider("http://127.0.0.1:7545"))
connected = False
try:
    if web3.eth.accounts:
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
    price: int
    purchased_by: str
    purchase_email: str
    purchase_date: str = datetime.now().strftime('%Y-%m-%d')

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
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        query = "SELECT * FROM purchase_data"
        cursor.execute(query)
        result = cursor.fetchall()

        purchases = []
        for row in result:
            purchase = {
                "ISBN": row[0],
                "Price": row[1],
                "Purchased_By": row[2],
                "Purchase_Date": row[3]
            }
            purchases.append(purchase)

        cursor.close()
        connection.close()

        return purchases

    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}


@app.post("/purchase")
async def purchase_item(purchase_data: PurchaseRequest):
    try:

        # Configure your Ethereum node
        chain_id = 1337 
        my_address = '0xA2B690363847F3B0d9D85e41af6E59c76c30e1fC'  # Replace with your address
        private_key = '0x82052e7430821598b4919f85fa76d3a8a92520b4dab54b80bce0a85c1eb02b1a'  # Replace with your private key
        contract_address = '0x6D6bd3f942f1bAFde1840D7f17bdAa3A87573649'

        with open("../dtp_truffle_project/contracts/BookStore.sol", "r") as file:
            bookstore_file = file.read()

            install_solc("0.6.0")
            compiled_sol = compile_standard(
                {
                    "language" : "Solidity", 
                    "sources" : {"BookStore.sol": {"content" : bookstore_file}}, 
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

        abi = compiled_sol["contracts"]["BookStore.sol"]["PurchaseBook"]["abi"]
        bytecode = compiled_sol["contracts"]["BookStore.sol"]["PurchaseBook"]["evm"]["bytecode"]["object"]

        BookStore = web3.eth.contract(abi=abi, bytecode=bytecode)


        # Calculate nonce
        nonce = web3.eth.get_transaction_count(my_address)

        # Deploy the contract
        deploy_txn = BookStore.constructor().build_transaction(
            {
                "chainId": chain_id,
                "gasPrice": web3.eth.gas_price,
                "from": my_address,
                "nonce": nonce,
                ### "value" : purchase_data.price * 10**18,
            }
        )
        deploy_txn.pop('to')

        signed_deploy_txn = web3.eth.account.sign_transaction(deploy_txn, private_key=private_key)
        deploy_tx_hash = web3.eth.send_raw_transaction(signed_deploy_txn.rawTransaction)
        deploy_tx_receipt = web3.eth.wait_for_transaction_receipt(deploy_tx_hash)

        # Create a contract instance for the deployed contract
        book_store = web3.eth.contract(address=deploy_tx_receipt.contractAddress, abi=abi)

        # Perform the purchase
        purchase_txn = book_store.functions.purchaseItem(
            purchase_data.isbn,
            purchase_data.price,
            purchase_data.purchased_by,
            purchase_data.purchase_email,
            purchase_data.purchase_date,
        ).build_transaction(
            {
                "chainId": chain_id,
                "gasPrice": web3.eth.gas_price,
                "from": my_address,
                "nonce": nonce + 1,
            }
        )

        signed_purchase_txn = web3.eth.account.sign_transaction(purchase_txn, private_key=private_key)
        purchase_tx_hash = web3.eth.send_raw_transaction(signed_purchase_txn.rawTransaction)
        purchase_tx_receipt = web3.eth.wait_for_transaction_receipt(purchase_tx_hash)

        return {"message": f"Purchase successful: {purchase_tx_receipt}"}

    except Exception as err:
        # Handle errors, e.g., return an appropriate error response
        print(f"Error: {err}")
        return HTTPException(status_code=500, detail=f"Error: {err}")


"""@app.post("/purchase")
async def purchase_item(purchase_data: PurchaseRequest):
    print("purchase triggered - " + str(purchase_data))
    try:
        
        chain_id = 1337
        my_address = '0xA2B690363847F3B0d9D85e41af6E59c76c30e1fC'
        private_key = '0x82052e7430821598b4919f85fa76d3a8a92520b4dab54b80bce0a85c1eb02b1a'

        with open("../dtp_truffle_project/contracts/BookStore.sol", "r") as file:
            bookstore_file = file.read()

        install_solc("0.6.0")
        compiled_sol = compile_standard(
            {
                "language" : "Solidity", 
                "sources" : {"BookStore.sol": {"content" : bookstore_file}}, 
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

        #get bytecode
        bytecode = compiled_sol["contracts"]["BookStore.sol"]["BookStore"]["evm"]["bytecode"]["object"]

        #get abi
        abi = compiled_sol["contracts"]["BookStore.sol"]["BookStore"]["abi"]

        BookStore = w3.eth.contract(abi=abi, bytecode=bytecode)

        nonce = w3.eth.get_transaction_count(my_address)

        transaction = BookStore.constructor().build_transaction(
            {
                "chainId" : chain_id,
                "gasPrice" : w3.eth.gas_price,
                "from" : my_address,
                "nonce" : nonce,
            }
        )
        transaction.pop('to')

        signed_txn = w3.eth.account.sign_transaction(transaction, private_key=private_key)
        tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
        tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

        book_store = w3.eth.contract(address=tx_receipt.contractAddress, abi=abi)

        store_transaction = book_store.functions.store(67).build_transaction(
            {
                "chainId": chain_id,
                "gasPrice": w3.eth.gas_price,
                "from": my_address,
                "nonce": nonce + 1
            }
        )

        signed_store_txn = w3.eth.account.sign_transaction(store_transaction, private_key = private_key)
        send_store_tx = w3.eth.send_raw_transaction(signed_store_txn.rawTransaction)
        tx_receipt = w3.eth.wait_for_transaction_receipt(send_store_tx)

        return {"message": ("Purchase successful: ", purchase_data)}

    except Exception as err:
        # Handle errors, e.g., return an appropriate error response
        print(f"Error: {err}")
        return HTTPException(status_code=500, detail=f"Error: {err}")
    try:

        # Insert into purchase_data table
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        query = "INSERT INTO purchase_data (ISBN, Price, Purchased_By, Purchase_Date) VALUES (%s, %s, %s, %s)"
        values = (purchase_data.isbn, purchase_data.price, purchase_data.purchased_by, purchase_data.purchase_date)
        cursor.execute(query, values)
        connection.commit()

        # Delete from assets table
        delete_query = "DELETE FROM books_sale WHERE ISBN = %s"
        delete_values = (purchase_data.isbn,)
        cursor.execute(delete_query, delete_values)
        connection.commit()

        # Process smart contract
        # contract.processPurchase(purchase_data.isbn, purchase_data.price)

        # Simulate a successful purchase for now
        return {"message": ("Purchase successful: ", purchase_data)}

    except Exception as err:
        # Handle errors, e.g., return an appropriate error response
        return HTTPException(status_code=500, detail=f"Error: {err}")
    """