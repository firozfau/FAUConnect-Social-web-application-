# json_lib.py
from pydantic import BaseModel, Field
import json

class JsonLib(BaseModel):
    data: dict = Field(default_factory=dict, description="A dictionary containing data.")

    @staticmethod
    def getEncoded(data):
        # Assuming data is a Row or similar object, convert it to a dictionary
        if hasattr(data, "_asdict"):
            data = data._asdict()
        return JsonLib(data=data).json()

    @staticmethod
    def getDecoded(data):
        return json.loads(data)

    @staticmethod
    def getBasicEncoded(data):
        return json.dumps(data)

    @staticmethod
    def getAdvanceEncoded(data):
        d_data = {
            "type": "dict_type",
            "data": [data],
            "input_type": "list"
        }

        return d_data