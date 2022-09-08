from django.contrib import messages
from django.shortcuts import redirect

def referrer_redirect(request):
    return redirect(request.META.get('HTTP_REFERER'))

class Messages:
    """Class for generic error messages.
    returns a redirect to the referrer with a message.
    """
    def __init__(self, request):
        self.request = request
    def invalid_request(self):
        self.message = 'Invalid request.'
        messages.error(self.request, self.message)
        return referrer_redirect(self.request)
    def invalid_form(self):
        self.message = 'Invalid form.'
        messages.error(self.request, self.message)
        return referrer_redirect(self.request)
    def invalid_user(self):
        self.message = 'Invalid user.'
        messages.error(self.request, self.message)
        return referrer_redirect(self.request)
    def object_does_not_exist(self, obj='Object'):
        self.message = f'{obj} does not exist.'
        messages.error(self.request, self.message)
        return referrer_redirect(self.request)
    def unauthorised(self):
        self.message = 'Unauthorised request.'
        messages.error(self.request, self.message)
        return referrer_redirect(self.request)
    