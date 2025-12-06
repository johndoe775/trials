from fastapi_front_end.main import app
from mangum import Mangum

handler = Mangum(app)
