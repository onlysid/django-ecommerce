from django.contrib import admin
from django.urls import path
from shop import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('<int:id>', views.detail, name='detail'),
    path('checkout/', views.checkout, name='checkout'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
