#main.py
#import dependency

#import uvicorn

import asyncio
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
import os
from dotenv import load_dotenv
load_dotenv()
from fastapi.middleware.cors import CORSMiddleware

from routes.auth_route import auth
from routes.profile_route import profile
from routes.token_route import token
from routes.matching_route import matching
from routes.general_route import general

app = FastAPI(
    title="Fauconnect API",
    version="0.1.0",
    openapi_url="/fauconnect-api.json",
    description="API for Fauconnect services",
    info=dict(
        description="This is the Fauconnect API documentation. Visit our website for more information.",
        terms_of_service="www.fauconnect.de/terms",
        contact={
            "name": "Firoz",
            "url": "www.frzf7.com",
            "email": "firozfau@gmail.com",
        },
    ),
              )

documents_location = os.environ.get("DOCUMENTS_LOCATION")
app.mount("/"+documents_location, StaticFiles(directory=documents_location), name="documents")
"""
if documents_location:
    app.mount("/" + documents_location, StaticFiles(directory=documents_location), name="documents")
else:
    print("Warning: 'documents_location' is not set. Static files will not be served.")
"""

# Include routes from route.py
app.include_router(token)
app.include_router(auth)
app.include_router(profile)
app.include_router(matching)
app.include_router(general)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins, adjust as needed
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods, adjust as needed
    allow_headers=["*"],  # Allow all headers, adjust as needed
)


# Create an event loop and run it
if __name__ == "__main__":

    """ uvicorn.run(
        'main:app', port=8000, host='mad-fauconnect.aibe.uni-erlangen.de',
        reload=True, reload_dirs=['html_files'],
        ssl_keyfile='/var/www/html/fauconnectapp/ssl/mad-fauconnect.pem',
        ssl_certfile='/var/www/html/fauconnectapp/ssl/mad-fauconnect.key')
    """
    loop = asyncio.get_event_loop()
    loop.run_until_complete(app())
