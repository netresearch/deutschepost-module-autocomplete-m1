Hints for using the module
==================================

Login data
--------------------------------------

The module communicates with the service *Datafactory Autocomplete* by |dpdirekt|. To use this
service, login data are required which you get from |dpdirekt|.

Further information: https://www.deutschepost.de/en/d/deutsche-post-direkt/addressfactory.html

Display in the shop frontend
--------------------------------------

The display in the shop frontend can vary depending on the browser and operating system. The underlying
functionality of the module is not affected by this. An example is shown in the chapter `Module usage`_.

Please also note the hints about `Browser support`_.

Supported countries
--------------------------------------

The address completion is only available for addresses in Germany.

We recommend setting the shop's default country to Germany so the customer doesn't have to select the
country in the shop frontend.

Data protection / GDPR
--------------------------------------

For address completion, the customer's personal data (street, ZIP code, city) are transmitted
to |dpdirekt|. This is necessary for the module to function. According to the GDPR, the merchant
needs the agreement from the customer to process the data, e.g. via the shop's
terms and conditions.

No additional information or metadata are stored in |mage1|, only the customer address entered in the
shop frontend.
