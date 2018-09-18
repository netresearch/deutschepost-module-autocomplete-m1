Deutsche Post Direkt Autocomplete
=================================

Automatische Vervollständigung postalischer Daten.

The Deutsche Post Direkt Autocomplete extension for Magento 1 allows to use
the DATAFACTORY AUTOCOMPLETE web service with address forms.

Facts
-----
- version: 0.1.0
- extension key: Postdirekt_Autocomplete
- [extension on GitLab](https://git.netresearch.de/postdirekt/module-autocomplete-m1)
- [direct download link](https://git.netresearch.de/postdirekt/module-autocomplete-m1/repository/0.1.0/archive.tar.gz)

Description
-----------
t.b.d.

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
t.b.d

Developer
---------
[Netresearch GmbH & Co. KG](https://www.netresearch.de/)

Licence
-------
[OSL - Open Software Licence 3.0](https://opensource.org/licenses/osl-3.0.php)

Copyright
---------
(c) 2018 Deutsche Post Direkt GmbH
