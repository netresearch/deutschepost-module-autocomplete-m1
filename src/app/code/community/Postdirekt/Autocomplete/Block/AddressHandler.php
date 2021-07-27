<?php
/**
 * See LICENSE.md for license details.
 */

/**
 * Class Postdirekt_Autocomplete_Block_AddressHandler
 *
 * @package   Postdirekt\Autocomplete\Block
 * @copyright 2018 Netresearch GmbH & Co. KG
 * @license   https://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 * @link      https://www.netresearch.de/
 */
class Postdirekt_Autocomplete_Block_AddressHandler extends Mage_Core_Block_Template
{
    /**
     * @var Postdirekt_Autocomplete_Model_Token
     */
    private $tokenClient;
    
    /**
     * @var Postdirekt_Autocomplete_Model_Config
     */
    private $config;
    
    /**
     * @var Mage_Core_Model_Store
     */
    private $store;

    /**
     * Postdirekt_Autocomplete_Block_AddressHandler constructor.
     *
     * @param array $args
     */
    public function __construct(array $args = array())
    {
        $this->tokenClient = Mage::getSingleton('postdirekt_autocomplete/token');
        $this->config = Mage::getSingleton('postdirekt_autocomplete/config');
        $this->store = Mage::app()->getStore();

        parent::__construct($args);
    }

    /**
     * @return string
     */
    public function getToken()
    {
        return $this->tokenClient->getToken();
    }
    
    /**
     * @return string|null
     */
    public function getHouseNumberHint()
    {
        if (!$this->config->isHouseNumberHintActive($this->store->getCode())) {
            return null;
        }
        
        return $this->config->getHouseNumberHint($this->store->getCode());
    }

    /**
     * @return string
     */
    protected function _toHtml()
    {
        return $this->config->isActive() ? parent::_toHtml() : '';
    }
}
