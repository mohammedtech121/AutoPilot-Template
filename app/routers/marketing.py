from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.marketing import marketing_service

# API Endpoint ka route prefix aur tags set karna
router = APIRouter(prefix="/api/marketing", tags=["Zync Marketing"])

# Frontend se aane waale data ka structure validation
class CampaignRequest(BaseModel):
    target_niche: str

@router.post("/run")
async def run_marketing_pipeline(payload: CampaignRequest):
    """
    Autonomous marketing engine pipeline ko trigger karne ka endpoint.
    """
    result = await marketing_service.run_autonomous_pipeline(payload.target_niche)
    
    if result.get("status") == "ERROR":
        raise HTTPException(status_code=500, detail=result.get("message"))
        
    return result