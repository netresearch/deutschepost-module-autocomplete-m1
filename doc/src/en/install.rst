Installation and configuration
==============================

Installation
------------------------------------

Install the module according to the instructions from the file *readme.md* which you can
find in the module package. It is very important to follow all steps exactly as shown there.
Do not skip any steps.

No database tables or fields are modified during installation, because the module does not
save any additional data.

Module configuration
------------------------------------

The configuration in the |mage1| admin panel can be found here:

::

    Configuration → Customer → Customer configuration → Deutsche Post Direkt Autocomplete

In this configuration section, the following settings can be made:

- *Enabled*: Select if the module should be activated.
- *Username*: Enter the username which you received from |dpdirekt|, see `Login data`_.
- *Password*: Enter the password for the above user.
- *Logging enabled*: If enabled, the communication with *Datafactory Autocomplete* will be
  logged in ``var/log/postdirekt_autocomplete.log``. Note that the general logging in
  *Advanced → Developer → Log settings* also needs to be enabled.

The module does not have a sandbox mode. You need `Login data`_ in any case.

|mage1| configuration
------------------------------------

We recommend setting the shop's default country to Germany so the address completion works for the
customer without selecting the country first (see also `Supported countries`_).

If another country is chosen, the address will not be auto-completed.
