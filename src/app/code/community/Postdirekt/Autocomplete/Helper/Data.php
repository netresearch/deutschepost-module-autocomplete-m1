<?php
/**
 * See LICENSE.md for license details.
 */

/**
 * Class Postdirekt_Autocomplete_Helper_Data
 *
 * @package   Postdirekt\Autocomplete\Helper
 * @copyright 2018 Netresearch GmbH & Co. KG
 * @license   https://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 * @link      https://www.netresearch.de/
 */
class Postdirekt_Autocomplete_Helper_Data extends Mage_Core_Helper_Data
{
    /**
     * Returns the module version.
     *
     * @return string
     */
    public function getModuleVersion()
    {
        $moduleName = $this->_getModuleName();

        return (string) Mage::getConfig()->getModuleConfig($moduleName)->version;
    }
}
