<?php
/**
 * See LICENSE.md for license details.
 */

/**
 * Class Postdirekt_Autocomplete_Model_Webservice_Data_SearchResponse
 *
 * @package   Postdirekt\Autocomplete\Model
 * @author    Rico Sonntag <rico.sonntag@netresearch.de>
 * @copyright 2018 Netresearch GmbH & Co. KG
 * @license   https://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 * @link      https://www.netresearch.de/
 */
class Postdirekt_Autocomplete_Model_Webservice_Data_SearchResponse
{
    /**
     * @var \Postdirekt_Autocomplete_Model_Webservice_Data_SearchResponse_Address[]
     */
    protected $_addresses;

    /**
     * Postdirekt_Autocomplete_Model_Webservice_Data_SearchResponse constructor.
     * @param \Postdirekt_Autocomplete_Model_Webservice_Data_SearchResponse_Address[] $_addresses
     */
    public function __construct(array $_addresses)
    {
        $this->_addresses = $_addresses;
    }

    /**
     * @return \Postdirekt_Autocomplete_Model_Webservice_Data_SearchResponse_Address[]
     */
    public function getAddresses()
    {
        return $this->_addresses;
    }
}
