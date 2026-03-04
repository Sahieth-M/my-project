from supabase import create_client
from config import get_settings


def get_supabase_client():
    settings = get_settings()
    supabase = create_client(settings.supabase_url, settings.supabase_key)
    return supabase


def get_supabase_admin_client():
    settings = get_settings()
    supabase = create_client(settings.supabase_url, settings.supabase_service_role_key)
    return supabase
