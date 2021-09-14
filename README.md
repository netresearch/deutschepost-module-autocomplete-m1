Deutsche Post Direkt Autocomplete
=================================

Automatische Vervollständigung postalischer Daten.

The Deutsche Post Direkt Autocomplete extension for Magento 1 allows to use
the DATAFACTORY AUTOCOMPLETE web service with address forms.

Requirements
------------
- PHP >= 5.4.0

Compatibility
-------------
- Magento CE >= 1.9

Installation Instructions
-------------------------

1. Install the extension via Magento Connect with the key shown above or install
   via composer / modman.
2. Clear the cache, logout from the admin panel and then login again.

More information on configuration and integration into custom themes can be found
in the documentation.

Uninstallation
--------------
1. Remove all extension files from your Magento installation
2. Clean up the database.


    DELETE FROM `core_config_data` WHERE `path` LIKE 'customer/postdirekt/%';

Support
-------

For questions or support requests, please use the support portal http://postdirekt.support.netresearch.de
or contact the support team by sending an email to <postdirekt.support@netresearch.de>.

Developer
---------
[Netresearch DTT GmbH](https://www.netresearch.de/)

Licence
-------
[OSL - Open Software Licence 3.0](https://opensource.org/licenses/osl-3.0.php)

Copyright
---------
(c) 2021 Deutsche Post Direkt GmbH
