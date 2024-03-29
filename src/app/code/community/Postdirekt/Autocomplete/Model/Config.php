<?php
/**
 * See LICENSE.md for license details.
 */

/**
 * Class Postdirekt_Autocomplete_Model_Config
 *
 * @package   Postdirekt\Autocomplete\Model
 * @copyright 2018 Netresearch GmbH & Co. KG
 * @license   https://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 * @link      https://www.netresearch.de/
 */
class Postdirekt_Autocomplete_Model_Config
{
    const CONFIG_XML_FIELD_ENABLED = 'customer/postdirekt_autocomplete/active';
    const CONFIG_XML_FIELD_USERNAME = 'customer/postdirekt_autocomplete/username';
    const CONFIG_XML_FIELD_PASSWORD = 'customer/postdirekt_autocomplete/password';
    const CONFIG_XML_FIELD_LOGGING_ENABLED = 'customer/postdirekt_autocomplete/logging_enabled';
    const CONFIG_XML_FIELD_HOUSENUMBER_HINT_ENABLED = 'customer/postdirekt_autocomplete/active_housenumber_hint';
    const CONFIG_XML_FIELD_HOUSENUMBER_HINT = 'customer/postdirekt_autocomplete/housenumber_hint';

    /**
     * Check if module is enabled.
     *
     * @param mixed $store
     * @return bool
     */
    public function isActive($store = null)
    {
        return Mage::getStoreConfigFlag(self::CONFIG_XML_FIELD_ENABLED, $store);
    }

    /**
     * Check if logging is enabled in module config.
     *
     * @param mixed $store
     * @return bool
     */
    public function isLoggingEnabled($store = null)
    {
        return Mage::getStoreConfigFlag(self::CONFIG_XML_FIELD_LOGGING_ENABLED, $store);
    }

    /**
     * Get configured username.
     *
     * @param mixed $store
     * @return string
     */
    public function getUsername($store = null)
    {
        return Mage::getStoreConfig(self::CONFIG_XML_FIELD_USERNAME, $store);
    }


    /**
     * Get configured password.
     *
     * @param mixed $store
     * @return string
     */
    public function getPassword($store = null)
    {
        return Mage::getStoreConfig(self::CONFIG_XML_FIELD_PASSWORD, $store);
    }
    
    /**
     * Check show hint text is enabled
     *
     * @param null $store
     * @return bool
     */
    public function isHouseNumberHintActive($store = null)
    {
        return Mage::getStoreConfigFlag(self::CONFIG_XML_FIELD_HOUSENUMBER_HINT_ENABLED, $store);
    }
    
    /**
     * Get the configured hint text
     *
     * @param null $store
     * @return string
     */
    public function getHouseNumberHint($store = null)
    {
        return Mage::getStoreConfig(self::CONFIG_XML_FIELD_HOUSENUMBER_HINT, $store);
    }
}
