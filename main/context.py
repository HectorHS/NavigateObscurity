from main.models import Page


def getContext(request):
    data_pages = Page.objects.filter(parent='worlddata')
    node_pages = Page.objects.filter(parent='nodes')
    context = {
        'data_pages': data_pages,
        'node_pages': node_pages
    }
    return context
