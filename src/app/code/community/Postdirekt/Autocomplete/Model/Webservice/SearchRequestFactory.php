<?php
/**
 * See LICENSE.md for license details.
 */

/**
 * Class Postdirekt_Autocomplete_Model_Webservice_SearchRequestFactory
 *
 * @package   Postdirekt\Autocomplete\Model
 * @author    Christoph Aßmann <christoph.assmann@netresearch.de>
 * @copyright 2018 Netresearch GmbH & Co. KG
 * @license   https://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 * @link      https://www.netresearch.de/
 */
class Postdirekt_Autocomplete_Model_Webservice_SearchRequestFactory
{
    /**
     * @var Postdirekt_Autocomplete_Model_Webservice_RequestDataConverter
     */
    protected $_requestDataConverter;

    /**
     * @var Postdirekt_Autocomplete_Model_Webservice_SearchRequestValidator
     */
    protected $_validator;

    /**
     * Postdirekt_Autocomplete_Model_Webservice_SearchRequestFactory constructor.
     */
    public function __construct()
    {
        $this->_requestDataConverter = Mage::getSingleton('postdirekt_autocomplete/webservice_requestDataConverter');
        $this->_validator = Mage::getSingleton('postdirekt_autocomplete/webservice_searchRequestValidator');
    }

    /**
     * @param string[] $data
     * @return Postdirekt_Autocomplete_Model_Webservice_Data_SearchRequest
     * @throws Postdirekt_Autocomplete_Exception_Webservice_ClientException
     */
    public function create(array $data)
    {
        $requestData = $this->_requestDataConverter->convert($data);

        /** @var Postdirekt_Autocomplete_Model_Webservice_Data_SearchRequest $searchRequest */
        $searchRequest = Mage::getModel('postdirekt_autocomplete/webservice_data_searchRequest', $requestData);
        $searchRequest->validate($this->_validator);

        return $searchRequest;
    }
}
