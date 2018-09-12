<?php
/**
 * Deutschepost Autocomplete
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade this extension to
 * newer versions in the future.
 *
 * PHP version 5
 *
 * @category  Deutschepost
 * @package   Deutschepost Autocomplete
 * @author    Sebastian Ertner <sebastian.ertner@netresearch.de>
 * @copyright 2018 Netresearch GmbH & Co. KG
 * @license   http://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 * @link      http://www.netresearch.de/
 */
class Deutschepost_Autocomplete_Model_Config
{
    const CONFIG_SECTION = 'customer';
    const CONFIG_GROUP = 'deutschepost_autocomplete';


    const CONFIG_XML_FIELD_ENABLED = 'enabled';
    const CONFIG_XML_FIELD_LOGGING_ENABLED  = 'logging_enabled';
    const CONFIG_XML_FIELD_USERNAME = 'username';
    const CONFIG_XML_FIELD_PASSWORD = 'password';


    /**
     * Wrap store config access.
     *
     * @param string $field
     * @param mixed $store
     * @return mixed
     */
    protected function getStoreConfig($field, $store = null)
    {
        $path = sprintf('%s/%s/%s', self::CONFIG_SECTION, self::CONFIG_GROUP, $field);
        return Mage::getStoreConfig($path, $store);
    }

    /**
     * Wrap store config access.
     *
     * @param string $field
     * @param mixed $store
     * @return bool
     */
    protected function getStoreConfigFlag($field, $store = null)
    {
        $path = sprintf('%s/%s/%s', self::CONFIG_SECTION, self::CONFIG_GROUP, $field);
        return Mage::getStoreConfigFlag($path, $store);
    }

    /**
     * Check if module is enabled.
     *
     * @param mixed $store
     * @return bool
     */
    public function isActive($store = null)
    {
        return $this->getStoreConfigFlag(self::CONFIG_XML_FIELD_ENABLED, $store);
    }

    /**
     * Check if logging is enabled in module config.
     *
     * @param mixed $store
     * @return bool
     */
    public function isLoggingEnabled($store = null)
    {
        return $this->getStoreConfigFlag(self::CONFIG_XML_FIELD_LOGGING_ENABLED, $store);
    }

    /**
     * Get configured username.
     *
     * @param mixed $store
     * @return mixed
     */
    public function getUsername($store = null)
    {
        return $this->getStoreConfig(self::CONFIG_XML_FIELD_USERNAME, $store);
    }


    /**
     * Get configured password.
     *
     * @param mixed $store
     * @return mixed
     */
    public function getPassword($store = null)
    {
        return $this->getStoreConfig(self::CONFIG_XML_FIELD_PASSWORD, $store);
    }
}