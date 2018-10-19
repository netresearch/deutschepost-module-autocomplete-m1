<?php
/**
 * See LICENSE.md for license details.
 */

/**
 * Class Postdirekt_Autocomplete_Block_AddressHandler
 *
 * @package   Postdirekt\Autocomplete\Block
 * @author    Mathias Uhlmann <mathias.uhlmann@netresearch.de>
 * @copyright 2018 Netresearch GmbH & Co. KG
 * @license   https://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 * @link      https://www.netresearch.de/
 */
class Postdirekt_Autocomplete_Block_AddressHandler extends Mage_Core_Block_Template
{
    /**
     * @return string
     * @throws Mage_Core_Model_Store_Exception
     */
    public function getSearchEndpoint()
    {
        return Mage::app()->getStore()->getUrl('address/autocomplete/search');
    }

    /**
     * @return string
     * @throws Mage_Core_Model_Store_Exception
     */
    public function getSelectEndpoint()
    {
        return Mage::app()->getStore()->getUrl('address/autocomplete/select');
    }

    /**
     * @return string
     */
    protected function _toHtml()
    {
        /** @var Postdirekt_Autocomplete_Model_Config $config */
        $config = Mage::getSingleton('postdirekt_autocomplete/config');
        return $config->isActive() ? parent::_toHtml() : '';
    }
}
